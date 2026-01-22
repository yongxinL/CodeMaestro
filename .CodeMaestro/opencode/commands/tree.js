#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Get all tasks for a phase
 */
function getPhaseTasks(phaseNumber) {
  const phaseTasks = {
    1: [
      'Analyze project requirements and create specification document',
      'Perform competitive analysis and market research',
      'Define acceptance criteria and success metrics',
      'Document functional and non-functional requirements'
    ],
    2: [
      'Design system architecture and component structure',
      'Create technical blueprint and design documents',
      'Define task dependencies and create project timeline',
      'Estimate token budget and resource requirements'
    ],
    3: [
      'Implement core functionality and business logic',
      'Write production-quality code following patterns',
      'Create comprehensive tests and documentation',
      'Track actual effort vs planning estimates'
    ],
    4: [
      'Collect evidence package and test results',
      'Perform security scanning and performance testing',
      'Execute acceptance criteria validation',
      'Make GO/NO-GO decision for release'
    ],
    5: [
      'Coordinate final release preparation',
      'Capture lessons learned and update knowledge base',
      'Document organizational learning and improvements',
      'Execute deployment and monitor initial performance'
    ]
  };

  return phaseTasks[phaseNumber] || [];
}

/**
 * Get phase information
 */
function getPhaseInfo(phaseNumber) {
  const phases = {
    1: { name: 'Requirements', role: 'Product Manager', description: 'Define specifications' },
    2: { name: 'Planning', role: 'Software Architect', description: 'Design architecture' },
    3: { name: 'Implementation', role: 'Senior Developer', description: 'Build code' },
    4: { name: 'Verification', role: 'QA Lead', description: 'Test and validate' },
    5: { name: 'Release', role: 'Release Manager', description: 'Deploy and release' }
  };

  return phases[phaseNumber];
}

/**
 * Create a visual tree representation of the workflow
 */
function createWorkflowTree(currentPhase, currentTask) {
  const lines = [];
  const width = 70;

  // Header
  lines.push(chalk.bold.blue('🌳 CodeMaestro Project Workflow'));
  lines.push('═'.repeat(width));
  lines.push('');

  // Phase overview
  for (let phase = 1; phase <= 5; phase++) {
    const phaseInfo = getPhaseInfo(phase);
    const isCurrentPhase = currentPhase === phase;
    const isCompletedPhase = currentPhase > phase;
    const isFuturePhase = currentPhase < phase;

    let phasePrefix = '  ';
    let phaseStyle = chalk.gray;

    if (isCompletedPhase) {
      phasePrefix = '✅';
      phaseStyle = chalk.green;
    } else if (isCurrentPhase) {
      phasePrefix = '🎯';
      phaseStyle = chalk.yellow.bold;
    } else if (isFuturePhase) {
      phasePrefix = '⏳';
      phaseStyle = chalk.gray;
    }

    const phaseLine = `${phasePrefix} Phase ${phase}: ${phaseStyle(phaseInfo.name)}`;
    const roleLine = `     ${chalk.cyan(phaseInfo.role)} - ${phaseInfo.description}`;

    lines.push(phaseLine);
    lines.push(roleLine);

    // Show tasks for current phase
    if (isCurrentPhase) {
      const tasks = getPhaseTasks(phase);
      tasks.forEach((task, index) => {
        const isCurrentTask = task === currentTask;
        const isCompletedTask = tasks.indexOf(currentTask) > index;

        let taskPrefix = '       ';
        let taskStyle = chalk.gray;

        if (isCompletedTask) {
          taskPrefix = '       ✅';
          taskStyle = chalk.green;
        } else if (isCurrentTask) {
          taskPrefix = '       🎯';
          taskStyle = chalk.yellow.bold;
        } else {
          taskPrefix = '       ○';
          taskStyle = chalk.gray;
        }

        const taskText = task.length > 50 ? task.substring(0, 47) + '...' : task;
        lines.push(`${taskPrefix} ${taskStyle(taskText)}`);
      });
    }

    // Add spacing between phases
    if (phase < 5) {
      lines.push('');
    }
  }

  lines.push('');
  lines.push('═'.repeat(width));

  return lines.join('\n');
}

/**
 * Create a compact summary view
 */
function createCompactView(currentPhase, currentTask) {
  const lines = [];
  const width = 60;

  lines.push(chalk.bold.blue('📊 Workflow Progress'));
  lines.push('═'.repeat(width));

  // Progress bar
  const progress = ((currentPhase - 1) / 4) * 100;
  const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
  lines.push(`Progress: [${chalk.green(progressBar)}] ${progress.toFixed(0)}%`);
  lines.push('');

  // Current status
  const phaseInfo = getPhaseInfo(currentPhase);
  lines.push(chalk.bold('Current Phase:'), `${currentPhase}/5 - ${chalk.cyan(phaseInfo.name)}`);
  lines.push(chalk.bold('Current Role:'), chalk.green(phaseInfo.role));
  lines.push(chalk.bold('Current Task:'), currentTask);
  lines.push('');

  // Next steps
  lines.push(chalk.bold('Next Actions:'));
  if (currentPhase < 5) {
    const nextPhaseInfo = getPhaseInfo(currentPhase + 1);
    lines.push(`• Complete Phase ${currentPhase} → Advance to Phase ${currentPhase + 1} (${nextPhaseInfo.name})`);
  } else {
    lines.push('• 🎉 Project complete! All phases finished.');
  }
  lines.push('• Use `/codem-next` to continue task-by-task');
  lines.push('• Use `/codem-phase [1-5]` to jump to any phase');

  lines.push('');
  lines.push('═'.repeat(width));

  return lines.join('\n');
}

/**
 * Display workflow tree
 */
async function treeCommand(options) {
  try {
    logger.info('Displaying CodeMaestro workflow tree...');

    // Check if this is a CodeMaestro project
    if (!await projectDetector.isCodeMaestroProject()) {
      logger.error('Not a CodeMaestro project. Run `/codem-init` first.');
      console.log(chalk.blue(`
💡 To initialize a CodeMaestro project:
   ${chalk.cyan('/codem-init')}
      `));
      return;
    }

    // Get current status
    const status = await projectDetector.getProjectStatus();

    if (!status.phase) {
      console.log(chalk.yellow('No active phase detected. Use `/codem-phase 1` to start.'));
      return;
    }

    // Display based on format option
    if (options.compact) {
      console.log(createCompactView(status.phase, status.task));
    } else {
      console.log(createWorkflowTree(status.phase, status.task));
    }

    // Footer with navigation tips
    console.log(chalk.gray('\n💡 Navigation Commands:'));
    console.log(`   ${chalk.cyan('/codem-next')} - Continue to next task`);
    console.log(`   ${chalk.cyan('/codem-phase [1-5]')} - Jump to specific phase`);
    console.log(`   ${chalk.cyan('/codem-status')} - Show current status`);
    console.log(`   ${chalk.cyan('/codem-tree --compact')} - Compact view`);

  } catch (error) {
    logger.error('Failed to display workflow tree', error);
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-tree')
  .description('Display CodeMaestro workflow tree and task dependencies')
  .option('-c, --compact', 'Show compact progress view instead of full tree')
  .action(treeCommand);

// Export for testing
module.exports = {
  getPhaseTasks,
  getPhaseInfo,
  createWorkflowTree,
  createCompactView,
  treeCommand
};

// Only parse if this file is run directly
if (require.main === module) {
  program.parse();
}