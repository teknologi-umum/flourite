import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('Python', detectLang('print "Hello world!"'));
});

test('fizz buzz', () => {
  assert.equal(
    'Python',
    detectLang(`def fizzbuzz(n):
	if n % 3 == 0 and n % 5 == 0:
		return 'FizzBuzz'

	elif n % 3 == 0:
		return 'Fizz'

	elif n % 5 == 0:
		return 'Buzz'
		
	else:
		return str(n)
 
print "\n".join(fizzbuzz(n) for n in xrange(0, 100))`),
  );
});

test('variable declaration', () => {
  assert.equal('Python', detectLang('i = 1'));
});

test.run();
