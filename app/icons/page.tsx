import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
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

      <section className="content-section first-section" id="library">
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
