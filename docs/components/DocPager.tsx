import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type PagerItem = {
  href: string;
  label: string;
};

type DocPagerProps = {
  previous?: PagerItem;
  next?: PagerItem;
};

export function DocPager({ previous, next }: DocPagerProps) {
  if (!previous && !next) return null;

  return (
    <nav className="doc-pager" aria-label="Previous and next pages">
      {previous ? (
        <Link href={previous.href} className="pager-link previous">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>
            <small>Previous</small>
            {previous.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="pager-link next">
          <span>
            <small>Next</small>
            {next.label}
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
