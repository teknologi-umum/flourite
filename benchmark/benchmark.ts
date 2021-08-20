import {Benchmark, Test} from '@aldy505/kruonis'
import { readFileSync } from 'fs'
import detectLang from '../src/index'

const benchmark = new Benchmark({minCycles: 500})

// https://github.com/curl/curl/blob/master/src/tool_main.c
const curl = readFileSync('./curl', 'utf-8')
// https://github.com/gin-gonic/gin/blob/master/gin.go
const gin = readFileSync('./gin', 'utf-8')

benchmark
  .add(
    new Test('curl library', () => {
      detectLang(curl)
    })
  )
  .add(
    new Test('go gin', () => {
      detectLang(gin)
    })
  )

benchmark
  .on('onTestEnd', (benchmark: Benchmark, test: Test) => {
    console.log("Test name: " + test.name);
    console.log("Test stats: " + JSON.stringify(test.getStats(), null, 2));
  })
  .run();

