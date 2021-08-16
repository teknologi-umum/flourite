import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('cout << "Hello world" << endl;');
  assert.equal(code, 'C++');
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

test.run();
