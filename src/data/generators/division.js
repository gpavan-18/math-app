// Generators for Division.
import { randInt, pick } from './util.js'
import { emojiFor, randomTheme } from '../emoji.js'
import { NAMES } from '../names.js'

const ITEMS = [
  ['candies', '🍬'], ['apples', '🍎'], ['stickers', '⭐'], ['cookies', '🍪'],
  ['pencils', '✏️'], ['balloons', '🎈'], ['marbles', '🔮'], ['flowers', '🌸'],
]

export const divisionGenerators = {
  'div-sharing'(rng, level = 0) {
    const theme = randomTheme(rng)
    const groups = randInt(rng, 2, level === 0 ? 4 : 5)
    const per = randInt(rng, 2, level === 0 ? 4 : 6)
    const total = groups * per
    const e = emojiFor(randInt(rng, 0, 30), theme)
    return {
      prompt: `Share ${total} equally among ${groups} friends. How many does each friend get?`,
      sub: `${total} ÷ ${groups} = ?`,
      visual: { type: 'equalGroups', props: { groups, perGroup: per, emoji: e, size: 20 } },
      type: 'number',
      answer: per,
      hint: `Deal them out one at a time into ${groups} groups.`,
      explanation: `${total} ÷ ${groups} = ${per}.`,
    }
  },

  'div-facts'(rng, level = 0) {
    const b = randInt(rng, 2, level === 0 ? 5 : 10)
    const answer = randInt(rng, 2, level === 0 ? 5 : 10)
    const a = b * answer
    return {
      prompt: `${a} ÷ ${b} = ?`,
      type: 'number',
      answer,
      hint: `Think: ${b} × ___ = ${a}?`,
      explanation: `${a} ÷ ${b} = ${answer} because ${b} × ${answer} = ${a}.`,
    }
  },

  'div-2x1'(rng, level = 0) {
    const b = randInt(rng, 2, level === 0 ? 5 : 9)
    const answer = randInt(rng, level === 0 ? 11 : 13, level === 0 ? 33 : 99)
    const a = b * answer
    return {
      prompt: `${a} ÷ ${b} = ?`,
      type: 'number',
      answer,
      hint: 'Divide the tens first, then the ones.',
      explanation: `${a} ÷ ${b} = ${answer}.`,
    }
  },

  'div-remainder'(rng, level = 0) {
    const b = randInt(rng, 2, level === 0 ? 5 : 9)
    const q = randInt(rng, 2, level === 0 ? 6 : 12)
    const r = randInt(rng, 1, b - 1)
    const a = b * q + r
    return {
      prompt: `${a} ÷ ${b} — what is the REMAINDER?`,
      sub: 'The remainder is what is left over.',
      type: 'number',
      answer: r,
      hint: `How many make full groups of ${b}? What is left over?`,
      explanation: `${a} ÷ ${b} = ${q} remainder ${r} (because ${b} × ${q} = ${b * q}, and ${a} − ${b * q} = ${r}).`,
    }
  },

  'div-word'(rng, level = 0) {
    const name = pick(rng, NAMES)
    const [item, emoji] = pick(rng, ITEMS)
    const groups = randInt(rng, 2, level === 0 ? 5 : 8)
    const per = randInt(rng, 2, level === 0 ? 6 : 10)
    const total = groups * per
    const templates = [
      { q: `${name} has ${total} ${item} to share equally among ${groups} friends. How many ${item} does each friend get?`, a: per },
      { q: `${total} ${item} are packed equally into ${groups} boxes. How many ${item} are in each box?`, a: per },
      { q: `${name} puts ${total} ${item} into groups of ${per}. How many groups can ${name} make?`, a: groups },
    ]
    const t = pick(rng, templates)
    return {
      prompt: t.q,
      visual: level === 0 ? { type: 'equalGroups', props: { groups: Math.min(groups, 5), perGroup: Math.min(per, 6), emoji, size: 20 } } : undefined,
      type: 'number',
      answer: t.a,
      hint: 'Sharing equally or making equal groups means DIVIDE.',
      explanation: `${total} ÷ ${t.a === per ? groups : per} = ${t.a}.`,
    }
  },
}
