import type { LanguagePattern } from '../types';

export const Dart: LanguagePattern[] = [
  // Variable declaration
  {
    pattern:
      /^\s*(const|final|var|dynamic|late)?\s*(int|double|String|bool|List<.+>|HashMap<.+>|Iterator<.+>|Set<.+>)?(\?)?\s\w+(\s=\s.+)?(;|,)$/,
    type: 'keyword.variable',
  },
  { pattern: /stdout.write(.+)/, type: 'keyword.print' },
  { pattern: /^import\s("|')dart:\w+("|')/, type: 'meta.import', nearTop: true },
  { pattern: /^import\s("|')package:\w+("|')/, type: 'meta.import', nearTop: true },
  { pattern: /^library\s\w+;/, type: 'meta.module', nearTop: true },
  { pattern: /^(void\s)?main\(\)\s(async\s)?{/, type: 'keyword.function' },
  // function with type definition
  {
    pattern: /^\s*(List<.+>|HashMap<.+>|int|double|String|bool|void|Iterator<.+>|Set<.+>)\s\w+\(.+\)\s*\{$/,
    type: 'keyword.function',
  },
  // arrow function
  {
    pattern: /^\s*(int|double|String|bool|List<.+>|HashMap<.+>|Iterator<.+>|Set<.+>)\s\w+\(.+\)\s=>(.+);$/,
    type: 'keyword.function',
  },
  { pattern: /new\s(List|Map)<\w+>\(\);$/, type: 'keyword.variable' },
  { pattern: /^\s*print\(.+\);$/, type: 'keyword.print' },
  {
    pattern: /^(abstract\s)?class\s\w+\s(extends\s\w+\s)?(with\s\w+\s)?(implements\s\w+\s)?{(})?$/,
    type: 'keyword.control',
  },
  { pattern: /get\s\w+=>\w+/, type: 'keyword.control' },
  { pattern: /^\s*@override$/, type: 'keyword.control' },
  { pattern: /set\s\w+\(.+\)/, type: 'keyword.control' },
  { pattern: /^\s*Future<w+>\s\w+\(.+\)\sasync/, type: 'keyword.control' },
  { pattern: /^\s*await\sfor\s\(.+\)\s{/, type: 'keyword.control' },
  { pattern: /^\s*typedef\s.+\s=/, type: 'keyword.control' },
  // Avoiding confusion with C
  { pattern: /\slong\s/, type: 'not' },
  { pattern: /\s*function\s/, type: 'not' },
  // Avoiding confusion with Java
  { pattern: /ArrayList/, type: 'not' },
];
