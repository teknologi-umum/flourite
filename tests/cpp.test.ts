import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('cout << "Hello world" << endl;')
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
 }`)
  assert.equal(
    code, 'C++'
  );
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
  }`)
  assert.equal(code, 'C++')
})

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
  }`)
  assert.equal(code, 'C++')
})

test.run();
