import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TOPICS, COLOR_CLASSES } from '../data/topics'
import { useProgress } from '../context/ProgressContext'
import { Mascot } from '../components/ui/Mascot'
import { Button, StarRating, cn } from '../components/ui'

const AVATARS = ['🦉', '🦊', '🐰', '🐼', '🦄', '🐯', '🐨', '🐸']

export default function Home() {
  const { playerName, avatar, setPlayer, tests, practice } = useProgress()
  const [name, setName] = useState('')

  if (!playerName) {
    return <Welcome onStart={(n, a) => setPlayer(n || 'Champion', a)} name={name} setName={setName} />
  }

  const masteredCount = Object.values(practice).filter((p) => p.mastered).length

  return (
    <div>
      <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple to-brand-pink p-5 text-white shadow-card sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-white/80">Hi {avatar} {playerName}!</p>
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              What shall we learn today?
            </h1>
            <p className="mt-1 max-w-md font-body font-semibold text-white/90">
              Pick a topic, watch the pictures, then practice and take a test to earn ⭐ and badges!
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="/awards" className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold backdrop-blur">
                🏅 {masteredCount} topics mastered
              </Link>
            </div>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Mascot mood="celebrate" size={130} />
          </div>
        </div>
      </section>

      <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-extrabold text-purple-900">
        <span>📚</span> Choose a Topic
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {TOPICS.map((topic) => {
          const stars = tests[topic.id]?.stars || 0
          return (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-4 text-white shadow-card transition hover:-translate-y-1 hover:shadow-pop',
                topic.gradient,
              )}
            >
              <div>
                <div className="text-4xl drop-shadow-sm transition group-hover:scale-110">{topic.icon}</div>
                <h3 className="mt-2 font-display text-lg font-extrabold leading-tight">{topic.name}</h3>
                <p className="mt-0.5 text-xs font-semibold text-white/85">{topic.tagline}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-black/15 px-2 py-0.5 text-[11px] font-bold">
                  {topic.subtopics.length} skills
                </span>
                <StarRating value={stars} size="text-base" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-6 rounded-3xl bg-white/80 p-4 text-center shadow-card">
        <p className="font-display text-lg font-bold text-purple-700">
          🌟 Tip: Green tick means correct, orange owl helps you learn. Every question has unlimited practice!
        </p>
      </div>
    </div>
  )
}

function Welcome({ onStart, name, setName }) {
  const [avatar, setAvatar] = useState('🦉')
  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-3xl bg-white p-6 text-center shadow-card sm:p-8">
        <div className="flex justify-center">
          <Mascot mood="happy" size={140} message="Hello! I'm Ollie. What's your name?" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-purple">Welcome to Math Whiz Junior!</h1>
        <p className="mt-1 font-body font-semibold text-purple-500">Let's become a math superstar together. 🌟</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
          maxLength={16}
          onKeyDown={(e) => e.key === 'Enter' && onStart(name, avatar)}
          className="mt-5 h-14 w-full rounded-2xl border-4 border-purple-200 bg-purple-50 px-4 text-center font-display text-2xl font-bold text-purple-800 outline-none focus:border-brand-purple"
        />

        <p className="mt-4 font-display font-bold text-purple-600">Pick your buddy:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={cn(
                'h-12 w-12 rounded-2xl text-2xl transition',
                avatar === a ? 'scale-110 bg-brand-yellow shadow-pop-sm' : 'bg-purple-100 hover:bg-purple-200',
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <Button size="xl" variant="green" className="mt-6 w-full" onClick={() => onStart(name, avatar)}>
          Let's Go! 🚀
        </Button>
      </div>
    </div>
  )
}
