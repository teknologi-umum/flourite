import type { LanguagePattern } from './types';
/**
 * TODO: FILL THIS
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
 * TODO: FILL THIS
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
