// Generators for Patterns & Brain Teasers (olympiad-style).
import { randInt, pick, shuffle } from './util.js'
import { NAMES } from '../names.js'

export const patternsGenerators = {
  'number-patterns'(rng, level = 0) {
    const kind = pick(rng, level === 0 ? ['arith', 'skip'] : ['arith', 'double', 'square', 'skip'])
    if (kind === 'double') {
      const start = pick(rng, [1, 2, 3])
      const terms = [start, start * 2, start * 4, start * 8]
      return seq(terms, start * 16, 'Each number is DOUBLE the one before.')
    }
    if (kind === 'square') {
      const terms = [1, 4, 9, 16]
      return seq(terms, 25, 'These are square numbers: 1×1, 2×2, 3×3, 4×4, 5×5.')
    }
    // arithmetic / skip
    const start = randInt(rng, 1, 9)
    const step = kind === 'skip' ? pick(rng, [2, 5, 10]) : randInt(rng, 2, level === 0 ? 5 : 9)
    const terms = [start, start + step, start + 2 * step, start + 3 * step]
    return seq(terms, start + 4 * step, `Add ${step} each time.`)
  },

  'odd-one-out'(rng, level = 0) {
    const kind = pick(rng, ['parity', 'multiple', 'table'])
    if (kind === 'parity') {
      const even = rng() < 0.5
      const group = new Set()
      while (group.size < 3) group.add(randInt(rng, 1, 20) * 2 - (even ? 0 : 1))
      let odd = randInt(rng, 1, 20) * 2 - (even ? 1 : 0)
      const nums = shuffle(rng, [...group, odd])
      return {
        prompt: 'Which number is the ODD ONE OUT?',
        sub: even ? '(Three are even, one is not.)' : '(Three are odd, one is not.)',
        type: 'mcq',
        choices: nums.map((n) => ({ value: String(n), label: String(n) })),
        answer: String(odd),
        explanation: `${odd} is the only ${even ? 'odd' : 'even'} number.`,
      }
    }
    if (kind === 'multiple') {
      const k = pick(rng, [5, 10])
      const group = new Set()
      while (group.size < 3) group.add(k * randInt(rng, 1, 9))
      let odd
      do {
        odd = randInt(rng, 2, 90)
      } while (odd % k === 0)
      const nums = shuffle(rng, [...group, odd])
      return {
        prompt: 'Which number does NOT belong?',
        sub: `(Three are in the ${k} times table.)`,
        type: 'mcq',
        choices: nums.map((n) => ({ value: String(n), label: String(n) })),
        answer: String(odd),
        explanation: `${odd} is not a multiple of ${k}.`,
      }
    }
    const k = pick(rng, [2, 3, 4])
    const group = new Set()
    while (group.size < 3) group.add(k * randInt(rng, 2, 9))
    let odd
    do {
      odd = randInt(rng, 3, 40)
    } while (odd % k === 0)
    const nums = shuffle(rng, [...group, odd])
    return {
      prompt: 'Which number does NOT belong?',
      sub: `(Three are in the ${k} times table.)`,
      type: 'mcq',
      choices: nums.map((n) => ({ value: String(n), label: String(n) })),
      answer: String(odd),
      explanation: `${odd} is not a multiple of ${k}.`,
    }
  },

  'logic-puzzles'(rng, level = 0) {
    const name = pick(rng, NAMES)
    const name2 = pick(rng, NAMES.filter((n) => n !== name))
    const puzzles = [
      () => {
        const n = randInt(rng, 3, 12)
        return { prompt: `I think of a number, double it, and get ${n * 2}. What is my number?`, answer: n, explanation: `${n * 2} ÷ 2 = ${n}.` }
      },
      () => {
        const legs = 4
        const animals = randInt(rng, 2, 6)
        return { prompt: `There are ${animals} dogs 🐶. Each dog has ${legs} legs. How many legs in total?`, answer: animals * legs, explanation: `${animals} × ${legs} = ${animals * legs}.` }
      },
      () => {
        const age = randInt(rng, 5, 9)
        const diff = randInt(rng, 2, 5)
        return { prompt: `${name} is ${diff} years older than ${name2}. ${name2} is ${age}. How old is ${name}?`, answer: age + diff, explanation: `${age} + ${diff} = ${age + diff}.` }
      },
      () => {
        const wheels = 2
        const cycles = randInt(rng, 3, 8)
        return { prompt: `A rack has ${cycles} bicycles 🚲. Each has ${wheels} wheels. How many wheels altogether?`, answer: cycles * wheels, explanation: `${cycles} × 2 = ${cycles * wheels}.` }
      },
      () => {
        const a = randInt(rng, 2, 6)
        return { prompt: `How many corners do ${a} triangles have in total?`, answer: a * 3, explanation: `Each triangle has 3 corners, so ${a} × 3 = ${a * 3} corners.` }
      },
    ]
    const p = pick(rng, puzzles)()
    return { prompt: p.prompt, type: 'number', answer: p.answer, hint: 'Read slowly and picture it in your head.', explanation: p.explanation }
  },

  olympiad(rng, level = 0) {
    const problems = [
      () => {
        const n = randInt(rng, 5, 10)
        const sum = (n * (n + 1)) / 2
        return { prompt: `What is 1 + 2 + 3 + ... + ${n}?`, answer: sum, explanation: `Add pairs: the sum from 1 to ${n} is ${sum}.` }
      },
      () => {
        const cost = pick(rng, [2, 5, 10])
        const qty = randInt(rng, 3, 8)
        const total = cost * qty
        return { prompt: `One pencil costs $${cost}. How many pencils can you buy with $${total}?`, answer: qty, explanation: `$${total} ÷ $${cost} = ${qty} pencils.` }
      },
      () => {
        const start = pick(rng, [2, 3])
        return { prompt: `Find the next number: ${start}, ${start * 2}, ${start * 4}, ${start * 8}, __`, answer: start * 16, explanation: `Each number doubles: next is ${start * 16}.` }
      },
      () => {
        const rows = randInt(rng, 3, 6)
        return { prompt: `In a hall, chairs are in ${rows} rows with ${rows} chairs in each row. How many chairs in total?`, answer: rows * rows, explanation: `${rows} × ${rows} = ${rows * rows}.` }
      },
      () => {
        const handshake = randInt(rng, 3, 5)
        const total = (handshake * (handshake - 1)) / 2
        return { prompt: `${handshake} friends each shake hands with every other friend ONCE. How many handshakes in all?`, answer: total, explanation: `${handshake} × ${handshake - 1} ÷ 2 = ${total}.` }
      },
      () => {
        const a = randInt(rng, 10, 40)
        const b = randInt(rng, 10, 40)
        const target = a + b
        return { prompt: `Two numbers add up to ${target}. One number is ${a}. What is the other?`, answer: b, explanation: `${target} − ${a} = ${b}.` }
      },
    ]
    const p = pick(rng, problems)()
    return { prompt: p.prompt, type: 'number', answer: p.answer, hint: 'Think like a champion — look for a pattern!', explanation: p.explanation }
  },
}

function seq(terms, answer, explanation) {
  return {
    prompt: 'What number comes NEXT?',
    sub: `${terms.join(',   ')},   __`,
    type: 'number',
    answer,
    hint: 'Look at how much the numbers jump each time.',
    explanation,
  }
}
