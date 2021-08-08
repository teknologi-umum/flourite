import { C } from './languages/c';
import { CPP } from './languages/cpp';
import { CSS } from './languages/css';
import { Go } from './languages/go';
import { HTML } from './languages/html';
import { Java } from './languages/java';
import { Javascript } from './languages/javascript';
import { PHP } from './languages/php';
import { Python } from './languages/python';
import { Ruby } from './languages/ruby';

export interface LanguagePattern {
  pattern: string | RegExp;
  points: number;
  nearTop?: boolean;
}
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
let languages: Record<string, LanguagePattern[]> = {
  C,
  'C++': CPP,
  CSS,
  Go,
  HTML,
  Java,
  Javascript,
  PHP,
  Python,
  Ruby,
  Unknown: [],
};

function getPoints(language, lineOfCode, checkers) {
  return _.reduce(
    _.map(checkers, function (checker) {
      if (checker.pattern.test(lineOfCode)) {
        return checker.points;
      }
      return 0;
    }),
    function (memo, num) {
      return memo + num;
    },
    0,
  );
}

function detectLang(snippet, options) {
  let opts = _.defaults(options || {}, {
    heuristic: true,
    statistics: false,
  });

  let linesOfCode = snippet
    .replace(/\r\n?/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .split('\n');

  function nearTop(index) {
    if (linesOfCode.length <= 10) {
      return true;
    }
    return index < linesOfCode.length / 10;
  }

  if (opts.heuristic && linesOfCode.length > 500) {
    linesOfCode = linesOfCode.filter(function (lineOfCode, index) {
      if (nearTop(index)) {
        return true;
      }
      return index % Math.ceil(linesOfCode.length / 500) === 0;
    });
  }

  let pairs = _.keys(languages).map(function (key) {
    return { language: key, checkers: languages[key] };
  });

  let results = _.map(pairs, function (pairs) {
    let language = pairs.language;
    let checkers = pairs.checkers;

    if (language === 'Unknown') {
      return { language: 'Unknown', points: 1 };
    }

    let pointsList = linesOfCode.map(function (lineOfCode, index) {
      if (!nearTop(index)) {
        return getPoints(
          language,
          lineOfCode,
          _.reject(checkers, function (checker) {
            return checker.nearTop;
          }),
        );
      } else {
        return getPoints(language, lineOfCode, checkers);
      }
    });

    let points = _.reduce(pointsList, function (memo, num) {
      return memo + num;
    });

    return { language: language, points: points };
  });

  let bestResult = _.max(results, function (result) {
    return result.points;
  });

  if (opts.statistics) {
    let statistics = {};
    for (let result in results) {
      statistics.push([results[result].language, results[result].points]);
    }

    statistics.sort(function (a, b) {
      return b[1] - a[1];
    });
    return { detected: bestResult.language, statistics: statistics };
  }

  return bestResult.language;
}

module.exports = detectLang;
