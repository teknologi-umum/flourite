import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang(`program byeworld;
 
  begin
    writeln(StdErr, 'Goodbye, World!');
  end.`);
  assert.equal(code.language, "Pascal");
});

test("fizz buzz", () => {
  const code = detectLang(`program fizzbuzz(output);
  var
    i: integer;
  begin
    for i := 1 to 100 do
      if i mod 15 = 0 then
        writeln('FizzBuzz');
      else if i mod 3 = 0 then
        writeln('Fizz');
      else if i mod 5 = 0 then
        writeln('Buzz');
      else
        writeln(i);
  end.`);
  assert.equal(code.language, "Pascal");
});

test("guess the number", () => {
  const code = detectLang(`Program GuessTheNumber(input, output);
 
  var
    number, guess: integer;
   
  begin
    randomize;
    number := random(10) + 1;
    writeln ('I''m thinking of a number between 1 and 10, which you should guess.');
    write   ('Enter your guess: ');
    readln  (guess);
    while guess <> number do
    begin
      writeln ('Sorry, but your guess is wrong. Please try again.');
      write   ('Enter your new guess: ');
      readln  (guess);
    end;
    writeln ('You made an excellent guess. Thank you and have a nice day.');
  end.
   `);
  assert.equal(code.language, "Pascal");
});

test("bubble sort", () => {
  const code = detectLang(`procedure bubble_sort(var list: array of real);
  var
    i, j, n: integer;
    t: real;
  begin
    n := length(list);
    for i := n downto 2 do
      for j := 0 to i - 1 do
        if list[j] > list[j + 1] then
        begin
          t := list[j];
          list[j] := list[j + 1];
          list[j + 1] := t;
        end;
  end;`);
  assert.equal(code.language, "Pascal");
});

test("heap sort", () => {
  const code = detectLang(`program HeapSortDemo;
 
  type
    TIntArray = array[4..15] of integer;
   
  var
    data: TIntArray;
    i: integer;
   
  procedure siftDown(var a: TIntArray; start, ende: integer);
    var
      root, child, swap: integer;
    begin
      root := start;
      while root * 2 - start + 1 <= ende do
      begin
        child := root * 2 - start + 1;
        if (child + 1 <= ende) and (a[child] < a[child + 1]) then
          inc(child);
        if a[root] < a[child] then
        begin
    swap     := a[root];
          a[root]  := a[child];
          a[child] := swap;
          root := child;
        end
        else
          exit;
      end;
    end;
   
  procedure heapify(var a: TIntArray);
    var
      start, count: integer;
    begin
      count := length(a);
      start := low(a) + count div 2 - 1;
      while start >= low(a) do
      begin
        siftdown(a, start, high(a));
        dec(start);
      end;
    end;
   
  procedure heapSort(var a: TIntArray);
    var
      ende, swap: integer;
    begin
      heapify(a);
      ende := high(a);
      while ende > low(a) do
      begin
        swap := a[low(a)];
        a[low(a)] := a[ende];
        a[ende] := swap;
        dec(ende);
        siftdown(a, low(a), ende);
      end;
    end;
   
  begin
    Randomize;
    writeln('The data before sorting:');
    for i := low(data) to high(data) do
    begin
      data[i] := Random(high(data));
      write(data[i]:4);
    end;
    writeln;
    heapSort(data);
    writeln('The data after sorting:');
    for i := low(data) to high(data) do
    begin
      write(data[i]:4);
    end;
    writeln;
  end.`);
  assert.equal(code.language, "Pascal");
});

test("merge sort", () => {
  const code = detectLang(`program MergeSortDemo;
 
  {$IFDEF FPC}
    {$MODE DELPHI}
  {$ENDIF}
   
  type
    TIntArray = array of integer;
   
  function merge(left, right: TIntArray): TIntArray;
    var
      i, j: integer;
    begin
      j := 0;
      setlength(Result, length(left) + length(right));
      while (length(left) > 0) and (length(right) > 0) do
      begin
        if left[0] <= right[0] then
        begin
    Result[j] := left[0];
    inc(j);
    for i := low(left) to high(left) - 1 do
      left[i] := left[i+1];
    setlength(left, length(left) - 1);
        end
        else
        begin
    Result[j] := right[0];
    inc(j);
    for i := low(right) to high(right) - 1 do
      right[i] := right[i+1];
    setlength(right, length(right) - 1);
        end;
      end;
      if length(left) > 0 then
        for i := low(left) to high(left) do
      Result[j + i] := left[i];
      j := j + length(left);
      if length(right) > 0 then
        for i := low(right) to high(right) do
      Result[j + i] := right[i];
    end;
   
  function mergeSort(m: TIntArray): TIntArray;
    var
      left, right: TIntArray;
      i, middle: integer;
    begin
      setlength(Result, length(m));
      if length(m) = 1 then
        Result[0] := m[0]
      else if length(m) > 1 then
      begin
        middle := length(m) div 2;
        setlength(left, middle);
        setlength(right, length(m)-middle);
        for i := low(left) to high(left) do
          left[i] := m[i];
        for i := low(right) to high(right) do
          right[i] := m[middle+i];
        left  := mergeSort(left);
        right := mergeSort(right);
        Result := merge(left, right);
      end;
    end;
   
  var
    data: TIntArray;
    i: integer;
   
  begin
    setlength(data, 8);
    Randomize;
    writeln('The data before sorting:');
    for i := low(data) to high(data) do
    begin
      data[i] := Random(high(data));
      write(data[i]:4);
    end;
    writeln;
    data := mergeSort(data);
    writeln('The data after sorting:');
    for i := low(data) to high(data) do
    begin
      write(data[i]:4);
    end;
    writeln;
  end.`);
  assert.equal(code.language, "Pascal");
});

test("quick sort", () => {
  const code = detectLang(`{ X is array of LongInt }
  Procedure QuickSort ( Left, Right : LongInt );
  Var 
    i, j,
    tmp, pivot : LongInt;         { tmp & pivot are the same type as the elements of array }
  Begin
    i:=Left;
    j:=Right;
    pivot := X[(Left + Right) shr 1]; // pivot := X[(Left + Rigth) div 2] 
    Repeat
      While pivot > X[i] Do inc(i);   // i:=i+1;
      While pivot < X[j] Do dec(j);   // j:=j-1;
      If i<=j Then Begin
        tmp:=X[i];
        X[i]:=X[j];
        X[j]:=tmp;
        dec(j);   // j:=j-1;
        inc(i);   // i:=i+1;
      End;
    Until i>j;
    If Left<j Then QuickSort(Left,j);
    If i<Right Then QuickSort(i,Right);
  End;`);
  assert.equal(code.language, "Pascal");
});

test("palindrome", () => {
  const code = detectLang(`program Palindro;
 
  { RECURSIVE }
  function is_palindro_r(s : String) : Boolean;
  begin
     if length(s) <= 1 then
        is_palindro_r := true
     else begin
        if s[1] = s[length(s)] then
     is_palindro_r := is_palindro_r(copy(s, 2, length(s)-2))
        else
     is_palindro_r := false
     end
  end; { is_palindro_r }
   
  { NON RECURSIVE; see [[Reversing a string]] for "reverse" }
  function is_palindro(s : String) : Boolean;
  begin
     if s = reverse(s) then
        is_palindro := true
     else
        is_palindro := false
  end;`);
  assert.equal(code.language, "Pascal");
});

test("happy numbers", () => {
  const code = detectLang(`Program HappyNumbers (output);
 
  uses
    Math;
   
  function find(n: integer; cache: array of integer): boolean;
    var
      i: integer;
    begin
      find := false;
      for i := low(cache) to high(cache) do
        if cache[i] = n then
          find := true;
    end;
   
  function is_happy(n: integer): boolean;
    var
      cache: array of integer;
      sum: integer;
    begin
      setlength(cache, 1);
      repeat
        sum := 0;
        while n > 0 do
        begin
          sum := sum + (n mod 10)**2;
          n := n div 10;
        end;
        if sum = 1 then
        begin
          is_happy := true;
          break;
        end;
        if find(sum, cache) then
        begin
          is_happy := false;
          break;
        end;
        n := sum;
        cache[high(cache)]:= sum;
        setlength(cache, length(cache)+1);
      until false;
    end;
   
  var
    n, count: integer;
   
  begin
    n := 1;
    count := 0;
    while count < 8 do
    begin
      if is_happy(n) then
      begin
        inc(count);
        write(n, ' ');
      end;
      inc(n);
    end;
    writeln;
  end.`);
  assert.equal(code.language, "Pascal");
});

test("ludic numbers", () => {
  const code = detectLang(`program lucid;
  {$IFDEF FPC}
    {$MODE objFPC} // useful for x64
  {$ENDIF}
   
  const
    //66164 -> last < 1000*1000;
    maxLudicCnt = 2005;//must be > 1
  type
   
    tDelta = record
               dNum,
               dCnt : LongInt;
             end;
   
    tpDelta = ^tDelta;
    tLudicList = array of tDelta;
   
    tArrdelta =array[0..0] of tDelta;
    tpLl = ^tArrdelta;
   
  function isLudic(plL:tpLl;maxIdx:nativeInt):boolean;
  var
    i,
    cn : NativeInt;
  Begin
    //check if n is 'hit' by a prior ludic number
    For i := 1 to maxIdx do
      with plL^[i] do
      Begin
        //Mask read modify write reread
        //dec(dCnt);IF dCnt= 0
        cn := dCnt;
        IF cn = 1 then
        Begin
          dcnt := dNum;
          isLudic := false;
          EXIT;
         end;
        dcnt := cn-1;
      end;
    isLudic := true;
  end;
   
  procedure CreateLudicList(var Ll:tLudicList);
  var
    plL : tpLl;
    n,LudicCnt : NativeUint;
  begin
    // special case 1
    n := 1;
    Ll[0].dNum := 1;
   
    plL := @Ll[0];
    LudicCnt := 0;
    repeat
      inc(n);
      If isLudic(plL,LudicCnt ) then
      Begin
        inc(LudicCnt);
        with plL^[LudicCnt] do
        Begin
          dNum := n;
          dCnt := n;
        end;
        IF (LudicCnt >= High(LL)) then
          BREAK;
      end;
    until false;
  end;
   
  procedure  firstN(var Ll:tLudicList;cnt: NativeUint);
  var
    i : NativeInt;
  Begin
    writeln('First ',cnt,' ludic numbers:');
    For i := 0 to cnt-2 do
      write(Ll[i].dNum,',');
    writeln(Ll[cnt-1].dNum);
  end;
   
  procedure triples(var Ll:tLudicList;max: NativeUint);
  var
    i,
    chk : NativeUint;
  Begin
    // special case 1,3,7
    writeln('Ludic triples below ',max);
    write('(',ll[0].dNum,',',ll[2].dNum,',',ll[4].dNum,') ');
   
    For i := 1 to High(Ll) do
    Begin
      chk := ll[i].dNum;
      If chk> max then
        break;
      If (ll[i+2].dNum = chk+6) AND (ll[i+1].dNum = chk+2) then
        write('(',ll[i].dNum,',',ll[i+1].dNum,',',ll[i+2].dNum,') ');
    end;
    writeln;
    writeln;
  end;
   
  procedure LastLucid(var Ll:tLudicList;start,cnt: NativeUint);
  var
    limit,i : NativeUint;
  Begin
    dec(start);
    limit := high(Ll);
    IF cnt >= limit then
      cnt := limit;
    if start+cnt >limit then
      start := limit-cnt;
    writeln(Start+1,'.th to ',Start+cnt+1,'.th ludic number');
    For i := 0 to cnt-1 do
      write(Ll[i+start].dNum,',');
    writeln(Ll[start+cnt].dNum);
    writeln;
  end;
   
  function CountLudic(var Ll:tLudicList;Limit: NativeUint):NativeUint;
  var
    i,res : NativeUint;
  Begin
    res := 0;
    For i := 0 to High(Ll) do begin
      IF Ll[i].dnum <= Limit then
        inc(res)
      else
        BREAK;
    CountLudic:= res;
  end;
   
  end;
  var
    LudicList : tLudicList;
  BEGIN
    setlength(LudicList,maxLudicCnt);
    CreateLudicList(LudicList);
    firstN(LudicList,25);
    writeln('There are ',CountLudic(LudicList,1000),' ludic numbers below 1000');
    LastLucid(LudicList,2000,5);
    LastLucid(LudicList,maxLudicCnt,5);
    triples(LudicList,250);//all-> (LudicList,LudicList[High(LudicList)].dNum);
  END.`);
  assert.equal(code.language, "Pascal");
});

test("attractive number", () => {
  const code = detectLang(`program AttractiveNumbers;
  { numbers with count of factors = prime
  * using modified sieve of erathosthes
  * by adding the power of the prime to multiples
  * of the composite number }
  {$IFDEF FPC}
    {$MODE DELPHI}
  {$ELSE}
     {$APPTYPE CONSOLE}
  {$ENDIF}
  uses
    sysutils;//timing
  const
    cTextMany = ' with many factors     ';
    cText2    = ' with only two factors ';
    cText1    = ' with only one factor  ';
  type
    tValue = LongWord;
    tpValue = ^tValue;
    tPower = array[0..63] of tValue;//2^64
   
  var
    power : tPower;
    sieve : array of byte;
   
  function NextPotCnt(p: tValue):tValue;
  //return the first power <> 0
  //power == n to base prim
  var
    i : NativeUint;
  begin
    result := 0;
    repeat
      i := power[result];
      Inc(i);
      IF i < p then
        BREAK
      else
      begin
        i := 0;
        power[result]  := 0;
        inc(result);
      end;
    until false;
    power[result] := i;
    inc(result);
  end;
   
  procedure InitSieveWith2;
  //the prime 2, because its the first one, is the one, 
  //which can can be speed up tremendously, by moving 
  var
    pSieve : pByte;
    CopyWidth,lmt : NativeInt;
  Begin
    pSieve := @sieve[0];
    Lmt := High(sieve);
    sieve[1] := 0;
    sieve[2] := 1; // aka 2^1 -> one factor
    CopyWidth := 2;
   
    while CopyWidth*2 <= Lmt do
    Begin
      // copy idx 1,2 to 3,4 | 1..4 to 5..8 | 1..8 to 9..16
      move(pSieve[1],pSieve[CopyWidth+1],CopyWidth);
      // 01 -> 0101 -> 01020102-> 0102010301020103
      inc(CopyWidth,CopyWidth);//*2
      //increment the factor of last element by one.
      inc(pSieve[CopyWidth]);
      //idx    12    1234    12345678
      //value  01 -> 0102 -> 01020103-> 0102010301020104
    end;
    //copy the rest
    move(pSieve[1],pSieve[CopyWidth+1],Lmt-CopyWidth);
   
    //mark 0,1 not prime, 255 factors are today not possible 2^255 >> Uint64
    sieve[0]:= 255;
    sieve[1]:= 255;
    sieve[2]:= 0;   // make prime again
  end;
   
  procedure OutCntTime(T:TDateTime;txt:String;cnt:NativeInt);
  Begin
     writeln(cnt:12,txt,T*86400:10:3,' s');
  end;
   
  procedure sievefactors;
  var
    T0 : TDateTime;
    pSieve : pByte;
    i,j,i2,k,lmt,cnt : NativeUInt;
  Begin
    InitSieveWith2;
    pSieve := @sieve[0];
    Lmt := High(sieve);
   
  //Divide into 3 section
   
  //first i*i*i<= lmt with time expensive NextPotCnt
    T0 := now;
    cnt := 0;
    //third root of limit calculate only once, no comparison ala while i*i*i<= lmt do
    k := trunc(exp(ln(Lmt)/3));
    For i := 3 to k do
      if pSieve[i] = 0 then
      Begin
        inc(cnt);
        j := 2*i;
        fillChar(Power,Sizeof(Power),#0);
        Power[0] := 1;
        repeat
          inc(pSieve[j],NextPotCnt(i));
          inc(j,i);
        until j > lmt;
      end;
    OutCntTime(now-T0,cTextMany,cnt);
    T0 := now;
   
  //second i*i <= lmt
    cnt := 0;
    i := k+1;
    k := trunc(sqrt(Lmt));
    For i := i to k do
      if pSieve[i] = 0 then
      Begin
        //first increment all multiples of prime by one
        inc(cnt);
        j := 2*i;
        repeat
          inc(pSieve[j]);
          inc(j,i);
        until j>lmt;
        //second increment all multiples prime*prime by one
        i2 := i*i;
        j := i2;
        repeat
          inc(pSieve[j]);
          inc(j,i2);
        until j>lmt;
      end;
    OutCntTime(now-T0,cText2,cnt);
    T0 := now;
   
  //third i*i > lmt -> only one new factor
    cnt := 0;
    inc(k);
    For i := k to Lmt shr 1 do
      if pSieve[i] = 0 then
      Begin
        inc(cnt);
        j := 2*i;
        repeat
          inc(pSieve[j]);
          inc(j,i);
        until j>lmt;
      end;
     OutCntTime(now-T0,cText1,cnt);
  end;
   
  const
    smallLmt = 120;
    //needs 1e10 Byte = 10 Gb maybe someone got 128 Gb :-) nearly linear time
    BigLimit = 10*1000*1000*1000;
  var
    T0,T : TDateTime;
    i,cnt,lmt : NativeInt;
  Begin
    setlength(sieve,smallLmt+1);
   
    sievefactors;
    cnt := 0;
    For i := 2 to smallLmt do
    Begin
      if sieve[sieve[i]] = 0 then
      Begin
        write(i:4);
        inc(cnt);
        if cnt>19 then
        Begin
          writeln;
          cnt := 0;
        end;
      end;
    end;
    writeln;
    writeln;
    T0 := now;
    setlength(sieve,BigLimit+1);
    T := now;
    writeln('time allocating  : ',(T-T0) *86400 :8:3,' s');
    sievefactors;
    T := now-T;
    writeln('time sieving : ',T*86400 :8:3,' s');
    T:= now;
    cnt := 0;
    i := 0;
    lmt := 10;
    repeat
      repeat
        inc(i);
        {IF sieve[sieve[i]] = 0 then inc(cnt); takes double time is not relevant}
        inc(cnt,ORD(sieve[sieve[i]] = 0));
      until i = lmt;
      writeln(lmt:11,cnt:12);
      lmt := 10*lmt;
    until lmt >High(sieve);
    T := now-T;
    writeln('time counting : ',T*86400 :8:3,' s');
    writeln('time total    : ',(now-T0)*86400 :8:3,' s');
  end.`);
  assert.equal(code.language, "Pascal");
});

test.run();
