const gitIntegration = require('../lib/git');

describe('Git Integration', () => {
  test('should detect git repository', () => {
    const isRepo = gitIntegration.isGitRepository();
    // This will depend on whether we're in a git repo during testing
    expect(typeof isRepo).toBe('boolean');
  });

  test('should get git status', async () => {
    const status = await gitIntegration.getStatus();
    expect(status).toHaveProperty('isRepo');
    if (status.isRepo) {
      expect(status).toHaveProperty('branch');
      expect(status).toHaveProperty('staged');
      expect(status).toHaveProperty('unstaged');
    }
  });

  test('should load git commands', async () => {
    const commands = await gitIntegration.loadGitCommands();
    expect(commands).toBeDefined();
    expect(typeof commands).toBe('object');
  });

  test('should get default git commands', () => {
    const defaults = gitIntegration.getDefaultGitCommands();
    expect(defaults).toBeDefined();
    expect(defaults).toHaveProperty('commitTemplates');
    expect(defaults.commitTemplates).toHaveProperty('feature');
  });

  test('should generate commit message', async () => {
    const message = await gitIntegration.generateCommitMessage();
    expect(typeof message).toBe('string');
    expect(message.length).toBeGreaterThan(0);
    expect(message).toContain('Co-Authored-By: CodeMaestro Assistant');
  });

  test('should get recent commits', async () => {
    const commits = await gitIntegration.getRecentCommits(2);
    expect(Array.isArray(commits)).toBe(true);
    commits.forEach(commit => {
      if (commit) {
        expect(commit).toHaveProperty('hash');
        expect(commit).toHaveProperty('message');
      }
    });
  });
});