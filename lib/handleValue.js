'use strict'

const replaceMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#039;'
}
const replaceMapRE = new RegExp(Object.keys(replaceMap).join('|'), 'g')

function replaceMapper (matched){
  return replaceMap[matched]
}

function objToString (obj) {
  var values = ''
  const keys = Object.keys(obj)
  for (var i = 0; i < keys.length - 1; i++) {
    values += keys[i] + '="' + (obj[keys[i]] || '') + '" '
  }
  return values + keys[i] + '="' + (obj[keys[i]] || '') + '"'
}

function handleValue (value) {
  if (value === null || value === undefined || value === false) {
    return ''
  }

  if (Array.isArray(value)) {
    // Suppose that each item is a result of html``.
    return value.join('')
  }
  // Ignore event handlers.
  //     onclick=${(e) => doSomething(e)}
  // will become
  //     onclick=""
  const valueType = typeof value
  if (valueType === 'function') {
    return '""'
  }

  if (valueType === 'object' && value.constructor.name !== 'String') {
    return objToString(value)
  }

  if (value.__encoded) {
    return value
  }

  return value.toString().replace(replaceMapRE, replaceMapper)
}

module.exports = handleValue
