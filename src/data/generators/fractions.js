// Generators for Fractions.
import { randInt, pick, shuffle } from './util.js'

const shapePick = (rng) => pick(rng, ['fractionCircle', 'fractionBar'])

export const fractionGenerators = {
  'frac-identify'(rng, level = 0) {
    const denom = pick(rng, level === 0 ? [2, 3, 4] : [2, 3, 4, 5, 6, 8])
    const num = randInt(rng, 1, denom - 1)
    const type = shapePick(rng)
    const props = type === 'fractionCircle' ? { numerator: num, denominator: denom, size: 150 } : { numerator: num, denominator: denom, width: 300, height: 60 }
    return {
      prompt: 'What fraction is shaded?',
      sub: 'Type it like  1/2',
      visual: { type, props },
      type: 'text',
      answer: `${num}/${denom}`,
      normalize: (s) => s.replace(/\s/g, ''),
      hint: 'Top number = shaded parts. Bottom number = total equal parts.',
      explanation: `${num} out of ${denom} parts are shaded = ${num}/${denom}.`,
    }
  },

  'frac-shade'(rng, level = 0) {
    const denom = pick(rng, level === 0 ? [2, 3, 4] : [3, 4, 6, 8])
    const num = randInt(rng, 1, denom - 1)
    const type = shapePick(rng)
    const makeProps = (n, d) =>
      type === 'fractionCircle'
        ? { numerator: n, denominator: d, size: 110 }
        : { numerator: n, denominator: d, width: 200, height: 48 }
    const targetVal = num / denom
    // Build distractor pool across several denominators, distinct by value.
    const pool = []
    const seenVals = new Set([targetVal])
    for (const d of [2, 3, 4, 5, 6, 8]) {
      for (let n = 1; n < d; n++) {
        const v = n / d
        if (seenVals.has(v)) continue
        seenVals.add(v)
        pool.push([n, d])
      }
    }
    const wrongs = shuffle(rng, pool).slice(0, 3)
    const options = shuffle(rng, [
      { value: 'correct', visual: { type, props: makeProps(num, denom) } },
      ...wrongs.map(([n, d], i) => ({ value: 'w' + i, visual: { type, props: makeProps(n, d) } })),
    ])
    return {
      prompt: `Which picture shows ${num}/${denom}?`,
      type: 'mcq',
      choices: options,
      answer: 'correct',
      hint: `Shade ${num} of the ${denom} equal parts.`,
      explanation: `${num}/${denom} means ${num} of ${denom} equal parts are colored.`,
    }
  },

  'frac-of-set'(rng, level = 0) {
    const denom = pick(rng, level === 0 ? [2, 3] : [2, 3, 4, 5])
    const per = randInt(rng, 2, level === 0 ? 4 : 6)
    const total = denom * per
    return {
      prompt: `What is 1/${denom} of ${total}?`,
      sub: `Share ${total} into ${denom} equal groups.`,
      visual: { type: 'equalGroups', props: { groups: denom, perGroup: per, emoji: '🍬', size: 20 } },
      type: 'number',
      answer: per,
      hint: `Divide ${total} by ${denom}.`,
      explanation: `1/${denom} of ${total} = ${total} ÷ ${denom} = ${per}.`,
    }
  },

  'frac-compare'(rng) {
    // same denominator for grade-appropriate comparison
    const denom = pick(rng, [3, 4, 5, 6, 8])
    let n1 = randInt(rng, 1, denom - 1)
    let n2 = randInt(rng, 1, denom - 1)
    if (n1 === n2) n2 = n2 === denom - 1 ? n2 - 1 : n2 + 1
    const answer = n1 > n2 ? '>' : '<'
    return {
      prompt: `Compare the fractions:`,
      sub: `${n1}/${denom}   ?   ${n2}/${denom}`,
      visual: [
        { type: 'fractionBar', props: { numerator: n1, denominator: denom, width: 220, height: 44 }, label: `${n1}/${denom}` },
        { type: 'fractionBar', props: { numerator: n2, denominator: denom, width: 220, height: 44 }, label: `${n2}/${denom}` },
      ],
      type: 'mcq',
      choices: [
        { value: '>', label: '>' },
        { value: '<', label: '<' },
        { value: '=', label: '=' },
      ],
      answer,
      hint: 'Same bottom number? The bigger top number is the bigger fraction.',
      explanation: `${n1}/${denom} ${answer} ${n2}/${denom}.`,
    }
  },

  'frac-equivalent'(rng) {
    const base = pick(rng, [
      [1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [1, 5], [2, 5],
    ])
    const factor = randInt(rng, 2, 4)
    const [bn, bd] = base
    const newDen = bd * factor
    const answer = bn * factor
    return {
      prompt: `Fill in the missing number:`,
      sub: `${bn}/${bd} = ___/${newDen}`,
      visual: [
        { type: 'fractionBar', props: { numerator: bn, denominator: bd, width: 200, height: 44 }, label: `${bn}/${bd}` },
        { type: 'fractionBar', props: { numerator: answer, denominator: newDen, width: 200, height: 44 }, label: `?/${newDen}` },
      ],
      type: 'number',
      answer,
      hint: `Whatever you multiply the bottom by, multiply the top by too. ×${factor}.`,
      explanation: `${bn}/${bd} = ${bn}×${factor}/${bd}×${factor} = ${answer}/${newDen}.`,
    }
  },
}
