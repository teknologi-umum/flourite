import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('puts "Hello world"');
  assert.equal(code, 'Ruby');
});

test('fizz buzz', () => {
  const code = detectLang(`1.step(100,1) do |i|
  if (i % 5) == 0 && (i % 3) ==0
      puts 'FizzBuzz'
  elsif (i % 5) == 0
      puts 'Buzz'
  elsif (i % 3) == 0
      puts 'Fizz'
  else
      puts i
  end
end`);
  assert.equal(code, 'Ruby');
});

// FIXME: This detects as Java. It should be Ruby.
test.skip('quick sort', () => {
  const code = detectLang(`class Array
  def quick_sort
    return self if length <= 1
    pivot = self[0]
    less, greatereq = self[1..-1].partition { |x| x < pivot }
    less.quick_sort + [pivot] + greatereq.quick_sort
  end
end`);
  assert.equal(code, 'Ruby');
});

test('bubble sort', () => {
  const code = detectLang(`class Array
    def bubblesort1!
      length.times do |j|
        for i in 1...(length - j)
          if self[i] < self[i - 1]
            self[i], self[i - 1] = self[i - 1], self[i]
          end
        end
      end
      self
    end
    def bubblesort2!
      each_index do |index|
        (length - 1).downto( index ) do |i|
          self[i-1], self[i] = self[i], self[i-1] if self[i-1] < self[i]
        end
      end
      self
    end
  end
  ary = [3, 78, 4, 23, 6, 8, 6]
  ary.bubblesort1!
  p ary`);
  assert.equal(code, 'Ruby');
});

// FIXME: Detected as Python
test.skip('heap sort', () => {
  const code = detectLang(`class Array
    def heapsort
      self.dup.heapsort!
    end
  
    def heapsort!
      # in pseudo-code, heapify only called once, so inline it here
      ((length - 2) / 2).downto(0) {|start| siftdown(start, length - 1)}
  
      # "end" is a ruby keyword
      (length - 1).downto(1) do |end_|
        self[end_], self[0] = self[0], self[end_]
        siftdown(0, end_ - 1)
      end
      self
    end
  
    def siftdown(start, end_)
      root = start
      loop do
        child = root * 2 + 1
        break if child > end_
        if child + 1 <= end_ and self[child] < self[child + 1]
          child += 1
        end
        if self[root] < self[child]
          self[root], self[child] = self[child], self[root]
          root = child
        else
          break
        end
      end
    end
  end`);
  assert.equal(code, 'Ruby');
});

// FIXME: This detected as PHP
test.skip('http server', () => {
  const code = detectLang(`require 'fileutils'
  require 'open-uri'
   
  open("http://rosettacode.org/") {|f| FileUtils.copy_stream(f, $stdout)}`);
  assert.equal(code, 'Ruby');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`def floyd_warshall(n, edge)
    dist = Array.new(n){|i| Array.new(n){|j| i==j ? 0 : Float::INFINITY}}
    nxt = Array.new(n){Array.new(n)}
    edge.each do |u,v,w|
      dist[u-1][v-1] = w
      nxt[u-1][v-1] = v-1
    end
  
    n.times do |k|
      n.times do |i|
        n.times do |j|
          if dist[i][j] > dist[i][k] + dist[k][j]
            dist[i][j] = dist[i][k] + dist[k][j]
            nxt[i][j] = nxt[i][k]
          end
        end
      end
    end
  
    puts "pair     dist    path"
    n.times do |i|
      n.times do |j|
        next  if i==j
        u = i
        path = [u]
        path << (u = nxt[u][j])  while u != j
        path = path.map{|u| u+1}.join(" -> ")
        puts "%d -> %d  %4d     %s" % [i+1, j+1, dist[i][j], path]
      end
    end
  end
  
  n = 4
  edge = [[1, 3, -2], [2, 1, 4], [2, 3, 3], [3, 4, 2], [4, 2, -1]]
  floyd_warshall(n, edge)`);
  assert.equal(code, 'Ruby');
});

test('ludic numbers', () => {
  const code = detectLang(`def ludic(nmax=100000)
    Enumerator.new do |y|
      y << 1
      ary = *2..nmax
      until ary.empty?
        y << (n = ary.first)
        (0...ary.size).step(n){|i| ary[i] = nil}
        ary.compact!
      end
    end
  end
  
  puts "First 25 Ludic numbers:", ludic.first(25).to_s
  
  puts "Ludics below 1000:", ludic(1000).count
  
  puts "Ludic numbers 2000 to 2005:", ludic.first(2005).last(6).to_s
  
  ludics = ludic(250).to_a
  puts "Ludic triples below 250:",
      ludics.select{|x| ludics.include?(x+2) and ludics.include?(x+6)}.map{|x| [x, x+2, x+6]}.to_s`);
  assert.equal(code, 'Ruby');
});

test.run();
