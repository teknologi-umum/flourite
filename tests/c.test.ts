import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('C', detectLang('printf("Hello world!\\n");'));
});

test('fizz buzz', () => {
  assert.equal(
    'C',
    detectLang(`#include <stdio.h>

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
  }`),
  );
});

test('variable declaration', () => {
  assert.equal('C', detectLang('int *ptr;'));
});

test('file', () => {
  assert.equal(
    'C',
    detectLang(`static int IndexEntry__set_mtime__meth(lua_State *L) {
    IndexEntry * this_idx1 = obj_type_IndexEntry_check(L,1);
    git_time_t secs_idx2 = luaL_checkinteger(L,2);
    unsigned int nanosecs_idx3 = luaL_checkinteger(L,3);
    this_idx1->mtime.seconds = secs_idx2;
    this_idx1->mtime.nanoseconds = nanosecs_idx3;
  
    return 0;
  }`),
  );
});

test.run();
