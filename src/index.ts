import type { LanguagePattern, LanguagePoints, Options, DetectedLanguage } from './types';
import { C } from './languages/c';
import { Clojure } from './languages/clojure';
import { CPP } from './languages/cpp';
import { CS } from './languages/cs';
import { CSS } from './languages/css';
import { Dockerfile } from './languages/dockerfile';
import { Elixir } from './languages/elixir';
import { Go } from './languages/go';
import { HTML } from './languages/html';
import { Java } from './languages/java';
import { Javascript } from './languages/javascript';
import { Julia } from './languages/julia';
import { JSON } from './languages/json';
import { Kotlin } from './languages/kotlin';
import { Lua } from './languages/lua';
import { Markdown } from './languages/markdown';
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
  Clojure,
  'C++': CPP,
  'C#': CS,
  CSS,
  Dockerfile,
  Elixir,
  Go,
  HTML,
  Java,
  Javascript,
  Julia,
  JSON,
  Kotlin,
  Lua,
  Markdown,
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
 * @returns {DetectedLanguage} An object of DetectedLanguage
 * @example
 * ```js
 * import flourite from 'flourite';
 * const detect = flourite(code);
 * ```
 * @see Supported Languages - https://github.com/teknologi-umum/flourite#detectable-languages
 */
function flourite(
  snippet: string,
  options: Options = { heuristic: true, shiki: false, noUnknown: false },
): DetectedLanguage {
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

    let points = 0;
    for (let j = 0; j < linesOfCode.length; j++) {
      // fast return if the current line of code is empty or contains only spaces
      if (linesOfCode[j].match(/^\s*$/)) {
        continue;
      }

      if (!nearTop(j, linesOfCode)) {
        points += getPoints(
          linesOfCode[j],
          checkers.filter((checker) => !checker.nearTop),
        );
      } else {
        points += getPoints(linesOfCode[j], checkers);
      }
    }

    results.push({ language, points });
  }

  if (!options.noUnknown) {
    results.push({ language: 'Unknown', points: 1 });
  }

  const bestResult = results.reduce((a, b) => (a.points >= b.points ? a : b), { points: 0, language: '' });
  const statistics: Record<string, number> = {};

  for (let i = 0; i < results.length; i++) {
    statistics[results[i].language] = results[i].points;
  }

  return {
    language: options.shiki ? convert(bestResult.language) : bestResult.language,
    statistics,
    linesOfCode: linesOfCode.length,
  };
}

export type { Options, DetectedLanguage };
export default flourite;
