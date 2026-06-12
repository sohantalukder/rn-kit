import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell } from '../../../docs/components/AppShell';
import { CodeBlock } from '../../../docs/components/CodeBlock';
import { ComponentPreview } from '../../../docs/components/ComponentPreview';
import { DocPager } from '../../../docs/components/DocPager';
import { components, findComponent } from '../../../docs/data/componentRegistry';
import { getPager } from '../../../docs/data/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const toc = [
  { id: 'import', title: 'Import' },
  { id: 'usage', title: 'Usage' },
  { id: 'preview', title: 'Preview' },
  { id: 'props', title: 'Props' },
  { id: 'theme', title: 'Theme' },
  { id: 'variants', title: 'Variants' },
  { id: 'best-practices', title: 'Best Practices' },
];

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = findComponent(slug);

  if (!component) return {};

  return {
    title: `${component.name} | rn-kit components`,
    description: component.summary,
  };
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const component = findComponent(slug);

  if (!component) {
    notFound();
  }

  const pager = getPager(`/components/${component.slug}`);
  const importCode = `import { ${component.importName} } from '@sohantalukder/rn-kit';`;

  return (
    <AppShell toc={toc}>
      <article>
        <header className="doc-hero">
          <span className="eyebrow">Component</span>
          <h1>{component.name}</h1>
          <p>{component.summary}</p>
        </header>

        <section className="content-section" id="import">
          <h2>Import</h2>
          <CodeBlock code={importCode} language="tsx" />
        </section>

        <section className="content-section" id="usage">
          <h2>Usage</h2>
          <CodeBlock code={component.usage} language="tsx" />
        </section>

        <section className="content-section" id="preview">
          <ComponentPreview component={component} />
        </section>

        <section className="content-section" id="props">
          <h2>Props</h2>
          <p>
            These are the most important props to consider first. The custom preview
            highlights the common setup before you move into app-specific states.
          </p>
          <div className="props-table" role="table" aria-label={`${component.name} props`}>
            <div className="props-row props-head" role="row">
              <span role="columnheader">Prop</span>
              <span role="columnheader">Purpose</span>
            </div>
            {component.primaryProps.map((prop) => (
              <div className="props-row" role="row" key={prop}>
                <code role="cell">{prop}</code>
                <span role="cell">Controls core {component.name} behavior or presentation.</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section" id="theme">
          <h2>Theme</h2>
          <p>
            {component.name} reads from the rn-kit theme context where applicable. Wrap
            your app with <code>ThemeProvider</code> and prefer package theme tokens over
            hardcoded screen-level colors.
          </p>
        </section>

        <section className="content-section" id="variants">
          <h2>Variants</h2>
          <ul className="info-list compact">
            {component.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
        </section>

        <section className="content-section" id="best-practices">
          <h2>Best Practices</h2>
          <ul className="info-list">
            {component.bestPractices.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </article>

      <DocPager previous={pager.previous} next={pager.next} />
    </AppShell>
  );
}
