import type { LanguagePattern } from "../types";

export const HTML: LanguagePattern[] = [
  {
    pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/,
    type: "meta.module",
    nearTop: true
  },
  // Tags
  {
    pattern: /<[a-z\d]+(\s*\w+=('|").+('|")\s*)?>.*<\/[a-z\d]+>/g,
    type: "keyword"
  },
  // Comments
  { pattern: /<!--(.*)(-->)?/, type: "comment.block" },
  // Properties
  { pattern: /[a-z-]+=("|').+("|')/g, type: "keyword.other" },
  // PHP tag
  { pattern: /<\?php/, type: "not" }
];
