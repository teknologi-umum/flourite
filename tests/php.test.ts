import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('PHP', detectLang('echo "Hello world";'));
});

test('fizz buzz', () => {
  assert.equal(
    'PHP',
    detectLang(`<?php

  for ($i = 1; $i <= 100; $i++) {
    if ($i % 3 == 0) {
      echo "fizz";
    }
  
    if ($i % 5 == 0) {
      echo "buzz";
    }
  
    if ($i % 3 != 0 && $i % 5 != 0) {
      echo $i;
    }
  
    echo "\n";
  }`),
  );
});

test.run();
