import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('echo "Hello world";');
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
  }`);
  assert.equal(code, 'PHP');
});

test('sql based authentication', () => {
  const code =
    detectLang(`function connect_db($database, $db_user, $db_password, $host = 'localhost', $port = NULL, $die = false) {
    // Returns a MySQL link identifier (handle) on success
    // Returns false or dies() on error depending on the setting of parameter $die
    // Parameter $die configures error handling, setting it any non-false value will die() on error
    // Parameters $host, $port and $die have sensible defaults and are not usually required
   
    if(!$db_handle = @mysql_connect($host.($port ? ':'.$port : ''), $db_user, $db_password)) {
      if($die)
        die("Can't connect to MySQL server:\r\n".mysql_error());
      else
        return false;
    }
    if(!@mysql_select_db($database, $db_handle)) {
      if($die)
        die("Can't select database '$database':\r\n".mysql_error());
      else
        return false;
    }
    return $db_handle;
  }
   
  function create_user($username, $password, $db_handle) {
    // Returns the record ID on success or false on failure
    // Username limit is 32 characters (part of spec)
    if(strlen($username) > 32)
      return false;
   
    // Salt limited to ASCII 32 thru 254 (not part of spec)
    $salt = '';
    do {
      $salt .= chr(mt_rand(32, 254));
    } while(strlen($salt) < 16);
   
    // Create pass_md5
    $pass_md5 = md5($salt.$password);
   
    // Make it all binary safe
    $username = mysql_real_escape_string($username);
    $salt = mysql_real_escape_string($salt);
   
    // Try to insert it into the table - Return false on failure
    if(!@mysql_query("INSERT INTO users (username,pass_salt,pass_md5) VALUES('$username','$salt','$pass_md5')", $db_handle))
      return false;
   
    // Return the record ID
    return mysql_insert_id($db_handle);
  }
   
  function authenticate_user($username, $password, $db_handle) {
    // Checks a username/password combination against the database
    // Returns false on failure or the record ID on success
   
    // Make the username parmeter binary-safe
    $safe_username = mysql_real_escape_string($username);
   
    // Grab the record (if it exists) - Return false on failure
    if(!$result = @mysql_query("SELECT * FROM users WHERE username='$safe_username'", $db_handle))
      return false;
   
    // Grab the row
    $row = @mysql_fetch_assoc($result);
   
    // Check the password and return false if incorrect
    if(md5($row['pass_salt'].$password) != $row['pass_md5'])
      return false;
   
    // Return the record ID
    return $row['userid'];
  }`);
  assert.equal(code, 'PHP');
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
  echo implode(',',$arr);`);
  assert.equal(code, 'PHP');
});

test('bubble sort', () => {
  const code = detectLang(`function bubbleSort(array $array){
    foreach($array as $i => &$val){
        foreach($array as $k => &$val2){
            if($k <= $i)
                continue;
            if($val > $val2) {
                list($val, $val2) = [$val2, $val];
                break;
            }
        }
    }
    return $array;
  }`);
  assert.equal(code, 'PHP');
});

test('merge sort', () => {
  const code = detectLang(`function mergesort($arr){
    if(count($arr) == 1 ) return $arr;
    $mid = count($arr) / 2;
      $left = array_slice($arr, 0, $mid);
      $right = array_slice($arr, $mid);
    $left = mergesort($left);
    $right = mergesort($right);
    return merge($left, $right);
  }
   
  function merge($left, $right){
    $res = array();
    while (count($left) > 0 && count($right) > 0){
      if($left[0] > $right[0]){
        $res[] = $right[0];
        $right = array_slice($right , 1);
      }else{
        $res[] = $left[0];
        $left = array_slice($left, 1);
      }
    }
    while (count($left) > 0){
      $res[] = $left[0];
      $left = array_slice($left, 1);
    }
    while (count($right) > 0){
      $res[] = $right[0];
      $right = array_slice($right, 1);
    }
    return $res;
  }
   
  $arr = array( 1, 5, 2, 7, 3, 9, 4, 6, 8);
  $arr = mergesort($arr);
  echo implode(',',$arr);`);
  assert.equal(code, 'PHP');
});

test('bogo sort', () => {
  const code = detectLang(`function bogosort($l) {
      while (!in_order($l))
          shuffle($l);
      return $l;
  }
  
  function in_order($l) {
      for ($i = 1; $i < count($l); $i++)
          if ($l[$i] < $l[$i-1])
              return FALSE;
      return TRUE;
  }`);
  assert.equal(code, 'PHP');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`<?php
  $graph = array();
  for ($i = 0; $i < 10; ++$i) {
      $graph[] = array();
      for ($j = 0; $j < 10; ++$j)
          $graph[$i][] = $i == $j ? 0 : 9999999;
  }
   
  for ($i = 1; $i < 10; ++$i) {
      $graph[0][$i] = $graph[$i][0] = rand(1, 9);
  }
   
  for ($k = 0; $k < 10; ++$k) {
      for ($i = 0; $i < 10; ++$i) {
          for ($j = 0; $j < 10; ++$j) {
              if ($graph[$i][$j] > $graph[$i][$k] + $graph[$k][$j])
                  $graph[$i][$j] = $graph[$i][$k] + $graph[$k][$j];
          }
      }
  }
   
  print_r($graph);
  ?>`);
  assert.equal(code, 'PHP');
});

test.run();
