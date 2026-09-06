import { Link, useParams } from 'react-router-dom'
import { getTopic, COLOR_CLASSES } from '../data/topics'
import { useProgress } from '../context/ProgressContext'
import { Button, StarRating, cn } from '../components/ui'
import { Mascot } from '../components/ui/Mascot'

export default function TopicHome() {
  const { topicId } = useParams()
  const topic = getTopic(topicId)
  const { practice, tests } = useProgress()
  if (!topic) return <NotFound />
  const c = COLOR_CLASSES[topic.color]
  const testStars = tests[topic.id]?.stars || 0

  return (
    <div>
      <div className={cn('mb-5 overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-card', topic.gradient)}>
        <div className="flex items-center gap-4">
          <div className="text-6xl drop-shadow">{topic.icon}</div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{topic.name}</h1>
            <p className="font-body font-semibold text-white/90">{topic.tagline}</p>
          </div>
        </div>
      </div>

      {/* Action cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <ActionCard to={`/topic/${topicId}/learn`} emoji="📖" title="Learn" desc="See how it works with fun pictures" color="bg-brand-blue" />
        <ActionCard to={`/topic/${topicId}/practice`} emoji="✏️" title="Practice" desc="Endless questions, instant help" color="bg-brand-green" />
        <ActionCard to={`/topic/${topicId}/test`} emoji="🏆" title="Take a Test" desc="Earn stars and badges" color="bg-brand-orange" stars={testStars} />
      </div>

      {/* Skills list */}
      <h2 className="mb-3 mt-7 flex items-center gap-2 font-display text-2xl font-extrabold text-purple-900">
        <span>🎯</span> Skills in this topic
      </h2>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {topic.subtopics.map((s) => {
          const p = practice[s.id]
          const pct = p ? Math.min(100, Math.round((p.correct / 20) * 100)) : 0
          return (
            <Link
              key={s.id}
              to={`/topic/${topicId}/practice/${s.id}`}
              className="group flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop-sm"
            >
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl', c.soft)}>
                {s.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-lg font-bold text-purple-900">{s.name}</p>
                  {p?.mastered && <span title="Mastered!" className="text-lg">🏅</span>}
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-purple-100">
                  <div className={cn('h-full rounded-full transition-all', c.bg)} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <span className="rounded-lg bg-purple-50 px-2 py-1 text-xs font-bold text-purple-400">Gr {s.grade}</span>
            </Link>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Mascot mood="happy" size={90} message="Learn first, then practice. You've got this!" />
      </div>
    </div>
  )
}

function ActionCard({ to, emoji, title, desc, color, stars }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center rounded-3xl bg-white/90 p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-pop"
    >
      <div className={cn('mb-2 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white shadow-pop-sm', color)}>
        {emoji}
      </div>
      <p className="font-display text-xl font-extrabold text-purple-900">{title}</p>
      <p className="mt-0.5 text-sm font-semibold text-purple-500">{desc}</p>
      {stars != null && <StarRating value={stars} size="text-lg" />}
    </Link>
  )
}

function NotFound() {
  return (
    <div className="text-center">
      <Mascot mood="sad" size={120} />
      <p className="mt-3 font-display text-2xl font-bold text-purple-700">Hmm, that topic isn't here.</p>
      <Button to="/" variant="purple" className="mt-4">
        Back home
      </Button>
    </div>
  )
}
