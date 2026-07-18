import {
  getComponentDetails,
  getInstallationGuide,
  getMcpGuidelines,
  getPackageGuide,
  getThemeGuide,
  searchComponents,
  searchIcons,
} from '../../mcp/catalog';

describe('rn-kit MCP catalog', () => {
  it('ranks exact component matches before fuzzy matches', () => {
    const results = searchComponents('button');

    expect(results[0]?.component.slug).toBe('button');
    expect(results[0]?.score).toBeGreaterThan(results[1]?.score ?? 0);
  });

  it('returns undefined for an unknown component slug', () => {
    expect(getComponentDetails('not-a-component')).toBeUndefined();
  });

  it('normalizes prop metadata for component details', () => {
    const button = getComponentDetails('button');

    expect(button?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'variant',
          type: '"primary" | "secondary" | "outline" | "error" | "disable"',
        }),
        expect.objectContaining({
          name: 'isLoading',
          defaultValue: 'false',
        }),
      ])
    );
  });

  it('returns package and installation guidance from docs data', () => {
    const packageGuide = getPackageGuide();
    const installationGuide = getInstallationGuide();

    expect(packageGuide.name).toBe('@sohantalukder/rn-kit');
    expect(packageGuide.officialWebsite).toBe('https://rn-kit.vercel.app');
    expect(packageGuide.mcpEndpoint).toBe('https://rn-kit.vercel.app/mcp');
    expect(installationGuide.commands).toContain('npm install @sohantalukder/rn-kit');
    expect(installationGuide.peerDependencies).toHaveProperty('react-native-svg');
  });

  it('returns MCP guidelines with the official website and read-only rules', () => {
    const guidelines = getMcpGuidelines();

    expect(guidelines.officialWebsite).toBe('https://rn-kit.vercel.app');
    expect(guidelines.mcpEndpoint).toBe('https://rn-kit.vercel.app/mcp');
    expect(guidelines.rules.join(' ')).toContain('read-only');
  });

  it('returns theme guide tokens and setup copy', () => {
    const guide = getThemeGuide('tokens');

    expect(guide.tokens).toContain('colors');
    expect(guide.notes.join(' ')).toContain('ThemeProvider');
  });

  it('searches icons by registered key and label', () => {
    expect(searchIcons('search')[0]?.name).toBe('search');
    expect(searchIcons('chevron right')[0]?.name).toBe('chevronRight');
  });
});
