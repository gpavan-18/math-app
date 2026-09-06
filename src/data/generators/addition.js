// Generators for Addition.
import { randInt, pick, makeMCQ, nearbyDistractors } from './util.js'
import { emojiFor, randomTheme } from '../emoji.js'
import { NAMES } from '../names.js'

const OBJECTS = [
  ['marbles', '🔮'], ['stickers', '⭐'], ['candies', '🍬'], ['pencils', '✏️'],
  ['apples', '🍎'], ['balloons', '🎈'], ['cookies', '🍪'], ['flowers', '🌸'],
  ['books', '📚'], ['coins', '🪙'], ['toys', '🧸'], ['crayons', '🖍️'],
]

function addQuestion(a, b, extra = {}) {
  const answer = a + b
  return {
    prompt: `${a} + ${b} = ?`,
    type: 'number',
    answer,
    hint: 'Start at the bigger number and count up.',
    explanation: `${a} + ${b} = ${answer}.`,
    ...extra,
  }
}

export const additionGenerators = {
  'add-pictures'(rng, level = 0) {
    const theme = randomTheme(rng)
    const cap = level === 0 ? 5 : 9
    const a = randInt(rng, 1, cap)
    const b = randInt(rng, 1, cap)
    const e = emojiFor(randInt(rng, 0, 30), theme)
    return {
      prompt: `How many altogether?`,
      sub: `${a} + ${b} = ?`,
      visual: { type: 'addGroups', props: { a, b, emojiA: e, emojiB: e, size: 32 } },
      type: 'number',
      answer: a + b,
      hint: 'Count all the pictures together.',
      explanation: `${a} + ${b} = ${a + b}.`,
    }
  },

  'add-number-line'(rng, level = 0) {
    const to = level === 0 ? 10 : 20
    const a = randInt(rng, 1, to - 4)
    const b = randInt(rng, 1, to - a)
    return {
      prompt: `Start at ${a} and hop ${b} forward. Where do you land?`,
      visual: { type: 'numberLine', props: { from: 0, to, hop: { from: a, to: a + b } } },
      type: 'number',
      answer: a + b,
      hint: `Count ${b} hops to the right from ${a}.`,
      explanation: `${a} + ${b} = ${a + b}.`,
    }
  },

  'add-within-20'(rng, level = 0) {
    const a = randInt(rng, 1, level === 0 ? 9 : 15)
    const b = randInt(rng, 1, level === 0 ? 9 : 20 - a)
    return addQuestion(a, b)
  },

  'add-2digit'(rng, level = 0) {
    // level 0: no regroup, level 1+: allow regroup
    let a, b
    if (level === 0) {
      const at = randInt(rng, 1, 8),
        ao = randInt(rng, 0, 8)
      const bt = randInt(rng, 1, 9 - at),
        bo = randInt(rng, 0, 9 - ao)
      a = at * 10 + ao
      b = bt * 10 + bo
    } else {
      a = randInt(rng, 10, 89)
      b = randInt(rng, 10, 99)
    }
    return addQuestion(a, b, { hint: 'Add the ones first, then the tens. Carry if you get 10 or more.' })
  },

  'add-3digit'(rng, level = 0) {
    const a = randInt(rng, 100, level === 0 ? 499 : 899)
    const b = randInt(rng, 100, level === 0 ? 400 : 999)
    return addQuestion(a, b, { hint: 'Line up ones, tens and hundreds. Add each column.' })
  },

  'add-missing'(rng, level = 0) {
    const total = randInt(rng, level === 0 ? 6 : 20, level === 0 ? 10 : 50)
    const a = randInt(rng, 1, total - 1)
    const missing = total - a
    return {
      prompt: `${a} + ___ = ${total}`,
      sub: 'What is the missing number?',
      type: 'number',
      answer: missing,
      hint: `Think: ${total} take away ${a}.`,
      explanation: `${a} + ${missing} = ${total}.`,
    }
  },

  'add-word'(rng, level = 0) {
    const name = pick(rng, NAMES)
    const name2 = pick(rng, NAMES)
    const [obj, emoji] = pick(rng, OBJECTS)
    const cap = level === 0 ? 20 : level === 1 ? 60 : 400
    const a = randInt(rng, 3, cap)
    const b = randInt(rng, 3, cap)
    const templates = [
      `${name} has ${a} ${obj}. ${name2} gives ${name} ${b} more. How many ${obj} does ${name} have now?`,
      `There are ${a} ${obj} in a red box and ${b} ${obj} in a blue box. How many ${obj} in total?`,
      `${name} collected ${a} ${obj} on Monday and ${b} ${obj} on Tuesday. How many ${obj} altogether?`,
    ]
    return {
      prompt: pick(rng, templates),
      visual: level === 0 ? { type: 'addGroups', props: { a: Math.min(a, 9), b: Math.min(b, 9), emojiA: emoji, emojiB: emoji, size: 26 } } : undefined,
      type: 'number',
      answer: a + b,
      unit: '',
      hint: 'The words "more", "in total" and "altogether" mean ADD.',
      explanation: `${a} + ${b} = ${a + b} ${obj}.`,
    }
  },
}
