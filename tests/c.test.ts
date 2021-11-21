import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang('printf("Hello world!\\n");', { shiki: true });
  assert.equal(code.language, "c");
});

test("fizz buzz", () => {
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
  assert.equal(code.language, "C");
});

test("variable declaration", () => {
  const code = detectLang("int *ptr;");
  assert.equal(code.language, "C");
});

test("file", () => {
  const code =
    detectLang(`static int IndexEntry__set_mtime__meth(lua_State *L) {
    IndexEntry * this_idx1 = obj_type_IndexEntry_check(L,1);
    git_time_t secs_idx2 = luaL_checkinteger(L,2);
    unsigned int nanosecs_idx3 = luaL_checkinteger(L,3);
    this_idx1->mtime.seconds = secs_idx2;
    this_idx1->mtime.nanoseconds = nanosecs_idx3;
  
    return 0;
  }`);
  assert.equal(code.language, "C");
});

test("quick sort", () => {
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
  assert.equal(code.language, "C");
});

test("http server", () => {
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
  assert.equal(code.language, "C");
});

test("fibonacci sequence", () => {
  const code = detectLang(`long long int fibb(int n) {
    int fnow = 0, fnext = 1, tempf;
    while(--n>0){
      tempf = fnow + fnext;
      fnow = fnext;
      fnext = tempf;
      }
      return fnext;	
  }`);
  assert.equal(code.language, "C");
});

test("bubble sort", () => {
  const code = detectLang(`#include <stdio.h>
 
  void bubble_sort (int *a, int n) {
      int i, t, j = n, s = 1;
      while (s) {
          s = 0;
          for (i = 1; i < j; i++) {
              if (a[i] < a[i - 1]) {
                  t = a[i];
                  a[i] = a[i - 1];
                  a[i - 1] = t;
                  s = 1;
              }
          }
          j--;
      }
  }
   
  int main () {
      int a[] = {4, 65, 2, -31, 0, 99, 2, 83, 782, 1};
      int n = sizeof a / sizeof a[0];
      int i;
      for (i = 0; i < n; i++)
          printf("%d%s", a[i], i == n - 1 ? "\n" : " ");
      bubble_sort(a, n);
      for (i = 0; i < n; i++)
          printf("%d%s", a[i], i == n - 1 ? "\n" : " ");
      return 0;
  }`);
  assert.equal(code.language, "C");
});

test("heap sort", () => {
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
  assert.equal(code.language, "C");
});

test("tree sort on a linked list", () => {
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
  assert.equal(code.language, "C");
});

test("floyd warshall algorithm", () => {
  const code = detectLang(`#include<limits.h>
  #include<stdlib.h>
  #include<stdio.h>
   
  typedef struct{
      int sourceVertex, destVertex;
      int edgeWeight;
  }edge;
   
  typedef struct{
      int vertices, edges;
      edge* edgeMatrix;
  }graph;
   
  graph loadGraph(char* fileName){
      FILE* fp = fopen(fileName,"r");
   
      graph G;
      int i;
   
      fscanf(fp,"%d%d",&G.vertices,&G.edges);
   
      G.edgeMatrix = (edge*)malloc(G.edges*sizeof(edge));
   
      for(i=0;i<G.edges;i++)
          fscanf(fp,"%d%d%d",&G.edgeMatrix[i].sourceVertex,&G.edgeMatrix[i].destVertex,&G.edgeMatrix[i].edgeWeight);
   
      fclose(fp);
   
      return G;
  }
   
  void floydWarshall(graph g){
      int processWeights[g.vertices][g.vertices], processedVertices[g.vertices][g.vertices];
      int i,j,k;
   
      for(i=0;i<g.vertices;i++)
          for(j=0;j<g.vertices;j++){
              processWeights[i][j] = SHRT_MAX;
              processedVertices[i][j] = (i!=j)?j+1:0;
          }
   
      for(i=0;i<g.edges;i++)
          processWeights[g.edgeMatrix[i].sourceVertex-1][g.edgeMatrix[i].destVertex-1] = g.edgeMatrix[i].edgeWeight;
   
      for(i=0;i<g.vertices;i++)
          for(j=0;j<g.vertices;j++)
              for(k=0;k<g.vertices;k++){
                  if(processWeights[j][i] + processWeights[i][k] < processWeights[j][k]){
                      processWeights[j][k] = processWeights[j][i] + processWeights[i][k];
                      processedVertices[j][k] = processedVertices[j][i];
                  }
              }
   
      printf("pair    dist   path");
      for(i=0;i<g.vertices;i++)
          for(j=0;j<g.vertices;j++){
              if(i!=j){
                  printf("\n%d -> %d %3d %5d",i+1,j+1,processWeights[i][j],i+1);
                  k = i+1;
                  do{
                      k = processedVertices[k-1][j];
                      printf("->%d",k);
                  }while(k!=j+1);
              }
          }
  }
   
  int main(int argC,char* argV[]){
      if(argC!=2)
          printf("Usage : %s <file containing graph data>");
      else
          floydWarshall(loadGraph(argV[1]));
      return 0;
  }`);
  assert.equal(code.language, "C");
});

test("ludic numbers", () => {
  const code = detectLang(`#include <stdio.h>
  #include <stdlib.h>
   
  typedef unsigned uint;
  typedef struct { uint i, v; } filt_t;
   
  // ludics with at least so many elements and reach at least such value
  uint* ludic(uint min_len, uint min_val, uint *len)
  {
      uint cap, i, v, active = 1, nf = 0;
      filt_t *f = calloc(cap = 2, sizeof(*f));
      f[1].i = 4;
   
      for (v = 1; ; ++v) {
          for (i = 1; i < active && --f[i].i; i++);
   
          if (i < active)
              f[i].i = f[i].v;
          else if (nf == f[i].i)
              f[i].i = f[i].v, ++active;  // enable one more filter
          else {
              if (nf >= cap)
                  f = realloc(f, sizeof(*f) * (cap*=2));
              f[nf] = (filt_t){ v + nf, v };
              if (++nf >= min_len && v >= min_val) break;
          }
      }
   
      // pack the sequence into a uint[]
      // filt_t struct was used earlier for cache locality in loops
      uint *x = (void*) f;
      for (i = 0; i < nf; i++) x[i] = f[i].v;
      x = realloc(x, sizeof(*x) * nf);
   
      *len = nf;
      return x;
  }
   
  int find(uint *a, uint v)
  {
      uint i;
      for (i = 0; a[i] <= v; i++)
          if (v == a[i]) return 1;
      return 0;
  }
   
  int main(void)
  {
      uint len, i, *x = ludic(2005, 1000, &len);
   
      printf("First 25:");
      for (i = 0; i < 25; i++) printf(" %u", x[i]);
      putchar('\n');
   
      for (i = 0; x[i] <= 1000; i++);
      printf("Ludics below 1000: %u\n", i);
   
      printf("Ludic 2000 to 2005:");
      for (i = 2000; i <= 2005; i++) printf(" %u", x[i - 1]);
      putchar('\n');
   
      printf("Triples below 250:");
      for (i = 0; x[i] + 6 <= 250; i++)
          if (find(x, x[i] + 2) && find(x, x[i] + 6))
              printf(" (%u %u %u)", x[i], x[i] + 2, x[i] + 6);
   
      putchar('\n');
   
      free(x);
      return 0;
  }`);
  assert.equal(code.language, "C");
});

test.run();
