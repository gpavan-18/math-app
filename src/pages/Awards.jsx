import { useState } from 'react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../context/ProgressContext'
import { Mascot } from '../components/ui/Mascot'
import { Badge, Button, StarRating, cn } from '../components/ui'

const GENERAL_BADGES = [
  { id: 'streak-5', emoji: '🔥', label: '5 in a Row' },
  { id: 'streak-10', emoji: '⚡', label: '10 Streak' },
  { id: 'perfect', emoji: '💯', label: 'Perfect Test' },
  { id: 'puzzle-solver', emoji: '🧩', label: 'Puzzle Solver' },
  { id: 'perfect-daily', emoji: '📅', label: 'Daily Star' },
  { id: 'perfect-boss', emoji: '👑', label: 'Boss Beater' },
  { id: 'perfect-speed', emoji: '⚡', label: 'Speed Wizard' },
  { id: 'perfect-adventure', emoji: '🗺️', label: 'Map Explorer' },
]

export default function Awards() {
  const { stars, badges, tests, practice, totalCorrect, avatar, playerName, resetProgress } = useProgress()
  const [confirming, setConfirming] = useState(false)

  const masteredSkills = Object.values(practice).filter((p) => p.mastered).length
  const goldTopics = TOPICS.filter((t) => (tests[t.id]?.stars || 0) === 3)
  const totalTopicStars = TOPICS.reduce((sum, t) => sum + (tests[t.id]?.stars || 0), 0)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 rounded-3xl bg-gradient-to-br from-brand-yellow to-brand-orange p-6 text-center text-white shadow-card">
        <div className="flex justify-center">
          <Mascot mood="celebrate" size={110} />
        </div>
        <h1 className="mt-2 font-display text-3xl font-extrabold drop-shadow">
          {avatar} {playerName}'s Trophy Room
        </h1>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <BigStat icon="⭐" value={stars} label="Total Stars" />
          <BigStat icon="✅" value={totalCorrect} label="Correct Answers" />
          <BigStat icon="🏅" value={masteredSkills} label="Skills Mastered" />
        </div>
      </div>

      {/* Badges */}
      <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-extrabold text-purple-900">
        <span>🎖️</span> Badges
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {GENERAL_BADGES.map((b) => (
          <Badge key={b.id} emoji={b.emoji} label={b.label} earned={badges.includes(b.id)} />
        ))}
      </div>

      {/* Topic medals */}
      <h2 className="mb-3 mt-7 flex items-center gap-2 font-display text-2xl font-extrabold text-purple-900">
        <span>🏆</span> Topic Medals
        <span className="ml-1 rounded-full bg-purple-100 px-2 py-0.5 text-sm text-purple-500">
          {goldTopics.length}/{TOPICS.length} gold
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOPICS.map((t) => {
          const s = tests[t.id]?.stars || 0
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-center gap-3 rounded-2xl p-3 shadow-card transition',
                s === 3 ? 'bg-gradient-to-br from-amber-100 to-yellow-200' : 'bg-white/90',
              )}
            >
              <div className={cn('text-3xl', s === 0 && 'opacity-40 grayscale')}>{s === 3 ? '🥇' : t.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-purple-900">{t.name}</p>
                <StarRating value={s} size="text-sm" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white/70 p-4">
        <span className="font-display font-bold text-purple-600">Total topic stars: {totalTopicStars}/{TOPICS.length * 3}</span>
      </div>

      {/* Reset */}
      <div className="mt-6 text-center">
        {!confirming ? (
          <button onClick={() => setConfirming(true)} className="text-sm font-bold text-purple-300 underline">
            Reset all progress
          </button>
        ) : (
          <div className="inline-flex flex-col items-center gap-2 rounded-2xl bg-red-50 p-4">
            <p className="font-bold text-red-500">Erase all stars and badges? This can't be undone.</p>
            <div className="flex gap-2">
              <Button variant="red" size="sm" onClick={resetProgress}>
                Yes, reset
              </Button>
              <Button variant="white" size="sm" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BigStat({ icon, value, label }) {
  return (
    <div className="rounded-2xl bg-white/25 px-4 py-2 backdrop-blur">
      <div className="font-display text-2xl font-extrabold">
        {icon} {value}
      </div>
      <div className="text-xs font-bold uppercase opacity-90">{label}</div>
    </div>
  )
}
