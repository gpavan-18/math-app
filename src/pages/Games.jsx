import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { generateSet } from '../data/generators'
import { Question } from '../components/Question'
import { useProgress } from '../context/ProgressContext'
import { Button, Card, ProgressBar } from '../components/ui'

const MODES = [
  ['speed', '⚡ Speed Round', '60 seconds of quick-fire mixed practice'],
  ['daily', '📅 Daily Challenge', 'A deterministic challenge everyone can share'],
  ['review', '🎯 Mixed Review', 'Practice skills you have missed recently'],
  ['boss', '👑 Boss Battle', 'A five-question challenge with a big reward'],
  ['adventure', '🗺️ Adventure Map', 'Unlock the next island as you learn'],
]
const seedForDay = () => { const d = new Date(); return Number(`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`) }

export default function Games() {
  const { practice, misses, games, recordGame, recordDaily, recordAdventure, awardBadge } = useProgress()
  const [mode, setMode] = useState(null)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [answered, setAnswered] = useState(0)
  useEffect(() => {
    if (mode !== 'speed' || done) return undefined
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [mode, done])
  useEffect(() => {
    if (mode === 'speed' && seconds >= 60 && !done) {
      recordGame('speed', { score, total: answered })
      setDone(true)
    }
  }, [mode, seconds, done, recordGame, score, answered])
  const start = (kind) => {
    const pool = Object.keys(practice).length ? Object.keys(practice) : ['add-within-20']
    const sub = kind === 'daily' ? 'number-bonds' : kind === 'review' && misses.length ? misses[0] : pool[seedForDay() % pool.length]
    const count = kind === 'boss' ? 5 : kind === 'speed' ? 100 : 6
    setQuestions(generateSet(sub, count, { seed: kind === 'daily' ? seedForDay() : Date.now(), level: kind === 'boss' ? 2 : 'ramp' }))
    setMode(kind); setIndex(0); setScore(0); setSeconds(0); setAnswered(0); setDone(false)
  }
  const result = (ok) => { setAnswered((n) => n + 1); if (ok) setScore((s) => s + 1) }
  const next = () => {
    if (index + 1 >= questions.length) {
      const final = score
      recordGame(mode, { score: final, total: questions.length })
      if (mode === 'daily') recordDaily({ score: final, total: questions.length })
      if (mode === 'adventure') recordAdventure((games.adventure?.unlocked || 1))
      if (final === questions.length) awardBadge(`perfect-${mode}`)
      setDone(true)
    } else setIndex((i) => i + 1)
  }
  if (mode && !done) return <div className="mx-auto max-w-3xl"><Button variant="white" size="sm" onClick={() => setMode(null)}>← Modes</Button><Card className="mt-3"><div className="mb-4 flex justify-between font-display font-bold text-purple-700"><span>{MODES.find((m) => m[0] === mode)?.[1]}</span><span>{mode === 'speed' && `⏱️ ${60 - seconds}s `}⭐ {score}</span></div><Question key={questions[index]?.id} question={questions[index]} mode="practice" index={index} total={questions.length} onResult={result} onNext={next} /></Card></div>
  if (done) return <Card className="mx-auto max-w-lg text-center"><div className="text-6xl">🏆</div><h1 className="mt-3 font-display text-3xl font-extrabold text-purple-900">Challenge complete!</h1><p className="mt-2 text-lg font-bold text-purple-600">You scored {score}/{questions.length}</p><div className="mt-5 flex justify-center gap-2"><Button onClick={() => start(mode)} variant="orange">Play again</Button><Button onClick={() => setMode(null)} variant="white">All modes</Button></div></Card>
  return <div><div className="mb-6 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-pink p-6 text-center text-white shadow-card"><h1 className="font-display text-4xl font-extrabold">🎮 Game Modes</h1><p className="mt-1 font-semibold text-white/90">Choose a challenge and earn extra stars!</p></div><div className="grid gap-3 sm:grid-cols-2">{MODES.map(([id, title, desc]) => <button key={id} onClick={() => start(id)} className="rounded-3xl bg-white/90 p-5 text-left shadow-card transition hover:-translate-y-1 hover:shadow-pop-sm"><h2 className="font-display text-2xl font-extrabold text-purple-900">{title}</h2><p className="mt-1 font-semibold text-purple-500">{desc}</p>{id === 'daily' && <p className="mt-2 text-sm font-bold text-orange-600">🔥 Daily streak: {games.daily?.streak || 0} days</p>}{games[id]?.score != null && <p className="mt-3 text-sm font-bold text-green-600">Best: {games[id].score}/{games[id].total}</p>}</button>)}</div><Link to="/" className="mt-6 block text-center font-bold text-purple-500">← Home</Link></div>
}
