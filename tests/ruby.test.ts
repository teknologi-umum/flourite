import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('Ruby', detectLang('puts "Hello world"'));
});

test('fizz buzz', () => {
  assert.equal(
    'Ruby',
    detectLang(`1.step(100,1) do |i|
  if (i % 5) == 0 && (i % 3) ==0
      puts 'FizzBuzz'
  elsif (i % 5) == 0
      puts 'Buzz'
  elsif (i % 3) == 0
      puts 'Fizz'
  else
      puts i
  end
end`),
  );
});

test.run();
