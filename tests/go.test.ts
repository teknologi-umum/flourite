import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('fmt.Println("Hello world")');
  assert.equal(code, 'Go');
});

test('fizz buzz', () => {
  const code = detectLang(`package main
 
	import (
		"fmt"
		"flag"
	)

	var max *int = flag.Int("max", 0, "enter integer or bust!")

	func main() {
		flag.Parse()
		for i := 1; i <= *max; i++ {
			fizzbuzz(i)
		}
	}

	func fizzbuzz(i int) {
		fizz := "fizz"
		buzz := "buzz"

		if i % 3 == 0 && i % 5 == 0 {
			fmt.Println(i, fizz + buzz)
		} else if i % 3 == 0 {
			fmt.Println(i, fizz)
		} else if i % 5 == 0 {
			fmt.Println(i, buzz)
		} else {
			fmt.Println(i)
		}
	}`);
  assert.equal(code, 'Go');
});

test('quick sort', () => {
  const code = detectLang(`package main
 
	import "fmt"
	 
	func main() {
			list := []int{31, 41, 59, 26, 53, 58, 97, 93, 23, 84}
			fmt.Println("unsorted:", list)
	 
			quicksort(list)
			fmt.Println("sorted!  ", list)
	}
	 
	func quicksort(a []int) {
			var pex func(int, int)
			pex = func(lower, upper int) {
					for {
							switch upper - lower {
							case -1, 0: // 0 or 1 item in segment.  nothing to do here!
									return
							case 1: // 2 items in segment
									// < operator respects strict weak order
									if a[upper] < a[lower] {
											// a quick exchange and we're done.
											a[upper], a[lower] = a[lower], a[upper]
									}
									return
							// Hoare suggests optimized sort-3 or sort-4 algorithms here,
							// but does not provide an algorithm.
							}
	 
							// Hoare stresses picking a bound in a way to avoid worst case
							// behavior, but offers no suggestions other than picking a
							// random element.  A function call to get a random number is
							// relatively expensive, so the method used here is to simply
							// choose the middle element.  This at least avoids worst case
							// behavior for the obvious common case of an already sorted list.
							bx := (upper + lower) / 2
							b := a[bx]  // b = Hoare's "bound" (aka "pivot")
							lp := lower // lp = Hoare's "lower pointer"
							up := upper // up = Hoare's "upper pointer"
					outer:
							for {
									// use < operator to respect strict weak order
									for lp < upper && !(b < a[lp]) {
											lp++
									}
									for {
											if lp > up {
													// "pointers crossed!"
													break outer
											}
											// < operator for strict weak order
											if a[up] < b {
													break // inner
											}
											up--
									}
									// exchange
									a[lp], a[up] = a[up], a[lp]
									lp++
									up--
							}
							// segment boundary is between up and lp, but lp-up might be
							// 1 or 2, so just call segment boundary between lp-1 and lp.
							if bx < lp {
									// bound was in lower segment
									if bx < lp-1 {
											// exchange bx with lp-1
											a[bx], a[lp-1] = a[lp-1], b
									}
									up = lp - 2
							} else {
									// bound was in upper segment
									if bx > lp {
											// exchange
											a[bx], a[lp] = a[lp], b
									}
									up = lp - 1
									lp++
							}
							// "postpone the larger of the two segments" = recurse on
							// the smaller segment, then iterate on the remaining one.
							if up-lower < upper-lp {
									pex(lower, up)
									lower = lp
							} else {
									pex(lp, upper)
									upper = up
							}
					}
			}
			pex(0, len(a)-1)
	}`);
  assert.equal(code, 'Go');
});

test('http server', () => {
  const code = detectLang(`package main
 
	import (
			"io"
			"log"
			"net/http"
			"os"
	)
	 
	func main() {
			r, err := http.Get("http://rosettacode.org/robots.txt")
			if err != nil {
					log.Fatalln(err)
			}
			io.Copy(os.Stdout, r.Body)
	}`);
  assert.equal(code, 'Go');
});

test('bubble sort', () => {
  const code = detectLang(`package main
 
	import (
		"sort"
		"fmt"
	)
	 
	func main() {
			list := []int{31, 41, 59, 26, 53, 58, 97, 93, 23, 84}
			fmt.Println("unsorted:", list)
	 
			bubblesort(sort.IntSlice(list))
			fmt.Println("sorted!  ", list)
	}
	 
	func bubblesort(a sort.Interface) {
			for itemCount := a.Len() - 1; ; itemCount-- {
					hasChanged := false
					for index := 0; index < itemCount; index++ {
							if a.Less(index+1, index) {
									a.Swap(index, index+1)
									hasChanged = true
							}
					}
					if !hasChanged {
							break
					}
			}
	}`);
  assert.equal(code, 'Go');
});

test('heap sort', () => {
  const code = detectLang(`package main
 
	import (
		"sort"
		"container/heap"
		"fmt"
	)
	 
	type HeapHelper struct {
			container sort.Interface
			length    int
	}
	 
	func (self HeapHelper) Len() int { return self.length }
	// We want a max-heap, hence reverse the comparison
	func (self HeapHelper) Less(i, j int) bool { return self.container.Less(j, i) }
	func (self HeapHelper) Swap(i, j int) { self.container.Swap(i, j) }
	// this should not be called
	func (self *HeapHelper) Push(x interface{}) { panic("impossible") }
	func (self *HeapHelper) Pop() interface{} {
			self.length--
			return nil // return value not used
	}
	 
	func heapSort(a sort.Interface) {
			helper := HeapHelper{ a, a.Len() }
			heap.Init(&helper)
			for helper.length > 0 {
					heap.Pop(&helper)
			}
	}
	 
	func main() {
			a := []int{170, 45, 75, -90, -802, 24, 2, 66}
			fmt.Println("before:", a)
			heapSort(sort.IntSlice(a))
			fmt.Println("after: ", a)
	}`);
  assert.equal(code, 'Go');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`package main
 
	import (
		"fmt"
		"strconv"
	)
	 
	// A Graph is the interface implemented by graphs that
	// this algorithm can run on.
	type Graph interface {
		Vertices() []Vertex
		Neighbors(v Vertex) []Vertex
		Weight(u, v Vertex) int
	}
	 
	// Nonnegative integer ID of vertex
	type Vertex int
	 
	// ig is a graph of integers that satisfies the Graph interface.
	type ig struct {
		vert  []Vertex
		edges map[Vertex]map[Vertex]int
	}
	 
	func (g ig) edge(u, v Vertex, w int) {
		if _, ok := g.edges[u]; !ok {
			g.edges[u] = make(map[Vertex]int)
		}
		g.edges[u][v] = w
	}
	func (g ig) Vertices() []Vertex { return g.vert }
	func (g ig) Neighbors(v Vertex) (vs []Vertex) {
		for k := range g.edges[v] {
			vs = append(vs, k)
		}
		return vs
	}
	func (g ig) Weight(u, v Vertex) int { return g.edges[u][v] }
	func (g ig) path(vv []Vertex) (s string) {
		if len(vv) == 0 {
			return ""
		}
		s = strconv.Itoa(int(vv[0]))
		for _, v := range vv[1:] {
			s += " -> " + strconv.Itoa(int(v))
		}
		return s
	}
	 
	const Infinity = int(^uint(0) >> 1)
	 
	func FloydWarshall(g Graph) (dist map[Vertex]map[Vertex]int, next map[Vertex]map[Vertex]*Vertex) {
		vert := g.Vertices()
		dist = make(map[Vertex]map[Vertex]int)
		next = make(map[Vertex]map[Vertex]*Vertex)
		for _, u := range vert {
			dist[u] = make(map[Vertex]int)
			next[u] = make(map[Vertex]*Vertex)
			for _, v := range vert {
				dist[u][v] = Infinity
			}
			dist[u][u] = 0
			for _, v := range g.Neighbors(u) {
				v := v
				dist[u][v] = g.Weight(u, v)
				next[u][v] = &v
			}
		}
		for _, k := range vert {
			for _, i := range vert {
				for _, j := range vert {
					if dist[i][k] < Infinity && dist[k][j] < Infinity {
						if dist[i][j] > dist[i][k]+dist[k][j] {
							dist[i][j] = dist[i][k] + dist[k][j]
							next[i][j] = next[i][k]
						}
					}
				}
			}
		}
		return dist, next
	}
	 
	func Path(u, v Vertex, next map[Vertex]map[Vertex]*Vertex) (path []Vertex) {
		if next[u][v] == nil {
			return
		}
		path = []Vertex{u}
		for u != v {
			u = *next[u][v]
			path = append(path, u)
		}
		return path
	}
	 
	func main() {
		g := ig{[]Vertex{1, 2, 3, 4}, make(map[Vertex]map[Vertex]int)}
		g.edge(1, 3, -2)
		g.edge(3, 4, 2)
		g.edge(4, 2, -1)
		g.edge(2, 1, 4)
		g.edge(2, 3, 3)
	 
		dist, next := FloydWarshall(g)
		fmt.Println("pair\tdist\tpath")
		for u, m := range dist {
			for v, d := range m {
				if u != v {
					fmt.Printf("%d -> %d\t%3d\t%s\n", u, v, d, g.path(Path(u, v, next)))
				}
			}
		}
	}`);
  assert.equal(code, 'Go');
});

test('ludic numbers', () => {
  const code = detectLang(`package main
 
	import "fmt"
	 
	// Ludic returns a slice of Ludic numbers stopping after
	// either n entries or when max is exceeded.
	// Either argument may be <=0 to disable that limit.
	func Ludic(n int, max int) []uint32 {
		const maxInt32 = 1<<31 - 1 // i.e. math.MaxInt32
		if max > 0 && n < 0 {
			n = maxInt32
		}
		if n < 1 {
			return nil
		}
		if max < 0 {
			max = maxInt32
		}
		sieve := make([]uint32, 10760) // XXX big enough for 2005 Ludics
		sieve[0] = 1
		sieve[1] = 2
		if n > 2 {
			// We start with even numbers already removed
			for i, j := 2, uint32(3); i < len(sieve); i, j = i+1, j+2 {
				sieve[i] = j
			}
			// We leave the Ludic numbers in place,
			// k is the index of the next Ludic
			for k := 2; k < n; k++ {
				l := int(sieve[k])
				if l >= max {
					n = k
					break
				}
				i := l
				l--
				// last is the last valid index
				last := k + i - 1
				for j := k + i + 1; j < len(sieve); i, j = i+1, j+1 {
					last = k + i
					sieve[last] = sieve[j]
					if i%l == 0 {
						j++
					}
				}
				// Truncate down to only the valid entries
				if last < len(sieve)-1 {
					sieve = sieve[:last+1]
				}
			}
		}
		if n > len(sieve) {
			panic("program error") // should never happen
		}
		return sieve[:n]
	}
	 
	func has(x []uint32, v uint32) bool {
		for i := 0; i < len(x) && x[i] <= v; i++ {
			if x[i] == v {
				return true
			}
		}
		return false
	}
	 
	func main() {
		// Ludic() is so quick we just call it repeatedly
		fmt.Println("First 25:", Ludic(25, -1))
		fmt.Println("Numner of Ludics below 1000:", len(Ludic(-1, 1000)))
		fmt.Println("Ludic 2000 to 2005:", Ludic(2005, -1)[1999:])
	 
		fmt.Print("Tripples below 250:")
		x := Ludic(-1, 250)
		for i, v := range x[:len(x)-2] {
			if has(x[i+1:], v+2) && has(x[i+2:], v+6) {
				fmt.Printf(", (%d %d %d)", v, v+2, v+6)
			}
		}
		fmt.Println()
	}`);
  assert.equal(code, 'Go');
});

test('gamma function', () => {
  const code = detectLang(`package main
 
	import (
			"fmt"
			"math"
	)
	 
	func main() {
			fmt.Println("    x               math.Gamma                 Lanczos7")
			for _, x := range []float64{-.5, .1, .5, 1, 1.5, 2, 3, 10, 140, 170} {
					fmt.Printf("%5.1f %24.16g %24.16g\n", x, math.Gamma(x), lanczos7(x))
			}
	}
	 
	func lanczos7(z float64) float64 {
			t := z + 6.5
			x := .99999999999980993 +
					676.5203681218851/z -
					1259.1392167224028/(z+1) +
					771.32342877765313/(z+2) -
					176.61502916214059/(z+3) +
					12.507343278686905/(z+4) -
					.13857109526572012/(z+5) +
					9.9843695780195716e-6/(z+6) +
					1.5056327351493116e-7/(z+7)
			return math.Sqrt2 * math.SqrtPi * math.Pow(t, z-.5) * math.Exp(-t) * x
	}`);
  assert.equal(code, 'Go');
});

test('fivenum', () => {
  const code = detectLang(`package main
 
	import (
			"fmt"
			"math"
			"sort"
	)
	 
	func fivenum(a []float64) (n5 [5]float64) {
			sort.Float64s(a)
			n := float64(len(a))
			n4 := float64((len(a)+3)/2) / 2
			d := []float64{1, n4, (n + 1) / 2, n + 1 - n4, n}
			for e, de := range d {
					floor := int(de - 1)
					ceil := int(math.Ceil(de - 1))
					n5[e] = .5 * (a[floor] + a[ceil])
			}
			return
	}
	 
	var (
			x1 = []float64{36, 40, 7, 39, 41, 15}
			x2 = []float64{15, 6, 42, 41, 7, 36, 49, 40, 39, 47, 43}
			x3 = []float64{
					0.14082834, 0.09748790, 1.73131507, 0.87636009, -1.95059594,
					0.73438555, -0.03035726, 1.46675970, -0.74621349, -0.72588772,
					0.63905160, 0.61501527, -0.98983780, -1.00447874, -0.62759469,
					0.66206163, 1.04312009, -0.10305385, 0.75775634, 0.32566578,
			}
	)
	 
	func main() {
			fmt.Println(fivenum(x1))
			fmt.Println(fivenum(x2))
			fmt.Println(fivenum(x3))
	}`);
  assert.equal(code, 'Go');
});

test('y combinator', () => {
  const code = detectLang(`package main
 
	import "fmt"
	 
	type Func func(int) int
	type FuncFunc func(Func) Func
	type RecursiveFunc func (RecursiveFunc) Func
	 
	func main() {
		fac := Y(almost_fac)
		fib := Y(almost_fib)
		fmt.Println("fac(10) = ", fac(10))
		fmt.Println("fib(10) = ", fib(10))
	}
	 
	func Y(f FuncFunc) Func {
		g := func(r RecursiveFunc) Func {
			return f(func(x int) int {
				return r(r)(x)
			})
		}
		return g(g)
	}
	 
	func almost_fac(f Func) Func {
		return func(x int) int {
			if x <= 1 {
				return 1
			}
			return x * f(x-1)
		}
	}
	 
	func almost_fib(f Func) Func {
		return func(x int) int {
			if x <= 2 {
				return 1
			}
			return f(x-1)+f(x-2)
		}
	}`);
  assert.equal(code, 'Go');
});

test.run();
