import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang("print \"Hello world!\"");
  assert.equal(code.language, "Python");
});

test("fizz buzz", () => {
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
  assert.equal(code.language, "Python");
});

test("variable declaration", () => {
  const code = detectLang("i = 1");
  assert.equal(code.language, "Python");
});

test("quick sort", () => {
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
  assert.equal(code.language, "Python");
});

test("bubble sort", () => {
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
  assert.equal(code.language, "Python");
});

test("heap sort", () => {
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
  assert.equal(code.language, "Python");
});

test("http server", () => {
  const code = detectLang(`from http.client import HTTPConnection
	conn = HTTPConnection("example.com")
	# If you need to use set_tunnel, do so here.
	conn.request("GET", "/")  
	# Alternatively, you can use connect(), followed by the putrequest, putheader and endheaders functions.
	result = conn.getresponse()
	r1 = result.read() # This retrieves the entire contents.  `);
  assert.equal(code.language, "Python");
});

test("floyd warshall algorithm", () => {
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
  assert.equal(code.language, "Python");
});

test("ludic numbers", () => {
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
  assert.equal(code.language, "Python");
});

test("gamma function", () => {
  const code = detectLang(`'''Gamma function'''
 
	from functools import reduce
	 
	 
	# gamma_ :: [Float] -> Float -> Float
	def gamma_(tbl):
			'''Gamma function.'''
			def go(x):
					y = float(x) - 1.0
					return 1.0 / reduce(
							lambda a, x: a * y + x,
							tbl[-2::-1],
							tbl[-1]
					)
			return lambda x: go(x)
	 
	 
	# TBL :: [Float]
	TBL = [
			1.00000000000000000000, 0.57721566490153286061,
			-0.65587807152025388108, -0.04200263503409523553,
			0.16653861138229148950, -0.04219773455554433675,
			-0.00962197152787697356, 0.00721894324666309954,
			-0.00116516759185906511, -0.00021524167411495097,
			0.00012805028238811619, -0.00002013485478078824,
			-0.00000125049348214267, 0.00000113302723198170,
			-0.00000020563384169776, 0.00000000611609510448,
			0.00000000500200764447, -0.00000000118127457049,
			0.00000000010434267117, 0.00000000000778226344,
			-0.00000000000369680562, 0.00000000000051003703,
			-0.00000000000002058326, -0.00000000000000534812,
			0.00000000000000122678, -0.00000000000000011813,
			0.00000000000000000119, 0.00000000000000000141,
			-0.00000000000000000023, 0.00000000000000000002
	]
	 
	 
	# TEST ----------------------------------------------------
	# main :: IO()
	def main():
			'''Gamma function over a range of values.'''
	 
			gamma = gamma_(TBL)
			print(
					fTable(' i -> gamma(i/3):\n')(repr)(lambda x: "%0.7e" % x)(
							lambda x: gamma(x / 3.0)
					)(enumFromTo(1)(10))
			)
	 
	 
	# GENERIC -------------------------------------------------
	 
	# enumFromTo :: (Int, Int) -> [Int]
	def enumFromTo(m):
			'''Integer enumeration from m to n.'''
			return lambda n: list(range(m, 1 + n))
	 
	 
	# FORMATTING -------------------------------------------------
	 
	# fTable :: String -> (a -> String) ->
	#                     (b -> String) -> (a -> b) -> [a] -> String
	def fTable(s):
			'''Heading -> x display function -> fx display function ->
											 f -> xs -> tabular string.
			'''
			def go(xShow, fxShow, f, xs):
					ys = [xShow(x) for x in xs]
					w = max(map(len, ys))
					return s + '\n' + '\n'.join(map(
							lambda x, y: y.rjust(w, ' ') + ' -> ' + fxShow(f(x)),
							xs, ys
					))
			return lambda xShow: lambda fxShow: lambda f: lambda xs: go(
					xShow, fxShow, f, xs
			)
	 
	 
	# MAIN ---
	if __name__ == '__main__':
			main()`);
  assert.equal(code.language, "Python");
});

test("fivenum", () => {
  const code = detectLang(`from __future__ import division
	import math
	import sys
	 
	def fivenum(array):
			n = len(array)
			if n == 0:
					print("you entered an empty array.")
					sys.exit()
			x = sorted(array)
	 
			n4 = math.floor((n+3.0)/2.0)/2.0
			d = [1, n4, (n+1)/2, n+1-n4, n]
			sum_array = []
	 
			for e in range(5):
					floor = int(math.floor(d[e] - 1))
					ceil = int(math.ceil(d[e] - 1))
					sum_array.append(0.5 * (x[floor] + x[ceil]))
	 
			return sum_array
	 
	x = [0.14082834, 0.09748790, 1.73131507, 0.87636009, -1.95059594, 0.73438555, -0.03035726, 1.46675970,
	-0.74621349, -0.72588772, 0.63905160, 0.61501527, -0.98983780, -1.00447874, -0.62759469, 0.66206163,
	1.04312009, -0.10305385, 0.75775634, 0.32566578]
	 
	y = fivenum(x)
	print(y)`);
  assert.equal(code.language, "Python");
});

test.run();
