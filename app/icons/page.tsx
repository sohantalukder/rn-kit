import type { Metadata } from 'next';
import { Code2, Sparkles } from 'lucide-react';
import { CodeBlock } from '../../docs/components/CodeBlock';
import { DocPager } from '../../docs/components/DocPager';
import { IconGallery } from '../../docs/components/IconGallery';
import { getPager } from '../../docs/data/navigation';
import { createPageMetadata } from '../../docs/seo';
import { iconNames } from '../../src/assets/icons/names';

export const metadata: Metadata = createPageMetadata({
  title: 'Icons | rn-kit docs',
  description:
    'Preview and search every registered @sohantalukder/rn-kit theme-aware SVG icon.',
  path: '/icons',
});

const iconByVariantUsage = `import { IconByVariant } from '@sohantalukder/rn-kit';

export function Example() {
  return (
    <IconByVariant
      path="search"
      height={24}
      width={24}
      color="#0ea5e9"
    />
  );
}`;

const iconButtonUsage = `import { IconButton } from '@sohantalukder/rn-kit';

export function Example() {
  return (
    <IconButton
      icon="search"
      iconColor="#0ea5e9"
      accessibilityLabel="Search"
      onPress={handleSearch}
    />
  );
}`;

export default function IconsPage() {
  const pager = getPager('/icons');
  const iconCount = iconNames.length;

  return (
    <>
      <section className="doc-hero" id="overview">
        <span className="eyebrow">Assets</span>
        <h1>Icons</h1>
        <p>
          Preview every registered icon, search by name, and copy the icon key used by
          IconByVariant and component examples.
        </p>
        <div className="badge-row">
          <span className="meta-badge">{iconCount} registered icons</span>
          <span className="meta-badge">Theme-aware SVG assets</span>
        </div>
      </section>

      <section className="content-section first-section" id="usage">
        <h2>
          <Code2 size={21} aria-hidden="true" />
          Usage
        </h2>
        <p>
          Pass a copied icon key to <code>IconByVariant</code> for standalone SVGs or
          to <code>IconButton</code> for icon-only actions. Use <code>color</code> or
          <code>iconColor</code> to set the icon fill.
        </p>
        <div className="icon-usage-grid">
          <CodeBlock code={iconByVariantUsage} language="tsx" />
          <CodeBlock code={iconButtonUsage} language="tsx" />
        </div>
      </section>

      <section className="content-section" id="library">
        <h2>
          <Sparkles size={21} aria-hidden="true" />
          Library
        </h2>
        <IconGallery />
      </section>

      <DocPager previous={pager.previous} next={pager.next} />
    </>
  );
}
