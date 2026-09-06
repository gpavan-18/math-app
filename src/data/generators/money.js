// Generators for Money — currency-aware (defaults to US Dollars).
// US coins are valued in cents (¢); bills in dollars ($). Units are never mixed.
import { randInt, pick, shuffle } from './util.js'
import { pickName } from '../names.js'
import { getCurrency } from '../currency.js'

const ITEMS = [
  ['pencil', '✏️'], ['eraser', '🧽'], ['candy bar', '🍫'], ['toy car', '🚗'],
  ['ball', '⚽'], ['notebook', '📓'], ['ice cream', '🍦'], ['balloon', '🎈'],
  ['sticker', '⭐'], ['juice box', '🧃'], ['cookie', '🍪'], ['apple', '🍎'],
]

const US_COIN_NAME = { 1: 'penny', 5: 'nickel', 10: 'dime', 25: 'quarter' }
const US_COIN_PLURAL = { 1: 'pennies', 5: 'nickels', 10: 'dimes', 25: 'quarters' }

function fmt(amount, unit, after) {
  return after ? `${amount}${unit}` : `${unit}${amount}`
}
function coinPlural(cur, v) {
  return cur.code === 'USD' ? US_COIN_PLURAL[v] : `${cur.symbol}${v} coins`
}

function buildCoins(rng, cur, level) {
  const count = randInt(rng, 2, level === 0 ? 4 : 6)
  const items = []
  let total = 0
  for (let i = 0; i < count; i++) {
    const v = pick(rng, cur.coins)
    items.push({ type: 'coin', value: v, unit: cur.coinUnit, after: cur.coinAfter })
    total += v
  }
  return { items, total, unit: cur.coinUnit, after: cur.coinAfter }
}
function buildBills(rng, cur, level) {
  const count = randInt(rng, 2, level === 0 ? 4 : 6)
  const items = []
  let total = 0
  for (let i = 0; i < count; i++) {
    const v = pick(rng, cur.notes)
    items.push({ type: 'note', value: v, unit: cur.noteUnit, after: false })
    total += v
  }
  return { items, total, unit: cur.noteUnit, after: false }
}
function buildWallet(rng, cur, level) {
  if (cur.unified) {
    const count = randInt(rng, 2, level === 0 ? 4 : 6)
    const items = []
    let total = 0
    for (let i = 0; i < count; i++) {
      if (level >= 1 && rng() < 0.4) {
        const v = pick(rng, cur.notes)
        items.push({ type: 'note', value: v, unit: cur.noteUnit, after: false })
        total += v
      } else {
        const v = pick(rng, cur.coins)
        items.push({ type: 'coin', value: v, unit: cur.coinUnit, after: cur.coinAfter })
        total += v
      }
    }
    return { items, total, unit: cur.symbol, after: false }
  }
  return rng() < 0.5 ? buildCoins(rng, cur, level) : buildBills(rng, cur, level)
}

export const moneyGenerators = {
  'money-count'(rng, level = 0) {
    const cur = getCurrency()
    const w = buildWallet(rng, cur, level)
    return {
      prompt: w.after ? 'How much money is here in total? (in cents)' : 'How much money is here in total?',
      visual: { type: 'moneyRow', props: { items: w.items } },
      type: 'number',
      unit: w.after ? '' : w.unit,
      unitSuffix: w.after ? w.unit : '',
      answer: w.total,
      hint: 'Add up all the money.',
      explanation: `The total is ${fmt(w.total, w.unit, w.after)}.`,
    }
  },

  'money-compare'(rng, level = 0) {
    const cur = getCurrency()
    const build = cur.unified
      ? () => buildWallet(rng, cur, level)
      : rng() < 0.5
        ? () => buildCoins(rng, cur, level)
        : () => buildBills(rng, cur, level)
    const a = build()
    let b = build()
    let guard = 0
    while (b.total === a.total && guard < 10) {
      b = build()
      guard++
    }
    const answer = a.total > b.total ? 'A' : 'B'
    return {
      prompt: 'Which wallet has MORE money?',
      visual: [
        { type: 'moneyRow', props: { items: a.items }, label: 'Wallet A' },
        { type: 'moneyRow', props: { items: b.items }, label: 'Wallet B' },
      ],
      type: 'mcq',
      choices: [
        { value: 'A', label: 'Wallet A' },
        { value: 'B', label: 'Wallet B' },
      ],
      answer,
      hint: 'Add up each wallet, then compare.',
      explanation: `Wallet A = ${fmt(a.total, a.unit, a.after)}, Wallet B = ${fmt(b.total, b.unit, b.after)}. ${answer} has more.`,
    }
  },

  'money-make'(rng, level = 0) {
    const cur = getCurrency()
    const useCoin = cur.unified ? true : rng() < 0.5
    if (useCoin) {
      const v = pick(rng, cur.coins.filter((c) => c !== 1))
      const count = randInt(rng, 2, level === 0 ? 5 : 9)
      const total = v * count
      return {
        prompt: `How many ${coinPlural(cur, v)} make ${fmt(total, cur.coinUnit, cur.coinAfter)}?`,
        visual: { type: 'coin', props: { value: v, size: 60, unit: cur.coinUnit, after: cur.coinAfter } },
        type: 'number',
        answer: count,
        hint: `Count by ${v}${cur.coinAfter ? cur.coinUnit : ''} until you reach ${fmt(total, cur.coinUnit, cur.coinAfter)}.`,
        explanation: `${fmt(total, cur.coinUnit, cur.coinAfter)} ÷ ${fmt(v, cur.coinUnit, cur.coinAfter)} = ${count}.`,
      }
    }
    const v = pick(rng, cur.notes.filter((n) => n !== 1))
    const count = randInt(rng, 2, level === 0 ? 5 : 9)
    const total = v * count
    return {
      prompt: `How many ${cur.symbol}${v} ${cur.noteWord}s make ${cur.symbol}${total}?`,
      visual: { type: 'note', props: { value: v, width: 120, unit: cur.noteUnit } },
      type: 'number',
      answer: count,
      hint: `Count by ${cur.symbol}${v} until you reach ${cur.symbol}${total}.`,
      explanation: `${cur.symbol}${total} ÷ ${cur.symbol}${v} = ${count}.`,
    }
  },

  'money-change'(rng, level = 0) {
    const cur = getCurrency()
    const [item, emoji] = pick(rng, ITEMS)
    const paid = pick(rng, cur.notes.filter((n) => n >= 5))
    const cost = randInt(rng, 2, paid - 1)
    return {
      prompt: `A ${item} ${emoji} costs ${cur.symbol}${cost}. You pay with a ${cur.symbol}${paid} ${cur.noteWord}. How much change do you get back?`,
      visual: { type: 'note', props: { value: paid, width: 130, unit: cur.noteUnit } },
      type: 'number',
      unit: cur.symbol,
      answer: paid - cost,
      hint: `Change = money paid − cost = ${cur.symbol}${paid} − ${cur.symbol}${cost}.`,
      explanation: `${cur.symbol}${paid} − ${cur.symbol}${cost} = ${cur.symbol}${paid - cost} change.`,
    }
  },

  'money-word'(rng, level = 0) {
    const cur = getCurrency()
    const picks = shuffle(rng, ITEMS).slice(0, 2)
    const p1 = randInt(rng, 3, level === 0 ? 15 : 40)
    const p2 = randInt(rng, 3, level === 0 ? 15 : 40)
    const name = pickName(rng)
    const templates = [
      { q: `A ${picks[0][0]} ${picks[0][1]} costs ${cur.symbol}${p1} and a ${picks[1][0]} ${picks[1][1]} costs ${cur.symbol}${p2}. How much for BOTH?`, a: p1 + p2 },
      { q: `${name} buys a ${picks[0][0]} ${picks[0][1]} for ${cur.symbol}${p1}. ${name} had ${cur.symbol}${p1 + p2}. How much money is LEFT?`, a: p2 },
    ]
    const t = pick(rng, templates)
    return {
      prompt: t.q,
      type: 'number',
      unit: cur.symbol,
      answer: t.a,
      hint: '"Both / in all" means add. "Left" means subtract.',
      explanation: `The answer is ${cur.symbol}${t.a}.`,
    }
  },
}
