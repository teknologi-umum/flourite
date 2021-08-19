import type { LanguagePattern } from '../types';

export const CS: LanguagePattern[] = [
  { pattern: /(using\s)?System(\..*)?(;)?/, points: 2 },
  { pattern: /Console\.(WriteLine|Write)\s*\(/, points: 5 },
  { pattern: /(public\s)?((partial|static|delegate)\s)?class\s/, points: 2 },
  // Modifiers
  { pattern: /(extern|override|sealed|readonly|virtual|volatile)/, points: 2 },
  { pattern: /namespace\s(.*)(\.(.*))?(\s{)?/, points: 2 },
  // Regions
  { pattern: /(#region\s|#endregion\n)/, points: 2 },
  // Functions
  { pattern: /(public|private|protected|internal)\s/, points: 1 },
  // Variable declaration
  { pattern: /(const\s)?(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)(\[\])?\s(.*)\s=\s/, points: 1},
  // Avoiding Java's String
  { pattern: /(String|extends|throws|@Attribute)/, points: -50 },
]