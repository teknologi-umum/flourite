import type { LanguagePattern } from '../types';

export const Markdown: LanguagePattern[] = [
  // headings
  { pattern: /(#){1,6} .+/, type: 'macro', nearTop: true },
  // headings alternate syntax
  { pattern: /^(?!!)(=|-){2,}(?<!>)$/, type: 'meta.module', nearTop: true },
  // bold
  { pattern: /(\w*(?!\/)(\*\*)\w+(\*\*)\w*)|(\w*(__)\w+(__)\w*)/, type: 'macro', nearTop: true },
  // italic
  { pattern: /(^.*(\*).+(\*)(?<!\/).*)$|^(.*(_).+(_).*)$/, type: 'macro', nearTop: true },
  // lists
  { pattern: /^(?!-)(- \w*)(?<!-)|^(?!\/)(\* .*)/, type: 'meta.module', nearTop: true },
  // images
  { pattern: /!\[.+\]\(.+\)/, type: 'macro', nearTop: true },
  // links
  { pattern: /\[.+\]\(.+\)/, type: 'macro', nearTop: true },
  // links 2
  { pattern: /\[.+\]\[.+\]/, type: 'macro', nearTop: true },
  // links 3
  { pattern: /\[.+\]:\s?<?http/, type: 'macro', nearTop: true },
  // blockquotes
  { pattern: /^(> .*)+/, type: 'macro', nearTop: true },
  // inline code
  { pattern: /.*`.+`.*/, type: 'meta.module', nearTop: true },
];
