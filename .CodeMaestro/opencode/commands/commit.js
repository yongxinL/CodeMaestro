#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');
const gitIntegration = require('../lib/git');

/**
 * Generate and execute CodeMaestro-style git commits
 */
async function commitCommand(options) {
  try {
    // Check if we're in a CodeMaestro project
    const isCodeMaestroProject = await projectDetector.isCodeMaestroProject();
    if (!isCodeMaestroProject) {
      logger.error('Not a CodeMaestro project. Run `/codem-init` first.');
      return;
    }

    // Check git status
    const gitStatus = await gitIntegration.getStatus();
    if (!gitStatus.isRepo) {
      logger.error('Not a git repository. Initialize git first.');
      return;
    }

    if (!gitStatus.modified && !options.amend) {
      logger.warn('No changes to commit. Stage some files first.');
      console.log(chalk.blue('To stage files:'));
      console.log('  git add <files>');
      console.log('  git add .  # stage all changes');
      return;
    }

    if (gitStatus.staged.length === 0 && !options.amend) {
      logger.warn('No staged changes. Stage some files first.');
      console.log(chalk.blue('To see changes: git status'));
      console.log(chalk.blue('To stage files: git add <files>'));
      return;
    }

    logger.info('Analyzing changes for commit message generation...');

    // Generate commit message
    const commitMessage = await gitIntegration.generateCommitMessage({
      description: options.message
    });

    // Show analysis and generated message
    const diffAnalysis = await gitIntegration.analyzeDiff();
    const recentCommits = await gitIntegration.getRecentCommits(3);

    console.log(chalk.bold.blue('📊 Changes Analysis:'));
    console.log(`  Files staged: ${gitStatus.staged.length}`);
    console.log(`  Additions: ${diffAnalysis.additions || 0}`);
    console.log(`  Deletions: ${diffAnalysis.deletions || 0}`);
    if (diffAnalysis.fileTypes?.length > 0) {
      console.log(`  File types: ${diffAnalysis.fileTypes.join(', ')}`);
    }

    console.log('\n' + chalk.bold.blue('💬 Generated Commit Message:'));
    console.log(chalk.green('─'.repeat(50)));
    commitMessage.split('\n').forEach(line => {
      console.log(chalk.green(`  ${line}`));
    });
    console.log(chalk.green('─'.repeat(50)));

    // Show recent commits for context
    if (recentCommits.length > 0) {
      console.log('\n' + chalk.bold.blue('📚 Recent Commits:'));
      recentCommits.slice(0, 3).forEach(commit => {
        console.log(`  ${chalk.gray(commit.hash.substring(0, 7))} ${commit.message}`);
      });
    }

    // Handle different execution modes
    if (options.auto) {
      // Auto-commit without confirmation
      logger.info('Auto-committing with generated message...');
      const success = await gitIntegration.commit(commitMessage, { amend: options.amend });
      if (success) {
        logger.success('Commit created successfully!');
        console.log(chalk.green(`Committed with message: ${commitMessage.split('\n')[0]}`));
      }
    } else if (options.preview) {
      // Just show the message, don't commit
      logger.info('Preview mode - no commit created');
    } else {
      // Interactive mode - ask for confirmation
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Create commit with this message?',
          default: true
        },
        {
          type: 'confirm',
          name: 'edit',
          message: 'Edit commit message?',
          default: false,
          when: (answers) => answers.confirm
        },
        {
          type: 'editor',
          name: 'customMessage',
          message: 'Edit commit message:',
          default: commitMessage,
          when: (answers) => answers.edit
        }
      ]);

      if (answers.confirm) {
        const finalMessage = answers.customMessage || commitMessage;
        logger.info('Creating commit...');
        const success = await gitIntegration.commit(finalMessage, { amend: options.amend });
        if (success) {
          logger.success('Commit created successfully!');
          console.log(chalk.green(`Committed: ${finalMessage.split('\n')[0]}`));
        }
      } else {
        logger.info('Commit cancelled');
      }
    }

  } catch (error) {
    logger.error('Commit command failed', error);
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-commit')
  .description('Generate and execute CodeMaestro-style git commits')
  .option('-m, --message <message>', 'Custom commit message description')
  .option('-a, --auto', 'Auto-commit without confirmation')
  .option('-p, --preview', 'Show generated message without committing')
  .option('--amend', 'Amend the last commit')
  .option('-v, --verbose', 'Show detailed analysis')
  .action(commitCommand);

program.parse();