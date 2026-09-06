// Shared helpers for question generators.

// Mulberry32 seeded PRNG — deterministic when seeded (used for tests),
// or random (Math.random) for endless practice.
export function makeRng(seed) {
  if (seed == null) return Math.random
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const randInt = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min
export const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)]

export function shuffle(rng, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a multiple-choice question from a correct answer + distractor generator.
export function makeMCQ(rng, correct, distractors, { format = (x) => x } = {}) {
  const set = new Set([String(correct)])
  const opts = [correct]
  let guard = 0
  while (opts.length < 4 && guard < 100) {
    guard++
    const d = distractors()
    if (d == null) continue
    if (!set.has(String(d))) {
      set.add(String(d))
      opts.push(d)
    }
  }
  const choices = shuffle(rng, opts).map((v) => ({ value: v, label: format(v) }))
  return { choices, answer: correct }
}

// Numeric distractors near a value (for wrong-answer options).
export function nearbyDistractors(rng, value, spread = 5, positiveOnly = true) {
  return () => {
    let delta = randInt(rng, -spread, spread)
    if (delta === 0) delta = 1
    const v = value + delta
    if (positiveOnly && v < 0) return null
    return v
  }
}

let counter = 0
export const uid = () => `q${Date.now().toString(36)}${(counter++).toString(36)}`

// Ordinal helper
export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// Greatest common divisor (for fractions)
export function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a
}
