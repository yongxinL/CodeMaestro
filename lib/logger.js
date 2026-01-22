const chalk = require('chalk');
const ora = require('ora').default || require('ora');
const ProgressBar = require('progress');

/**
 * Logger utility for CodeMaestro OpenCode commands
 */
class Logger {
  constructor() {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    this.currentLevel = this.levels.info;
  }

  /**
   * Set log level
   * @param {string} level - Log level (error, warn, info, debug)
   */
  setLevel(level) {
    this.currentLevel = this.levels[level] || this.levels.info;
  }

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error} error - Optional error object
   */
  error(message, error = null) {
    if (this.currentLevel >= this.levels.error) {
      console.error(chalk.red(`❌ ${message}`));
      if (error && this.currentLevel >= this.levels.debug) {
        console.error(chalk.red(error.stack || error.message));
      }
    }
  }

  /**
   * Log warning message
   * @param {string} message - Warning message
   */
  warn(message) {
    if (this.currentLevel >= this.levels.warn) {
      console.warn(chalk.yellow(`⚠️  ${message}`));
    }
  }

  /**
   * Log info message
   * @param {string} message - Info message
   */
  info(message) {
    if (this.currentLevel >= this.levels.info) {
      console.info(chalk.blue(`ℹ️  ${message}`));
    }
  }

  /**
   * Log success message
   * @param {string} message - Success message
   */
  success(message) {
    console.log(chalk.green(`✅ ${message}`));
  }

  /**
   * Log debug message
   * @param {string} message - Debug message
   */
  debug(message) {
    if (this.currentLevel >= this.levels.debug) {
      console.debug(chalk.gray(`🔍 ${message}`));
    }
  }

  /**
   * Start a spinner for long-running operations
   * @param {string} message - Spinner message
   * @returns {Object} Ora spinner instance
   */
  startSpinner(message) {
    return ora(message).start();
  }

  /**
   * Create a progress bar
   * @param {string} message - Progress message
   * @param {number} total - Total items
   * @returns {Object} Progress bar instance
   */
  createProgress(message, total) {
    return new ProgressBar(`${message} [:bar] :percent :etas`, {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total
    });
  }
}

module.exports = new Logger();