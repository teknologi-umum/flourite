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

test('bubble sort', () => {
  const code = detectLang(`fn bubble_sort<T: Ord>(values: &mut[T]) {
      let mut n = values.len();
      let mut swapped = true;
  
      while swapped {
          swapped = false;
  
          for i in 1..n {
              if values[i - 1] > values[i] {
                  values.swap(i - 1, i);
                  swapped = true;
              }
          }
  
          n = n - 1;
      }
  }
  
  fn main() {
      // Sort numbers.
      let mut numbers = [8, 7, 1, 2, 9, 3, 4, 5, 0, 6];
      println!("Before: {:?}", numbers);
  
      bubble_sort(&mut numbers);
      println!("After: {:?}", numbers);
  
      // Sort strings.
      let mut strings = ["empty", "beach", "art", "car", "deal"];
      println!("Before: {:?}", strings);
  
      bubble_sort(&mut strings);
      println!("After: {:?}", strings);
  }`);
  assert.equal(code, 'Rust');
});

test('heap sort', () => {
  const code = detectLang(`fn main() {
      let mut v = [4, 6, 8, 1, 0, 3, 2, 2, 9, 5];
      heap_sort(&mut v, |x, y| x < y);
      println!("{:?}", v);
  }
  
  fn heap_sort<T, F>(array: &mut [T], order: F)
  where
      F: Fn(&T, &T) -> bool,
  {
      let len = array.len();
      // Create heap
      for start in (0..len / 2).rev() {
          shift_down(array, &order, start, len - 1)
      }
  
      for end in (1..len).rev() {
          array.swap(0, end);
          shift_down(array, &order, 0, end - 1)
      }
  }
  
  fn shift_down<T, F>(array: &mut [T], order: &F, start: usize, end: usize)
  where
      F: Fn(&T, &T) -> bool,
  {
      let mut root = start;
      loop {
          let mut child = root * 2 + 1;
          if child > end {
              break;
          }
          if child + 1 <= end && order(&array[child], &array[child + 1]) {
              child += 1;
          }
          if order(&array[root], &array[child]) {
              array.swap(root, child);
              root = child
          } else {
              break;
          }
      }
  }`);
  assert.equal(code, 'Rust');
});

test('ludic number', () => {
  const code = detectLang(`const ARRAY_MAX: usize = 25_000;
  const LUDIC_MAX: usize = 2100;
   
  /// Calculates and returns the first \`LUDIC_MAX\` Ludic numbers.
  ///
  /// Needs a sufficiently large \`ARRAY_MAX\`.
  fn ludic_numbers() -> Vec<usize> {
      // The first two Ludic numbers
      let mut numbers = vec![1, 2];
      // We start the array with an immediate first removal to reduce memory usage by
      // collecting only odd numbers.
      numbers.extend((3..ARRAY_MAX).step_by(2));
   
      // We keep the correct Ludic numbers in place, removing the incorrect ones.
      for ludic_idx in 2..LUDIC_MAX {
          let next_ludic = numbers[ludic_idx];
   
          // We remove incorrect numbers by counting the indices after the correct numbers.
          // We start from zero and keep until we reach the potentially incorrect numbers.
          // Then we keep only those not divisible by the \`next_ludic\`.
          let mut idx = 0;
          numbers.retain(|_| {
              let keep = idx <= ludic_idx || (idx - ludic_idx) % next_ludic != 0;
              idx += 1;
              keep
          });
      }
   
      numbers
  }
   
  fn main() {
      let ludic_numbers = ludic_numbers();
   
      print!("First 25: ");
      print_n_ludics(&ludic_numbers, 25);
      println!();
      print!("Number of Ludics below 1000: ");
      print_num_ludics_upto(&ludic_numbers, 1000);
      println!();
      print!("Ludics from 2000 to 2005: ");
      print_ludics_from_to(&ludic_numbers, 2000, 2005);
      println!();
      println!("Triplets below 250: ");
      print_triplets_until(&ludic_numbers, 250);
  }
   
  /// Prints the first \`n\` Ludic numbers.
  fn print_n_ludics(x: &[usize], n: usize) {
      println!("{:?}", &x[..n]);
  }
   
  /// Calculates how many Ludic numbers are below \`max_num\`.
  fn print_num_ludics_upto(x: &[usize], max_num: usize) {
      let num = x.iter().take_while(|&&i| i < max_num).count();
      println!("{}", num);
  }
   
  /// Prints Ludic numbers between two numbers.
  fn print_ludics_from_to(x: &[usize], from: usize, to: usize) {
      println!("{:?}", &x[from - 1..to - 1]);
  }
   
  /// Calculates triplets until a certain Ludic number.
  fn triplets_below(ludics: &[usize], limit: usize) -> Vec<(usize, usize, usize)> {
      ludics
          .iter()
          .enumerate()
          .take_while(|&(_, &num)| num < limit)
          .filter_map(|(idx, &number)| {
              let triplet_2 = number + 2;
              let triplet_3 = number + 6;
   
              // Search for the other two triplet numbers.  We know they are larger than
              // \`number\` so we can give the searches lower bounds of \`idx + 1\` and
              // \`idx + 2\`.  We also know that the \`n + 2\` number can only ever be two
              // numbers away from the previous and the \`n + 6\` number can only be four
              // away (because we removed some in between).  Short circuiting and doing
              // the check more likely to fail first are also useful.
              let is_triplet = ludics[idx + 1..idx + 3].binary_search(&triplet_2).is_ok()
                  && ludics[idx + 2..idx + 5].binary_search(&triplet_3).is_ok();
   
              if is_triplet {
                  Some((number, triplet_2, triplet_3))
              } else {
                  None
              }
          })
          .collect()
  }
   
  /// Prints triplets until a certain Ludic number.
  fn print_triplets_until(ludics: &[usize], limit: usize) {
      for (number, triplet_2, triplet_3) in triplets_below(ludics, limit) {
          println!("{} {} {}", number, triplet_2, triplet_3);
      }
  }
   `);
  assert.equal(code, 'Rust');
});

test.run();
