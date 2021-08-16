import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('print "Hello world!"');
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
 
print "\n".join(fizzbuzz(n) for n in xrange(0, 100))`);
  assert.equal(code, 'Python');
});

test('variable declaration', () => {
  const code = detectLang('i = 1');
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
a = quickSort(a)`);
  assert.equal(code, 'Python');
});

test('bubble sort', () => {
  const code = detectLang(`def bubble_sort(seq):
	"""Inefficiently sort the mutable sequence (list) in place.
		 seq MUST BE A MUTABLE SEQUENCE.

		 As with list.sort() and random.shuffle this does NOT return 
	"""
	changed = True
	while changed:
			changed = False
			for i in xrange(len(seq) - 1):
					if seq[i] > seq[i+1]:
							seq[i], seq[i+1] = seq[i+1], seq[i]
							changed = True
	return seq

if __name__ == "__main__":
 """Sample usage and simple test suite"""

 from random import shuffle

 testset = range(100)
 testcase = testset[:] # make a copy
 shuffle(testcase)
 assert testcase != testset  # we've shuffled it
 bubble_sort(testcase)
 assert testcase == testset  # we've unshuffled it back into a copy`);
  assert.equal(code, 'Python');
});

test('heap sort', () => {
  const code = detectLang(`def heapsort(lst):
  ''' Heapsort. Note: this function sorts in-place (it mutates the list). '''
 
  # in pseudo-code, heapify only called once, so inline it here
  for start in range((len(lst)-2)/2, -1, -1):
    siftdown(lst, start, len(lst)-1)
 
  for end in range(len(lst)-1, 0, -1):
    lst[end], lst[0] = lst[0], lst[end]
    siftdown(lst, 0, end - 1)
  return lst
 
def siftdown(lst, start, end):
  root = start
  while True:
    child = root * 2 + 1
    if child > end: break
    if child + 1 <= end and lst[child] < lst[child + 1]:
      child += 1
    if lst[root] < lst[child]:
      lst[root], lst[child] = lst[child], lst[root]
      root = child
    else:
      break`);
  assert.equal(code, 'Python');
});

test('http server', () => {
  const code = detectLang(`from http.client import HTTPConnection
	conn = HTTPConnection("example.com")
	# If you need to use set_tunnel, do so here.
	conn.request("GET", "/")  
	# Alternatively, you can use connect(), followed by the putrequest, putheader and endheaders functions.
	result = conn.getresponse()
	r1 = result.read() # This retrieves the entire contents.  `);
  assert.equal(code, 'Python');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`from math import inf
		from itertools import product
		
		def floyd_warshall(n, edge):
				rn = range(n)
				dist = [[inf] * n for i in rn]
				nxt  = [[0]   * n for i in rn]
				for i in rn:
						dist[i][i] = 0
				for u, v, w in edge:
						dist[u-1][v-1] = w
						nxt[u-1][v-1] = v-1
				for k, i, j in product(rn, repeat=3):
						sum_ik_kj = dist[i][k] + dist[k][j]
						if dist[i][j] > sum_ik_kj:
								dist[i][j] = sum_ik_kj
								nxt[i][j]  = nxt[i][k]
				print("pair     dist    path")
				for i, j in product(rn, repeat=2):
						if i != j:
								path = [i]
								while path[-1] != j:
										path.append(nxt[path[-1]][j])
								print("%d → %d  %4d       %s" 
											% (i + 1, j + 1, dist[i][j], 
												' → '.join(str(p + 1) for p in path)))
		
		if __name__ == '__main__':
				floyd_warshall(4, [[1, 3, -2], [2, 1, 4], [2, 3, 3], [3, 4, 2], [4, 2, -1]])`);
  assert.equal(code, 'Python');
});

test('ludic numbers', () => {
  const code = detectLang(`def ludic(nmax=100000):
		yield 1
		lst = list(range(2, nmax + 1))
		while lst:
				yield lst[0]
				del lst[::lst[0]]

	ludics = [l for l in ludic()]

	print('First 25 ludic primes:')
	print(ludics[:25])
	print("\nThere are %i ludic numbers <= 1000"
			% sum(1 for l in ludics if l <= 1000)) 
	print("\n2000'th..2005'th ludic primes:")
	print(ludics[2000-1: 2005])

	n = 250
	triplets = [(x, x+2, x+6)
						for x in ludics
						if x+6 < n and x+2 in ludics and x+6 in ludics]
	print('\nThere are %i triplets less than %i:\n  %r'
			% (len(triplets), n, triplets))`);
  assert.equal(code, 'Python');
});

test.run();
