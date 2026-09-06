// Aggregates every topic's generators into one registry and exposes helpers.
import { makeRng } from './util.js'
import { numberGenerators } from './numbers.js'
import { additionGenerators } from './addition.js'
import { subtractionGenerators } from './subtraction.js'
import { multiplicationGenerators } from './multiplication.js'
import { divisionGenerators } from './division.js'
import { fractionGenerators } from './fractions.js'
import { moneyGenerators } from './money.js'
import { measurementGenerators } from './measurement.js'
import { timeGenerators } from './time.js'
import { geometryGenerators } from './geometry.js'
import { dataGenerators } from './data.js'
import { patternsGenerators } from './patterns.js'
import { expansionGenerators, puzzleGenerators } from './expansion.js'

export const GENERATORS = {
  ...numberGenerators,
  ...additionGenerators,
  ...subtractionGenerators,
  ...multiplicationGenerators,
  ...divisionGenerators,
  ...fractionGenerators,
  ...moneyGenerators,
  ...measurementGenerators,
  ...timeGenerators,
  ...geometryGenerators,
  ...dataGenerators,
  ...patternsGenerators,
  ...expansionGenerators,
  ...puzzleGenerators,
}

export function hasGenerator(subtopicId) {
  return typeof GENERATORS[subtopicId] === 'function'
}

// Generate one question for a subtopic.
export function generateQuestion(subtopicId, options = {}) {
  const { rng = Math.random, level = 0 } = options
  const gen = GENERATORS[subtopicId]
  if (!gen) {
    return {
      prompt: 'Solve this warm-up question.',
      type: 'number',
      answer: 5,
      hint: 'Count on from 3.',
      explanation: '3 + 2 = 5.',
    }
  }
  const cappedLevel = typeof options.range === 'number'
    ? options.range <= 20 ? 0 : options.range <= 100 ? Math.min(Number(level) || 0, 1) : level
    : level
  const q = gen(rng, cappedLevel, options)
  return { id: uniqueId(), level: cappedLevel, ...q }
}

// Generate a batch of unique-ish questions (used by Test mode with a seed).
export function generateSet(subtopicId, count, { seed, level = 0 } = {}) {
  const rng = makeRng(seed)
  const out = []
  const seen = new Set()
  let guard = 0
  while (out.length < count && guard < count * 12) {
    guard++
    const q = generateQuestion(subtopicId, { rng, level: pickLevel(level, out.length, count) })
    const key = `${q.prompt}|${q.sub || ''}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  return out
}

// For tests we ramp difficulty: first third easy, then medium, then hard.
function pickLevel(base, index, total) {
  if (base != null && base !== 'ramp') return base
  const r = index / total
  return r < 0.34 ? 0 : r < 0.7 ? 1 : 2
}

let n = 0
function uniqueId() {
  n += 1
  return `q_${Date.now().toString(36)}_${n.toString(36)}`
}

// Check a submitted answer against a question (handles number, text, mcq).
export function checkAnswer(question, submitted) {
  if (submitted == null || submitted === '') return false
  if (question.type === 'number') {
    return Number(submitted) === Number(question.answer)
  }
  if (question.type === 'mcq') {
    return String(submitted) === String(question.answer)
  }
  if (question.type === 'boolean') {
    const toBool = (v) => v === true || v === 'true' || v === 1 || v === '1'
    return toBool(submitted) === toBool(question.answer)
  }
  if (question.type === 'multi-select') {
    const a = Array.isArray(question.answer) ? question.answer : [question.answer]
    const b = Array.isArray(submitted) ? submitted : [submitted]
    return a.length === b.length && a.every((v) => b.some((x) => String(v) === String(x)))
  }
  if (question.type === 'ordering' || question.type === 'equation-builder') {
    const a = Array.isArray(question.answer) ? question.answer : [question.answer]
    const b = Array.isArray(submitted) ? submitted : [submitted]
    return a.length === b.length && a.every((v, i) => String(v) === String(b[i]))
  }
  if (question.type === 'grid-fill') {
    const blanks = (question.grid || []).map((v, i) => v === null ? submitted?.[i] : null).filter((v) => v !== null && v !== '')
    const a = Array.isArray(question.answer) ? question.answer : [question.answer]
    return a.length === blanks.length && a.every((v, i) => String(v) === String(blanks[i]))
  }
  if (question.type === 'matching') {
    return Object.entries(question.answer || {}).every(([k, v]) => String(submitted?.[k]) === String(v))
  }
  if (question.type === 'number-line' || question.type === 'hotspot') return String(submitted) === String(question.answer)
  // text
  const norm = question.normalize || ((s) => String(s).trim().toLowerCase())
  return norm(String(submitted)) === norm(String(question.answer))
}
