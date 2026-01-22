#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');
const kb = require('../lib/kb');

/**
 * Knowledge base management for CodeMaestro
 */
async function kbCommand(action, type, name, options) {
  try {
    // Check if we're in a CodeMaestro project
    const isCodeMaestroProject = await projectDetector.isCodeMaestroProject();
    if (!isCodeMaestroProject) {
      logger.error('Not a CodeMaestro project. Run `/codem-init` first.');
      return;
    }

    // Route to appropriate handler
    switch (action) {
    case 'search':
      await handleSearch(type, options);
      break;
    case 'add':
      await handleAdd(type, name, options);
      break;
    case 'list':
      await handleList(options);
      break;
    case 'show':
      await handleShow(type, name);
      break;
    case 'export':
      await handleExport(type, name);
      break;
    case 'import':
      await handleImport(type, name);
      break;
    default:
      logger.error(`Unknown action: ${action}`);
      showUsage();
    }

  } catch (error) {
    logger.error('KB command failed', error);
    process.exit(1);
  }
}

/**
 * Handle search action
 */
async function handleSearch(query, options) {
  if (!query) {
    logger.error('Search query is required');
    return;
  }

  logger.info(`Searching knowledge base for: "${query}"`);

  const results = await kb.search(query, {
    type: options.type ? options.type + 's' : null, // Map to KB storage type
    limit: options.limit || 10
  });

  if (results.length === 0) {
    logger.warn(`No results found for: "${query}"`);
    console.log(chalk.blue(`
💡 Suggestions:
• Try different keywords
• Use partial matches
• Check spelling
• Use --type to limit search scope
    `));
    return;
  }

  console.log(chalk.bold.blue(`🔍 Search Results for "${query}"`));
  console.log(`Found ${results.length} matching entries\n`);

  results.forEach((result, index) => {
    const typeIcon = getTypeIcon(result.type);
    const relevance = options.verbose ? chalk.gray(` (${result.relevance})`) : '';

    console.log(`${index + 1}. ${typeIcon} ${chalk.bold(result.id)}${relevance}`);
    console.log(`   ${chalk.gray(result.description)}`);
    console.log(`   ${chalk.blue(result.type)} • ${new Date(result.date).toLocaleDateString()}\n`);
  });

  if (results.length > 0) {
    console.log(chalk.blue(`💡 Use '/codem-kb show ${results[0].type} ${results[0].id}' to view details`));
  }
}

/**
 * Handle add action
 */
async function handleAdd(type, name, options) {
  if (!['pattern', 'failure', 'decision'].includes(type)) {
    logger.error(`Invalid entry type: ${type}. Must be: pattern, failure, or decision`);
    return;
  }

  // Map command types to KB storage types
  const kbType = type + 's'; // pattern -> patterns, failure -> failures, decision -> decisions

  if (!name) {
    logger.error('Entry name is required');
    return;
  }

  logger.info(`Adding new ${type}: ${name}`);

  // Interactive input if not provided via options
  let entryData = {
    title: options.title || name,
    description: options.description,
    content: options.content,
    tags: options.tags ? options.tags.split(',').map(t => t.trim()) : [],
    author: options.author || 'CodeMaestro Assistant',
    phase: options.phase
  };

  // Prompt for missing information
  const questions = [];

  if (!entryData.description) {
    questions.push({
      type: 'input',
      name: 'description',
      message: `Description for ${type}:`,
      validate: input => input.length > 0 || 'Description is required'
    });
  }

  if (!entryData.content) {
    questions.push({
      type: 'editor',
      name: 'content',
      message: `Detailed content for ${type} (editor will open):`,
      validate: input => input.length > 0 || 'Content is required'
    });
  }

  if (entryData.tags.length === 0) {
    questions.push({
      type: 'input',
      name: 'tags',
      message: 'Tags (comma-separated):',
      filter: input => input.split(',').map(t => t.trim()).filter(t => t)
    });
  }

  if (questions.length > 0) {
    const answers = await inquirer.prompt(questions);
    entryData = { ...entryData, ...answers };
  }

  try {
    const entry = await kb.addEntry(kbType, name, entryData);

    logger.success(`${type} "${name}" added successfully!`);
    console.log(chalk.green(`
✅ Added to knowledge base:
   Type: ${type}
   ID: ${entry.id}
   Title: ${entry.title}
   Description: ${entry.description}
   Tags: ${entry.tags.join(', ') || 'none'}
   File: docs/kb/${kbType}/${entry.id}.md
    `));

  } catch (error) {
    if (error.message.includes('already exists')) {
      logger.error(error.message);
      console.log(chalk.blue(`💡 Use '/codem-kb show ${type} ${name}' to view existing entry`));
    } else {
      throw error;
    }
  }
}

/**
 * Handle list action
 */
async function handleList(options) {
  logger.info('Listing knowledge base entries');

  const entries = await kb.list({
    type: options.type ? options.type + 's' : null
  });

  if (entries.length === 0) {
    logger.warn('No knowledge base entries found');
    console.log(chalk.blue(`
💡 To add entries:
• /codem-kb add pattern --name my-pattern
• /codem-kb add failure --name my-failure
• /codem-kb add decision --name my-decision
    `));
    return;
  }

  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.type]) acc[entry.type] = [];
    acc[entry.type].push(entry);
    return acc;
  }, {});

  console.log(chalk.bold.blue('📚 Knowledge Base Contents'));
  console.log(`Total entries: ${entries.length}\n`);

  for (const [type, typeEntries] of Object.entries(grouped)) {
    const typeIcon = getTypeIcon(type);
    const singularType = type.slice(0, -1); // Remove 's' from plural
    console.log(`${typeIcon} ${chalk.bold(singularType.charAt(0).toUpperCase() + singularType.slice(1))}s (${typeEntries.length})`);

    typeEntries.forEach(entry => {
      console.log(`  • ${chalk.cyan(entry.id)} - ${entry.description}`);
    });
    console.log();
  }
}

/**
 * Handle show action
 */
async function handleShow(type, id) {
  if (!id) {
    logger.error('Entry ID is required');
    return;
  }

  // Validate type
  if (!['pattern', 'failure', 'decision'].includes(type)) {
    logger.error(`Invalid entry type: ${type}. Must be: pattern, failure, or decision`);
    return;
  }

  logger.info(`Showing ${type}: ${id}`);

  const kbType = type + 's';
  const entry = await kb.getEntry(kbType, id);

  if (!entry) {
    logger.error(`Entry not found: ${type}/${id}`);
    console.log(chalk.blue(`
💡 Available ${type}s:
    `));
    const entries = await kb.list({ type: kbType });
    entries.forEach(e => console.log(`   • ${e.id} - ${e.description}`));
    return;
  }

  console.log(chalk.bold.blue(`📖 ${entry.title}`));
  console.log('═'.repeat(60));
  console.log(`Type: ${chalk.green(entry.type)}`);
  console.log(`ID: ${chalk.cyan(entry.id)}`);
  console.log(`Created: ${new Date(entry.created).toLocaleDateString()}`);
  console.log(`Author: ${entry.author}`);
  console.log(`Tags: ${entry.tags?.join(', ') || 'none'}`);

  console.log('\n' + chalk.bold('Description:'));
  console.log(entry.description || 'No description available');

  console.log('\n' + chalk.bold('Content:'));
  console.log(entry.content);
}

/**
 * Handle export action
 */
async function handleExport(type, id) {
  if (!id) {
    logger.error('Entry ID is required');
    return;
  }

  logger.info(`Exporting ${type}/${id} to global cache`);

  try {
    await kb.exportToGlobal(type, id);
    logger.success(`Exported ${type}/${id} to global cache`);
  } catch (error) {
    logger.error(`Export failed: ${error.message}`);
  }
}

/**
 * Handle import action
 */
async function handleImport(type, id) {
  if (!id) {
    logger.error('Entry ID is required');
    return;
  }

  logger.info(`Importing ${type}/${id} from global cache`);

  try {
    await kb.importFromGlobal(type, id);
    logger.success(`Imported ${type}/${id} from global cache`);
  } catch (error) {
    logger.error(`Import failed: ${error.message}`);
  }
}

/**
 * Get icon for entry type
 */
function getTypeIcon(type) {
  switch (type) {
  case 'patterns': return '🔄';
  case 'failures': return '❌';
  case 'decisions': return '⚖️';
  default: return '📄';
  }
}

/**
 * Show usage information
 */
function showUsage() {
  console.log(chalk.blue(`
📚 CodeMaestro Knowledge Base Commands:

Search:
  /codem-kb search <query> [--type pattern|failure|decision] [--limit N]

Add entries:
  /codem-kb add pattern <name> [--title "Title"] [--description "Desc"] [--content "Content"] [--tags "tag1,tag2"]
  /codem-kb add failure <name> [options]
  /codem-kb add decision <name> [options]

View entries:
  /codem-kb list [--type pattern|failure|decision]
  /codem-kb show <type> <id>

Global operations:
  /codem-kb export <type> <id>
  /codem-kb import <type> <id>
  `));
}

// CLI setup
program
  .name('codem-kb')
  .description('CodeMaestro knowledge base management')
  .argument('<action>', 'Action: search, add, list, show, export, import')
  .argument('[type]', 'Entry type: pattern, failure, decision')
  .argument('[name]', 'Entry name/ID')
  .option('-t, --title <title>', 'Entry title')
  .option('-d, --description <description>', 'Entry description')
  .option('-c, --content <content>', 'Entry content')
  .option('--tags <tags>', 'Comma-separated tags')
  .option('--author <author>', 'Entry author')
  .option('--phase <phase>', 'Related phase (1-5)')
  .option('--type <type>', 'Filter by entry type')
  .option('--limit <number>', 'Limit results', parseInt)
  .option('-v, --verbose', 'Verbose output')
  .action(kbCommand);

program.parse();