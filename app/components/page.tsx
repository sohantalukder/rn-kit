import { Component, Library } from 'lucide-react';
import { DocPager } from '../../docs/components/DocPager';
import { PackageCard } from '../../docs/components/PackageCard';
import { components } from '../../docs/data/componentRegistry';
import { getPager } from '../../docs/data/navigation';

export default function ComponentsPage() {
  const pager = getPager('/components');

  return (
    <>
      <section className="doc-hero" id="overview">
        <span className="eyebrow">Reference</span>
        <h1>Components</h1>
        <p>
          Browse the full public component surface. Each page includes import syntax,
          usage code, key props, variants, best-practice notes, and a custom docs preview.
        </p>
        <div className="badge-row">
          <span className="meta-badge">{components.length} documented components</span>
          <span className="meta-badge">React Native + TypeScript</span>
        </div>
      </section>

      <section className="content-section" id="library">
        <h2>
          <Library size={21} aria-hidden="true" />
          Library
        </h2>
        <div className="grid component-grid">
          {components.map((component) => (
            <PackageCard
              key={component.slug}
              title={component.name}
              description={component.summary}
              href={`/components/${component.slug}`}
              icon={<Component size={17} aria-hidden="true" />}
              meta={[
                `${component.primaryProps.length} key props`,
                `${component.variants.length} variants`,
              ]}
            />
          ))}
        </div>
      </section>

      <DocPager previous={pager.previous} next={pager.next} />
    </>
  );
}
