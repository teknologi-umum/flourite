import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('Java', detectLang('System.out.println("Hello world!");'));
});

test('fizz buzz', () => {
  assert.equal(
    'Java',
    detectLang(`public class FizzBuzz {
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
  }`),
  );
});

test('getter/setter', () => {
  assert.equal('Java', detectLang('Person person = people.get(0);'));
});

test('List/ArrayList', () => {
  assert.equal('Java', detectLang('List<String> things = new ArrayList<>();'));
});

test.run();
