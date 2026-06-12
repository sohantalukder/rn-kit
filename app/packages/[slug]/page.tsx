import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Boxes, Component } from 'lucide-react';
import { CodeBlock } from '../../../docs/components/CodeBlock';
import { DocPager } from '../../../docs/components/DocPager';
import {
  components,
  findComponent,
  packageInfo,
} from '../../../docs/data/componentRegistry';
import { getPager } from '../../../docs/data/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const usageCode = `import {
  ThemeProvider,
  UiPortalProvider,
  Button,
  TextInput,
} from '@sohantalukder/rn-kit';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <TextInput label="Email" placeholder="you@example.com" />
        <Button text="Continue" onPress={() => {}} />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`;

export function generateStaticParams() {
  return [
    { slug: packageInfo.slug },
    ...components.map((component) => ({ slug: component.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== packageInfo.slug) return {};

  return {
    title: `${packageInfo.name} | rn-kit packages`,
    description: packageInfo.summary,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug !== packageInfo.slug) {
    const component = findComponent(slug);
    if (component) redirect(`/components/${component.slug}`);
    notFound();
  }

  const pager = getPager(`/packages/${packageInfo.slug}`);

  return (
    <>
      <section className="doc-hero">
        <span className="eyebrow">Package overview</span>
        <h1>{packageInfo.name}</h1>
        <p>{packageInfo.summary}</p>
      </section>

      <section className="content-section" id="install">
        <h2>
          <Boxes size={21} aria-hidden="true" />
          Install
        </h2>
        <CodeBlock code={packageInfo.install} language="sh" />
        <CodeBlock code={packageInfo.peerInstall} language="sh" />
      </section>

      <section className="content-section" id="usage">
        <h2>Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="content-section" id="components">
        <h2>
          <Component size={21} aria-hidden="true" />
          Components
        </h2>
        <p>
          Every public component is documented as part of one library surface, with
          import snippets, props, variants, and custom previews.
        </p>
        <div className="badge-row component-pill-row">
          {components.map((component) => (
            <Link
              className="meta-badge link-badge"
              href={`/components/${component.slug}`}
              key={component.slug}
            >
              {component.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section" id="docs">
        <h2>Docs Workflow</h2>
        <p>
          The custom docs app is the source of truth for browsing the package,
          checking examples, and sharing component usage with app teams.
        </p>
        <CodeBlock code="npm run docs:dev" language="sh" />
      </section>

      <DocPager previous={pager.previous} next={pager.next} />
    </>
  );
}
