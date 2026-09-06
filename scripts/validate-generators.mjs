import { allSubtopics } from '../src/data/topics.js'
import { checkAnswer, generateQuestion, hasGenerator } from '../src/data/generators/index.js'

const SUPPORTED_TYPES = new Set([
  'number',
  'text',
  'mcq',
  'boolean',
  'multi-select',
  'grid-fill',
  'matching',
  'ordering',
  'number-line',
  'hotspot',
  'equation-builder',
])
const PUZZLE_IDS = ['magic-square', 'number-pyramid', 'sudoku', 'logic-grid', 'matrix', 'balance', 'sequences', 'cryptarithm', 'tangram', 'math-maze']

function correctSubmission(question) {
  if (question.type === 'grid-fill') {
    let answerIndex = 0
    return question.grid.map((cell) => (cell === null ? question.answer[answerIndex++] : cell))
  }
  return question.answer
}

function assertQuestion(question, skillId) {
  if (!SUPPORTED_TYPES.has(question.type)) throw new Error(`${skillId}: unsupported type ${question.type}`)
  if (!checkAnswer(question, correctSubmission(question))) throw new Error(`${skillId}: answer does not self-check`)
  if (question.type === 'mcq' || question.type === 'boolean') {
    if (!question.choices?.some((choice) => String(choice.value) === String(question.answer))) {
      throw new Error(`${skillId}: correct choice is missing`)
    }
  }
  if (question.type === 'multi-select') {
    const values = new Set(question.choices.map((choice) => String(choice.value)))
    if (question.answer.some((answer) => !values.has(String(answer)))) throw new Error(`${skillId}: multi-select answer is missing`)
  }
}

const skills = [...allSubtopics(), ...PUZZLE_IDS.map((id) => ({ id }))]
const missing = skills.filter(({ id }) => !hasGenerator(id))
if (missing.length) throw new Error(`Missing generators: ${missing.map(({ id }) => id).join(', ')}`)

let generated = 0
for (const { id } of skills) {
  for (let i = 0; i < 100; i += 1) {
    assertQuestion(generateQuestion(id, { level: i % 3 }), id)
    generated += 1
  }
}

console.log(`Validated ${generated} generated questions across ${skills.length} skills.`)
