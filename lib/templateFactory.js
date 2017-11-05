'use strict'

const standardizeOutput = require('./standardizeOutput')
const handleValue = require('./handleValue')

function templateFactory () {
  const pieces = arguments[0]
  const args = arguments
  return function template (obj) {
    var output = pieces[0]
    for (var i = 1; i < pieces.length; i++) {
      output += handleValue(obj[args[i]]) + pieces[i]
    }
    return standardizeOutput(output)
  }
}

module.exports = templateFactory
