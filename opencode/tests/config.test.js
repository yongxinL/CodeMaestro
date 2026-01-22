const config = require('../lib/config');

describe('Config Loader', () => {
  test('should load default configuration', async () => {
    const cfg = await config.load();
    expect(cfg).toBeDefined();
    expect(cfg.version).toBe('0.1.0');
    expect(cfg.commands.prefix).toBe('codem');
  });

  test('should find project root', async () => {
    const root = await config.findProjectRoot(process.cwd());
    expect(root).toBeTruthy();
    expect(root.includes('CodeMaestro')).toBe(true);
  });

  test('should merge configurations', () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: { d: 3 }, e: 4 };
    const result = config.deepMerge(target, source);

    expect(result.a).toBe(1);
    expect(result.b.c).toBe(2);
    expect(result.b.d).toBe(3);
    expect(result.e).toBe(4);
  });
});