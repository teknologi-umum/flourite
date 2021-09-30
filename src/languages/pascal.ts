import type { LanguagePattern } from '../types';

export const Pascal: LanguagePattern[] = [
  { pattern: /^program (.*);$/, type: 'meta.module', nearTop: true },
  { pattern: /var$/i, type: 'constant.type', nearTop: true },
  { pattern: /const$/i, type: 'constant.type', nearTop: true },
  { pattern: /type$/i, type: 'constant.type', nearTop: true },
  { pattern: /(write|writeln)(\s+)?(\((.*)\))?;/i, type: 'keyword.print' },
  { pattern: /^(\s*)?(function|procedure)(\s*)(.*)\((.*)\)(\s)?:(\s)?(.*);$/i, type: 'keyword.function' },
  { pattern: /end(\.|;)/i, type: 'keyword.control' },
  { pattern: /:(\s*)?(cardinal|shortint|smallint|word|extended|comp)(\s*);$/i, type: 'constant.type' },
  { pattern: /if(\s+)(.*)(\s+)then/i, type: 'keyword.control' },
  { pattern: /for(\s+)(.*):=(.*)(\s+)(downto|to)(\s+)(.*)(\s+)do/i, type: 'keyword.control' },
  { pattern: /with(\s+)(.*)(\s+)do/i, type: 'keyword.control' },
  { pattern: /repeat$/, type: 'keyword' },
  { pattern: /begin$/, type: 'keyword' },
  { pattern: /until(\s+)(.*);/i, type: 'keyword.control' },
  { pattern: /\w+(\s*)?:=(\s*)?.+;$/i, type: 'keyword.variable' },
];
