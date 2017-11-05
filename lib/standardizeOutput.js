'use strict'

const boolProps = [
  'autofocus', 'checked', 'defaultchecked', 'disabled', 'formnovalidate',
  'indeterminate', 'readonly', 'required', 'selected', 'willvalidate'
]

const boolPropsPattern = new RegExp(' (' + boolProps.join('|') + '|onclick)=(""|\'\')', 'ig')
const disabledPattern = new RegExp('disabled=("true"|\'true\')', 'ig')

function standardizeOutput (output){
  const wrapper = new String(output
    .replace(boolPropsPattern, '')
    .replace(disabledPattern, 'disabled="disabled"')
  )
  // HACK: Avoid double encoding by marking encoded string
  // You cannot add properties to string literals
  // eslint-disable-next-line no-new-wrappers
  wrapper.__encoded = true
  return wrapper
}

module.exports = standardizeOutput
