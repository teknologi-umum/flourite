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

// FIXME: This detected as PHP
test.skip('http server', () => {
  const code = detectLang(`require 'fileutils'
  require 'open-uri'
   
  open("http://rosettacode.org/") {|f| FileUtils.copy_stream(f, $stdout)}`);
  assert.equal(code, 'Ruby');
});

test.run();
