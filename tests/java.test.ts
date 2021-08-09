import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('System.out.println("Hello world!");')
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
  }`)
  assert.equal(
    code, 'Java',
  );
});

test('getter/setter', () => {
  const code = detectLang('Person person = people.get(0);')
  assert.equal(code, 'Java');
});

test('List/ArrayList', () => {
  const code = detectLang('List<String> things = new ArrayList<>();')
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
 `)
  assert.equal(code, 'Java')
})

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
  }`)
  assert.equal(code, 'Java')
})

test.run();
