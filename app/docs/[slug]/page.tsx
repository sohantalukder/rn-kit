import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell } from '../../../docs/components/AppShell';
import { DocArticle } from '../../../docs/components/DocArticle';
import { DocPager } from '../../../docs/components/DocPager';
import { docPages, findDocPage } from '../../../docs/data/docsContent';
import { getPager } from '../../../docs/data/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return docPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findDocPage(slug);

  if (!page) return {};

  return {
    title: `${page.title} | rn-kit docs`,
    description: page.description,
  };
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findDocPage(slug);

  if (!page) {
    notFound();
  }

  const pager = getPager(`/docs/${page.slug}`);
  const toc = page.sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <AppShell toc={toc}>
      <DocArticle page={page} />
      <DocPager previous={pager.previous} next={pager.next} />
    </AppShell>
  );
}
