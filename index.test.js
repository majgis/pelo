'use strict'

const createApp = require('./app')
const pelo = require('.')
const test = require('tape')
const minify = require('html-minifier').minify
const templateApp = require('./appUsingTemplate')
const minifyConfig = {
  collapseWhitespace: true
}

test('The app renders as expected', t => {
  t.plan(1)
  const expected = minify(createApp().render().toString(), minifyConfig)
  pelo.replace('bel')
  const actual = minify(createApp().render().toString(), minifyConfig)
  t.is(actual, expected)
})

test('The template based app renders as expected', t => {
  t.plan(1)
  pelo.replace('bel')
  const expected = minify(createApp().render().toString(), minifyConfig)
  const actual = minify(templateApp.render().toString(), minifyConfig)
  t.is(actual, expected)
})
