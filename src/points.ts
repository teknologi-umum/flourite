import type { LanguagePattern, Type } from './types';

/**
 * Get points from a language using regular expressions.
 * @param {String} lineOfCode
 * @param {LanguagePattern[]} checkers
 * @returns {Number}
 */
export function getPoints(lineOfCode: string, checkers: LanguagePattern[]): number {
  const checker: number[] = checkers.map((o) => {
    if (o.pattern.test(lineOfCode)) return parsePoint(o.type);
    return 0;
  });
  const reduced = checker.reduce((memo, num) => memo + num, 0);
  return reduced;
}

/**
 * Checks if a given string is near top of the code or not.
 * @param {Number} index
 * @param {String[]} linesOfCode
 * @returns {Boolean}
 */
export function nearTop(index: number, linesOfCode: string[]): boolean {
  if (linesOfCode.length <= 10) {
    return true;
  }
  return index < linesOfCode.length / 10;
}

function parsePoint(type: Type) {
  switch (type) {
    case 'keyword.print':
    case 'meta.import':
    case 'meta.module':
      return 5;
    case 'keyword.function':
    case 'constant.null':
      return 4;
    case 'constant.type':
    case 'constant.string':
    case 'constant.numeric':
    case 'constant.boolean':
    case 'constant.dictionary':
    case 'constant.array':
    case 'keyword.variable':
      return 3;
    case 'section.scope':
    case 'keyword.other':
    case 'keyword.operator':
    case 'keyword.control':
    case 'keyword.visibility':
    case 'keyword':
      return 2;
    case 'comment.block':
    case 'comment.line':
    case 'comment.documentation':
    case 'macro':
      return 1;
    case 'not':
    default:
      return -20;
  }
}
