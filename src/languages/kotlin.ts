import type { LanguagePattern } from '../types';

export const Kotlin: LanguagePattern[] = [
  { pattern: /fun main\((.*)?\) {/, type: 'keyword.function' },
  {
    pattern: /(inline|private|public|protected|override|operator(\s+))?fun(\s+)([A-Za-z0-9_])(\s+)?\((.*)\)(\s+)({|=)/,
    type: 'keyword.function',
  },
  { pattern: /println\((.*)\)(\n|;)/, type: 'keyword.print' },
  // Variables
  { pattern: /(const)?(\s+)?val(\s+)(.*)(:(\s)(.*)(\?)?)?(\s+)=(\s+)/, type: 'keyword.variable' },
  { pattern: /^(\s+)?(inner|open|data)(\s+)class/, type: 'keyword' },
  { pattern: /^import(\s+)(.*)$/, type: 'meta.import', nearTop: true },
  { pattern: /typealias(\s+)(.*)(\s+)=/, type: 'keyword.control' },
  { pattern: /companion(\s+)object/, type: 'keyword' },
  { pattern: /when(\s+)(\((.*)\)\s+)?{$/, type: 'keyword.control' },
];
