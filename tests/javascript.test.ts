import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('console.log("Hello world!");');
  assert.equal(code, 'Javascript');
});

test('fizz buzz', () => {
  const code = detectLang(`console.log(
    Array.apply(null, { length: 100 })
      .map(Number.call, Number)
      .map(function (n) {
        return n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : n;
      }),
  );
  `);
  assert.equal(code, 'Javascript');
});

test('quick sort', () => {
  const code = detectLang(`function sort(array, less) {
 
    function swap(i, j) {
      var t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
   
    function quicksort(left, right) {
   
      if (left < right) {
        var pivot = array[left + Math.floor((right - left) / 2)],
            left_new = left,
            right_new = right;
   
        do {
          while (less(array[left_new], pivot)) {
            left_new += 1;
          }
          while (less(pivot, array[right_new])) {
            right_new -= 1;
          }
          if (left_new <= right_new) {
            swap(left_new, right_new);
            left_new += 1;
            right_new -= 1;
          }
        } while (left_new <= right_new);
   
        quicksort(left, right_new);
        quicksort(left_new, right);
   
      }
    }
   
    quicksort(0, array.length - 1);
   
    return array;
  }`);
  assert.equal(code, 'Javascript');
});

test('http server', () => {
  const code = detectLang(`const http = require('http');
 
  http.get('http://rosettacode.org', (resp) => {
   
    let data = '';
   
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
   
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log("Data:", data);
    });
   
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });`);
  assert.equal(code, 'Javascript');
});

test.run();
