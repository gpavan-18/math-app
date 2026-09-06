// Generators for Subtraction.
import { randInt, pick } from './util.js'
import { emojiFor, randomTheme } from '../emoji.js'
import { NAMES } from '../names.js'

const OBJECTS = [
  ['marbles', '🔮'], ['stickers', '⭐'], ['candies', '🍬'], ['pencils', '✏️'],
  ['apples', '🍎'], ['balloons', '🎈'], ['cookies', '🍪'], ['mangoes', '🥭'],
  ['birds', '🐦'], ['coins', '🪙'], ['grapes', '🍇'], ['fish', '🐟'],
]

function subQuestion(a, b, extra = {}) {
  return {
    prompt: `${a} − ${b} = ?`,
    type: 'number',
    answer: a - b,
    hint: 'Start at the big number and count back.',
    explanation: `${a} − ${b} = ${a - b}.`,
    ...extra,
  }
}

export const subtractionGenerators = {
  'sub-pictures'(rng, level = 0) {
    const theme = randomTheme(rng)
    const cap = level === 0 ? 10 : 18
    const a = randInt(rng, 4, cap)
    const b = randInt(rng, 1, a - 1)
    const e = emojiFor(randInt(rng, 0, 30), theme)
    return {
      prompt: `${a} take away ${b}. How many are left?`,
      sub: `The crossed-out ones are taken away.`,
      visual: { type: 'countingObjects', props: { count: a, crossedOut: b, emoji: e, size: 34 } },
      type: 'number',
      answer: a - b,
      hint: 'Count only the ones that are NOT crossed out.',
      explanation: `${a} − ${b} = ${a - b}.`,
    }
  },

  'sub-number-line'(rng, level = 0) {
    const to = level === 0 ? 10 : 20
    const a = randInt(rng, 4, to)
    const b = randInt(rng, 1, a - 1)
    return {
      prompt: `Start at ${a} and hop ${b} backward. Where do you land?`,
      visual: { type: 'numberLine', props: { from: 0, to, hop: { from: a, to: a - b } } },
      type: 'number',
      answer: a - b,
      hint: `Count ${b} hops to the LEFT from ${a}.`,
      explanation: `${a} − ${b} = ${a - b}.`,
    }
  },

  'sub-within-20'(rng, level = 0) {
    const a = randInt(rng, level === 0 ? 5 : 12, 20)
    const b = randInt(rng, 1, a - 1)
    return subQuestion(a, b)
  },

  'sub-2digit'(rng, level = 0) {
    let a, b
    if (level === 0) {
      // no borrow
      const at = randInt(rng, 2, 9),
        ao = randInt(rng, 1, 9)
      const bt = randInt(rng, 1, at - 1),
        bo = randInt(rng, 0, ao)
      a = at * 10 + ao
      b = bt * 10 + bo
    } else {
      a = randInt(rng, 30, 99)
      b = randInt(rng, 10, a - 1)
    }
    return subQuestion(a, b, { hint: 'Subtract the ones first. Borrow a ten if you need to.' })
  },

  'sub-3digit'(rng, level = 0) {
    const a = randInt(rng, level === 0 ? 300 : 500, 999)
    const b = randInt(rng, 100, a - 1)
    return subQuestion(a, b, { hint: 'Line up the columns. Borrow from the next column if needed.' })
  },

  'sub-missing'(rng, level = 0) {
    const a = randInt(rng, level === 0 ? 6 : 20, level === 0 ? 12 : 60)
    const answer = randInt(rng, 1, a - 1)
    const b = a - answer
    // a - b = answer  → ask for b
    return {
      prompt: `${a} − ___ = ${answer}`,
      sub: 'What is the missing number?',
      type: 'number',
      answer: b,
      hint: `Think: ${a} take away what gives ${answer}?`,
      explanation: `${a} − ${b} = ${answer}.`,
    }
  },

  'sub-word'(rng, level = 0) {
    const name = pick(rng, NAMES)
    const [obj, emoji] = pick(rng, OBJECTS)
    const cap = level === 0 ? 20 : level === 1 ? 60 : 500
    const a = randInt(rng, 8, cap)
    const b = randInt(rng, 3, a - 1)
    const templates = [
      `${name} had ${a} ${obj}. ${name} gave away ${b} of them. How many ${obj} are left?`,
      `There were ${a} ${obj} on a tree. ${b} fell down. How many ${obj} are still on the tree?`,
      `A shop had ${a} ${obj}. It sold ${b} ${obj}. How many ${obj} are left?`,
      `${name} wants ${a} ${obj} but only has ${b}. How many MORE ${obj} does ${name} need?`,
    ]
    return {
      prompt: pick(rng, templates),
      visual: level === 0 ? { type: 'countingObjects', props: { count: Math.min(a, 12), crossedOut: Math.min(b, 11), emoji, size: 24 } } : undefined,
      type: 'number',
      answer: a - b,
      hint: 'Words like "left", "gave away", "how many more" mean SUBTRACT.',
      explanation: `${a} − ${b} = ${a - b} ${obj}.`,
    }
  },
}
