import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('echo "Hello world";')
  assert.equal(code, 'PHP');
});

test('fizz buzz', () => {
  const code = detectLang(`<?php

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
  }`)
  assert.equal(
    code, 'PHP'
  );
});

test('quick sort', () => {
  const code = detectLang(`function quicksort($arr){
    $lte = $gt = array();
    if(count($arr) < 2){
      return $arr;
    }
    $pivot_key = key($arr);
    $pivot = array_shift($arr);
    foreach($arr as $val){
      if($val <= $pivot){
        $lte[] = $val;
      } else {
        $gt[] = $val;
      }
    }
    return array_merge(quicksort($lte),array($pivot_key=>$pivot),quicksort($gt));
  }
   
  $arr = array(1, 3, 5, 7, 9, 8, 6, 4, 2);
  $arr = quicksort($arr);
  echo implode(',',$arr);`)
  assert.equal(code, 'PHP')
})

test.run();
