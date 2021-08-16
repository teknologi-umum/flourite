import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('System.out.println("Hello world!");');
  assert.equal(code, 'Java');
});

test('fizz buzz', () => {
  const code = detectLang(`public class FizzBuzz {
    public static void main(String[] args) {
      for(int i = 1; i <= 100; i++) {
        if (((i % 5) == 0) && ((i % 7) == 0))
          System.out.print("fizzbuzz");    
        else if ((i % 5) == 0) System.out.print("fizz");
        else if ((i % 7) == 0) System.out.print("buzz");
        else System.out.print(i);
        System.out.print(" "); 
      }
      System.out.println();
    }
  }`);
  assert.equal(code, 'Java');
});

test('getter/setter', () => {
  const code = detectLang('Person person = people.get(0);');
  assert.equal(code, 'Java');
});

test('List/ArrayList', () => {
  const code = detectLang('List<String> things = new ArrayList<>();');
  assert.equal(code, 'Java');
});

test('quick sort', () => {
  const code = detectLang(`public static <E extends Comparable<? super E>> List<E> quickSort(List<E> arr) {
    if (arr.isEmpty())
        return arr;
    else {
        E pivot = arr.get(0);
 
        List<E> less = new LinkedList<E>();
        List<E> pivotList = new LinkedList<E>();
        List<E> more = new LinkedList<E>();
 
        // Partition
        for (E i: arr) {
            if (i.compareTo(pivot) < 0)
                less.add(i);
            else if (i.compareTo(pivot) > 0)
                more.add(i);
            else
                pivotList.add(i);
        }
 
        // Recursively sort sublists
        less = quickSort(less);
        more = quickSort(more);
 
        // Concatenate results
        less.addAll(pivotList);
        less.addAll(more);
        return less;
    }
  }
  `);
  assert.equal(code, 'Java');
});

test('bubble sort', () => {
  const code = detectLang(`public static <E extends Comparable<? super E>> void bubbleSort(E[] comparable) {
    boolean changed = false;
    do {
        changed = false;
        for (int a = 0; a < comparable.length - 1; a++) {
            if (comparable[a].compareTo(comparable[a + 1]) > 0) {
                E tmp = comparable[a];
                comparable[a] = comparable[a + 1];
                comparable[a + 1] = tmp;
                changed = true;
            }
        }
    } while (changed);
  }`);
  assert.equal(code, 'Java');
});

test('http server', () => {
  const code = detectLang(`import java.net.URI;
  import java.net.http.HttpClient;
  import java.net.http.HttpRequest;
  import java.net.http.HttpResponse;
  import java.nio.charset.Charset;
   
  public class Main {
      public static void main(String[] args) {
          var request = HttpRequest.newBuilder(URI.create("https://www.rosettacode.org"))
                  .GET()
                  .build();
   
          HttpClient.newHttpClient()
                  .sendAsync(request, HttpResponse.BodyHandlers.ofString(Charset.defaultCharset()))
                  .thenApply(HttpResponse::body)
                  .thenAccept(System.out::println)
                  .join();
      }
  }`);
  assert.equal(code, 'Java');
});

test('floyd warshall algorithm', () => {
  const code = detectLang(`import static java.lang.String.format;
  import java.util.Arrays;
   
  public class FloydWarshall {
   
      public static void main(String[] args) {
          int[][] weights = {{1, 3, -2}, {2, 1, 4}, {2, 3, 3}, {3, 4, 2}, {4, 2, -1}};
          int numVertices = 4;
   
          floydWarshall(weights, numVertices);
      }
   
      static void floydWarshall(int[][] weights, int numVertices) {
   
          double[][] dist = new double[numVertices][numVertices];
          for (double[] row : dist)
              Arrays.fill(row, Double.POSITIVE_INFINITY);
   
          for (int[] w : weights)
              dist[w[0] - 1][w[1] - 1] = w[2];
   
          int[][] next = new int[numVertices][numVertices];
          for (int i = 0; i < next.length; i++) {
              for (int j = 0; j < next.length; j++)
                  if (i != j)
                      next[i][j] = j + 1;
          }
   
          for (int k = 0; k < numVertices; k++)
              for (int i = 0; i < numVertices; i++)
                  for (int j = 0; j < numVertices; j++)
                      if (dist[i][k] + dist[k][j] < dist[i][j]) {
                          dist[i][j] = dist[i][k] + dist[k][j];
                          next[i][j] = next[i][k];
                      }
   
          printResult(dist, next);
      }
   
      static void printResult(double[][] dist, int[][] next) {
          System.out.println("pair     dist    path");
          for (int i = 0; i < next.length; i++) {
              for (int j = 0; j < next.length; j++) {
                  if (i != j) {
                      int u = i + 1;
                      int v = j + 1;
                      String path = format("%d -> %d    %2d     %s", u, v,
                              (int) dist[i][j], u);
                      do {
                          u = next[u - 1][v - 1];
                          path += " -> " + u;
                      } while (u != v);
                      System.out.println(path);
                  }
              }
          }
      }
  }`);
  assert.equal(code, 'Java');
});

test('ludic numbers', () => {
  const code = detectLang(`import java.util.ArrayList;
  import java.util.List;
   
  public class Ludic{
    public static List<Integer> ludicUpTo(int n){
      List<Integer> ludics = new ArrayList<Integer>(n);
      for(int i = 1; i <= n; i++){   //fill the initial list
        ludics.add(i);
      }
   
      //start at index 1 because the first ludic number is 1 and we don't remove anything for it
      for(int cursor = 1; cursor < ludics.size(); cursor++){
        int thisLudic = ludics.get(cursor); //the first item in the list is a ludic number
        int removeCursor = cursor + thisLudic; //start removing that many items later
        while(removeCursor < ludics.size()){
          ludics.remove(removeCursor);		     //remove the next item
          removeCursor = removeCursor + thisLudic - 1; //move the removal cursor up as many spaces as we need to
                         //then back one to make up for the item we just removed
        }
      }
      return ludics;
    }
   
    public static List<List<Integer>> getTriplets(List<Integer> ludics){
      List<List<Integer>> triplets = new ArrayList<List<Integer>>();
      for(int i = 0; i < ludics.size() - 2; i++){ //only need to check up to the third to last item
        int thisLudic = ludics.get(i);
        if(ludics.contains(thisLudic + 2) && ludics.contains(thisLudic + 6)){
          List<Integer> triplet = new ArrayList<Integer>(3);
          triplet.add(thisLudic);
          triplet.add(thisLudic + 2);
          triplet.add(thisLudic + 6);
          triplets.add(triplet);
        }
      }
      return triplets;
    }
   
    public static void main(String[] srgs){
      System.out.println("First 25 Ludics: " + ludicUpTo(110));				//110 will get us 25 numbers
      System.out.println("Ludics up to 1000: " + ludicUpTo(1000).size());
      System.out.println("2000th - 2005th Ludics: " + ludicUpTo(22000).subList(1999, 2005));  //22000 will get us 2005 numbers
      System.out.println("Triplets up to 250: " + getTriplets(ludicUpTo(250)));
    }
  }`);
  assert.equal(code, 'Java');
});

test.run();
