import { useState } from 'react'
import { generateQuestion } from '../data/generators'
import { Question } from '../components/Question'
import { Button, Card } from '../components/ui'
import { useProgress } from '../context/ProgressContext'

const PUZZLES = [['magic-square', '🔲 Magic Squares'], ['number-pyramid', '🔺 Number Pyramids'], ['sudoku', '🧩 Mini Sudoku'], ['logic-grid', '🕵️ Logic Grids'], ['matrix', '📐 Matrices'], ['balance', '⚖️ Balance Puzzles'], ['sequences', '➡️ Sequences'], ['cryptarithm', '🔐 Cryptarithms'], ['tangram', '🔺 Tangram'], ['math-maze', '🌀 Math Maze']]
export default function Puzzles() {
  const [active, setActive] = useState(null); const [question, setQuestion] = useState(null); const { awardBadge } = useProgress()
  const launch = (id) => { setActive(id); setQuestion(generateQuestion(id, { level: 1 })) }
  return <div><div className="mb-6 rounded-3xl bg-gradient-to-br from-brand-orange to-brand-pink p-6 text-center text-white shadow-card"><h1 className="font-display text-4xl font-extrabold">🧩 Puzzle Lab</h1><p className="mt-1 font-semibold text-white/90">Stretch your brain with a new puzzle every time.</p></div>{active ? <Card className="mx-auto max-w-2xl"><Button variant="white" size="sm" onClick={() => setActive(null)}>← Puzzle list</Button><div className="mt-4"><Question key={question.id} question={question} onResult={(ok) => ok && awardBadge('puzzle-solver')} onNext={() => setQuestion(generateQuestion(active, { level: 1 }))} /></div></Card> : <div className="grid gap-3 sm:grid-cols-2">{PUZZLES.map(([id, label]) => <button key={id} onClick={() => launch(id)} className="rounded-3xl bg-white/90 p-5 text-left font-display text-2xl font-extrabold text-purple-900 shadow-card hover:shadow-pop-sm">{label}<span className="mt-1 block text-sm font-body font-semibold text-purple-500">Play this puzzle →</span></button>)}</div>}</div>
}
