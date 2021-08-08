import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('Javascript', detectLang('console.log("Hello world!");'));
});

test('fizz buzz', () => {
  assert.equal(
    'Javascript',
    detectLang(`console.log(
    Array.apply(null, { length: 100 })
      .map(Number.call, Number)
      .map(function (n) {
        return n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : n;
      }),
  );
  `),
  );
});

test.run();
