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

test('fibonacci sequence', () => {
  const code = detectLang(`long long int fibb(int n) {
    int fnow = 0, fnext = 1, tempf;
    while(--n>0){
      tempf = fnow + fnext;
      fnow = fnext;
      fnext = tempf;
      }
      return fnext;	
  }`);
  assert.equal(code, 'C');
});

test('heap sort', () => {
  const code = detectLang(`#include <stdio.h>
 
  int max (int *a, int n, int i, int j, int k) {
      int m = i;
      if (j < n && a[j] > a[m]) {
          m = j;
      }
      if (k < n && a[k] > a[m]) {
          m = k;
      }
      return m;
  }
   
  void downheap (int *a, int n, int i) {
      while (1) {
          int j = max(a, n, i, 2 * i + 1, 2 * i + 2);
          if (j == i) {
              break;
          }
          int t = a[i];
          a[i] = a[j];
          a[j] = t;
          i = j;
      }
  }
   
  void heapsort (int *a, int n) {
      int i;
      for (i = (n - 2) / 2; i >= 0; i--) {
          downheap(a, n, i);
      }
      for (i = 0; i < n; i++) {
          int t = a[n - i - 1];
          a[n - i - 1] = a[0];
          a[0] = t;
          downheap(a, n - i - 1, 0);
      }
  }
   
  int main () {
      int a[] = {4, 65, 2, -31, 0, 99, 2, 83, 782, 1};
      int n = sizeof a / sizeof a[0];
      int i;
      for (i = 0; i < n; i++)
          printf("%d%s", a[i], i == n - 1 ? "\n" : " ");
      heapsort(a, n);
      for (i = 0; i < n; i++)
          printf("%d%s", a[i], i == n - 1 ? "\n" : " ");
      return 0;
  }`);
  assert.equal(code, 'C');
});

test('tree sort on a linked list', () => {
  const code = detectLang(`#include <stdio.h>
  #include <stdlib.h>
  #include <time.h>
   
  void fatal(const char* message) {
      fprintf(stderr, "%s\n", message);
      exit(1);
  }
   
  void* xmalloc(size_t n) {
      void* ptr = malloc(n);
      if (ptr == NULL)
          fatal("Out of memory");
      return ptr;
  }
   
  typedef struct node_tag {
      int item;
      struct node_tag* prev;
      struct node_tag* next;
  } node_t;
   
  void list_initialize(node_t* list) {
      list->prev = list;
      list->next = list;
  }
   
  void list_destroy(node_t* list) {
      node_t* n = list->next;
      while (n != list) {
          node_t* tmp = n->next;
          free(n);
          n = tmp;
      }
  }
   
  void list_append_node(node_t* list, node_t* node) {
      node_t* prev = list->prev;
      prev->next = node;
      list->prev = node;
      node->prev = prev;
      node->next = list;
  }
   
  void list_append_item(node_t* list, int item) {
      node_t* node = xmalloc(sizeof(node_t));
      node->item = item;
      list_append_node(list, node);
  }
   
  void list_print(node_t* list) {
      printf("[");
      node_t* n = list->next;
      if (n != list) {
          printf("%d", n->item);
          n = n->next;
      }
      for (; n != list; n = n->next)
          printf(", %d", n->item);
      printf("]\n");
  }
   
  void tree_insert(node_t** p, node_t* n) {
      while (*p != NULL) {
          if (n->item < (*p)->item)
              p = &(*p)->prev;
          else
              p = &(*p)->next;
      }
      *p = n;
  }
   
  void tree_to_list(node_t* list, node_t* node) {
      if (node == NULL)
          return;
      node_t* prev = node->prev;
      node_t* next = node->next;
      tree_to_list(list, prev);
      list_append_node(list, node);
      tree_to_list(list, next);
  }
   
  void tree_sort(node_t* list) {
      node_t* n = list->next;
      if (n == list)
          return;
      node_t* root = NULL;
      while (n != list) {
          node_t* next = n->next;
          n->next = n->prev = NULL;
          tree_insert(&root, n);
          n = next;
      }
      list_initialize(list);
      tree_to_list(list, root);
  }
   
  int main() {
      srand(time(0));
      node_t list;
      list_initialize(&list);
      for (int i = 0; i < 16; ++i)
          list_append_item(&list, rand() % 100);
      printf("before sort: ");
      list_print(&list);
      tree_sort(&list);
      printf(" after sort: ");
      list_print(&list);
      list_destroy(&list);
      return 0;
  }`);
  assert.equal(code, 'C');
});

test.run();
