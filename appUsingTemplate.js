'use strict'
const html = require('.')
const htmlt = require('./lib/templateFactory')
const greeting = 'Hello'
const name = 'special characters, <, >, &'
const drinks = [
    { name: 'Cafe Latte', price: 3.0, sold: false },
    { name: 'Cappucino', price: 2.9, sold: true },
    { name: 'Club Mate', price: 2.2, sold: true },
    { name: 'Berliner Weiße', price: 3.5, sold: false }
]

const listeners = []
function onChange (listener) {
  listeners.push(listener)
}
function notifyChange () {
  listeners.forEach((listener) => listener())
}

function deleteDrink (drink) {
  const index = drinks.indexOf(drink)
  if (index >= 0) {
    drinks.splice(index, 1)
  }
  notifyChange()
}

const drinkViewTemplate = htmlt`
  <li>
    ${'name'} is € ${'price'}
    <button ${'buttonSettings'} onclick=${'clickFunction'} disabled="${'disabled'}">Give me!</button>
  </li>
`

function drinkView (drink, deleteDrink) {
  return drinkViewTemplate({
    name: drink.name,
    price: drink.price,
    disabled: !drink.sold,
    buttonSettings: {type: 'submit', 'data-ga-btn': 'Button'},
    clickFunction: () => deleteDrink(drink)}
  )
}

const mainViewTemplate = htmlt`
  <div>
    <p>${'greeting'}, ${'name'}!</p>
    ${'drinkItems'}
  </div>
`

const noDrinkItems = html`
  <p>All drinks are gone!</p>
`

const drinkItemsTemplate = htmlt`
  <ul>
    ${'items'}
  </ul>
`

function mainView (greeting, name, drinks, deleteDrink) {
  return mainViewTemplate({
    greeting,
    name,
    drinkItems: drinks.length > 0
      ? drinkItemsTemplate({items: drinks.map(drink => drinkView(drink, deleteDrink))})
      : noDrinkItems
  })
}

function render () {
  return mainView(greeting, name, drinks, deleteDrink)
}

module.exports = {
  render: render,
  onChange: onChange
}
