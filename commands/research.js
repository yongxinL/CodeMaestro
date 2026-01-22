#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Mock MCP tool implementations (to be replaced with actual MCP integration)
 * These simulate the expected interface for development/testing
 */
class MockContext7 {
  async query() {
    // Simulate Context7 library/API lookup
    const mockResults = {
      libraries: [
        {
          id: '/expressjs/express',
          name: 'Express.js',
          description: 'Fast, unopinionated, minimalist web framework for Node.js',
          version: '4.18.2',
          relevance: 0.95,
          docs_url: 'https://expressjs.com/',
          examples: [
            'const express = require(\'express\'); const app = express();',
            'app.get(\'/\', (req, res) => res.send(\'Hello World!\'));'
          ]
        }
      ],
      apis: [
        {
          name: 'REST API',
          description: 'Representational State Transfer API design',
          relevance: 0.88,
          best_practices: [
            'Use proper HTTP status codes',
            'Implement proper error handling',
            'Use consistent naming conventions'
          ]
        }
      ]
    };

    return mockResults;
  }
}

class MockWebSearch {
  async search() {
    // Simulate web search results
    const mockResults = [
      {
        title: 'Node.js Best Practices Guide',
        url: 'https://nodejs.org/en/docs/guides/',
        snippet: 'Official Node.js documentation with best practices for development, security, and performance.',
        relevance: 0.92
      },
      {
        title: 'Express.js Security Best Practices',
        url: 'https://expressjs.com/en/advanced/best-practice-security.html',
        snippet: 'Security best practices for Express.js applications including input validation and authentication.',
        relevance: 0.89
      },
      {
        title: 'REST API Design Guidelines',
        url: 'https://restfulapi.net/',
        snippet: 'Comprehensive guide to designing RESTful APIs with examples and best practices.',
        relevance: 0.85
      }
    ];

    return mockResults;
  }
}

// Initialize mock MCP tools (replace with actual MCP integration)
const context7 = new MockContext7();
const webSearch = new MockWebSearch();

/**
 * Research command combining multiple MCP tools
 */
async function researchCommand(query, options) {
  try {
    logger.info(`Researching: ${query}`);

    // Check if this is a CodeMaestro project (optional for research)
    const isCodeMaestroProject = await projectDetector.isCodeMaestroProject();
    if (!isCodeMaestroProject && !options.global) {
      console.log(chalk.yellow('⚠️  Not in a CodeMaestro project. Use --global for general research.'));
      console.log(chalk.gray('   Results may be less contextual without project information.'));
      console.log('');
    }

    console.log(chalk.bold.blue('🔍 CodeMaestro Research'));
    console.log('═'.repeat(60));
    console.log(chalk.bold('Query:'), query);
    console.log('');

    // Perform parallel research using multiple MCP tools
    const [webResults, contextResults] = await Promise.all([
      webSearch.search(query, { numResults: options.limit || 5 }),
      context7.query(query, { maxExamples: 3 })
    ]);

    // Display web search results
    if (webResults && webResults.length > 0) {
      console.log(chalk.bold.yellow('🌐 Web Search Results:'));
      webResults.forEach((result, index) => {
        console.log(`${index + 1}. ${chalk.cyan(result.title)}`);
        console.log(`   ${chalk.gray(result.url)}`);
        console.log(`   ${result.snippet}`);
        if (result.relevance) {
          console.log(`   ${chalk.green('Relevance: ' + Math.round(result.relevance * 100) + '%')}`);
        }
        console.log('');
      });
    }

    // Display library/API context results
    if (contextResults && (contextResults.libraries?.length > 0 || contextResults.apis?.length > 0)) {
      console.log(chalk.bold.yellow('📚 Library & API Context:'));

      // Libraries
      if (contextResults.libraries && contextResults.libraries.length > 0) {
        console.log(chalk.bold('Libraries:'));
        contextResults.libraries.forEach((lib, index) => {
          console.log(`${index + 1}. ${chalk.cyan(lib.name)} v${lib.version}`);
          console.log(`   ${lib.description}`);
          if (lib.docs_url) {
            console.log(`   ${chalk.gray('Docs: ' + lib.docs_url)}`);
          }
          if (lib.relevance) {
            console.log(`   ${chalk.green('Relevance: ' + Math.round(lib.relevance * 100) + '%')}`);
          }
          if (lib.examples && lib.examples.length > 0 && !options.brief) {
            console.log(`   ${chalk.gray('Example:')} ${lib.examples[0]}`);
          }
          console.log('');
        });
      }

      // APIs
      if (contextResults.apis && contextResults.apis.length > 0) {
        console.log(chalk.bold('APIs & Patterns:'));
        contextResults.apis.forEach((api, index) => {
          console.log(`${index + 1}. ${chalk.cyan(api.name)}`);
          console.log(`   ${api.description}`);
          if (api.relevance) {
            console.log(`   ${chalk.green('Relevance: ' + Math.round(api.relevance * 100) + '%')}`);
          }
          if (api.best_practices && api.best_practices.length > 0 && !options.brief) {
            console.log(`   ${chalk.gray('Best Practice:')} ${api.best_practices[0]}`);
          }
          console.log('');
        });
      }
    }

    // Research summary
    const totalResults = (webResults?.length || 0) + (contextResults?.libraries?.length || 0) + (contextResults?.apis?.length || 0);
    console.log(chalk.bold.green(`✅ Research complete - ${totalResults} results found`));

    // Usage guidance
    if (!options.brief) {
      console.log('\n' + chalk.gray('💡 Research Commands:'));
      console.log(`   ${chalk.cyan('/codem-research "query" --brief')} - Concise results`);
      console.log(`   ${chalk.cyan('/codem-research "query" --limit 10')} - More results`);
      console.log(`   ${chalk.cyan('/codem-lookup library-name')} - Focused library research`);
    }

  } catch (error) {
    logger.error('Research failed', error);
    console.log(chalk.red(`\n❌ Research failed: ${error.message}`));
    console.log(chalk.gray('This may be due to MCP tool connectivity issues.'));
    console.log(chalk.gray('Try again or use --global for basic web search.'));
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-research')
  .description('Research using MCP tools (WebSearch + Context7)')
  .argument('<query>', 'Research query or topic')
  .option('-b, --brief', 'Show brief results without examples')
  .option('-l, --limit <number>', 'Limit number of results (default: 5)', parseInt)
  .option('-g, --global', 'Allow research outside CodeMaestro projects')
  .action(researchCommand);

// Export for testing
module.exports = {
  researchCommand,
  MockContext7,
  MockWebSearch
};

// Only parse if this file is run directly
if (require.main === module) {
  program.parse();
}