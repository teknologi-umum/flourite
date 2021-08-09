import type { LanguagePattern } from '../types';

export const HTML: LanguagePattern[] = [
  { pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, points: 2, nearTop: true },
  // Tags
  { pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2 },
  // Properties
  { pattern: /[a-z-]+=("|').+("|')/g, points: 2 },
  // PHP tag
  { pattern: /<\?php/, points: -50 },
];
