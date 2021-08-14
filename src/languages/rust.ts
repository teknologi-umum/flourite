import type { LanguagePattern } from '../types';

export const Rust: LanguagePattern[] = [
  { pattern: /fn\smain()/, points: 2 },
  { pattern: /fn\s[A-Za-z0-9<>,]+\(.*\)\s->\s\w+(\s\{|)/, points: 1 },
  { pattern: /let\smut\s\w+(\s=|)/, points: 2 },
  { pattern: /(println|print)!\(.*\)/, points: 2 },
  { pattern: /use\s\w+::.*/, points: 2 },
  { pattern: /\{:\?\}/, points: 1 },
  { pattern: /loop \{/, points: 1 },
  { pattern: /impl/, points: 1 },
  { pattern: /match\s\w+\s\{/, points: 1 },
  { pattern: /macro_rules!/, points: 1 },
  { pattern: /\w+\.len\(\)/, points: 1 },
  // Data types
  { pattern: /(&str|(i|u)(8|16|32|64|128|size))/, points: 1 },
  // Vector
  { pattern: /(Vec|Vec::new)|vec!/, points: 2 },
  // Panic!!
  { pattern: /panic!\(.*\)/, points: 2 },
];
