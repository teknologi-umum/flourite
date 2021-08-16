import type { LanguagePattern } from './types';

/**
 * Get points from a language using regular expressions.
 * @param {String} lineOfCode
 * @param {LanguagePattern[]} checkers
 * @returns {Number}
 */
export function getPoints(lineOfCode: string, checkers: LanguagePattern[]): number {
  const checker: number[] = checkers.map((o) => {
    if (o.pattern.test(lineOfCode)) return o.points;
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
