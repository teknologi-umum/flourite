import type { LanguagePattern, LanguagePoints, Options, StatisticOutput } from './types';
import { C } from './languages/c';
import { CPP } from './languages/cpp';
import { CS } from './languages/cs';
import { CSS } from './languages/css';
import { Go } from './languages/go';
import { HTML } from './languages/html';
import { Java } from './languages/java';
import { Javascript } from './languages/javascript';
import { PHP } from './languages/php';
import { Python } from './languages/python';
import { Ruby } from './languages/ruby';
import { Julia } from './languages/julia';
import { Rust } from './languages/rust';
import { SQL } from './languages/sql';
import { nearTop, getPoints } from './points';
import { convert } from './shiki';

/**
 * A checker is an object with the following form:
 *  { pattern: /something/, points: 1 }
 * or if the pattern only matches code near the top of a given file:
 *  { pattern: /something/, points: 2, nearTop: true }
 *
 * Key: Language name.
 * Value: Array of checkers.
 *
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus points:   Almost unique to a given language.
 *  1 = Regular point:  Not unique to a given language.
 * -1 = Penalty point:  Does not match a given language.
 * Rare:
 * -50 = Bonus penalty points: Only used when two languages are mixed together,
 *  and one has a higher precedence over the other one.
 */
const languages: Record<string, LanguagePattern[]> = {
  C,
  'C++': CPP,
  'C#': CS,
  CSS,
  Go,
  HTML,
  Java,
  Javascript,
  Julia,
  PHP,
  Python,
  Ruby,
  Rust,
  SQL,
};

/**
 * Detects a programming language from a given string.
 * @param {String} snippet The code we're guessing
 * @param {Options} options Options
 * @returns {String|StatisticOutput} A String or a StatisticOutput format if `statistics: true`
 * @example
 * ```js
 * import flourite from 'flourite';
 * const detect = flourite(code);
 * ```
 * @see Supported Languages - https://github.com/teknologi-umum/flourite#detectable-languages
 */
function flourite(
  snippet: string,
  options: Options = { heuristic: true, statistics: false, shiki: false, noUnknown: false },
): StatisticOutput & string {
  let linesOfCode = snippet
    .replace(/\r\n?/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .split('\n');

  if (options.heuristic && linesOfCode.length > 500) {
    linesOfCode = linesOfCode.filter((_, index) => {
      if (nearTop(index, linesOfCode)) {
        return true;
      }
      return index % Math.ceil(linesOfCode.length / 500) === 0;
    });
  }

  const pairs = Object.keys(languages).map((key) => ({ language: key, checkers: languages[key] }));

  const results: LanguagePoints[] = [];
  for (let i = 0; i < pairs.length; i++) {
    const { language, checkers } = pairs[i];

    const pointsList: number[] = [];
    for (let j = 0; j < linesOfCode.length; j++) {
      if (!nearTop(j, linesOfCode)) {
        pointsList.push(
          getPoints(
            linesOfCode[j],
            checkers.filter((checker) => !checker.nearTop),
          ),
        );
      } else {
        pointsList.push(getPoints(linesOfCode[j], checkers));
      }
    }

    let points = 0;
    for (let k = 0; k < pointsList.length; k++) {
      points += pointsList[k];
    }

    results.push({ language, points });
  }

  if (!options.noUnknown) {
    results.push({ language: 'Unknown', points: 1 });
  }

  const bestResult = results.reduce((a, b) => (a.points >= b.points ? a : b), { points: 0, language: '' });
  const statistics: Record<string, number> = {};
  if (options.statistics) {
    for (let i = 0; i < results.length; i++) {
      statistics[results[i].language] = results[i].points;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      detected: options.shiki ? convert(bestResult.language) : bestResult.language,
      statistics,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return options.shiki ? convert(bestResult.language) : bestResult.language;
}

export type { Options, StatisticOutput };
export default flourite;
