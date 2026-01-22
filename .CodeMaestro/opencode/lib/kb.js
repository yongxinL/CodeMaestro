const fs = require('fs-extra');
const path = require('path');
const logger = require('./logger');
const config = require('./config');

/**
 * Knowledge Base management utilities for CodeMaestro
 */
class KnowledgeBase {
  constructor() {
    this.kbIndex = null;
  }

  /**
   * Ensure KB directory structure exists
   * @returns {Object} KB directory paths
   */
  async ensureKbStructure() {
    const projectConfig = await config.load();
    const kbBase = projectConfig.paths.knowledge_base;

    const structure = {
      base: kbBase,
      patterns: path.join(kbBase, 'patterns'),
      failures: path.join(kbBase, 'failures'),
      decisions: path.join(kbBase, 'decisions'),
      index: path.join(kbBase, 'index.md')
    };

    // Create directories
    for (const [key, dir] of Object.entries(structure)) {
      if (key !== 'index') {
        await fs.ensureDir(dir);
      }
    }

    return structure;
  }

  /**
   * Load or create KB index
   * @returns {Object} KB index data
   */
  async loadIndex() {
    if (this.kbIndex) return this.kbIndex;

    const structure = await this.ensureKbStructure();
    const indexPath = structure.index;

    if (await fs.pathExists(indexPath)) {
      const content = await fs.readFile(indexPath, 'utf8');
      this.kbIndex = this.parseIndex(content);
    } else {
      this.kbIndex = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        entries: {
          patterns: {},
          failures: {},
          decisions: {}
        }
      };
      await this.saveIndex();
    }

    return this.kbIndex;
  }

  /**
   * Parse KB index markdown
   * @param {string} content - Index markdown content
   * @returns {Object} Parsed index
   */
  parseIndex(content) {
    const index = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      entries: {
        patterns: {},
        failures: {},
        decisions: {}
      }
    };

    // Simple parsing - extract entries from markdown
    const lines = content.split('\n');
    let currentType = null;

    for (const line of lines) {
      if (line.includes('## Patterns')) currentType = 'patterns';
      else if (line.includes('## Failures')) currentType = 'failures';
      else if (line.includes('## Decisions')) currentType = 'decisions';
      else if (currentType && line.match(/^\*\s*\[([^\]]+)\]/)) {
        const match = line.match(/^\*\s*\[([^\]]+)\]\s*\(([^)]+)\)\s*-\s*(.+)$/);
        if (match) {
          const [, id, date, description] = match;
          index.entries[currentType][id] = {
            id,
            description,
            date,
            type: currentType
          };
        }
      }
    }

    return index;
  }

  /**
   * Save KB index to disk
   */
  async saveIndex() {
    if (!this.kbIndex) return;

    const structure = await this.ensureKbStructure();
    const indexContent = this.generateIndexMarkdown();

    await fs.writeFile(structure.index, indexContent);
  }

  /**
   * Generate index markdown from index data
   * @returns {string} Index markdown content
   */
  generateIndexMarkdown() {
    const { entries } = this.kbIndex;
    let content = `# CodeMaestro Knowledge Base Index

**Version:** ${this.kbIndex.version}
**Last Updated:** ${this.kbIndex.lastUpdated}
**Total Entries:** ${Object.values(entries).reduce((sum, type) => sum + Object.keys(type).length, 0)}

## Patterns
Reusable solutions and best practices.

`;

    for (const [id, entry] of Object.entries(entries.patterns)) {
      content += `* [${id}](${entry.date}) - ${entry.description}\n`;
    }

    content += '\n## Failures\n';
    content += 'Lessons learned from mistakes and issues.\n\n';

    for (const [id, entry] of Object.entries(entries.failures)) {
      content += `* [${id}](${entry.date}) - ${entry.description}\n`;
    }

    content += '\n## Decisions\n';
    content += 'Architectural and design decisions.\n\n';

    for (const [id, entry] of Object.entries(entries.decisions)) {
      content += `* [${id}](${entry.date}) - ${entry.description}\n`;
    }

    return content;
  }

  /**
   * Add a new KB entry
   * @param {string} type - Entry type (patterns, failures, decisions)
   * @param {string} id - Entry ID
   * @param {Object} data - Entry data
   */
  async addEntry(type, id, data) {
    const index = await this.loadIndex();
    const structure = await this.ensureKbStructure();

    // Check if entry already exists
    if (index.entries[type] && index.entries[type][id]) {
      throw new Error(`Entry ${id} already exists in ${type}`);
    }

    // Check if entry already exists
    if (index.entries[type][id]) {
      throw new Error(`Entry ${id} already exists in ${type}`);
    }

    console.log('Creating entry data...'); // Debug
    // Create entry data
    const entry = {
      id,
      title: data.title || id,
      description: data.description || '',
      content: data.content || '',
      tags: data.tags || [],
      created: new Date().toISOString(),
      author: data.author || 'CodeMaestro Assistant',
      phase: data.phase || null,
      related: data.related || []
    };

    console.log('Saving entry file...'); // Debug
    // Save entry file
    const entryPath = path.join(structure[type], `${id}.md`);
    console.log('Entry path:', entryPath); // Debug
    const entryContent = this.generateEntryMarkdown(entry);
    await fs.writeFile(entryPath, entryContent);
    console.log('Entry file saved'); // Debug

    // Update index
    index.entries[type][id] = {
      id,
      description: entry.description,
      date: entry.created,
      type
    };
    index.lastUpdated = new Date().toISOString();

    await this.saveIndex();

    return entry;
  }

  /**
   * Generate entry markdown
   * @param {Object} entry - Entry data
   * @returns {string} Entry markdown content
   */
  generateEntryMarkdown(entry) {
    let content = `---
id: ${entry.id}
title: ${entry.title}
description: ${entry.description}
created: ${entry.created}
author: ${entry.author}
tags: ${entry.tags.join(', ')}
`;

    if (entry.phase) content += `phase: ${entry.phase}\n`;
    if (entry.related.length > 0) content += `related: ${entry.related.join(', ')}\n`;

    content += `---

# ${entry.title}

**Description:** ${entry.description}

**Tags:** ${entry.tags.map(tag => `\`${tag}\``).join(', ')}

**Created:** ${new Date(entry.created).toLocaleDateString()}

`;

    if (entry.phase) {
      content += `**Phase:** ${entry.phase}\n\n`;
    }

    if (entry.related.length > 0) {
      content += `**Related:** ${entry.related.map(rel => `[${rel}](${rel}.md)`).join(', ')}\n\n`;
    }

    content += `## Content

${entry.content}

---
*Generated by CodeMaestro Assistant*
`;

    return content;
  }

  /**
   * Search KB entries
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Array} Matching entries
   */
  async search(query, options = {}) {
    const index = await this.loadIndex();
    const results = [];
    const searchTerm = query.toLowerCase();

    // Search through all entries
    for (const [type, entries] of Object.entries(index.entries)) {
      for (const [, entry] of Object.entries(entries)) {
        const score = this.calculateRelevance(entry, searchTerm);
        if (score > 0) {
          results.push({
            ...entry,
            relevance: score,
            type
          });
        }
      }
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    // Filter by type if specified
    if (options.type) {
      return results.filter(result => result.type === options.type);
    }

    return results.slice(0, options.limit || 10);
  }

  /**
   * Calculate relevance score for search
   * @param {Object} entry - KB entry
   * @param {string} query - Search query
   * @returns {number} Relevance score
   */
  calculateRelevance(entry, query) {
    let score = 0;
    const entryText = `${entry.id} ${entry.description}`.toLowerCase();

    // Exact ID match gets highest score
    if (entry.id.toLowerCase() === query) return 100;

    // ID starts with query
    if (entry.id.toLowerCase().startsWith(query)) score += 50;

    // Description contains query
    if (entry.description.toLowerCase().includes(query)) score += 30;

    // Word matches in description
    const queryWords = query.split(/\s+/);
    for (const word of queryWords) {
      if (entryText.includes(word)) score += 10;
    }

    return score;
  }

  /**
   * List all KB entries
   * @param {Object} options - List options
   * @returns {Array} All entries
   */
  async list(options = {}) {
    const index = await this.loadIndex();
    const results = [];

    for (const [type, entries] of Object.entries(index.entries)) {
      if (options.type && options.type !== type) continue;

      for (const [, entry] of Object.entries(entries)) {
        results.push({
          ...entry,
          type
        });
      }
    }

    return results;
  }

  /**
   * Get a specific KB entry
   * @param {string} type - Entry type
   * @param {string} id - Entry ID
   * @returns {Object|null} Entry data or null
   */
  async getEntry(type, id) {
    const structure = await this.ensureKbStructure();
    const entryPath = path.join(structure[type], `${id}.md`);

    if (!await fs.pathExists(entryPath)) {
      return null;
    }

    const content = await fs.readFile(entryPath, 'utf8');
    return this.parseEntry(content, type, id);
  }

  /**
   * Parse entry markdown
   * @param {string} content - Entry markdown content
   * @param {string} type - Entry type
   * @param {string} id - Entry ID
   * @returns {Object} Parsed entry
   */
  parseEntry(content, type, id) {
    const lines = content.split('\n');
    const frontmatter = {};
    let inFrontmatter = false;
    let contentStart = 0;

    // Parse frontmatter
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '---') {
        if (!inFrontmatter) {
          inFrontmatter = true;
        } else {
          contentStart = i + 1;
          break;
        }
      } else if (inFrontmatter) {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const [, key, value] = match;
          if (key === 'tags' || key === 'related') {
            frontmatter[key] = value.split(',').map(s => s.trim());
          } else {
            frontmatter[key] = value;
          }
        }
      }
    }

    // Extract description from content if not in frontmatter
    let description = frontmatter.description;
    if (!description) {
      const contentText = lines.slice(contentStart).join('\n');
      const descMatch = contentText.match(/\*\*Description:\*\*\s*(.+?)(?:\n|\*\*|$)/);
      if (descMatch) {
        description = descMatch[1].trim();
      }
    }

    return {
      ...frontmatter,
      description,
      type,
      id,
      content: lines.slice(contentStart).join('\n').trim()
    };
  }

  /**
   * Export entry to global cache
   * @param {string} type - Entry type
   * @param {string} id - Entry ID
   */
  async exportToGlobal(type, id) {
    // TODO: Implement global cache export
    // For now, just log the intent
    logger.info(`Would export ${type}/${id} to global cache`);
  }

  /**
   * Import entry from global cache
   * @param {string} type - Entry type
   * @param {string} id - Entry ID
   */
  async importFromGlobal(type, id) {
    // TODO: Implement global cache import
    // For now, just log the intent
    logger.info(`Would import ${type}/${id} from global cache`);
  }
}

module.exports = new KnowledgeBase();