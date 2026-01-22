#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Initialize CodeMaestro project for OpenCode
 */
async function initCommand(options) {
  try {
    logger.info('Initializing CodeMaestro project for OpenCode...');

    // Check if already initialized
    const isInitialized = await projectDetector.isCodeMaestroProject();
    if (isInitialized && !options.force) {
      logger.warn('CodeMaestro project already exists. Use --force to reinitialize.');
      return;
    }

    const projectRoot = process.cwd();

    // Interactive setup
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: path.basename(projectRoot)
      },
      {
        type: 'list',
        name: 'skillTier',
        message: 'Your development skill tier:',
        choices: [
          { name: 'Beginner - Full guidance and explanations', value: 'beginner' },
          { name: 'Advanced - Concise guidance', value: 'advanced' },
          { name: 'Ninja - Minimal guidance, maximum efficiency', value: 'ninja' }
        ],
        default: 'advanced'
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Project type:',
        choices: [
          { name: 'Web Application', value: 'web' },
          { name: 'Mobile App', value: 'mobile' },
          { name: 'API/Service', value: 'api' },
          { name: 'Desktop Application', value: 'desktop' },
          { name: 'Library/Package', value: 'library' },
          { name: 'Other', value: 'other' }
        ]
      }
    ]);

    // Create directory structure
    const spinner = logger.startSpinner('Creating project structure...');

    const dirs = [
      '.CodeMaestro/config',
      '.CodeMaestro/prompts',
      '.CodeMaestro/docs',
      '.CodeMaestro/opencode',
      'docs/specifications',
      'docs/architecture',
      'docs/implementation',
      'docs/verification',
      'docs/release',
      'docs/kb',
      'docs/portfolio'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(projectRoot, dir));
    }

    // Copy framework files from the CodeMaestro source
    const sourceDir = path.join(__dirname, '../../'); // .CodeMaestro directory
    const targetDir = path.join(projectRoot, '.CodeMaestro');

    // Copy essential framework files
    const filesToCopy = [
      'config',
      'prompts',
      'docs'
    ];

    for (const file of filesToCopy) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, targetPath);
      }
    }

    // Create OpenCode-specific configuration
    const opencodeConfig = {
      version: '0.1.0',
      project: {
        name: answers.projectName,
        type: answers.projectType,
        skillTier: answers.skillTier,
        initialized: new Date().toISOString()
      },
      opencode: {
        enabled: true,
        commands: [
          'init',
          'status',
          'commit',
          'kb',
          'phase',
          'next',
          'tree',
          'handoff'
        ]
      }
    };

    await fs.writeJson(
      path.join(targetDir, 'config/opencode.json'),
      opencodeConfig,
      { spaces: 2 }
    );

    // Create initial recovery checkpoint
    const checkpointContent = `# CodeMaestro Recovery Checkpoint
## OpenCode Integration

**Project:** ${answers.projectName}
**Type:** ${answers.projectType}
**Skill Tier:** ${answers.skillTier}
**Initialized:** ${new Date().toISOString()}

**Current State:**
- Phase: 1 (Requirements)
- Role: Product Manager
- Task: Initial project setup
- Status: Ready for Phase 1

**Next Steps:**
1. Run \`/codem-status\` to see current state
2. Run \`/codem-next\` to start Phase 1
3. Begin requirements gathering

**Framework Version:** 1.0.0
**OpenCode Integration:** v0.1.0
`;

    await fs.writeFile(
      path.join(projectRoot, 'docs/implementation/.recovery-checkpoint.md'),
      checkpointContent
    );

    // Create .gitignore entries
    const gitignorePath = path.join(projectRoot, '.gitignore');
    let gitignoreContent = '';

    if (await fs.pathExists(gitignorePath)) {
      gitignoreContent = await fs.readFile(gitignorePath, 'utf8');
    }

    const codemEntries = [
      '# CodeMaestro framework files',
      '.CodeMaestro/opencode/node_modules/',
      '.CodeMaestro/opencode/*.log',
      '',
      '# Optional: Exclude entire framework after delivery',
      '# .CodeMaestro/',
      '# CLAUDE.md'
    ];

    const entriesToAdd = codemEntries.filter(entry =>
      !gitignoreContent.includes(entry.replace('# ', ''))
    );

    if (entriesToAdd.length > 0) {
      gitignoreContent += '\n' + entriesToAdd.join('\n') + '\n';
      await fs.writeFile(gitignorePath, gitignoreContent);
    }

    spinner.succeed('Project structure created');

    // Success message
    logger.success(`CodeMaestro project "${answers.projectName}" initialized for OpenCode!`);

    console.log(chalk.blue(`
🎯 Next Steps:
1. Run ${chalk.cyan('/codem-status')} to see current project state
2. Run ${chalk.cyan('/codem-next')} to start Phase 1 (Requirements)
3. Begin gathering project requirements

📚 Available Commands:
• ${chalk.cyan('/codem-status')} - Show project status
• ${chalk.cyan('/codem-commit')} - Generate CodeMaestro-style commits
• ${chalk.cyan('/codem-kb')} - Knowledge base management
• ${chalk.cyan('/codem-phase [N]')} - Navigate to specific phase

📖 Documentation: See .CodeMaestro/docs/ for framework guides
    `));

  } catch (error) {
    logger.error('Failed to initialize CodeMaestro project', error);
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-init')
  .description('Initialize CodeMaestro project for OpenCode')
  .option('-f, --force', 'Force reinitialization even if project exists')
  .action(initCommand);

program.parse();