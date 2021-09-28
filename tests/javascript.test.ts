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

test('bubble sort', () => {
  const code = detectLang(`Array.prototype.bubblesort = function() {
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i<this.length; i++) {
            if (this[i-1] > this[i]) {
                done = false;
                [this[i-1], this[i]] = [this[i], this[i-1]]
            }
        }
    }
    return this;
  }`);
  assert.equal(code, 'Javascript');
});

test('heap sort', () => {
  const code = detectLang(`function heapSort(arr) {
      heapify(arr)
      let end = arr.length - 1
      while (end > 0) {
          [arr[end], arr[0]] = [arr[0], arr[end]]
          end--
          siftDown(arr, 0, end)
      }
  }
  
  function heapify(arr) {
      let start = Math.floor(arr.length/2) - 1
  
      while (start >= 0) {
          siftDown(arr, start, arr.length - 1)
          start--
      }
  }
  
  function siftDown(arr, startPos, endPos) {
      let rootPos = startPos
  
      while (rootPos * 2 + 1 <= endPos) {
          childPos = rootPos * 2 + 1
          if (childPos + 1 <= endPos && arr[childPos] < arr[childPos + 1]) {
              childPos++
          }
          if (arr[rootPos] < arr[childPos]) {
              [arr[rootPos], arr[childPos]] = [arr[childPos], arr[rootPos]]
              rootPos = childPos
          } else {
              return
          }
      }
  }
  test('rosettacode', () => {
      let arr = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8,]
      heapSort(arr)
      expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  })`);
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

test('ludic numbers', () => {
  const code = detectLang(`/**
  * Boilerplate to simply get an array filled between 2 numbers
  * @param {!number} s Start here (inclusive)
  * @param {!number} e End here (inclusive)
  */
 const makeArr = (s, e) => new Array(e + 1 - s).fill(s).map((e, i) => e + i);
  
 /**
  * Remove every n-th element from the given array
  * @param {!Array} arr
  * @param {!number} n
  * @return {!Array}
  */
 const filterAtInc = (arr, n) => arr.filter((e, i) => (i + 1) % n);
  
 /**
  * Generate ludic numbers
  * @param {!Array} arr
  * @param {!Array} result
  * @return {!Array}
  */
 const makeLudic = (arr, result) => {
   const iter = arr.shift();
   result.push(iter);
   return arr.length ? makeLudic(filterAtInc(arr, iter), result) : result;
 };
  
 /**
  * Our Ludic numbers. This is a bit of a cheat, as we already know beforehand
  * up to where our seed array needs to go in order to exactly get to the
  * 2005th Ludic number.
  * @type {!Array<!number>}
  */
 const ludicResult = makeLudic(makeArr(2, 21512), [1]);
  
  
 // Below is just logging out the results.
 /**
  * Given a number, return a function that takes an array, and return the
  * count of all elements smaller than the given
  * @param {!number} n
  * @return {!Function}
  */
 const smallerThanN = n => arr => {
   return arr.reduce((p,c) => {
     return c <= n ? p + 1 : p
   }, 0)
 };
 const smallerThan1K = smallerThanN(1000);
  
 console.log('\nFirst 25 Ludic Numbers:');
 console.log(ludicResult.filter((e, i) => i < 25).join(', '));
  
 console.log('\nTotal Ludic numbers smaller than 1000:');
 console.log(smallerThan1K(ludicResult));
  
 console.log('\nThe 2000th to 2005th ludic numbers:');
 console.log(ludicResult.filter((e, i) => i > 1998).join(', '));
  
 console.log('\nTriplets smaller than 250:');
 ludicResult.forEach(e => {
   if (e + 6 < 250 && ludicResult.indexOf(e + 2) > 0 && ludicResult.indexOf(e + 6) > 0) {
     console.log([e, e + 2, e + 6].join(', '));
   }
 });`);
  assert.equal(code, 'Javascript');
});

test('gamma function', () => {
  const code = detectLang(`function gamma(x) {
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
 
    var g = 7;
    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    }
 
    x -= 1;
    var a = p[0];
    var t = x + g + 0.5;
    for (var i = 1; i < p.length; i++) {
        a += p[i] / (x + i);
    }
 
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}`);
  assert.equal(code, 'Javascript');
});

test('fivenum', () => {
  const code = detectLang(`function median(arr) {
    let mid = Math.floor(arr.length / 2);
    return (arr.length % 2 == 0) ? (arr[mid-1] + arr[mid]) / 2 : arr[mid];
  }
   
  Array.prototype.fiveNums = function() {
    this.sort(function(a, b) { return a - b} );
    let mid = Math.floor(this.length / 2),
        loQ = (this.length % 2 == 0) ? this.slice(0, mid) : this.slice(0, mid+1),
        hiQ = this.slice(mid);
    return [ this[0],
             median(loQ),
             median(this),
             median(hiQ),
             this[this.length-1] ];
  }
   
  // testing
  let test = [15, 6, 42, 41, 7, 36, 49, 40, 39, 47, 43];
  console.log( test.fiveNums() );
   
  test = [0, 0, 1, 2, 63, 61, 27, 13];
  console.log( test.fiveNums() );
   
  test = [ 0.14082834,  0.09748790,  1.73131507,  0.87636009, -1.95059594,
           0.73438555, -0.03035726,  1.46675970, -0.74621349, -0.72588772,
           0.63905160,  0.61501527, -0.98983780, -1.00447874, -0.62759469,
           0.66206163,  1.04312009, -0.10305385,  0.75775634,  0.32566578];
  console.log( test.fiveNums() );`);
  assert.equal(code, 'Javascript');
});

test.run();
