import { useParams, Link } from 'react-router-dom'
import { getTopic, COLOR_CLASSES } from '../data/topics'
import { getLessons } from '../data/lessons'
import { QuestionVisual } from '../components/visuals'
import { Button, cn } from '../components/ui'

export default function Learn() {
  const { topicId } = useParams()
  const topic = getTopic(topicId)
  const lessons = getLessons(topicId)
  if (!topic) return null
  const c = COLOR_CLASSES[topic.color]

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <Link to={`/topic/${topicId}`} className="rounded-full bg-white px-3 py-1.5 font-bold text-purple-500 shadow-pop-sm">
          ← Back
        </Link>
        <h1 className="font-display text-2xl font-extrabold text-purple-900">
          {topic.icon} Learn: {topic.name}
        </h1>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, i) => (
          <div key={i} className="overflow-hidden rounded-3xl bg-white/90 shadow-card">
            <div className={cn('flex items-center gap-2 px-5 py-3 text-white', c.bg)}>
              <span className="text-2xl">{lesson.emoji}</span>
              <h2 className="font-display text-xl font-extrabold">{lesson.title}</h2>
              <span className="ml-auto rounded-full bg-white/25 px-2 py-0.5 text-sm font-bold">Step {i + 1}</span>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:items-center">
              <div>
                <p className="font-body text-lg font-semibold leading-relaxed text-purple-900">{lesson.text}</p>
                {lesson.tip && (
                  <div className="mt-3 flex items-start gap-2 rounded-2xl bg-yellow-50 p-3">
                    <span className="text-xl">💡</span>
                    <p className="font-body text-sm font-bold text-amber-700">{lesson.tip}</p>
                  </div>
                )}
              </div>
              {lesson.visual && (
                <div className="flex justify-center rounded-2xl bg-purple-50/60 p-4">
                  <QuestionVisual spec={lesson.visual} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-brand-green to-emerald-500 p-6 text-center text-white shadow-card">
        <p className="font-display text-2xl font-extrabold">Ready to try it yourself? 💪</p>
        <p className="mt-1 font-semibold text-white/90">Practice makes perfect — and it's fun!</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button to={`/topic/${topicId}/practice`} variant="white" size="lg">
            ✏️ Practice now
          </Button>
          <Button to={`/topic/${topicId}/test`} variant="yellow" size="lg">
            🏆 Take the test
          </Button>
        </div>
      </div>
    </div>
  )
}
