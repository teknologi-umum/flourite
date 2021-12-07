import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src";

test("hello world", () => {
  const code = detectLang(`fn main() {
    print!("Hello world!");
 }`);
  assert.equal(code.language, "Rust");
});

test("fizz buzz", () => {
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
  assert.equal(code.language, "Rust");
});

test("quick sort", () => {
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
  assert.equal(code.language, "Rust");
});

test("http", () => {
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
  assert.equal(code.language, "Rust");
});

test("fibonacci sequence", () => {
  const code = detectLang(`fn fib_tail_recursive(nth: usize) -> usize {
    fn fib_tail_iter(n: usize, prev_fib: usize, fib: usize) -> usize {
      match n {
        0 => prev_fib,
        n => fib_tail_iter(n - 1, fib, prev_fib + fib),
      }
    }
    fib_tail_iter(nth, 0, 1)
  }`);
  assert.equal(code.language, "Rust");
});

test("palindrome detection", () => {
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
  assert.equal(code.language, "Rust");
});

test("file input", () => {
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
  assert.equal(code.language, "Rust");
});

test("bubble sort", () => {
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
  assert.equal(code.language, "Rust");
});

test("heap sort", () => {
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
  assert.equal(code.language, "Rust");
});

test("ludic number", () => {
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
  assert.equal(code.language, "Rust");
});

test("floyd warshall algorithm", () => {
  const code = detectLang(`pub type Edge = (usize, usize);
 
  #[derive(Clone, Debug, PartialEq, Eq, Hash)]
  pub struct Graph<T> {
      size: usize,
      edges: Vec<Option<T>>,
  }
   
  impl<T> Graph<T> {
      pub fn new(size: usize) -> Self {
          Self {
              size,
              edges: std::iter::repeat_with(|| None).take(size * size).collect(),
          }
      }
   
      pub fn new_with(size: usize, f: impl FnMut(Edge) -> Option<T>) -> Self {
          let edges = (0..size)
              .flat_map(|i| (0..size).map(move |j| (i, j)))
              .map(f)
              .collect();
   
          Self { size, edges }
      }
   
      pub fn with_diagonal(mut self, mut f: impl FnMut(usize) -> Option<T>) -> Self {
          self.edges
              .iter_mut()
              .step_by(self.size + 1)
              .enumerate()
              .for_each(move |(vertex, edge)| *edge = f(vertex));
   
          self
      }
   
      pub fn size(&self) -> usize {
          self.size
      }
   
      pub fn edge(&self, edge: Edge) -> &Option<T> {
          let index = self.edge_index(edge);
          &self.edges[index]
      }
   
      pub fn edge_mut(&mut self, edge: Edge) -> &mut Option<T> {
          let index = self.edge_index(edge);
          &mut self.edges[index]
      }
   
      fn edge_index(&self, (row, col): Edge) -> usize {
          assert!(row < self.size && col < self.size);
          row * self.size() + col
      }
  }
   
  impl<T> std::ops::Index<Edge> for Graph<T> {
      type Output = Option<T>;
   
      fn index(&self, index: Edge) -> &Self::Output {
          self.edge(index)
      }
  }
   
  impl<T> std::ops::IndexMut<Edge> for Graph<T> {
      fn index_mut(&mut self, index: Edge) -> &mut Self::Output {
          self.edge_mut(index)
      }
  }
   
  #[derive(Clone, Debug, PartialEq, Eq)]
  pub struct Paths(Graph<usize>);
   
  impl Paths {
      pub fn new<T>(graph: &Graph<T>) -> Self {
          Self(Graph::new_with(graph.size(), |(i, j)| {
              graph[(i, j)].as_ref().map(|_| j)
          }))
      }
   
      pub fn vertices(&self, from: usize, to: usize) -> Path<'_> {
          assert!(from < self.0.size() && to < self.0.size());
   
          Path {
              graph: &self.0,
              from: Some(from),
              to,
          }
      }
   
      fn update(&mut self, from: usize, to: usize, via: usize) {
          self.0[(from, to)] = self.0[(from, via)];
      }
  }
   
  #[derive(Clone, Copy, Debug, PartialEq, Eq)]
  pub struct Path<'a> {
      graph: &'a Graph<usize>,
      from: Option<usize>,
      to: usize,
  }
   
  impl<'a> Iterator for Path<'a> {
      type Item = usize;
   
      fn next(&mut self) -> Option<Self::Item> {
          self.from.map(|from| {
              let result = from;
   
              self.from = if result != self.to {
                  self.graph[(result, self.to)]
              } else {
                  None
              };
   
              result
          })
      }
  }
   
  pub fn floyd_warshall<W>(mut result: Graph<W>) -> (Graph<W>, Option<Paths>)
  where
      W: Copy + std::ops::Add<W, Output = W> + std::cmp::Ord + Default,
  {
      let mut without_negative_cycles = true;
      let mut paths = Paths::new(&result);
      let n = result.size();
   
      for k in 0..n {
          for i in 0..n {
              for j in 0..n {
                  // Negative cycle detection with T::default as the negative boundary
                  if i == j && result[(i, j)].filter(|&it| it < W::default()).is_some() {
                      without_negative_cycles = false;
                      continue;
                  }
   
                  if let (Some(ik_weight), Some(kj_weight)) = (result[(i, k)], result[(k, j)]) {
                      let ij_edge = result.edge_mut((i, j));
                      let ij_weight = ik_weight + kj_weight;
   
                      if ij_edge.is_none() {
                          *ij_edge = Some(ij_weight);
                          paths.update(i, j, k);
                      } else {
                          ij_edge
                              .as_mut()
                              .filter(|it| ij_weight < **it)
                              .map_or((), |it| {
                                  *it = ij_weight;
                                  paths.update(i, j, k);
                              });
                      }
                  }
              }
          }
      }
   
      (result, Some(paths).filter(|_| without_negative_cycles)) // No paths for negative cycles
  }
   
  fn format_path<T: ToString>(path: impl Iterator<Item = T>) -> String {
      path.fold(String::new(), |mut acc, x| {
          if !acc.is_empty() {
              acc.push_str(" -> ");
          }
   
          acc.push_str(&x.to_string());
          acc
      })
  }
   
  fn print_results<W, V>(weights: &Graph<W>, paths: Option<&Paths>, vertex: impl Fn(usize) -> V)
  where
      W: std::fmt::Display + Default + Eq,
      V: std::fmt::Display,
  {
      let n = weights.size();
   
      for from in 0..n {
          for to in 0..n {
              if let Some(weight) = &weights[(from, to)] {
                  // Skip trivial information (i.e., default weight on the diagonal)
                  if from == to && *weight == W::default() {
                      continue;
                  }
   
                  println!(
                      "{} -> {}: {} \t{}",
                      vertex(from),
                      vertex(to),
                      weight,
                      format_path(paths.iter().flat_map(|p| p.vertices(from, to)).map(&vertex))
                  );
              }
          }
      }
  }
   
  fn main() {
      let graph = {
          let mut g = Graph::new(4).with_diagonal(|_| Some(0));
          g[(0, 2)] = Some(-2);
          g[(1, 0)] = Some(4);
          g[(1, 2)] = Some(3);
          g[(2, 3)] = Some(2);
          g[(3, 1)] = Some(-1);
          g
      };
   
      let (weights, paths) = floyd_warshall(graph);
      // Fixup the vertex name (as we use zero-based indices)
      print_results(&weights, paths.as_ref(), |index| index + 1);
  }`);
  assert.equal(code.language, "Rust");
});

test("fivenum", () => {
  const code = detectLang(`#[derive(Debug)]
    struct FiveNum {
        minimum: f64,
        lower_quartile: f64,
        median: f64,
        upper_quartile: f64,
        maximum: f64,
    }
        
    fn median(samples: &[f64]) -> f64 {
        // input is already sorted
        let n = samples.len();
        let m = n / 2;
        if n % 2 == 0 {
            (samples[m] + samples[m - 1]) / 2.0
        } else {
            samples[m]
        }
    }
        
    fn fivenum(samples: &[f64]) -> FiveNum {
        let mut xs = samples.to_vec();
        xs.sort_by(|x, y| x.partial_cmp(y).unwrap());
        
        let m = xs.len() / 2;
        
        FiveNum {
            minimum: xs[0],
            lower_quartile: median(&xs[0..(m + (xs.len() % 2))]),
            median: median(&xs),
            upper_quartile: median(&xs[m..]),
            maximum: xs[xs.len() - 1],
        }
    }
    fn main() {
        let inputs = vec![
            vec![15., 6., 42., 41., 7., 36., 49., 40., 39., 47., 43.],
            vec![36., 40., 7., 39., 41., 15.],
            vec![
                0.14082834,
                0.09748790,
                1.73131507,
                0.87636009,
                -1.95059594,
                0.73438555,
                -0.03035726,
                1.46675970,
                -0.74621349,
                -0.72588772,
                0.63905160,
                0.61501527,
                -0.98983780,
                -1.00447874,
                -0.62759469,
                0.66206163,
                1.04312009,
                -0.10305385,
                0.75775634,
                0.32566578,
            ],
        ];
        
        for input in inputs {
            let result = fivenum(&input);
            println!("Fivenum",);
            println!("  Minumum: {}", result.minimum);
            println!("  Lower quartile: {}", result.lower_quartile);
            println!("  Median: {}", result.median);
            println!("  Upper quartile: {}", result.upper_quartile);
            println!("  Maximum: {}", result.maximum);
        }
    }`);
  assert.equal(code.language, "Rust");
});

test.run();
