import type { LanguagePattern } from '../types';

export const Markdown: LanguagePattern[] = [
  // headings
  { pattern: /^(#){2,6}\s.+/, type: 'keyword' },
  // headings alternate syntax
  { pattern: /^(?!!)(=|-){2,}(?<!>)$/, type: 'meta.module' },
  // images
  { pattern: /(!)?\[.+\]\(.+\)/, type: 'keyword' },
  // links 2
  { pattern: /\[.+\]\[.+\]/, type: 'keyword' },
  // links 3
  { pattern: /^\[.+\]:\s?(<)?(http)?/, type: 'keyword' },
  // blockquotes
  { pattern: /^(> .*)+/, type: 'macro' },
  // code block
  { pattern: /^```([A-Za-z0-9#_]+)?$/, type: 'keyword' },
  // frontmatter
  { pattern: /^---$/, type: 'meta.module', nearTop: true },
];
