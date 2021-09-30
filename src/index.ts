import type { LanguagePattern, LanguagePoints, Options, StatisticOutput } from './types';
import { C } from './languages/c';
import { CPP } from './languages/cpp';
import { CS } from './languages/cs';
import { CSS } from './languages/css';
import { Go } from './languages/go';
import { HTML } from './languages/html';
import { Java } from './languages/java';
import { Javascript } from './languages/javascript';
import { Julia } from './languages/julia';
import { Kotlin } from './languages/kotlin';
import { Lua } from './languages/lua';
import { Pascal } from './languages/pascal';
import { PHP } from './languages/php';
import { Python } from './languages/python';
import { Ruby } from './languages/ruby';
import { Rust } from './languages/rust';
import { SQL } from './languages/sql';
import { YAML } from './languages/yaml';
import { nearTop, getPoints } from './points';
import { convert } from './shiki';

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
  Kotlin,
  Lua,
  Pascal,
  PHP,
  Python,
  Ruby,
  Rust,
  SQL,
  YAML,
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
