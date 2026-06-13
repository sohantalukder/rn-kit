'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="code-shell">
      <div className="code-toolbar">
        <span>{language}</span>
        <button type="button" onClick={copyCode}>
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
}
