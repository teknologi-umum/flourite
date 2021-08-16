import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('<h1>Hello world</h1>');
  assert.equal(code, 'HTML');
});

test('page', () => {
  const code = detectLang(`<!DOCTYPE html>
  <html>
    <head>
      <title>Page Title</title>
    </head>
    <body>
      <h1>Hello world</h1>
      <p>This is a tiny HTML page.</p>
    </body>
  </html>
  `);
  assert.equal(code, 'HTML');
});

test('animation - html+js', () => {
  const code = detectLang(`<html> <head>
    <title>RC: Basic Animation</title>
    <script type="text/javascript">
        function animate(id) {
            var element = document.getElementById(id);
            var textNode = element.childNodes[0]; // assuming no other children

            var text = textNode.data;
            var reverse = false;

            element.onclick = function () { reverse = !reverse; };

            setInterval(function () {
                if (reverse)
                    text = text.substring(1) + text[0];
                else
                    text = text[text.length - 1] + text.substring(0, text.length - 1);
                textNode.data = text;
            }, 100);
        }
    </script>
  </head> <body onload="animate('target')">
    <pre id="target">Hello World! </pre>
  </body> </html>`);
  assert.equal(code, 'HTML');
});

test('quine - html+css', () => {
  const code = detectLang(`<!DOCTYPE html>
  <html>
  <head>
    <title>HTML/CSS Quine</title>
    <style type="text/css">
    * { font: 10pt monospace; }
   
    head, style { display: block; }
    style { white-space: pre; }
   
    style:before {
      content:
        "<""!DOCTYPE html>"
        "A<html>A"
        "<head>A"
        "<title>""HTML/CSS Quine""</title>A"
        "<style type="text/css">";
    }
    style:after {
      content:
        "</style>A"
        "</head>A"
        "<""body></body>A"
        "</html>";
    }
    </style>
  </head>
  <body></body>
  </html>`);
  assert.equal(code, 'HTML');
});

test('comments', () => {
  const code = detectLang(`<!-- a comment -->`);
  assert.equal(code, 'HTML');
});

test.run();
