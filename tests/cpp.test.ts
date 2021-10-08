import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';
import type { StatisticOutput } from '../src/types';

test('hello world', () => {
  const code = detectLang('cout << "Hello world" << endl;', {
    shiki: true,
    statistics: true,
    heuristic: true,
  }) as StatisticOutput;
  assert.equal(code.detected, 'cpp');
  assert.equal(code.statistics, {
    C: 0,
    Clojure: 0,
    'C++': 5,
    CSS: 0,
    'C#': 0,
    Dockerfile: 0,
    Go: 0,
    HTML: 0,
    Java: 0,
    Javascript: 0,
    Julia: 2,
    Kotlin: 0,
    Lua: 2,
    Pascal: 0,
    PHP: 0,
    Python: 0,
    Ruby: 0,
    Rust: 0,
    SQL: 0,
    Unknown: 1,
    YAML: 0,
    Markdown: 0,
  });
});

test('fizz buzz', () => {
  const code = detectLang(`/*
  * fizzbuzz.cpp
  *
  *  Created on: Apr 25, 2012
  *      Author: Brian Geffon
  *
  *  fizzbuzz solved without looping or conditionals using only template recursion.
  */
  
 #include <iostream>
 #include <string>
  
 template <int r> struct FizzBuzzPrinter {
   static const int fizzBuzzed = 0;
   template <typename T> FizzBuzzPrinter(T t) {}
 };
  
 template <> struct FizzBuzzPrinter<0> {
   static const int fizzBuzzed = 1;
   template <typename T> FizzBuzzPrinter(T t) {
     std::cout << t;
   }
 };
  
 template <int N> struct FizzBuzz: FizzBuzz<N - 1> {
   FizzBuzz() {
     FizzBuzzPrinter<(N % 15)>("FizzBuzz");
     FizzBuzzPrinter<(N % 5) + FizzBuzzPrinter<N % 15>::fizzBuzzed>("Buzz");
     FizzBuzzPrinter<(N % 3) + FizzBuzzPrinter<(N % 15)>::fizzBuzzed + FizzBuzzPrinter<(N % 5) + FizzBuzzPrinter<N % 15>::fizzBuzzed>::fizzBuzzed>("Fizz");
     FizzBuzzPrinter<FizzBuzzPrinter<N % 3>::fizzBuzzed + FizzBuzzPrinter<N % 5>::fizzBuzzed>(int(N));
     std::cout << std::endl;
   }
 };
  
 template <> struct FizzBuzz<0> {};
  
 int main (int argc, char **argv)
 { 
   FizzBuzz<100> p;
   return 0;
 }`);
  assert.equal(code, 'C++');
});

test('quick sort', () => {
  const code = detectLang(`#include <iterator>
  #include <algorithm> // for std::partition
  #include <functional> // for std::less
   
  // helper function for median of three
  template<typename T>
   T median(T t1, T t2, T t3)
  {
    if (t1 < t2)
    {
      if (t2 < t3)
        return t2;
      else if (t1 < t3)
        return t3;
      else
        return t1;
    }
    else
    {
      if (t1 < t3)
        return t1;
      else if (t2 < t3)
        return t3;
      else
        return t2;
    }
  }
   
  // helper object to get <= from <
  template<typename Order> struct non_strict_op:
    public std::binary_function<typename Order::second_argument_type,
                                typename Order::first_argument_type,
                                bool>
  {
    non_strict_op(Order o): order(o) {}
    bool operator()(typename Order::second_argument_type arg1,
                    typename Order::first_argument_type arg2) const
    {
      return !order(arg2, arg1);
    }
  private:
    Order order;
  };
   
  template<typename Order> non_strict_op<Order> non_strict(Order o)
  {
    return non_strict_op<Order>(o);
  }
   
  template<typename RandomAccessIterator,
           typename Order>
   void quicksort(RandomAccessIterator first, RandomAccessIterator last, Order order)
  {
    if (first != last && first+1 != last)
    {
      typedef typename std::iterator_traits<RandomAccessIterator>::value_type value_type;
      RandomAccessIterator mid = first + (last - first)/2;
      value_type pivot = median(*first, *mid, *(last-1));
      RandomAccessIterator split1 = std::partition(first, last, std::bind2nd(order, pivot));
      RandomAccessIterator split2 = std::partition(split1, last, std::bind2nd(non_strict(order), pivot));
      quicksort(first, split1, order);
      quicksort(split2, last, order);
    }
  }
   
  template<typename RandomAccessIterator>
   void quicksort(RandomAccessIterator first, RandomAccessIterator last)
  {
    quicksort(first, last, std::less<typename std::iterator_traits<RandomAccessIterator>::value_type>());
  }
  A simpler version of the above that just uses the first element as the pivot and only does one "partition".
  
  #include <iterator>
  #include <algorithm> // for std::partition
  #include <functional> // for std::less
   
  template<typename RandomAccessIterator,
           typename Order>
   void quicksort(RandomAccessIterator first, RandomAccessIterator last, Order order)
  {
    if (last - first > 1)
    {
      RandomAccessIterator split = std::partition(first+1, last, std::bind2nd(order, *first));
      std::iter_swap(first, split-1);
      quicksort(first, split-1, order);
      quicksort(split, last, order);
    }
  }
   
  template<typename RandomAccessIterator>
   void quicksort(RandomAccessIterator first, RandomAccessIterator last)
  {
    quicksort(first, last, std::less<typename std::iterator_traits<RandomAccessIterator>::value_type>());
  }`);
  assert.equal(code, 'C++');
});

test('bubble sort', () => {
  const code = detectLang(`#include <algorithm>
  #include <iostream>
  #include <iterator>
   
  template <typename RandomAccessIterator>
  void bubble_sort(RandomAccessIterator begin, RandomAccessIterator end) {
    bool swapped = true;
    while (begin != end-- && swapped) {
      swapped = false;
      for (auto i = begin; i != end; ++i) {
        if (*(i + 1) < *i) {
          std::iter_swap(i, i + 1);
          swapped = true;
        }
      }
    }
  }
   
  int main() {
    int a[] = {100, 2, 56, 200, -52, 3, 99, 33, 177, -199};
    bubble_sort(std::begin(a), std::end(a));
    copy(std::begin(a), std::end(a), std::ostream_iterator<int>(std::cout, " "));
    std::cout << "\n";
  }`);
  assert.equal(code, 'C++');
});

test('heap sort', () => {
  const code = detectLang(`#include <algorithm>
  #include <iterator>
  #include <iostream>
   
  template<typename RandomAccessIterator>
  void heap_sort(RandomAccessIterator begin, RandomAccessIterator end) {
    std::make_heap(begin, end);
    std::sort_heap(begin, end);
  }
   
  int main() {
    int a[] = {100, 2, 56, 200, -52, 3, 99, 33, 177, -199};
    heap_sort(std::begin(a), std::end(a));
    copy(std::begin(a), std::end(a), std::ostream_iterator<int>(std::cout, " "));
    std::cout << "\n";
  }`);
  assert.equal(code, 'C++');
});

// FIXME: This detected as C.
test.skip('http server', () => {
  const code = detectLang(`#include <winsock2.h>
  #include <ws2tcpip.h>
  #include <iostream>
   
  int main() {
    WSADATA wsaData;
    WSAStartup( MAKEWORD( 2, 2 ), &wsaData );
   
    addrinfo *result = NULL;
    addrinfo hints;
   
    ZeroMemory( &hints, sizeof( hints ) );
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;
   
    getaddrinfo( "74.125.45.100", "80", &hints, &result ); // http://www.google.com
   
    SOCKET s = socket( result->ai_family, result->ai_socktype, result->ai_protocol );
   
    connect( s, result->ai_addr, (int)result->ai_addrlen );
   
    freeaddrinfo( result );
   
    send( s, "GET / HTTP/1.0\n\n", 16, 0 );
   
    char buffer[512];
    int bytes;
   
    do {
      bytes = recv( s, buffer, 512, 0 );
   
      if ( bytes > 0 )
        std::cout.write(buffer, bytes);
    } while ( bytes > 0 );
   
    return 0;
  }`);
  assert.equal(code, 'C++');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`#include <iostream>
  #include <vector>
  #include <sstream>
   
  void print(std::vector<std::vector<double>> dist, std::vector<std::vector<int>> next) {
    std::cout << "(pair, dist, path)" << std::endl;
    const auto size = std::size(next);
    for (auto i = 0; i < size; ++i) {
      for (auto j = 0; j < size; ++j) {
        if (i != j) {
          auto u = i + 1;
          auto v = j + 1;
          std::cout << "(" << u << " -> " << v << ", " << dist[i][j]
            << ", ";
          std::stringstream path;
          path << u;
          do {
            u = next[u - 1][v - 1];
            path << " -> " << u;
          } while (u != v);
          std::cout << path.str() << ")" << std::endl;
        }
      }
    }
  }
   
  void solve(std::vector<std::vector<int>> w_s, const int num_vertices) {
    std::vector<std::vector<double>> dist(num_vertices);
    for (auto& dim : dist) {
      for (auto i = 0; i < num_vertices; ++i) {
        dim.push_back(INT_MAX);
      }
    }
    for (auto& w : w_s) {
      dist[w[0] - 1][w[1] - 1] = w[2];
    }
    std::vector<std::vector<int>> next(num_vertices);
    for (auto i = 0; i < num_vertices; ++i) {
      for (auto j = 0; j < num_vertices; ++j) {
        next[i].push_back(0);
      }
      for (auto j = 0; j < num_vertices; ++j) {
        if (i != j) {
          next[i][j] = j + 1;
        }
      }
    }
    for (auto k = 0; k < num_vertices; ++k) {
      for (auto i = 0; i < num_vertices; ++i) {
        for (auto j = 0; j < num_vertices; ++j) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            next[i][j] = next[i][k];
          }
        }
      }
    }
    print(dist, next);
  }
   
  int main() {
    std::vector<std::vector<int>> w = {
      { 1, 3, -2 },
      { 2, 1, 4 },
      { 2, 3, 3 },
      { 3, 4, 2 },
      { 4, 2, -1 },
    };
    int num_vertices = 4;
    solve(w, num_vertices);
    std::cin.ignore();
    std::cin.get();
    return 0;
  }`);
  assert.equal(code, 'C++');
});

test('ludic numbers', () => {
  const code = detectLang(`#include <vector>
  #include <iostream>
  using namespace std;
   
  class ludic
  {
  public:
      void ludicList()
      {
          _list.push_back( 1 );
   
          vector<int> v;
          for( int x = 2; x < 22000; x++ )
              v.push_back( x );
   
          while( true )
          {
              vector<int>::iterator i = v.begin();
              int z = *i;
              _list.push_back( z );
   
              while( true )
              {
                  i = v.erase( i );
                  if( distance( i, v.end() ) <= z - 1 ) break;
                  advance( i, z - 1 );
              }
              if( v.size() < 1 ) return;
          }
      }
   
      void show( int s, int e )
      {
          for( int x = s; x < e; x++ )
              cout << _list[x] << " ";
      }
   
      void findTriplets( int e )
      {
          int lu, x = 0;
          while( _list[x] < e )
          {
              lu = _list[x];
              if( inList( lu + 2 ) && inList( lu + 6 ) )
                  cout << "(" << lu << " " << lu + 2 << " " << lu + 6 << ")\n";
              x++;
          }
      }
   
      int count( int e )
      {
          int x = 0, c = 0;
          while( _list[x++] <= 1000 ) c++;
          return c;
      }
   
  private:
      bool inList( int lu )
      {
          for( int x = 0; x < 250; x++ )
              if( _list[x] == lu ) return true;
          return false;
      }
   
      vector<int> _list;
  };
   
  int main( int argc, char* argv[] )
  {
      ludic l;
      l.ludicList();
      cout << "first 25 ludic numbers:" << "\n";
      l.show( 0, 25 );
      cout << "\n\nThere are " << l.count( 1000 ) << " ludic numbers <= 1000" << "\n";
      cout << "\n2000 to 2005'th ludic numbers:" << "\n";
      l.show( 1999, 2005 );
      cout << "\n\nall triplets of ludic numbers < 250:" << "\n";
      l.findTriplets( 250 );
      cout << "\n\n";
      return system( "pause" );
  }`);
  assert.equal(code, 'C++');
});

test('happy numbers', () => {
  const code = detectLang(`#include <map>
  #include <set>
   
  bool happy(int number) {
    static std::map<int, bool> cache;
   
    std::set<int> cycle;
    while (number != 1 && !cycle.count(number)) {
      if (cache.count(number)) {
        number = cache[number] ? 1 : 0;
        break;
      }
      cycle.insert(number);
      int newnumber = 0;
      while (number > 0) {
        int digit = number % 10;
        newnumber += digit * digit;
        number /= 10;
      }
      number = newnumber;
    }
    bool happiness = number == 1;
    for (std::set<int>::const_iterator it = cycle.begin();
         it != cycle.end(); it++)
      cache[*it] = happiness;
    return happiness;
  }
   
  #include <iostream>
   
  int main() {
    for (int i = 1; i < 50; i++)
      if (happy(i))
        std::cout << i << std::endl;
    return 0;
  }`);
  assert.equal(code, 'C++');
});

test('gamma function', () => {
  const code = detectLang(`#include <math.h>
  #include <numbers>
  #include <stdio.h>
  #include <vector>
   
  // Calculate the coefficients used by Spouge's approximation (based on the C
  // implemetation)
  std::vector<double> CalculateCoefficients(int numCoeff)
  {
      std::vector<double> c(numCoeff);
      double k1_factrl = 1.0;
      c[0] = sqrt(2.0 * std::numbers::pi);
      for(size_t k=1; k < numCoeff; k++)
      {
          c[k] = exp(numCoeff-k) * pow(numCoeff-k, k-0.5) / k1_factrl;
          k1_factrl *= -(double)k;
      }
      return c;
  }
   
  // The Spouge approximation
  double Gamma(const std::vector<double>& coeffs, double x)
  {
          const size_t numCoeff = coeffs.size();
          double accm = coeffs[0];
          for(size_t k=1; k < numCoeff; k++)
          {
              accm += coeffs[k] / ( x + k );
          }
          accm *= exp(-(x+numCoeff)) * pow(x+numCoeff, x+0.5);
          return accm/x;
  }
   
  int main()
  {
      // estimate the gamma function with 1, 4, and 10 coefficients
      const auto coeff1 = CalculateCoefficients(1);
      const auto coeff4 = CalculateCoefficients(4);
      const auto coeff10 = CalculateCoefficients(10);
   
      const auto inputs = std::vector<double>{
          0.001, 0.01, 0.1, 0.5, 1.0,
          1.461632145, // minimum of the gamma function
          2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 50, 100, 
          150 // causes overflow for this implemetation
          };
   
      printf("%16s%16s%16s%16s%16s\n", "gamma( x ) =", "Spouge 1", "Spouge 4", "Spouge 10", "built-in");
      for(auto x : inputs) 
      {
          printf("gamma(%7.3f) = %16.10g %16.10g %16.10g %16.10g\n", 
              x,
              Gamma(coeff1, x),
              Gamma(coeff4, x), 
              Gamma(coeff10, x), 
              std::tgamma(x)); // built-in gamma function
      }
  }
   `);
  assert.equal(code, 'C++');
});

test('fivenum', () => {
  const code = detectLang(`#include <algorithm>
  #include <iostream>
  #include <ostream>
  #include <vector>
   
  /////////////////////////////////////////////////////////////////////////////
  // The following is taken from https://cpplove.blogspot.com/2012/07/printing-tuples.html
   
  // Define a type which holds an unsigned integer value 
  template<std::size_t> struct int_ {};
   
  template <class Tuple, size_t Pos>
  std::ostream& print_tuple(std::ostream& out, const Tuple& t, int_<Pos>) {
      out << std::get< std::tuple_size<Tuple>::value - Pos >(t) << ", ";
      return print_tuple(out, t, int_<Pos - 1>());
  }
   
  template <class Tuple>
  std::ostream& print_tuple(std::ostream& out, const Tuple& t, int_<1>) {
      return out << std::get<std::tuple_size<Tuple>::value - 1>(t);
  }
   
  template <class... Args>
  std::ostream& operator<<(std::ostream& out, const std::tuple<Args...>& t) {
      out << '(';
      print_tuple(out, t, int_<sizeof...(Args)>());
      return out << ')';
  }
   
  /////////////////////////////////////////////////////////////////////////////
   
  template <class RI>
  double median(RI beg, RI end) {
      if (beg == end) throw std::runtime_error("Range cannot be empty");
      auto len = end - beg;
      auto m = len / 2;
      if (len % 2 == 1) {
          return *(beg + m);
      }
   
      return (beg[m - 1] + beg[m]) / 2.0;
  }
   
  template <class C>
  auto fivenum(C& c) {
      std::sort(c.begin(), c.end());
   
      auto cbeg = c.cbegin();
      auto cend = c.cend();
   
      auto len = cend - cbeg;
      auto m = len / 2;
      auto lower = (len % 2 == 1) ? m : m - 1;
      double r2 = median(cbeg, cbeg + lower + 1);
      double r3 = median(cbeg, cend);
      double r4 = median(cbeg + lower + 1, cend);
   
      return std::make_tuple(*cbeg, r2, r3, r4, *(cend - 1));
  }
   
  int main() {
      using namespace std;
      vector<vector<double>> cs = {
          { 15.0, 6.0, 42.0, 41.0, 7.0, 36.0, 49.0, 40.0, 39.0, 47.0, 43.0 },
          { 36.0, 40.0, 7.0, 39.0, 41.0, 15.0 },
          {
              0.14082834,  0.09748790,  1.73131507,  0.87636009, -1.95059594,  0.73438555,
             -0.03035726,  1.46675970, -0.74621349, -0.72588772,  0.63905160,  0.61501527,
             -0.98983780, -1.00447874, -0.62759469,  0.66206163,  1.04312009, -0.10305385,
              0.75775634,  0.32566578
          }
      };
   
      for (auto & c : cs) {
          cout << fivenum(c) << endl;
      }
   
      return 0;
  }`);
  assert.equal(code, 'C++');
});

test('y combinator', () => {
  const code = detectLang(`#include <iostream>
  #include <functional>
   
  template <typename F>
  struct RecursiveFunc {
    std::function<F(RecursiveFunc)> o;
  };
   
  template <typename A, typename B>
  std::function<B(A)> Y (std::function<std::function<B(A)>(std::function<B(A)>)> f) {
    RecursiveFunc<std::function<B(A)>> r = {
      std::function<std::function<B(A)>(RecursiveFunc<std::function<B(A)>>)>([f](RecursiveFunc<std::function<B(A)>> w) {
        return f(std::function<B(A)>([w](A x) {
          return w.o(w)(x);
        }));
      })
    };
    return r.o(r);
  }
   
  typedef std::function<int(int)> Func;
  typedef std::function<Func(Func)> FuncFunc;
  FuncFunc almost_fac = [](Func f) {
    return Func([f](int n) {
      if (n <= 1) return 1;
      return n * f(n - 1);
    });
  };
   
  FuncFunc almost_fib = [](Func f) {
    return Func([f](int n) {
       if (n <= 2) return 1;
      return  f(n - 1) + f(n - 2);
    });
  };
   
  int main() {
    auto fib = Y(almost_fib);
    auto fac = Y(almost_fac);
    std::cout << "fib(10) = " << fib(10) << std::endl;
    std::cout << "fac(10) = " << fac(10) << std::endl;
    return 0;
  }`);
  assert.equal(code, 'C++');
});

test.run();
