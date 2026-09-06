// Generators for Measurement — US customary units.
// Length: inches / feet / yards. Weight: ounces / pounds. Capacity: cups / pints / quarts / gallons.
import { randInt, pick, shuffle } from './util.js'

// Objects ordered from small to large for comparison questions.
const LENGTH = ['an ant 🐜', 'a paperclip 📎', 'a pencil ✏️', 'a book 📕', 'a backpack 🎒', 'a door 🚪', 'a car 🚗', 'a school bus 🚌', 'a train 🚆']
const WEIGHT = ['a feather 🪶', 'an apple 🍎', 'a water bottle 💧', 'a big book 📚', 'a brick 🧱', 'a chair 🪑', 'a bicycle 🚲', 'an elephant 🐘']
const CAPACITY = ['a spoon 🥄', 'a teacup ☕', 'a water bottle 🍶', 'a bucket 🪣', 'a bathtub 🛁', 'a swimming pool 🏊']

const SMALL_LEN = ['a pencil ✏️', 'a crayon 🖍️', 'an eraser 🧽', 'a key 🔑', 'a spoon 🥄', 'a paperclip 📎']
const BIG_LEN = ['a classroom 🏫', 'a playground 🛝', 'a car 🚗', 'a school bus 🚌', 'a football field 🏈']
const LIGHT = ['a feather 🪶', 'a leaf 🍃', 'a cookie 🍪', 'a pencil ✏️', 'a coin 🪙', 'a strawberry 🍓']
const HEAVY = ['a backpack 🎒', 'a watermelon 🍉', 'a chair 🪑', 'a table 🪑', 'a bag of dog food 🐕', 'a person 🧍']
const SMALL_CAP = ['a spoon 🥄', 'a teacup ☕', 'a glass 🥛', 'a small carton 🧃']
const BIG_CAP = ['a bucket 🪣', 'a water cooler 🚰', 'a bathtub 🛁', 'a fish tank 🐠']

function comparePair(rng, list, longerWord, shorterWord) {
  const i = randInt(rng, 0, list.length - 1)
  let j = randInt(rng, 0, list.length - 1)
  while (j === i) j = randInt(rng, 0, list.length - 1)
  const bigger = i > j ? list[i] : list[j]
  const smaller = i > j ? list[j] : list[i]
  const askLonger = rng() < 0.5
  const answer = askLonger ? bigger : smaller
  const options = shuffle(rng, [list[i], list[j]]).map((v) => ({ value: v, label: v }))
  return {
    prompt: `Which is ${askLonger ? longerWord : shorterWord}?`,
    type: 'mcq',
    choices: options,
    answer,
    explanation: `${bigger} is ${longerWord} than ${smaller}.`,
  }
}

export const measurementGenerators = {
  'meas-length'(rng, level = 0) {
    if (rng() < 0.5) return comparePair(rng, LENGTH, 'longer', 'shorter')
    const small = rng() < 0.5
    const obj = pick(rng, small ? SMALL_LEN : BIG_LEN)
    return {
      prompt: `Which unit is best to measure the length of ${obj}?`,
      type: 'mcq',
      choices: shuffle(rng, [
        { value: 'in', label: 'Inches (in)' },
        { value: 'ft', label: 'Feet (ft)' },
      ]),
      answer: small ? 'in' : 'ft',
      hint: 'Small things → inches. Big things → feet.',
      explanation: `We measure ${obj} in ${small ? 'inches (in)' : 'feet (ft)'}.`,
    }
  },

  'meas-weight'(rng) {
    if (rng() < 0.5) return comparePair(rng, WEIGHT, 'heavier', 'lighter')
    const light = rng() < 0.5
    const obj = pick(rng, light ? LIGHT : HEAVY)
    return {
      prompt: `Which unit is best to weigh ${obj}?`,
      type: 'mcq',
      choices: shuffle(rng, [
        { value: 'oz', label: 'Ounces (oz)' },
        { value: 'lb', label: 'Pounds (lb)' },
      ]),
      answer: light ? 'oz' : 'lb',
      hint: 'Light things → ounces. Heavy things → pounds.',
      explanation: `We weigh ${obj} in ${light ? 'ounces (oz)' : 'pounds (lb)'}.`,
    }
  },

  'meas-capacity'(rng) {
    if (rng() < 0.5) return comparePair(rng, CAPACITY, 'holds more', 'holds less')
    const small = rng() < 0.5
    const obj = pick(rng, small ? SMALL_CAP : BIG_CAP)
    return {
      prompt: `Which unit is best to measure how much ${obj} holds?`,
      type: 'mcq',
      choices: shuffle(rng, [
        { value: 'cups', label: 'Cups' },
        { value: 'gal', label: 'Gallons (gal)' },
      ]),
      answer: small ? 'cups' : 'gal',
      hint: 'Small amounts → cups. Large amounts → gallons.',
      explanation: `We measure ${obj} in ${small ? 'cups' : 'gallons (gal)'}.`,
    }
  },

  'meas-convert'(rng, level = 0) {
    const kind = pick(rng, [
      { name: 'feet', singular: 'foot', to: 'inches', factor: 12 },
      { name: 'yards', singular: 'yard', to: 'feet', factor: 3 },
      { name: 'pounds', singular: 'pound', to: 'ounces', factor: 16 },
      { name: 'gallons', singular: 'gallon', to: 'quarts', factor: 4 },
      { name: 'quarts', singular: 'quart', to: 'pints', factor: 2 },
      { name: 'pints', singular: 'pint', to: 'cups', factor: 2 },
    ])
    const n = randInt(rng, 1, level === 0 ? 5 : 9)
    return {
      prompt: `${n} ${kind.name} = ___ ${kind.to}?`,
      sub: `(1 ${kind.singular} = ${kind.factor} ${kind.to})`,
      type: 'number',
      unitSuffix: ` ${kind.to}`,
      answer: n * kind.factor,
      hint: `Multiply by ${kind.factor}.`,
      explanation: `${n} × ${kind.factor} = ${n * kind.factor} ${kind.to}.`,
    }
  },

  'meas-word'(rng, level = 0) {
    const kind = pick(rng, [
      { unit: 'inches', word: 'ribbon', emoji: '🎀' },
      { unit: 'pounds', word: 'bag of apples', emoji: '🍎' },
      { unit: 'cups', word: 'jug of juice', emoji: '🧃' },
      { unit: 'feet', word: 'rope', emoji: '🪢' },
    ])
    const a = randInt(rng, 5, level === 0 ? 20 : 60)
    const b = randInt(rng, 3, a - 1)
    const add = rng() < 0.5
    return {
      prompt: add
        ? `One ${kind.word} ${kind.emoji} is ${a} ${kind.unit} and another is ${b} ${kind.unit}. How much altogether?`
        : `A ${kind.word} ${kind.emoji} is ${a} ${kind.unit}. ${b} ${kind.unit} is used. How much is left?`,
      type: 'number',
      unitSuffix: ` ${kind.unit}`,
      answer: add ? a + b : a - b,
      hint: add ? '"Altogether" means add.' : '"Left / used" means subtract.',
      explanation: `${add ? `${a} + ${b} = ${a + b}` : `${a} − ${b} = ${a - b}`} ${kind.unit}.`,
    }
  },
}
