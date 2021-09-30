import type { LanguagePattern } from '../types';

export const Julia: LanguagePattern[] = [
  // Module import
  { pattern: /(using)\s\w+/, type: 'meta.import' },
  { pattern: /(bare\s)?module/, type: 'meta.module' },
  // Avoiding Python's import
  { pattern: /from\s.+import\s.+/, type: 'not' },
  // Stdout / print line
  { pattern: /println\(.*\)/, type: 'keyword.print' },
  { pattern: /(.*)!\(.*\)/, type: 'macro' },
  // for x in / for x =
  { pattern: /for\s(\w+)\s(in|=)\s/, type: 'keyword.control' },
  // It's not Julia if the function ends with {
  { pattern: /function\s\w+\(.*\)\s\{/, type: 'not' },
  // It's not Julia either if the while loop has a brackets
  { pattern: /while\s+\(.+\)\n/, type: 'not' },
  // The end keyword
  { pattern: /end\n?/, type: 'keyword' },
  // Struct with <: annotation
  { pattern: /struct\s(.*)\s<:\s/, type: 'keyword.other' },
  // Data types
  { pattern: /(::)?(Int|Uint)(8|16|32|64|128)/, type: 'keyword.variable' },
  { pattern: /[0-9]+im/, type: 'keyword' },
  // Avoiding Rust confusion
  { pattern: /\{:\?\}/, type: 'not' },
  { pattern: /fn\smain()/, type: 'not' },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, type: 'not' },
  { pattern: /puts\s+("|').+("|')/, type: 'not' },
  { pattern: /class\s/, type: 'not' },
  // Avoiding Lua confusion
  { pattern: /local\s(function|\w+)/, type: 'not' },
  // Avoiding Kotlin confusion
  { pattern: /fun main\((.*)?\) {/, type: 'not' },
  { pattern: /fun(\s+)([A-Za-z0-9_])(\s+)?\((.*)\)(\s+){/, type: 'not' },
];
