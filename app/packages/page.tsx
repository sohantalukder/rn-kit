import type { Metadata } from 'next';
import { Boxes, Component } from 'lucide-react';
import Link from 'next/link';
import { DocPager } from '../../docs/components/DocPager';
import { PackageCard } from '../../docs/components/PackageCard';
import { components, packageInfo } from '../../docs/data/componentRegistry';
import { getPager } from '../../docs/data/navigation';
import { createPageMetadata } from '../../docs/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Packages | rn-kit docs',
  description:
    'Explore the @sohantalukder/rn-kit package, install commands, public component surface, and package documentation.',
  path: '/packages',
});

export default function PackagesPage() {
  const pager = getPager('/packages');

  return (
    <>
      <section className="doc-hero" id="packages">
        <span className="eyebrow">Package index</span>
        <h1>Packages</h1>
        <p>
          The docs are structured so this repository can grow beyond one package.
          Add package metadata once and navigation, cards, and custom component pages can scale with it.
        </p>
      </section>

      <section className="content-section">
        <h2>
          <Boxes size={21} aria-hidden="true" />
          Current package
        </h2>
        <div className="grid">
          <PackageCard
            title={packageInfo.name}
            description={packageInfo.summary}
            href={`/packages/${packageInfo.slug}`}
            icon={<Boxes size={18} aria-hidden="true" />}
            meta={[`v${packageInfo.version}`, 'React Native']}
          />
        </div>
      </section>

      <section className="content-section" id="structure">
        <h2>
          <Component size={21} aria-hidden="true" />
          Public surface
        </h2>
        <p>
          The current package exposes {components.length} documented components in one
          clean public component catalogue.
        </p>
        <div className="badge-row">
          {components.map((component) => (
            <Link className="meta-badge link-badge" href={`/components/${component.slug}`} key={component.slug}>
              {component.name}
            </Link>
          ))}
        </div>
      </section>

      <DocPager previous={pager.previous} next={pager.next} />
    </>
  );
}
