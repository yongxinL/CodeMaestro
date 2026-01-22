#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const config = require('../lib/config');
const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Show CodeMaestro project status
 */
async function statusCommand(options) {
  try {
    logger.info('Checking CodeMaestro project status...');

    const status = await projectDetector.getProjectStatus();

    // Handle JSON output
    if (options.json) {
      console.log(JSON.stringify(status, null, 2));
      return;
    }

    if (!status.initialized) {
      logger.error('Not a CodeMaestro project. Run `/codem-init` first.');
      console.log(chalk.blue(`
💡 To initialize a CodeMaestro project:
   ${chalk.cyan('/codem-init')}
      `));
      return;
    }

    // Display project header
    console.log(chalk.bold.blue('🚀 CodeMaestro Project Status'));
    console.log('═'.repeat(50));

    // Project info
    const projectConfig = await config.load();
    const projectInfo = projectConfig.project || {};

    console.log(chalk.bold('📁 Project:'), projectInfo.name || 'Unknown');
    console.log(chalk.bold('🏷️  Type:'), projectInfo.type || 'Unknown');
    console.log(chalk.bold('🎯 Skill Tier:'), projectInfo.skillTier || 'Unknown');

    // Phase information
    console.log('\n' + chalk.bold('📊 Current Phase:'));
    if (status.phase) {
      const phaseInfo = projectDetector.getPhaseInfo(status.phase);
      if (phaseInfo) {
        console.log(`  Phase ${status.phase}: ${chalk.cyan(phaseInfo.name)}`);
        console.log(`  ${phaseInfo.description}`);
      } else {
        console.log(`  Phase ${status.phase}: Unknown phase`);
      }
    } else {
      console.log('  ' + chalk.yellow('No active phase detected'));
    }

    // Role and task
    if (status.role) {
      console.log('\n' + chalk.bold('👤 Current Role:'), chalk.green(status.role));
    }

    if (status.task) {
      console.log(chalk.bold('🎯 Current Task:'), status.task);
    }

    // Project health
    console.log('\n' + chalk.bold('🏥 Project Health:'));

    if (status.valid) {
      console.log('  ' + chalk.green('✅ Project structure is valid'));
    } else {
      console.log('  ' + chalk.red('❌ Project structure has issues'));
    }

    // Verbose output
    if (options.verbose) {
      console.log('\n' + chalk.bold('📋 Detailed Information:'));
      console.log(`  Initialized: ${status.initialized}`);
      console.log(`  Current Phase: ${status.phase || 'None'}`);
      console.log(`  Current Role: ${status.role || 'None'}`);
      console.log(`  Current Task: ${status.task || 'None'}`);
      console.log(`  Valid Structure: ${status.valid}`);
      console.log(`  Issues Count: ${status.issues ? status.issues.length : 0}`);
      console.log(`  Warnings Count: ${status.warnings ? status.warnings.length : 0}`);
    }

    // Issues and warnings
    if (status.issues && status.issues.length > 0) {
      console.log('\n' + chalk.bold.red('🚨 Issues:'));
      status.issues.forEach(issue => {
        console.log('  • ' + chalk.red(issue));
      });
    }

    if (status.warnings && status.warnings.length > 0) {
      console.log('\n' + chalk.bold.yellow('⚠️  Warnings:'));
      status.warnings.forEach(warning => {
        console.log('  • ' + chalk.yellow(warning));
      });
    }

    // Available actions
    console.log('\n' + chalk.bold('🎮 Available Actions:'));

    if (status.phase) {
      console.log(`  • ${chalk.cyan('/codem-next')} - Continue to next task`);
      console.log(`  • ${chalk.cyan('/codem-phase [1-5]')} - Jump to specific phase`);
    } else {
      console.log(`  • ${chalk.cyan('/codem-phase 1')} - Start Phase 1 (Requirements)`);
    }

    console.log(`  • ${chalk.cyan('/codem-commit')} - Generate commit with CodeMaestro conventions`);
    console.log(`  • ${chalk.cyan('/codem-kb')} - Knowledge base management`);
    console.log(`  • ${chalk.cyan('/codem-tree')} - View task DAG`);

    // Footer
    console.log('\n' + '═'.repeat(50));
    console.log(chalk.gray('CodeMaestro v1.0.0 | OpenCode Integration v0.1.0'));

  } catch (error) {
    logger.error('Failed to get project status', error);
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-status')
  .description('Show CodeMaestro project status')
  .option('-v, --verbose', 'Show detailed information')
  .option('-j, --json', 'Output status as JSON')
  .action(statusCommand);

program.parse();