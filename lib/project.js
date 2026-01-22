const fs = require('fs-extra');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

/**
 * Project detection and validation utilities
 */
class ProjectDetector {
  /**
   * Check if current directory is a CodeMaestro project
   * @returns {boolean} True if CodeMaestro project
   */
  async isCodeMaestroProject() {
    try {
      const projectConfig = await config.load();
      return !!projectConfig;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate project structure and required files
   * @returns {Object} Validation result with status and issues
   */
  async validateProject() {
    const issues = [];
    const warnings = [];

    try {
      const projectConfig = await config.load();

      // Check required directories
      const requiredDirs = [
        projectConfig.paths.codemaestro_dir,
        projectConfig.paths.knowledge_base,
        projectConfig.paths.specifications,
        projectConfig.paths.architecture
      ];

      for (const dir of requiredDirs) {
        if (!await fs.pathExists(dir)) {
          issues.push(`Missing required directory: ${path.relative(config.getProjectRoot(), dir)}`);
        }
      }

      // Check for recovery checkpoint
      const checkpointPath = projectConfig.paths.recovery_checkpoint;
      if (!await fs.pathExists(checkpointPath)) {
        warnings.push('No recovery checkpoint found - project may not be initialized');
      }

      // Check for basic configuration files
      const configFiles = [
        path.join(projectConfig.paths.codemaestro_dir, 'prompts/00-core.md'),
        path.join(projectConfig.paths.codemaestro_dir, 'config/constraints-reference.md')
      ];

      for (const file of configFiles) {
        if (!await fs.pathExists(file)) {
          issues.push(`Missing configuration file: ${path.relative(config.getProjectRoot(), file)}`);
        }
      }

      return {
        valid: issues.length === 0,
        issues,
        warnings,
        config: projectConfig
      };

    } catch (error) {
      return {
        valid: false,
        issues: [`Configuration error: ${error.message}`],
        warnings: [],
        config: null
      };
    }
  }

  /**
   * Get current project phase from recovery checkpoint
   * @returns {Object|null} Current phase info or null
   */
  async getCurrentPhase() {
    try {
      const projectConfig = await config.load();
      const checkpointPath = projectConfig.paths.recovery_checkpoint;

      if (!await fs.pathExists(checkpointPath)) {
        return null;
      }

      const content = await fs.readFile(checkpointPath, 'utf8');

      // Parse phase information from checkpoint
      const phaseMatch = content.match(/\*\*Phase:\*\*\s*(\d+)/i);
      const roleMatch = content.match(/\*\*Role:\*\*\s*([^*\n]+)/i);
      const taskMatch = content.match(/\*\*Current Task:\*\*\s*([^*\n]+)/i);

      return {
        phase: phaseMatch ? parseInt(phaseMatch[1]) : null,
        role: roleMatch ? roleMatch[1].trim() : null,
        task: taskMatch ? taskMatch[1].trim() : null,
        checkpointPath
      };

    } catch (error) {
      logger.debug(`Error reading checkpoint: ${error.message}`);
      return null;
    }
  }

  /**
   * Get project status summary
   * @returns {Object} Project status information
   */
  async getProjectStatus() {
    const isValid = await this.isCodeMaestroProject();

    if (!isValid) {
      return {
        initialized: false,
        phase: null,
        role: null,
        task: null,
        issues: ['Not a CodeMaestro project']
      };
    }

    const validation = await this.validateProject();
    const phaseInfo = await this.getCurrentPhase();

    return {
      initialized: true,
      phase: phaseInfo?.phase || null,
      role: phaseInfo?.role || null,
      task: phaseInfo?.task || null,
      valid: validation.valid,
      issues: validation.issues,
      warnings: validation.warnings
    };
  }

  /**
   * List available phases
   * @returns {Array} List of phases with descriptions
   */
  getAvailablePhases() {
    return [
      { number: 1, name: 'Requirements', description: 'Product Manager - Define specifications' },
      { number: 2, name: 'Planning', description: 'Software Architect - Design architecture' },
      { number: 3, name: 'Implementation', description: 'Senior Developer - Build code' },
      { number: 4, name: 'Verification', description: 'QA Lead - Test and validate' },
      { number: 5, name: 'Release', description: 'Release Manager - Deploy and release' }
    ];
  }

  /**
   * Get phase information by number
   * @param {number} phaseNumber - Phase number (1-5)
   * @returns {Object|null} Phase information or null
   */
  getPhaseInfo(phaseNumber) {
    return this.getAvailablePhases().find(phase => phase.number === phaseNumber) || null;
  }

  /**
   * Update the recovery checkpoint with current project state
   * @param {Object} update - Update object with phase, role, task, etc.
   * @returns {boolean} Success status
   */
  async updateRecoveryCheckpoint(update = {}) {
    try {
      const projectConfig = await config.load();
      const checkpointPath = projectConfig.paths.recovery_checkpoint;

      // Get current checkpoint content or create default
      let checkpointContent = '';
      try {
        checkpointContent = await fs.readFile(checkpointPath, 'utf8');
      } catch (error) {
        // Create default checkpoint if it doesn't exist
        checkpointContent = `# Recovery Checkpoint

> This file is updated automatically at phase transitions. Use \`/recover\` command to load.

## Session Information
- **Last Updated**: ${new Date().toISOString()}
- **Current Phase**: ${update.phase || 1}
- **Current Role**: ${update.role || 'Product Manager'}
- **Current Task**: ${update.task || 'Analyze project requirements and create specification document'}

## Phase Progress
${this.getAvailablePhases().map(phase => {
  const status = phase.number < (update.phase || 1) ? 'Complete' :
                 phase.number === (update.phase || 1) ? 'In Progress' : 'Not Started';
  return `- Phase ${phase.number}: ${status}`;
}).join('\n')}

## Active Context
${update.context || '[Current module/feature context]'}

## Completed Milestones
${update.milestones ? update.milestones.map(m => `- ${m}`).join('\n') : '[Auto-populated list of completed milestones]'}

## Next Actions
${update.nextActions ? update.nextActions.map(a => `- ${a}`).join('\n') : '[Auto-populated with next steps]'}

## Open Blockers
${update.blockers ? update.blockers.map(b => `- ${b}`).join('\n') : '[Auto-populated with any blocking issues]'}

---
*This file is managed by CodeMaestro. Manual edits may be overwritten.*
`;
      }

      // Update specific fields
      const now = new Date().toISOString();

      // Update timestamp
      checkpointContent = checkpointContent.replace(
        /- \*\*Last Updated\*\*: .*/,
        `- **Last Updated**: ${now}`
      );

      // Update phase
      if (update.phase) {
        checkpointContent = checkpointContent.replace(
          /- \*\*Current Phase\*\*: .*/,
          `- **Current Phase**: ${update.phase}`
        );
      }

      // Update role
      if (update.role) {
        checkpointContent = checkpointContent.replace(
          /- \*\*Current Role\*\*: .*/,
          `- **Current Role**: ${update.role}`
        );
      }

      // Update task
      if (update.task) {
        checkpointContent = checkpointContent.replace(
          /- \*\*Current Task\*\*: .*/,
          `- **Current Task**: ${update.task}`
        );
      }

      // Update phase progress
      if (update.phase) {
        const phases = [
          { number: 1, name: 'Requirements', description: 'Product Manager - Define specifications' },
          { number: 2, name: 'Planning', description: 'Software Architect - Design architecture' },
          { number: 3, name: 'Implementation', description: 'Senior Developer - Build code' },
          { number: 4, name: 'Verification', description: 'QA Lead - Test and validate' },
          { number: 5, name: 'Release', description: 'Release Manager - Deploy and release' }
        ];
        const progressSection = phases.map(phase => {
          const status = phase.number < update.phase ? 'Complete' :
                         phase.number === update.phase ? 'In Progress' : 'Not Started';
          return `- Phase ${phase.number}: ${status}`;
        }).join('\n');

        checkpointContent = checkpointContent.replace(
          /## Phase Progress\n[\s\S]*?(?=\n##)/,
          `## Phase Progress\n${progressSection}`
        );
      }

      // Update context if provided
      if (update.context) {
        checkpointContent = checkpointContent.replace(
          /## Active Context\n[\s\S]*?(?=\n##)/,
          `## Active Context\n${update.context}`
        );
      }

      // Update milestones if provided
      if (update.milestones) {
        const milestonesText = update.milestones.map(m => `- ${m}`).join('\n');
        checkpointContent = checkpointContent.replace(
          /## Completed Milestones\n[\s\S]*?(?=\n##)/,
          `## Completed Milestones\n${milestonesText}`
        );
      }

      // Update next actions if provided
      if (update.nextActions) {
        const actionsText = update.nextActions.map(a => `- ${a}`).join('\n');
        checkpointContent = checkpointContent.replace(
          /## Next Actions\n[\s\S]*?(?=\n##)/,
          `## Next Actions\n${actionsText}`
        );
      }

      // Update blockers if provided
      if (update.blockers) {
        const blockersText = update.blockers.map(b => `- ${b}`).join('\n');
        checkpointContent = checkpointContent.replace(
          /## Open Blockers\n[\s\S]*?(?=\n##)/,
          `## Open Blockers\n${blockersText}`
        );
      }

      // Write updated checkpoint
      await fs.writeFile(checkpointPath, checkpointContent, 'utf8');

      logger.debug(`Recovery checkpoint updated: ${checkpointPath}`);
      return true;

    } catch (error) {
      logger.error(`Failed to update recovery checkpoint: ${error.message}`);
      return false;
    }
  }
}

module.exports = new ProjectDetector();