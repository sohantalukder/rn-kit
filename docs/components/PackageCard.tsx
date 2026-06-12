import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type React from 'react';

type PackageCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  meta?: string[];
};

export function PackageCard({ title, description, href, icon, meta = [] }: PackageCardProps) {
  return (
    <Link className="package-card" href={href}>
      <div>
        <h3>
          {icon ? <span className="card-icon">{icon}</span> : null}
          {title}
        </h3>
        <p>{description}</p>
      </div>
      {meta.length > 0 ? (
        <div className="badge-row">
          {meta.map((item) => (
            <span className="meta-badge" key={item}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
      <span className="button-link">
        Read docs
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
