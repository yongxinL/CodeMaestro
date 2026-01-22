#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Mock Context7 implementation for library lookup
 * In production, this would be replaced with actual MCP Context7 integration
 */
class MockContext7Lookup {
  async lookupLibrary(libraryName) {
    // Simulate library lookup with detailed information
    const mockLibraries = {
      'express': {
        id: '/expressjs/express',
        name: 'Express.js',
        description: 'Fast, unopinionated, minimalist web framework for Node.js',
        version: '4.18.2',
        license: 'MIT',
        homepage: 'https://expressjs.com/',
        repository: 'https://github.com/expressjs/express',
        downloads: '25M/month',
        stars: 62000,
        lastUpdated: '2024-01-15',
        maintainers: ['Express.js Team'],
        keywords: ['express', 'framework', 'web', 'http', 'api'],
        compatibility: {
          node: '>= 0.10.0',
          npm: '>= 1.0.0'
        },
        installation: 'npm install express',
        basicUsage: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
        commonPatterns: [
          'Middleware setup',
          'Route handlers',
          'Error handling',
          'Static file serving'
        ],
        bestPractices: [
          'Use middleware for cross-cutting concerns',
          'Implement proper error handling',
          'Use environment variables for configuration',
          'Validate input data'
        ],
        relatedLibraries: ['cors', 'helmet', 'morgan', 'body-parser']
      },
      'react': {
        id: '/facebook/react',
        name: 'React',
        description: 'A JavaScript library for building user interfaces',
        version: '18.2.0',
        license: 'MIT',
        homepage: 'https://reactjs.org/',
        repository: 'https://github.com/facebook/react',
        downloads: '18M/month',
        stars: 215000,
        lastUpdated: '2024-01-10',
        maintainers: ['Meta Open Source'],
        keywords: ['react', 'ui', 'frontend', 'javascript', 'jsx'],
        compatibility: {
          node: '>= 16.14.0',
          npm: '>= 7.0.0'
        },
        installation: 'npm install react react-dom',
        basicUsage: `import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Hello, world!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
        commonPatterns: [
          'Component composition',
          'State management',
          'Event handling',
          'Lifecycle methods'
        ],
        bestPractices: [
          'Use functional components with hooks',
          'Implement proper key props for lists',
          'Avoid direct DOM manipulation',
          'Use controlled components for forms'
        ],
        relatedLibraries: ['react-router', 'redux', 'styled-components', 'axios']
      },
      'lodash': {
        id: '/lodash/lodash',
        name: 'Lodash',
        description: 'A modern JavaScript utility library delivering modularity, performance & extras',
        version: '4.17.21',
        license: 'MIT',
        homepage: 'https://lodash.com/',
        repository: 'https://github.com/lodash/lodash',
        downloads: '45M/month',
        stars: 57000,
        lastUpdated: '2024-01-01',
        maintainers: ['Lodash Team'],
        keywords: ['lodash', 'utility', 'functional', 'server', 'client'],
        compatibility: {
          node: '>= 4.0.0',
          npm: '>= 2.0.0'
        },
        installation: 'npm install lodash',
        basicUsage: `const _ = require('lodash');

const users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];

// Sort by age
const sorted = _.sortBy(users, 'age');
console.log(sorted);

// Group by user
const grouped = _.groupBy(users, 'user');
console.log(grouped);`,
        commonPatterns: [
          'Array manipulation',
          'Object utilities',
          'Function composition',
          'Collection operations'
        ],
        bestPractices: [
          'Import only needed functions for better tree-shaking',
          'Use native methods when possible for performance',
          'Chain operations for complex data transformations',
          'Consider lodash/fp for functional programming'
        ],
        relatedLibraries: ['underscore', 'ramda', 'immutable']
      }
    };

    // Fuzzy matching for library names
    const library = mockLibraries[libraryName.toLowerCase()];
    if (!library) {
      // Try partial matching
      const matches = Object.keys(mockLibraries).filter(key =>
        key.includes(libraryName.toLowerCase()) ||
        libraryName.toLowerCase().includes(key)
      );

      if (matches.length > 0) {
        return mockLibraries[matches[0]];
      }

      throw new Error(`Library '${libraryName}' not found. Try: express, react, lodash`);
    }

    return library;
  }

  async findRelatedLibraries(libraryName) {
    // Simulate finding related libraries
    const related = {
      'express': ['cors', 'helmet', 'morgan', 'compression'],
      'react': ['react-router-dom', 'redux', 'styled-components', 'axios'],
      'lodash': ['underscore', 'ramda', 'immutable', 'lazy.js']
    };

    return related[libraryName.toLowerCase()] || [];
  }
}

// Initialize mock Context7
const context7 = new MockContext7Lookup();

/**
 * Lookup library information using Context7
 */
async function lookupCommand(libraryName, options) {
  try {
    logger.info(`Looking up library: ${libraryName}`);

    // Check if this is a CodeMaestro project (optional for lookup)
    const isCodeMaestroProject = await projectDetector.isCodeMaestroProject();
    if (!isCodeMaestroProject && !options.global) {
      console.log(chalk.yellow('⚠️  Not in a CodeMaestro project. Use --global for general lookup.'));
      console.log('');
    }

    console.log(chalk.bold.blue('📚 Library Lookup'));
    console.log('═'.repeat(60));
    console.log(chalk.bold('Library:'), libraryName);
    console.log('');

    // Lookup library information
    const library = await context7.lookupLibrary(libraryName);

    // Display library information
    console.log(chalk.bold.cyan(library.name), chalk.gray(`v${library.version}`));
    console.log('═'.repeat(40));
    console.log(library.description);
    console.log('');

    // Basic information
    console.log(chalk.bold('📦 Package Info:'));
    console.log(`   License: ${chalk.green(library.license)}`);
    console.log(`   Downloads: ${chalk.yellow(library.downloads)}`);
    console.log(`   Stars: ${chalk.yellow(library.stars.toLocaleString())}`);
    console.log(`   Last Updated: ${library.lastUpdated}`);
    if (library.homepage) {
      console.log(`   Homepage: ${chalk.blue(library.homepage)}`);
    }
    console.log('');

    // Installation
    console.log(chalk.bold('🔧 Installation:'));
    console.log(`   ${chalk.cyan(library.installation)}`);
    console.log('');

    // Compatibility
    if (!options.brief) {
      console.log(chalk.bold('⚙️  Compatibility:'));
      if (library.compatibility.node) {
        console.log(`   Node.js: ${chalk.green(library.compatibility.node)}`);
      }
      if (library.compatibility.npm) {
        console.log(`   NPM: ${chalk.green(library.compatibility.npm)}`);
      }
      console.log('');
    }

    // Basic usage
    if (!options.brief) {
      console.log(chalk.bold('💡 Basic Usage:'));
      console.log(chalk.gray('```javascript'));
      console.log(library.basicUsage);
      console.log(chalk.gray('```'));
      console.log('');
    }

    // Common patterns
    if (!options.brief && library.commonPatterns?.length > 0) {
      console.log(chalk.bold('🔄 Common Patterns:'));
      library.commonPatterns.forEach(pattern => {
        console.log(`   • ${pattern}`);
      });
      console.log('');
    }

    // Best practices
    if (!options.brief && library.bestPractices?.length > 0) {
      console.log(chalk.bold('✅ Best Practices:'));
      library.bestPractices.forEach(practice => {
        console.log(`   • ${practice}`);
      });
      console.log('');
    }

    // Related libraries
    if (!options.brief && library.relatedLibraries?.length > 0) {
      console.log(chalk.bold('🔗 Related Libraries:'));
      const relatedList = library.relatedLibraries.slice(0, 5).join(', ');
      console.log(`   ${chalk.cyan(relatedList)}`);
      if (library.relatedLibraries.length > 5) {
        console.log(`   ${chalk.gray(`... and ${library.relatedLibraries.length - 5} more`)}`);
      }
      console.log('');
    }

    console.log(chalk.bold.green('✅ Library lookup complete'));

    // Usage guidance
    if (!options.brief) {
      console.log('\n' + chalk.gray('💡 Lookup Commands:'));
      console.log(`   ${chalk.cyan('/codem-lookup library --brief')} - Concise info`);
      console.log(`   ${chalk.cyan('/codem-research "topic"')} - General research`);
    }

  } catch (error) {
    logger.error('Library lookup failed', error);
    console.log(chalk.red(`\n❌ Library lookup failed: ${error.message}`));

    if (error.message.includes('not found')) {
      console.log(chalk.gray('\nTry popular libraries: express, react, lodash, vue, angular'));
      console.log(chalk.gray('Or use /codem-research for general queries'));
    } else {
      console.log(chalk.gray('This may be due to MCP tool connectivity issues.'));
    }

    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-lookup')
  .description('Lookup library information using Context7')
  .argument('<library>', 'Library name to lookup')
  .option('-b, --brief', 'Show brief library information')
  .option('-g, --global', 'Allow lookup outside CodeMaestro projects')
  .action(lookupCommand);

// Export for testing
module.exports = {
  lookupCommand,
  MockContext7Lookup
};

// Only parse if this file is run directly
if (require.main === module) {
  program.parse();
}