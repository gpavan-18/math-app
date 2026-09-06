import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTopic } from '../data/topics'
import { generateQuestion } from '../data/generators'
import { useProgress } from '../context/ProgressContext'
import { Question } from '../components/Question'
import { Confetti, sound } from '../components/ui/Confetti'
import { Mascot } from '../components/ui/Mascot'
import { Button, StarRating, cn } from '../components/ui'

const COUNT = 10

function buildTest(topic) {
  const subs = [...topic.subtopics].sort(() => Math.random() - 0.5).map((s) => s.id)
  const qs = []
  const seen = new Set()
  let guard = 0
  while (qs.length < COUNT && guard < COUNT * 40) {
    guard++
    const sub = subs[qs.length % subs.length]
    const r = qs.length / COUNT
    const level = r < 0.34 ? 0 : r < 0.7 ? 1 : 2
    const q = generateQuestion(sub, { level })
    // Signature includes the answer so questions that share prompt text
    // (e.g. "What is the name of this shape?") but differ are kept.
    const key = `${sub}|${q.prompt}|${q.sub || ''}|${JSON.stringify(q.answer)}`
    if (seen.has(key)) continue
    seen.add(key)
    qs.push(q)
  }
  return qs
}

export default function Test() {
  const { topicId } = useParams()
  const topic = getTopic(topicId)
  const { recordTest, awardBadge } = useProgress()

  const [phase, setPhase] = useState('intro')
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef(null)
  const scoreRef = useRef(0)

  useEffect(() => () => clearInterval(timerRef.current), [])
  if (!topic) return null

  function start() {
    setQuestions(buildTest(topic))
    setIndex(0)
    setScore(0)
    scoreRef.current = 0
    setSeconds(0)
    setPhase('playing')
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  function handleResult(ok) {
    if (ok) {
      scoreRef.current += 1
      setScore(scoreRef.current)
    }
  }

  function handleNext() {
    if (index + 1 >= questions.length) finish()
    else setIndex((i) => i + 1)
  }

  function finish() {
    clearInterval(timerRef.current)
    const finalScore = scoreRef.current
    recordTest(topicId, finalScore, questions.length)
    const pct = finalScore / questions.length
    if (pct >= 0.9) {
      awardBadge(`gold-${topicId}`)
      sound.win()
    }
    if (pct === 1) awardBadge('perfect')
    awardBadge(`tried-${topicId}`)
    setPhase('done')
  }

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="rounded-3xl bg-white/90 p-7 shadow-card">
          <div className="flex justify-center">
            <Mascot mood="happy" size={120} message={`Ready for the ${topic.name} challenge?`} />
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-purple-900">
            {topic.icon} {topic.name} Test
          </h1>
          <p className="mt-2 font-body text-lg font-semibold text-purple-500">
            {COUNT} questions that get trickier as you go. Answer to earn up to 3 ⭐. Take your time — there's no rush!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm font-bold text-purple-600">
            <span className="rounded-full bg-purple-100 px-3 py-1">📝 {COUNT} questions</span>
            <span className="rounded-full bg-green-100 px-3 py-1">💚 Instant help</span>
            <span className="rounded-full bg-yellow-100 px-3 py-1">⭐ Earn stars</span>
          </div>
          <Button onClick={start} variant="orange" size="xl" className="mt-6 w-full">
            Start Test! 🏁
          </Button>
          <Link to={`/topic/${topicId}`} className="mt-3 inline-block font-bold text-purple-400">
            ← Back to {topic.name}
          </Link>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const pct = Math.round((score / questions.length) * 100)
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0
    const mood = stars >= 2 ? 'celebrate' : stars === 1 ? 'happy' : 'thinking'
    const msg =
      stars === 3 ? 'PERFECT! You are a Math Whiz! 🏆' : stars === 2 ? 'Great work! So close to gold! 🌟' : stars === 1 ? 'Good effort! Keep practicing! 💪' : "Nice try! Let's practice and try again! 🌱"
    return (
      <div className="mx-auto max-w-lg text-center">
        {stars >= 2 && <Confetti />}
        <div className="rounded-3xl bg-white/90 p-7 shadow-card">
          <div className="flex justify-center">
            <Mascot mood={mood} size={130} />
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-purple-900">{msg}</h1>
          <div className="my-4 flex justify-center">
            <StarRating value={stars} size="text-5xl" />
          </div>
          <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
            <ScoreBox label="Score" value={`${score}/${questions.length}`} color="bg-brand-green" />
            <ScoreBox label="Time" value={fmt(seconds)} color="bg-brand-blue" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={start} variant="orange" size="lg">
              🔁 Try again
            </Button>
            <Button to={`/topic/${topicId}/practice`} variant="green" size="lg">
              ✏️ Practice this topic
            </Button>
            <Button to="/" variant="white" size="md">
              🏠 Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // playing
  const q = questions[index]
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-white px-3 py-1.5 font-display font-bold text-purple-600 shadow-pop-sm">
          Question {index + 1} of {questions.length}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-display font-bold text-brand-blue shadow-pop-sm">
          ⏱️ {fmt(seconds)}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-display font-bold text-brand-green shadow-pop-sm">
          ⭐ {score}
        </span>
      </div>
      <div className="rounded-3xl bg-white/90 p-5 shadow-card sm:p-7">
        {q && (
          <Question
            key={q.id}
            question={q}
            mode="test"
            index={index}
            total={questions.length}
            onResult={handleResult}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  )
}

function ScoreBox({ label, value, color }) {
  return (
    <div className={cn('rounded-2xl p-3 text-white shadow-pop-sm', color)}>
      <div className="font-display text-2xl font-extrabold">{value}</div>
      <div className="text-xs font-bold uppercase opacity-90">{label}</div>
    </div>
  )
}

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}
