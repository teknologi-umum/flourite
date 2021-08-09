import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
	const code = detectLang('print "Hello world!"')
	assert.equal(code, 'Python');
});

test('fizz buzz', () => {
	const code = detectLang(`def fizzbuzz(n):
	if n % 3 == 0 and n % 5 == 0:
		return 'FizzBuzz'

	elif n % 3 == 0:
		return 'Fizz'

	elif n % 5 == 0:
		return 'Buzz'
		
	else:
		return str(n)
 
print "\n".join(fizzbuzz(n) for n in xrange(0, 100))`)
	assert.equal(code,
		'Python');
});

test('variable declaration', () => {
	const code = detectLang('i = 1')
	assert.equal(code, 'Python');
});

test('quick sort', () => {
	const code = detectLang(`def quickSort(arr):
	less = []
	pivotList = []
	more = []
	if len(arr) <= 1:
			return arr
	else:
			pivot = arr[0]
			for i in arr:
					if i < pivot:
							less.append(i)
					elif i > pivot:
							more.append(i)
					else:
							pivotList.append(i)
			less = quickSort(less)
			more = quickSort(more)
			return less + pivotList + more

a = [4, 65, 2, -31, 0, 99, 83, 782, 1]
a = quickSort(a)`)
	assert.equal(code, 'Python')
})

test('http server', () => {
	const code = detectLang(`from http.client import HTTPConnection
	conn = HTTPConnection("example.com")
	# If you need to use set_tunnel, do so here.
	conn.request("GET", "/")  
	# Alternatively, you can use connect(), followed by the putrequest, putheader and endheaders functions.
	result = conn.getresponse()
	r1 = result.read() # This retrieves the entire contents.  `)
	assert.equal(code, 'Python')
})

test.run();
