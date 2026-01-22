const kb = require('../lib/kb');

describe('Knowledge Base', () => {
  beforeEach(async () => {
    // Reset KB state between tests
    kb.kbIndex = null;
  });

  test('should ensure KB structure exists', async () => {
    const structure = await kb.ensureKbStructure();
    expect(structure).toHaveProperty('base');
    expect(structure).toHaveProperty('patterns');
    expect(structure).toHaveProperty('failures');
    expect(structure).toHaveProperty('decisions');
    expect(structure).toHaveProperty('index');
  });

  test('should load KB index', async () => {
    const index = await kb.loadIndex();
    expect(index).toHaveProperty('version');
    expect(index).toHaveProperty('entries');
    expect(index.entries).toHaveProperty('patterns');
    expect(index.entries).toHaveProperty('failures');
    expect(index.entries).toHaveProperty('decisions');
  });

  test('should calculate relevance scores', () => {
    const entry = {
      id: 'auth-pattern',
      description: 'Authentication pattern using JWT'
    };

    expect(kb.calculateRelevance(entry, 'auth')).toBeGreaterThan(0);
    expect(kb.calculateRelevance(entry, 'authentication')).toBeGreaterThan(0);
    expect(kb.calculateRelevance(entry, 'xyz')).toBe(0);
  });

  test('should generate entry markdown', () => {
    const entry = {
      id: 'test-pattern',
      title: 'Test Pattern',
      description: 'A test pattern',
      content: 'Test content',
      tags: ['test', 'pattern'],
      created: '2024-01-01T00:00:00.000Z',
      author: 'Test Author',
      phase: 2,
      related: ['other-pattern']
    };

    const markdown = kb.generateEntryMarkdown(entry);
    expect(markdown).toContain('# Test Pattern');
    expect(markdown).toContain('**Description:** A test pattern');
    expect(markdown).toContain('**Tags:** `test`, `pattern`');
    expect(markdown).toContain('**Phase:** 2');
    expect(markdown).toContain('Test content');
  });

  test('should list KB entries', async () => {
    const entries = await kb.list();
    expect(Array.isArray(entries)).toBe(true);
  });

  test('should parse index markdown', () => {
    const markdown = `# Index
## Patterns
* [auth-pattern](2024-01-01) - Authentication pattern
## Failures
* [api-failure](2024-01-02) - API failure lesson
## Decisions
* [arch-decision](2024-01-03) - Architecture decision
`;

    const index = kb.parseIndex(markdown);
    expect(index.entries.patterns).toHaveProperty('auth-pattern');
    expect(index.entries.failures).toHaveProperty('api-failure');
    expect(index.entries.decisions).toHaveProperty('arch-decision');
  });
});