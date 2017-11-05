'use strict'

const pelo = require('.')
const createApp = require('./app')
const templateApp = require('./appUsingTemplate')

const warmup = 100
const iteration = 10000

console.log(`# benchmark ${iteration} iterations`)

// App using bel
const belApp = createApp()
for (let i = 0; i < warmup; i++) {
  belApp.render().toString()
}
console.time('bel')
for (let i = 0; i < iteration; i++) {
  belApp.render().toString()
}
console.timeEnd('bel')

// App using pelo
pelo.replace('bel')
const peloApp = createApp()
for (let i = 0; i < warmup; i++) {
  peloApp.render().toString()
}
console.time('pelo')
for (let i = 0; i < iteration; i++) {
  peloApp.render().toString()
}
console.timeEnd('pelo')

// App based on templates
for (let i = 0; i < warmup; i++) {
  templateApp.render().toString()
}
console.time('htmlt')
for (let i = 0; i < iteration; i++) {
  templateApp.render().toString()
}
console.timeEnd('htmlt')
