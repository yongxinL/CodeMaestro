const { execSync, exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);
const logger = require('./logger');
const config = require('./config');
const projectDetector = require('./project');

/**
 * Git integration utilities for CodeMaestro
 */
class GitIntegration {
  constructor() {
    this.gitCommands = null;
  }

  /**
   * Check if current directory is a git repository
   * @returns {boolean} True if git repository
   */
  isGitRepository() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get git status
   * @returns {Object} Git status information
   */
  async getStatus() {
    try {
      if (!this.isGitRepository()) {
        return { isRepo: false };
      }

      const { stdout: statusOutput } = await execAsync('git status --porcelain');
      const { stdout: branchOutput } = await execAsync('git rev-parse --abbrev-ref HEAD');
      const { stdout: stagedOutput } = await execAsync('git diff --cached --name-only');

      const files = statusOutput.trim().split('\n').filter(line => line.trim());
      const staged = stagedOutput.trim().split('\n').filter(file => file.trim());
      const unstaged = files.filter(file => !staged.includes(file.substring(3)));

      return {
        isRepo: true,
        branch: branchOutput.trim(),
        staged: staged,
        unstaged: unstaged,
        modified: files.length > 0
      };
    } catch (error) {
      logger.debug(`Git status error: ${error.message}`);
      return { isRepo: false, error: error.message };
    }
  }

  /**
   * Analyze git diff for commit message generation
   * @returns {Object} Diff analysis results
   */
  async analyzeDiff() {
    try {
      const { stdout: diffOutput } = await execAsync('git diff --cached');
      const { stdout: statOutput } = await execAsync('git diff --cached --stat');

      // Analyze diff content
      const lines = diffOutput.split('\n');
      const additions = lines.filter(line => line.startsWith('+') && !line.startsWith('+++')).length;
      const deletions = lines.filter(line => line.startsWith('-') && !line.startsWith('---')).length;

      // Extract file types
      const files = statOutput.split('\n')[0]?.match(/[^\s|]+\.[^\s]+/g) || [];
      const fileTypes = [...new Set(files.map(file => path.extname(file).substring(1)))];

      return {
        additions,
        deletions,
        files: files.length,
        fileTypes,
        hasBreakingChanges: diffOutput.includes('BREAKING CHANGE'),
        hasNewFeatures: diffOutput.includes('feat:') || diffOutput.includes('feature'),
        hasBugFixes: diffOutput.includes('fix:') || diffOutput.includes('bug'),
        hasDocumentation: fileTypes.includes('md') || diffOutput.includes('docs/'),
        hasTests: fileTypes.includes('test') || diffOutput.includes('test') || diffOutput.includes('spec')
      };
    } catch (error) {
      logger.debug(`Diff analysis error: ${error.message}`);
      return {};
    }
  }

  /**
   * Get recent commit history
   * @param {number} count - Number of commits to retrieve
   * @returns {Array} Recent commits
   */
  async getRecentCommits(count = 5) {
    try {
      const { stdout } = await execAsync(`git log --oneline -${count}`);
      return stdout.trim().split('\n')
        .map(line => {
          const match = line.match(/^([a-f0-9]+)\s(.+)$/);
          return match ? { hash: match[1], message: match[2] } : null;
        })
        .filter(commit => commit);
    } catch (error) {
      logger.debug(`Recent commits error: ${error.message}`);
      return [];
    }
  }

  /**
   * Load git commands templates from CodeMaestro config
   * @returns {Object} Git commands configuration
   */
  async loadGitCommands() {
    if (this.gitCommands) return this.gitCommands;

    try {
      const projectConfig = await config.load();
      const gitCommandsPath = path.join(projectConfig.paths.codemaestro_dir, 'config/git-commands.md');

      if (await fs.pathExists(gitCommandsPath)) {
        // Parse git commands file (simplified parsing)
        const content = await fs.readFile(gitCommandsPath, 'utf8');
        this.gitCommands = this.parseGitCommands(content);
      } else {
        // Fallback to default patterns
        this.gitCommands = this.getDefaultGitCommands();
      }
    } catch (error) {
      logger.debug(`Git commands loading error: ${error.message}`);
      // Fallback to default patterns
      this.gitCommands = this.getDefaultGitCommands();
    }

    return this.gitCommands;
  }

  /**
   * Parse git commands markdown file
   * @param {string} content - Markdown content
   * @returns {Object} Parsed commands
   */
  parseGitCommands(content) {
    // Simplified parsing - in a real implementation, this would be more robust
    const commands = {};

    // Extract commit message templates
    const commitSection = content.match(/## Commit Messages[\s\S]*?(?=##|$)/);
    if (commitSection) {
      commands.commitTemplates = {
        feature: 'feat: add {description}',
        bugfix: 'fix: {description}',
        docs: 'docs: {description}',
        refactor: 'refactor: {description}',
        test: 'test: {description}',
        chore: 'chore: {description}'
      };
    }

    return commands;
  }

  /**
   * Get default git commands
   * @returns {Object} Default commands
   */
  getDefaultGitCommands() {
    return {
      commitTemplates: {
        feature: 'feat: add {description}',
        bugfix: 'fix: {description}',
        docs: 'docs: {description}',
        refactor: 'refactor: {description}',
        test: 'test: {description}',
        chore: 'chore: {description}'
      },
      phases: {
        1: 'feat: requirements - {description}',
        2: 'feat: planning - {description}',
        3: 'feat: implementation - {description}',
        4: 'feat: verification - {description}',
        5: 'feat: release - {description}'
      }
    };
  }

  /**
   * Generate commit message using CodeMaestro conventions
   * @param {Object} options - Generation options
   * @returns {string} Generated commit message
   */
  async generateCommitMessage(options = {}) {
    try {
      const gitCommands = await this.loadGitCommands();
      const diffAnalysis = await this.analyzeDiff();
      const projectStatus = await projectDetector.getProjectStatus();

      // Determine commit type based on analysis
      let commitType = 'chore';
      if (diffAnalysis.hasNewFeatures) commitType = 'feat';
      else if (diffAnalysis.hasBugFixes) commitType = 'fix';
      else if (diffAnalysis.hasDocumentation) commitType = 'docs';
      else if (diffAnalysis.hasTests) commitType = 'test';

      // Get template
      const template = gitCommands.commitTemplates?.[commitType] ||
                      gitCommands.commitTemplates?.chore ||
                      '{type}: {description}';

      // Generate description (this would be more sophisticated in practice)
      let description = options.description || 'update code';

      // Add phase context if available
      let phasePrefix = '';
      if (projectStatus.phase) {
        const phaseTemplates = gitCommands.phases || {};
        const phaseTemplate = phaseTemplates[projectStatus.phase];
        if (phaseTemplate) {
          phasePrefix = `[Phase ${projectStatus.phase}] `;
        }
      }

      // Build commit message
      let message = template
        .replace('{type}', commitType)
        .replace('{description}', description);

      // Add phase prefix
      if (phasePrefix) {
        message = phasePrefix + message;
      }

      // Add role context
      if (projectStatus.role) {
        message += `\n\nRole: ${projectStatus.role}`;
      }

      // Add Co-Authored-By (for Claude/CodeMaestro workflow)
      message += '\nCo-Authored-By: CodeMaestro Assistant <assistant@codemaestro.ai>';

      return message;

    } catch (error) {
      logger.debug(`Commit message generation error: ${error.message}`);
      return 'chore: update code\n\nCo-Authored-By: CodeMaestro Assistant <assistant@codemaestro.ai>';
    }
  }

  /**
   * Execute git commit with generated message
   * @param {string} message - Commit message
   * @param {Object} options - Commit options
   * @returns {boolean} Success status
   */
  async commit(message, options = {}) {
    try {
      const command = options.amend ? 'git commit --amend' : 'git commit';

      if (options.noEdit) {
        execSync(`${command} -m "${message}"`, { stdio: 'inherit' });
      } else {
        // For interactive commits, set the message and let user edit
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
      }

      return true;
    } catch (error) {
      logger.error('Git commit failed', error);
      return false;
    }
  }

  /**
   * Add files to staging area
   * @param {Array} files - Files to add (empty array for all)
   * @returns {boolean} Success status
   */
  async add(files = []) {
    try {
      const fileArgs = files.length > 0 ? files.join(' ') : '.';
      execSync(`git add ${fileArgs}`, { stdio: 'inherit' });
      return true;
    } catch (error) {
      logger.error('Git add failed', error);
      return false;
    }
  }
}

module.exports = new GitIntegration();