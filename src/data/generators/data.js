// Generators for Data & Graphs.
import { randInt, pick, shuffle } from './util.js'

const DATASETS = [
  { title: 'Favorite Fruit', emoji: '🍎', cats: [['Apple', '🍎'], ['Banana', '🍌'], ['Mango', '🥭'], ['Grapes', '🍇']] },
  { title: 'Pets in Class', emoji: '🐾', cats: [['Dog', '🐶'], ['Cat', '🐱'], ['Fish', '🐟'], ['Rabbit', '🐰']] },
  { title: 'Favorite Sport', emoji: '🏅', cats: [['Baseball', '⚾'], ['Basketball', '🏀'], ['Soccer', '⚽'], ['Football', '🏈']] },
  { title: 'Ice-cream Sold', emoji: '🍦', cats: [['Vanilla', '🍦'], ['Choco', '🍫'], ['Strawberry', '🍓'], ['Mango', '🥭']] },
]

function makeData(rng, level, { multiple = 1 } = {}) {
  const ds = pick(rng, DATASETS)
  const cats = shuffle(rng, ds.cats).slice(0, level === 0 ? 3 : 4)
  const data = cats.map(([label]) => ({ label, value: randInt(rng, 1, level === 0 ? 6 : 10) * multiple }))
  return { ds, data }
}

const COLORBANK = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7']

export const dataGenerators = {
  'read-pictograph'(rng, level = 0) {
    const per = level === 0 ? 1 : pick(rng, [1, 2])
    const { ds, data } = makeData(rng, level, { multiple: per })
    const target = pick(rng, data)
    const other = pick(rng, data.filter((d) => d.label !== target.label)) || target
    const askDiff = level >= 1 && rng() < 0.5 && other.label !== target.label
    return {
      prompt: askDiff
        ? `How many MORE ${target.label} than ${other.label}?`
        : `How many chose ${target.label}?`,
      sub: ds.title,
      visual: { type: 'pictograph', props: { data, emoji: ds.emoji, per } },
      type: 'number',
      answer: askDiff ? Math.abs(target.value - other.value) : target.value,
      hint: per > 1 ? `Each ${ds.emoji} stands for ${per}.` : 'Count the pictures in that row.',
      explanation: askDiff
        ? `${target.value} − ${other.value} = ${Math.abs(target.value - other.value)}.`
        : `${target.label} = ${target.value}.`,
    }
  },

  'read-bargraph'(rng, level = 0) {
    const { ds, data } = makeData(rng, level)
    const colored = data.map((d, i) => ({ ...d, color: COLORBANK[i % COLORBANK.length] }))
    const kind = pick(rng, ['value', 'most', 'least', 'total'])
    if (kind === 'most' || kind === 'least') {
      const sorted = [...data].sort((a, b) => b.value - a.value)
      const ans = kind === 'most' ? sorted[0] : sorted[sorted.length - 1]
      return {
        prompt: `Which has the ${kind === 'most' ? 'MOST' : 'FEWEST'}?`,
        sub: ds.title,
        visual: { type: 'barGraph', props: { data: colored } },
        type: 'mcq',
        choices: shuffle(rng, data).map((d) => ({ value: d.label, label: d.label })),
        answer: ans.label,
        explanation: `${ans.label} has the ${kind === 'most' ? 'most' : 'fewest'} with ${ans.value}.`,
      }
    }
    if (kind === 'total') {
      const total = data.reduce((s, d) => s + d.value, 0)
      return {
        prompt: 'What is the TOTAL of all the bars?',
        sub: ds.title,
        visual: { type: 'barGraph', props: { data: colored } },
        type: 'number',
        answer: total,
        hint: 'Add the height of every bar.',
        explanation: `${data.map((d) => d.value).join(' + ')} = ${total}.`,
      }
    }
    const target = pick(rng, data)
    return {
      prompt: `How tall is the ${target.label} bar?`,
      sub: ds.title,
      visual: { type: 'barGraph', props: { data: colored } },
      type: 'number',
      answer: target.value,
      hint: 'Read across from the top of the bar to the numbers.',
      explanation: `The ${target.label} bar shows ${target.value}.`,
    }
  },

  'tally-marks'(rng, level = 0) {
    const n = randInt(rng, 3, level === 0 ? 12 : 24)
    if (rng() < 0.5) {
      return {
        prompt: 'How many does this tally show?',
        visual: { type: 'tally', props: { count: n } },
        type: 'number',
        answer: n,
        hint: 'Each bundle with a line across is 5.',
        explanation: `That tally shows ${n}.`,
      }
    }
    return {
      prompt: `Show ${n} as tally marks — how many complete bundles of 5 are there?`,
      visual: { type: 'tally', props: { count: n } },
      type: 'number',
      answer: Math.floor(n / 5),
      hint: 'A bundle is 4 lines with one crossed through = 5.',
      explanation: `${n} = ${Math.floor(n / 5)} bundles of 5 and ${n % 5} more.`,
    }
  },

  'data-compare'(rng, level = 0) {
    const { ds, data } = makeData(rng, level)
    const colored = data.map((d, i) => ({ ...d, color: COLORBANK[i % COLORBANK.length] }))
    const two = shuffle(rng, data).slice(0, 2)
    const diff = Math.abs(two[0].value - two[1].value)
    return {
      prompt: `How many more ${two[0].value > two[1].value ? two[0].label : two[1].label} than ${two[0].value > two[1].value ? two[1].label : two[0].label}?`,
      sub: ds.title,
      visual: { type: 'barGraph', props: { data: colored } },
      type: 'number',
      answer: diff,
      hint: 'Find both bars, then subtract the smaller from the bigger.',
      explanation: `The difference is ${diff}.`,
    }
  },
}
