import Link from 'next/link';
import { BookOpen, Boxes, Component, Palette, Rocket } from 'lucide-react';
import { CodeBlock } from '../docs/components/CodeBlock';
import { DocPager } from '../docs/components/DocPager';
import { PackageCard } from '../docs/components/PackageCard';
import { components, packageInfo } from '../docs/data/componentRegistry';
import { firstScreenUsageCode } from '../docs/data/docsContent';
import { getPager } from '../docs/data/navigation';

export default function HomePage() {
  const pager = getPager('/');

  return (
    <>
      <section className="home-hero" id="overview">
        <div>
          <span className="eyebrow">React Native UI documentation</span>
          <h1>{packageInfo.name}</h1>
          <p>{packageInfo.summary}</p>
          <div className="actions">
            <Link className="button-link primary" href="/docs/getting-started">
              <Rocket size={16} aria-hidden="true" />
              Get started
            </Link>
            <Link className="button-link" href="/components">
              <Component size={16} aria-hidden="true" />
              Browse components
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section" id="quick-start">
        <h2>
          <BookOpen size={22} aria-hidden="true" />
          Quick start
        </h2>
        <p>
          Install the package, mount providers at the app root, and copy a
          complete screen pattern with state, validation, and feedback.
        </p>
        <CodeBlock code={firstScreenUsageCode} language="tsx" />
      </section>

      <section className="content-section" id="explore">
        <h2>Explore the library</h2>
        <div className="grid">
          <PackageCard
            title="Components"
            description="Reference pages with imports, usage, props, variants, previews, and best practices."
            href="/components"
            icon={<Component size={18} aria-hidden="true" />}
            meta={[`${components.length} components`, 'Custom previews']}
          />
          <PackageCard
            title="Packages"
            description="Package overview, install commands, public surface, and future package slots."
            href="/packages"
            icon={<Boxes size={18} aria-hidden="true" />}
            meta={[packageInfo.name, `v${packageInfo.version}`]}
          />
          <PackageCard
            title="Theming"
            description="Theme provider setup, persistence, tokens, and light or dark mode guidance."
            href="/docs/theming"
            icon={<Palette size={18} aria-hidden="true" />}
            meta={['Light mode', 'Dark mode']}
          />
        </div>
      </section>

      <DocPager previous={pager.previous} next={pager.next} />
    </>
  );
}
