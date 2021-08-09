import type { LanguagePattern } from '../types';

export const CSS: LanguagePattern[] = [
  // Properties
  { pattern: /[a-z-]+:(?!:).+;/, points: 2 },
  // <style> tag from HTML
  { pattern: /<(\/)?style>/, points: -50 },
];
