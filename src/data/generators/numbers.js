// Generators for Numbers & Place Value.
import { randInt, pick, shuffle, makeMCQ, nearbyDistractors, ordinal } from './util.js'
import { emojiFor, randomTheme } from '../emoji.js'

const numWords = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
]
const tensWords = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

export function numberToWords(n) {
  if (n < 20) return numWords[n]
  if (n < 100) {
    const t = Math.floor(n / 10)
    const o = n % 10
    return tensWords[t] + (o ? '-' + numWords[o] : '')
  }
  const h = Math.floor(n / 100)
  const rest = n % 100
  return numWords[h] + ' hundred' + (rest ? ' ' + numberToWords(rest) : '')
}

export const numberGenerators = {
  'count-objects'(rng, level = 0) {
    const theme = randomTheme(rng)
    const max = level === 0 ? 10 : level === 1 ? 20 : 30
    const n = randInt(rng, 3, max)
    const emoji = emojiFor(randInt(rng, 0, 20), theme)
    return {
      prompt: 'How many do you count?',
      visual: { type: 'countingObjects', props: { count: n, emoji, size: n > 20 ? 28 : 36 } },
      type: 'number',
      answer: n,
      hint: 'Point at each one as you count out loud.',
      explanation: `Count them one by one: there are ${n}.`,
    }
  },

  'skip-count'(rng, level = 0) {
    const step = pick(rng, level === 0 ? [2, 5, 10] : [2, 3, 5, 10])
    const start = step * randInt(rng, 1, 4)
    const seq = [start, start + step, start + 2 * step, start + 3 * step]
    const missingIdx = randInt(rng, 2, 3)
    const answer = seq[missingIdx]
    const shown = seq.map((v, i) => (i === missingIdx ? '__' : v))
    return {
      prompt: `Skip count by ${step}. What comes next?`,
      sub: shown.join(',  '),
      type: 'number',
      answer,
      hint: `Add ${step} each time.`,
      explanation: `Counting by ${step}s: ${seq.join(', ')}.`,
    }
  },

  'odd-even'(rng, level = 0) {
    const n = randInt(rng, 1, level === 0 ? 20 : 100)
    const isEven = n % 2 === 0
    return {
      prompt: `Is ${n} odd or even?`,
      visual: { type: 'tenFrame', props: { count: Math.min(n, 10), color: '#60a5fa' } },
      type: 'mcq',
      choices: [
        { value: 'even', label: 'Even' },
        { value: 'odd', label: 'Odd' },
      ],
      answer: isEven ? 'even' : 'odd',
      hint: 'Even numbers can be shared into 2 equal groups. They end in 0, 2, 4, 6, or 8.',
      explanation: `${n} is ${isEven ? 'even' : 'odd'} because it ends in ${n % 10}.`,
    }
  },

  'place-value'(rng, level = 0) {
    const n = level === 0 ? randInt(rng, 10, 99) : randInt(rng, 100, 999)
    const places = level === 0 ? ['tens', 'ones'] : ['hundreds', 'tens', 'ones']
    const place = pick(rng, places)
    const digit = place === 'ones' ? n % 10 : place === 'tens' ? Math.floor(n / 10) % 10 : Math.floor(n / 100)
    return {
      prompt: `In the number ${n}, what is the digit in the ${place} place?`,
      visual: { type: 'baseTenBlocks', props: { value: n } },
      type: 'number',
      answer: digit,
      hint: 'Ones are on the right, then tens, then hundreds.',
      explanation: `${n} → the ${place} digit is ${digit}.`,
    }
  },

  'expanded-form'(rng, level = 0) {
    const n = level < 1 ? randInt(rng, 11, 99) : randInt(rng, 100, 999)
    const h = Math.floor(n / 100)
    const t = Math.floor((n % 100) / 10)
    const o = n % 10
    const parts = []
    if (h) parts.push(h * 100)
    if (t) parts.push(t * 10)
    if (o) parts.push(o)
    return {
      prompt: `Write ${n} in expanded form.`,
      sub: 'Type the sum, like 200+30+4',
      type: 'text',
      answer: parts.join('+'),
      normalize: (s) => s.replace(/\s|\+/g, '').split('').sort().join(''),
      hint: 'Break the number into hundreds, tens and ones.',
      explanation: `${n} = ${parts.join(' + ')}.`,
    }
  },

  'compare-numbers'(rng, level = 0) {
    const max = level === 0 ? 100 : 1000
    let a = randInt(rng, 1, max)
    let b = randInt(rng, 1, max)
    if (a === b) b += 1
    const answer = a > b ? '>' : '<'
    return {
      prompt: `Which sign makes it true?`,
      sub: `${a}  ?  ${b}`,
      visual: { type: 'compare', props: { left: Math.min(a, 9), right: Math.min(b, 9), emoji: '⭐' } },
      type: 'mcq',
      choices: [
        { value: '>', label: '> (greater than)' },
        { value: '<', label: '< (less than)' },
        { value: '=', label: '= (equal)' },
      ],
      answer,
      hint: 'The crocodile mouth always eats the BIGGER number!',
      explanation: `${a} ${answer} ${b}.`,
    }
  },

  'order-numbers'(rng, level = 0) {
    const kind = pick(rng, ['before', 'after', 'between'])
    const max = level === 0 ? 100 : 1000
    const n = randInt(rng, 2, max - 2)
    if (kind === 'before') {
      return {
        prompt: `What number comes just BEFORE ${n}?`,
        type: 'number',
        answer: n - 1,
        hint: 'Count back by one.',
        explanation: `${n - 1} comes before ${n}.`,
      }
    }
    if (kind === 'after') {
      return {
        prompt: `What number comes just AFTER ${n}?`,
        type: 'number',
        answer: n + 1,
        hint: 'Count forward by one.',
        explanation: `${n + 1} comes after ${n}.`,
      }
    }
    return {
      prompt: `What number comes BETWEEN ${n - 1} and ${n + 1}?`,
      type: 'number',
      answer: n,
      hint: 'It is the middle number.',
      explanation: `${n} is between ${n - 1} and ${n + 1}.`,
    }
  },

  'number-names'(rng, level = 0) {
    const max = level === 0 ? 20 : level === 1 ? 99 : 200
    const n = randInt(rng, 0, max)
    // Half the time: number -> name (mcq); half: name -> number (number input)
    if (rng() < 0.5) {
      const correct = numberToWords(n)
      const opts = new Set([correct])
      while (opts.size < 4) {
        const d = randInt(rng, 0, max)
        opts.add(numberToWords(d))
      }
      return {
        prompt: `How do you write ${n} in words?`,
        type: 'mcq',
        choices: shuffle(rng, [...opts]).map((v) => ({ value: v, label: v })),
        answer: correct,
        explanation: `${n} = "${correct}".`,
      }
    }
    return {
      prompt: `Write this number: "${numberToWords(n)}"`,
      type: 'number',
      answer: n,
      explanation: `"${numberToWords(n)}" = ${n}.`,
    }
  },

  rounding(rng, level = 0) {
    const toNearest = level < 2 ? 10 : pick(rng, [10, 100])
    const n = randInt(rng, toNearest === 10 ? 11 : 101, toNearest === 10 ? 99 : 999)
    const answer = Math.round(n / toNearest) * toNearest
    const low = Math.floor(n / toNearest) * toNearest
    return {
      prompt: `Round ${n} to the nearest ${toNearest}.`,
      visual: toNearest === 10 ? { type: 'numberLine', props: { from: low, to: low + 10, marks: [n] } } : undefined,
      type: 'number',
      answer,
      hint: toNearest === 10 ? 'Look at the ones digit. 5 or more rounds up!' : 'Look at the tens digit. 50 or more rounds up!',
      explanation: `${n} is closest to ${answer}.`,
    }
  },
}
