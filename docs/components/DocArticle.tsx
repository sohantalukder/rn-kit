import type { DocPage } from '../data/docsContent';
import { CodeBlock } from './CodeBlock';
import { CopyCommand } from './CopyCommand';

type DocArticleProps = {
  page: DocPage;
};

export function DocArticle({ page }: DocArticleProps) {
  return (
    <article>
      <header className={`doc-hero${page.heroPanel ? ' doc-hero-featured' : ''}`}>
        <div className="doc-hero-copy">
          {page.badge ? <span className="eyebrow">{page.badge}</span> : null}
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>

        {page.heroPanel ? (
          <div className="doc-hero-panel" aria-label={page.heroPanel.title}>
            <strong>{page.heroPanel.title}</strong>
            <div className="doc-hero-panel-items">
              {page.heroPanel.items.map((item) => (
                <span key={item.label}>
                  <span className="doc-hero-panel-step-copy">
                    <small>{item.label}</small>
                    <b>{item.value}</b>
                  </span>
                </span>
              ))}
            </div>
            {page.heroPanel.command ? <CopyCommand command={page.heroPanel.command} /> : null}
          </div>
        ) : null}
      </header>

      {page.sections.map((section) => (
        <section className="content-section" id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          {section.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.code ? (
            <CodeBlock code={section.code.value} language={section.code.language} />
          ) : null}
          {section.list ? (
            <ul className="info-list">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
