const test = require('tape')
const templateFactory = require('./templateFactory')

test('The template produces output as expectedj', t => {
  t.plan(1)
  const expected = '<div>works<span>!</span></div>'
  const actual = templateFactory`<div>${"message"}<span>${"punctuation"}</span></div>`({message: 'works', punctuation: '!'}).toString()
  t.is(actual, expected)
})
