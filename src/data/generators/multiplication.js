// Generators for Multiplication.
import { randInt, pick } from './util.js'
import { emojiFor, randomTheme } from '../emoji.js'
import { NAMES } from '../names.js'

const CONTAINERS = [
  ['boxes', 'chocolates', '🍫'], ['baskets', 'apples', '🍎'], ['packets', 'cookies', '🍪'],
  ['bags', 'marbles', '🔮'], ['trays', 'muffins', '🧁'], ['jars', 'candies', '🍬'],
  ['rows', 'plants', '🌱'], ['vans', 'children', '🧒'],
]

export const multiplicationGenerators = {
  'mult-arrays'(rng, level = 0) {
    const theme = randomTheme(rng)
    const rows = randInt(rng, 2, level === 0 ? 4 : 6)
    const cols = randInt(rng, 2, level === 0 ? 5 : 8)
    const e = emojiFor(randInt(rng, 0, 30), theme)
    return {
      prompt: `How many altogether? (${rows} rows of ${cols})`,
      sub: `${rows} × ${cols} = ?`,
      visual: { type: 'arrayDots', props: { rows, cols, emoji: e, size: 24 } },
      type: 'number',
      answer: rows * cols,
      hint: `Count the rows: ${rows} groups of ${cols}.`,
      explanation: `${rows} × ${cols} = ${rows * cols}.`,
    }
  },

  'mult-groups'(rng, level = 0) {
    const theme = randomTheme(rng)
    const groups = randInt(rng, 2, level === 0 ? 4 : 6)
    const per = randInt(rng, 2, level === 0 ? 4 : 6)
    const e = emojiFor(randInt(rng, 0, 30), theme)
    return {
      prompt: `${groups} groups of ${per}. How many in all?`,
      sub: `${groups} × ${per} = ?`,
      visual: { type: 'equalGroups', props: { groups, perGroup: per, emoji: e, size: 22 } },
      type: 'number',
      answer: groups * per,
      hint: `Add ${per} a total of ${groups} times.`,
      explanation: `${groups} × ${per} = ${groups * per}.`,
    }
  },

  'times-tables'(rng, level = 0) {
    const a = randInt(rng, 2, level === 0 ? 5 : level === 1 ? 10 : 12)
    const b = randInt(rng, 2, level === 0 ? 5 : level === 1 ? 10 : 12)
    return {
      prompt: `${a} × ${b} = ?`,
      type: 'number',
      answer: a * b,
      hint: `Recite the ${a} times table, or the ${b} times table.`,
      explanation: `${a} × ${b} = ${a * b}.`,
    }
  },

  'mult-2x1'(rng, level = 0) {
    const a = randInt(rng, level === 0 ? 11 : 13, level === 0 ? 33 : 99)
    const b = randInt(rng, 2, level === 0 ? 4 : 9)
    return {
      prompt: `${a} × ${b} = ?`,
      type: 'number',
      answer: a * b,
      hint: 'Multiply the ones, then the tens, then add.',
      explanation: `${a} × ${b} = ${a * b}.`,
    }
  },

  'mult-missing'(rng, level = 0) {
    const a = randInt(rng, 2, level === 0 ? 5 : 10)
    const answer = randInt(rng, 2, level === 0 ? 5 : 10)
    const product = a * answer
    return {
      prompt: `${a} × ___ = ${product}`,
      sub: 'What is the missing factor?',
      type: 'number',
      answer,
      hint: `Think: ${product} shared into ${a} equal groups.`,
      explanation: `${a} × ${answer} = ${product}.`,
    }
  },

  'mult-word'(rng, level = 0) {
    const name = pick(rng, NAMES)
    const [container, item, emoji] = pick(rng, CONTAINERS)
    const groups = randInt(rng, 2, level === 0 ? 5 : 9)
    const per = randInt(rng, 2, level === 0 ? 6 : 12)
    const templates = [
      `${name} has ${groups} ${container}. Each has ${per} ${item}. How many ${item} in total?`,
      `There are ${groups} ${container} with ${per} ${item} in each. How many ${item} altogether?`,
      `One ${container.replace(/e?s$/, '')} holds ${per} ${item}. How many ${item} are in ${groups} ${container}?`,
    ]
    return {
      prompt: pick(rng, templates),
      visual: level === 0 ? { type: 'equalGroups', props: { groups: Math.min(groups, 5), perGroup: Math.min(per, 6), emoji, size: 20 } } : undefined,
      type: 'number',
      answer: groups * per,
      hint: 'Equal groups mean MULTIPLY.',
      explanation: `${groups} × ${per} = ${groups * per} ${item}.`,
    }
  },
}
