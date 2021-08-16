import type { LanguagePattern } from '../types';

export const Julia: LanguagePattern[] = [
  // Module import
  { pattern: /(using)\s\w+/, points: 2 },
  { pattern: /(bare\s)?module/, points: 1},
  // Avoiding Python's import
  { pattern: /from\s.+import\s.+/, points: -50 },
  // Stdout / print line
  { pattern: /println\(.*\)/, points: 1 },
  // for x in / for x =
  { pattern: /for\s(\w+)\s(in|=)\s/, points: 2 },
  // It's not Julia if the function ends with {
  { pattern: /function\s\w+\(.*\)\s\{/, points: -50 },
  // It's not Julia either if the while loop has a brackets
  { pattern: /while( )+\(.+\)/, points: -1 },
  // The end keyword
  { pattern: /end\n?/, points: 2 },
  // Struct with <: annotation
  { pattern: /struct\s(.*)\s<:\s/, points: 2 },
  // Data types
  { pattern: /(::)?(Int|Uint)(8|16|32|64|128)/, points: 1 },
  { pattern: /[0-9]+im/, points: 1 },
];
