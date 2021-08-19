import type { LanguagePattern } from '../types';

export const CS: LanguagePattern[] = [
  { pattern: /using\sSystem(\..*)?(;)?/, points: 2 },
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, points: 2 },
  { pattern: /(public\s)?((partial|static|delegate)\s)?class\s/, points: 2 },
  // Modifiers
  { pattern: /(extern|override|sealed|readonly|virtual|volatile)/, points: 2 },
  { pattern: /namespace\s(.*)(\.(.*))?(\s{)?/, points: 2 },
  // Regions
  { pattern: /(#region(\s.*)?|#endregion\n)/, points: 2 },
  // Functions
  { pattern: /(public|private|protected|internal)\s/, points: 1 },
  // Variable declaration
  {
    pattern:
      /(const\s)?(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)(\[\])?\s(.*)\s=\s(.*);/,
    points: 1,
  },
  // Lists
  {
    pattern:
      /(new|this\s)?(List|IEnumerable)<(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)>/,
    points: 2,
  },
  // Macro
  { pattern: /#define\s(.*)/, points: 1 },
  // Plus point if you're doing PascalCase
  { pattern: /\s([A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*)\s=/, points: 1 },
  // Avoiding Java confusion
  { pattern: /(extends|throws|@Attribute)/, points: -1 },
  { pattern: /System\.(in|out)\.\w+/, points: -50 },
];
