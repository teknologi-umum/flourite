import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('printf("Hello world!\\n");');
  assert.equal(code, 'C');
});

test('fizz buzz', () => {
  const code = detectLang(`#include <stdio.h>

  int main(void)
  {
    int i;
  
    for (i = 1; i <= 100; ++i)
    {
      if (i % 3 == 0)
        printf("Fizz");
  
      if (i % 5 == 0)
        printf("Buzz");
  
      if ((i % 3 != 0) && (i % 5 != 0))
        printf("%d", i);
  
      printf("\n");
    }
  
    return 0;
  }`);
  assert.equal(code, 'C');
});

test('variable declaration', () => {
  const code = detectLang('int *ptr;');
  assert.equal(code, 'C');
});

test('file', () => {
  const code = detectLang(`static int IndexEntry__set_mtime__meth(lua_State *L) {
    IndexEntry * this_idx1 = obj_type_IndexEntry_check(L,1);
    git_time_t secs_idx2 = luaL_checkinteger(L,2);
    unsigned int nanosecs_idx3 = luaL_checkinteger(L,3);
    this_idx1->mtime.seconds = secs_idx2;
    this_idx1->mtime.nanoseconds = nanosecs_idx3;
  
    return 0;
  }`);
  assert.equal(code, 'C');
});

test('quick sort', () => {
  const code = detectLang(`#include <stdio.h>
 
  void quicksort(int *A, int len);
   
  int main (void) {
    int a[] = {4, 65, 2, -31, 0, 99, 2, 83, 782, 1};
    int n = sizeof a / sizeof a[0];
   
    int i;
    for (i = 0; i < n; i++) {
      printf("%d ", a[i]);
    }
    printf("\n");
   
    quicksort(a, n);
   
    for (i = 0; i < n; i++) {
      printf("%d ", a[i]);
    }
    printf("\n");
   
    return 0;
  }
   
  void quicksort(int *A, int len) {
    if (len < 2) return;
   
    int pivot = A[len / 2];
   
    int i, j;
    for (i = 0, j = len - 1; ; i++, j--) {
      while (A[i] < pivot) i++;
      while (A[j] > pivot) j--;
   
      if (i >= j) break;
   
      int temp = A[i];
      A[i]     = A[j];
      A[j]     = temp;
    }
   
    quicksort(A, i);
    quicksort(A + i, len - i);
  }`);
  assert.equal(code, 'C');
});

test('http server', () => {
  const code = detectLang(`#include <stdio.h>
  #include <stdlib.h>
  #include <curl/curl.h>
   
  int
  main(void)
  {
          CURL *curl;
          char buffer[CURL_ERROR_SIZE];
   
          if ((curl = curl_easy_init()) != NULL) {
                  curl_easy_setopt(curl, CURLOPT_URL, "http://www.rosettacode.org/");
                  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1);
                  curl_easy_setopt(curl, CURLOPT_ERRORBUFFER, buffer);
                  if (curl_easy_perform(curl) != CURLE_OK) {
                          fprintf(stderr, "%s\n", buffer);
                          return EXIT_FAILURE;
                  }
                  curl_easy_cleanup(curl);
          }
          return EXIT_SUCCESS;
  }`);
  assert.equal(code, 'C');
});

test.run();
