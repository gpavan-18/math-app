import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTopic, getSubtopic, COLOR_CLASSES } from '../data/topics'
import { generateQuestion } from '../data/generators'
import { useProgress } from '../context/ProgressContext'
import { Question } from '../components/Question'
import { Confetti, sound } from '../components/ui/Confetti'
import { cn } from '../components/ui'

function adaptiveLevel(streak) {
  if (streak >= 6) return 2
  if (streak >= 3) return 1
  return 0
}

export default function Practice() {
  const { topicId, subId } = useParams()
  const topic = getTopic(topicId)
  const { recordPractice, awardBadge, settings } = useProgress()

  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [current, setCurrent] = useState(null)
  const [confetti, setConfetti] = useState(0)
  const questionStartedAt = useRef(Date.now())

  const nextQuestion = useCallback(
    (nextStreak) => {
      const pool = subId ? [subId] : topic.subtopics.map((s) => s.id)
      const chosen = pool[Math.floor(Math.random() * pool.length)]
      const level = settings?.difficulty === 'easy' ? 0 : settings?.difficulty === 'challenge' ? 2 : adaptiveLevel(nextStreak ?? streak)
      const q = generateQuestion(chosen, { level, range: settings?.range })
      questionStartedAt.current = Date.now()
      setCurrent({ q, subId: chosen })
    },
    [subId, topic, streak, settings?.difficulty],
  )

  useEffect(() => {
    nextQuestion(0)
    // eslint-disable-next-line
  }, [topicId, subId])

  if (!topic) return null
  const c = COLOR_CLASSES[topic.color]
  const activeSub = current ? getSubtopic(topicId, current.subId) : null

  function handleResult(ok) {
    setAnswered((a) => a + 1)
    if (current) recordPractice(current.subId, ok, Date.now() - questionStartedAt.current)
    if (ok) {
      setCorrect((n) => n + 1)
      setStreak((s) => {
        const ns = s + 1
        setBest((b) => Math.max(b, ns))
        if (ns === 5 || ns === 10 || ns % 15 === 0) {
          setConfetti((x) => x + 1)
          sound.win()
          if (ns >= 5) awardBadge('streak-5')
          if (ns >= 10) awardBadge('streak-10')
        }
        return ns
      })
    } else {
      setStreak(0)
    }
  }

  function handleNext() {
    nextQuestion(streak)
  }

  return (
    <div className="mx-auto max-w-3xl">
      {confetti > 0 && <Confetti key={confetti} />}

      {/* Stat bar */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <Link to={`/topic/${topicId}`} className="rounded-full bg-white px-3 py-1.5 font-bold text-purple-500 shadow-pop-sm">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <Stat icon="🔥" label="Streak" value={streak} highlight={streak >= 3} />
          <Stat icon="✅" label="Correct" value={`${correct}/${answered}`} />
        </div>
      </div>

      {activeSub && (
        <div className="mb-3 flex items-center justify-center">
          <span className={cn('rounded-full px-4 py-1 font-display text-sm font-bold text-white', c.bg)}>
            {activeSub.emoji} {activeSub.name}
          </span>
        </div>
      )}

      <div className="rounded-3xl bg-white/90 p-5 shadow-card sm:p-7">
        {current && (
          <Question
            key={current.q.id}
            question={current.q}
            mode="practice"
            onResult={handleResult}
            onNext={handleNext}
          />
        )}
      </div>

      <p className="mt-4 text-center text-sm font-semibold text-purple-400">
        Keep going — questions never run out! Get 5 in a row for a surprise. 🎉
      </p>
      <div className="mt-3 text-center">
        <button onClick={() => window.print()} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-purple-500 shadow-pop-sm">🖨️ Print a worksheet</button>
      </div>
    </div>
  )
}

function Stat({ icon, label, value, highlight }) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-2xl px-3 py-1.5 shadow-pop-sm',
        highlight ? 'bg-orange-100' : 'bg-white',
      )}
    >
      <span className={cn('text-xl', highlight && 'animate-wiggle')}>{icon}</span>
      <div className="leading-none">
        <div className="font-display text-lg font-extrabold text-purple-800">{value}</div>
        <div className="text-[10px] font-bold uppercase text-purple-400">{label}</div>
      </div>
    </div>
  )
}
