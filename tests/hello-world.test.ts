import { test } from 'uvu'
import * as assert from 'uvu/assert'
import detectLang from '../src/index'

test('should detect Unknown', () => {
  assert.equal('Unknown', detectLang('Hello world!'));
});

test('should detect Javascript', () => {
  assert.equal('Javascript', detectLang('console.log("Hello world!");'));
});

test('should detect C', () => {
  assert.equal('C', detectLang('printf("Hello world!\\n");'));
});

test('should detect C++', () => {
  assert.equal('C++', detectLang('cout << "Hello world" << endl;'));
});

test('should detect Python', () => {
  assert.equal('Python', detectLang('print "Hello world!"'));
});

test('should detect Java', () => {
  assert.equal('Java', detectLang('System.out.println("Hello world!");'));
});

test('should detect HTML', () => {
  assert.equal('HTML', detectLang('<h1>Hello world</h1>'));
});

test('should detect CSS', () => {
  assert.equal('CSS', detectLang('.hello-world {\n\tfont-size: 100px;\n}'));
});

test('should detect Ruby', () => {
  assert.equal('Ruby', detectLang('puts "Hello world"'));
});

test('should detect Go', () => {
  assert.equal('Go', detectLang('fmt.Println("Hello world")'));
});

test('should detect PHP', () => {
  assert.equal('PHP', detectLang('echo "Hello world";'));
});

test.run();