'use strict'

const Module = require('module')
const templateFactory = require('./lib/templateFactory')
const standardizeOutput = require('./lib/standardizeOutput');
const handleValue = require('./lib/handleValue')

function stringify () {
  var pieces = arguments[0]
  var output = ''
  for (var i = 0; i < pieces.length - 1; i++) {
    output += pieces[i] + handleValue(arguments[i + 1])
  }
  output += pieces[i]
  return standardizeOutput(output)
}

stringify.template = templateFactory

function replace (moduleId) {
  const originalRequire = Module.prototype.require
  Module.prototype.require = function (id) {
    if (id === moduleId) {
      return stringify
    } else {
      return originalRequire.apply(this, arguments)
    }
  }
}

stringify.replace = replace

module.exports = stringify
