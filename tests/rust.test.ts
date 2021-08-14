import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src';

test('hello world', () => {
  const code = detectLang(`fn main() {
    print!("Hello world!");
 }`);
  assert.equal(code, 'Rust');
});

test('fizz buzz', () => {
  const code = detectLang(`fn main() {
    for i in 1..=100 {
        match (i % 3, i % 5) {
            (0, 0) => println!("fizzbuzz"),
            (0, _) => println!("fizz"),
            (_, 0) => println!("buzz"),
            (_, _) => println!("{}", i),
        }
    }
}`);
  assert.equal(code, 'Rust');
});

test('quick sort', () => {
  const code = detectLang(`fn main() {
    println!("Sort numbers in descending order");
    let mut numbers = [4, 65, 2, -31, 0, 99, 2, 83, 782, 1];
    println!("Before: {:?}", numbers);
 
    quick_sort(&mut numbers, &|x,y| x > y);
    println!("After:  {:?}\n", numbers);
 
    println!("Sort strings alphabetically");
    let mut strings = ["beach", "hotel", "airplane", "car", "house", "art"];
    println!("Before: {:?}", strings);
 
    quick_sort(&mut strings, &|x,y| x < y);
    println!("After:  {:?}\n", strings);
 
    println!("Sort strings by length");
    println!("Before: {:?}", strings);
 
    quick_sort(&mut strings, &|x,y| x.len() < y.len());
    println!("After:  {:?}", strings);    
}
 
fn quick_sort<T,F>(v: &mut [T], f: &F) 
    where F: Fn(&T,&T) -> bool
{
    let len = v.len();
    if len >= 2 {
        let pivot_index = partition(v, f);
        quick_sort(&mut v[0..pivot_index], f);
        quick_sort(&mut v[pivot_index + 1..len], f);
    }
}
 
fn partition<T,F>(v: &mut [T], f: &F) -> usize 
    where F: Fn(&T,&T) -> bool
{
    let len = v.len();
    let pivot_index = len / 2;
    let last_index = len - 1;
 
    v.swap(pivot_index, last_index);
 
    let mut store_index = 0;
    for i in 0..last_index {
        if f(&v[i], &v[last_index]) {
            v.swap(i, store_index);
            store_index += 1;
        }
    }
 
    v.swap(store_index, len - 1);
    store_index
}`);
  assert.equal(code, 'Rust');
});

test('http', () => {
  const code = detectLang(`//cargo-deps: hyper="0.6"
  // The above line can be used with cargo-script which makes cargo's dependency handling more convenient for small programs
  extern crate hyper;
   
  use std::io::Read;
  use hyper::client::Client;
   
  fn main() {
      let client = Client::new();
      let mut resp = client.get("http://rosettacode.org").send().unwrap();
      let mut body = String::new();
      resp.read_to_string(&mut body).unwrap();
      println!("{}", body);
  }
   `);
  assert.equal(code, 'Rust');
});

test('fibonacci sequence', () => {
  const code = detectLang(`fn fib_tail_recursive(nth: usize) -> usize {
    fn fib_tail_iter(n: usize, prev_fib: usize, fib: usize) -> usize {
      match n {
        0 => prev_fib,
        n => fib_tail_iter(n - 1, fib, prev_fib + fib),
      }
    }
    fib_tail_iter(nth, 0, 1)
  }`);
  assert.equal(code, 'Rust');
});

test('palindrome detection', () => {
  const code = detectLang(`fn is_palindrome(string: &str) -> bool {
    let half_len = string.len() / 2;
    string
        .chars()
        .take(half_len)
        .eq(string.chars().rev().take(half_len))
}
 
macro_rules! test {
    ( $( $x:tt ),* ) => { $( println!("'{}': {}", $x, is_palindrome($x)); )* };
}
 
fn main() {
    test!(
        "",
        "a",
        "ada",
        "adad",
        "ingirumimusnocteetconsumimurigni",
        "人人為我,我為人人",
        "Я иду с мечем, судия",
        "아들딸들아",
        "The quick brown fox"
    );
}`);
  assert.equal(code, 'Rust');
});

test('file input', () => {
  const code = detectLang(`use std::fs::File;
  use std::io::{self, Read,  Write};
  use std::path::Path;
  use std::{env, fmt, process};
   
  fn main() {
      let files: Vec<_> = env::args_os().skip(1).take(2).collect();
   
      if files.len() != 2 {
          exit_err("Both an input file and output file are required", 1);
      }
   
      copy(&files[0], &files[1]).unwrap_or_else(|e| exit_err(&e, e.raw_os_error().unwrap_or(-1)));
  }
   
  fn copy<P: AsRef<Path>>(infile: P, outfile: P) -> io::Result<()> {
      let mut vec = Vec::new();
   
      Ok(try!(File::open(infile)
           .and_then(|mut i| i.read_to_end(&mut vec))
           .and_then(|_| File::create(outfile))
           .and_then(|mut o| o.write_all(&vec))))
  }
   
  fn exit_err<T: fmt::Display>(msg: T, code: i32) -> ! {
      writeln!(&mut io::stderr(), "ERROR: {}", msg).expect("Could not write to stdout");
      process::exit(code);
  }`);
  assert.equal(code, 'Rust');
});

test.run();
