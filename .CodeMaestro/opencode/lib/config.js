const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Configuration loader for CodeMaestro OpenCode
 */
class ConfigLoader {
  constructor() {
    this.config = null;
    this.projectRoot = null;
  }

  /**
   * Load configuration for a project
   * @param {string} projectPath - Path to project root
   * @returns {Object} Merged configuration
   */
  async load(projectPath = process.cwd()) {
    this.projectRoot = await this.findProjectRoot(projectPath);

    if (!this.projectRoot) {
      throw new Error('CodeMaestro project not found. Run `/codem-init` first.');
    }

    // Load default config
    const defaultConfig = await this.loadYaml(path.join(__dirname, '../config/default.yaml'));

    // Load project-specific config if it exists
    let projectConfig = {};
    const projectConfigPath = path.join(this.projectRoot, '.CodeMaestro/config/opencode.json');
    if (await fs.pathExists(projectConfigPath)) {
      projectConfig = await fs.readJson(projectConfigPath);
    }

    // Merge configurations (project config overrides defaults)
    this.config = this.deepMerge(defaultConfig, projectConfig);

    // Resolve paths relative to project root
    this.resolvePaths();

    return this.config;
  }

  /**
   * Find the CodeMaestro project root
   * @param {string} startPath - Path to start searching from
   * @returns {string|null} Project root path or null
   */
  async findProjectRoot(startPath) {
    let currentPath = path.resolve(startPath);
    const root = path.parse(currentPath).root;

    while (currentPath !== root) {
      const codemaestroDir = path.join(currentPath, '.CodeMaestro');
      if (await fs.pathExists(codemaestroDir)) {
        return currentPath;
      }
      currentPath = path.dirname(currentPath);
    }

    return null;
  }

  /**
   * Load YAML file
   * @param {string} filePath - Path to YAML file
   * @returns {Object} Parsed YAML content
   */
  async loadYaml(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    return yaml.load(content);
  }

  /**
   * Deep merge two objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   * @returns {Object} Merged object
   */
  deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Resolve relative paths to absolute paths
   */
  resolvePaths() {
    if (!this.config || !this.projectRoot) return;

    const paths = this.config.paths || {};
    for (const [key, relativePath] of Object.entries(paths)) {
      if (typeof relativePath === 'string') {
        paths[key] = path.resolve(this.projectRoot, relativePath);
      }
    }
  }

  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  get() {
    return this.config;
  }

  /**
   * Get project root path
   * @returns {string} Project root path
   */
  getProjectRoot() {
    return this.projectRoot;
  }
}

module.exports = new ConfigLoader();