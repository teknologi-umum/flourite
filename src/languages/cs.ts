import type { LanguagePattern } from '../types';

export const CS: LanguagePattern[] = [
  { pattern: /using\sSystem(\..*)?(;)?/, type: 'meta.import' },
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: 'keyword.print' },
  { pattern: /Console.ReadLine()/, type: 'keyword.input' },
  { pattern: /(public\s)?((partial|static|delegate)\s)?class\s/, type: 'keyword' },
  // Modifiers
  { pattern: /(extern|override|sealed|readonly|virtual|volatile)/, type: 'keyword.other' },
  { pattern: /namespace\s(.*)(\.(.*))?(\s{)?/, type: 'keyword' },
  // Regions
  { pattern: /(#region(\s.*)?|#endregion\n)/, type: 'section.scope' },
  // Functions
  { pattern: /(public|private|protected|internal)\s/, type: 'keyword.visibility' },
  // class keyword
  { pattern: /class\s+\w+/, type: 'keyword' },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)/, type: 'keyword.control' },
  // while loop
  { pattern: /while\s+\(.+\)/, type: 'keyword.control' },
  // Variable declaration
  {
    pattern:
      /(const\s)?(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)(\[\])?\s(.*)\s=\s(.*);/,
    type: 'constant.type',
  },
  // Lists
  {
    pattern:
      /(new|this\s)?(List|IEnumerable)<(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)>/,
    type: 'constant.dictionary',
  },
  // Macro
  { pattern: /#define\s(.*)/, type: 'macro' },
  // Plus point if you're doing PascalCase
  { pattern: /\s([A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*)\s=/, type: 'macro' },
  // Avoiding Java confusion
  { pattern: /(extends|throws|@Attribute)/, type: 'not' },
  { pattern: /System\.(in|out)\.\w+/, type: 'not' },
];
