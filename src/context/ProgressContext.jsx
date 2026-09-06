import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'math-whiz-progress-v1'

const DEFAULT_STATE = {
  playerName: '',
  avatar: '🦉',
  stars: 0,
  // per-subtopic best practice results: { [subtopicId]: { correct, attempts, bestStreak, mastered } }
  practice: {},
  // per-topic test results: { [topicId]: { bestScore, total, stars, lastScore, attempts } }
  tests: {},
  // badges earned (array of badge ids)
  badges: [],
  // count of correct answers overall (for badge thresholds)
  totalCorrect: 0,
  settings: { readAloud: false, range: 100, difficulty: 'adaptive' },
  misses: [],
  games: { daily: {}, speed: {}, adventure: { unlocked: 1, completed: [] } },
  answerTime: 0,
  timeSpent: 0,
  recentActivity: [],
  totalAttempts: 0,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      games: { ...DEFAULT_STATE.games, ...(parsed.games || {}), adventure: { ...DEFAULT_STATE.games.adventure, ...(parsed.games?.adventure || {}) } },
    }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state])

  const setPlayer = useCallback((playerName, avatar) => {
    setState((s) => ({ ...s, playerName, avatar: avatar || s.avatar }))
  }, [])

  // Record a single practice answer
  const recordPractice = useCallback((subtopicId, isCorrect, elapsedMs = 0) => {
    setState((s) => {
      const prev = s.practice[subtopicId] || { correct: 0, attempts: 0, bestStreak: 0, streak: 0, mastered: false }
      const attempts = prev.attempts + 1
      const correct = prev.correct + (isCorrect ? 1 : 0)
      const streak = isCorrect ? (prev.streak || 0) + 1 : 0
      const bestStreak = Math.max(prev.bestStreak || 0, streak)
      const mastered = prev.mastered || correct >= 20
      const totalCorrect = s.totalCorrect + (isCorrect ? 1 : 0)
      const stars = s.stars + (isCorrect ? 1 : 0)
      const activity = { subtopicId, correct: isCorrect, at: Date.now() }
      return {
        ...s,
        totalCorrect,
        totalAttempts: (s.totalAttempts || 0) + 1,
        misses: isCorrect ? s.misses : [...(s.misses || []).filter((id) => id !== subtopicId), subtopicId].slice(-30),
        stars,
        timeSpent: (s.timeSpent || 0) + Math.max(0, Number(elapsedMs) || 0),
        recentActivity: [...(s.recentActivity || []), activity].slice(-40),
        practice: {
          ...s.practice,
          [subtopicId]: { correct, attempts, bestStreak, streak, mastered },
        },
      }
    })
  }, [])

  const updateSettings = useCallback((settings) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...settings } }))
  }, [])

  const recordGame = useCallback((kind, result) => {
    setState((s) => ({ ...s, games: { ...s.games, [kind]: { ...(s.games?.[kind] || {}), ...result, playedAt: Date.now() } } }))
  }, [])

  const recordDaily = useCallback((result) => {
    setState((s) => {
      const previous = s.games?.daily || {}
      const today = new Date().toISOString().slice(0, 10)
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      const streak = previous.lastPlayed === yesterday ? (previous.streak || 0) + 1 : previous.lastPlayed === today ? (previous.streak || 1) : 1
      return {
        ...s,
        games: {
          ...s.games,
          daily: { ...previous, ...result, streak, lastPlayed: today, playedAt: Date.now() },
        },
      }
    })
  }, [])

  const recordAdventure = useCallback((level) => {
    setState((s) => {
      const completed = [...new Set([...(s.games?.adventure?.completed || []), level])]
      return { ...s, games: { ...s.games, adventure: { unlocked: Math.max(s.games?.adventure?.unlocked || 1, level + 1), completed } } }
    })
  }, [])

  // Record a completed test for a topic
  const recordTest = useCallback((topicId, score, total) => {
    setState((s) => {
      const prev = s.tests[topicId] || { bestScore: 0, total, stars: 0, attempts: 0 }
      const pct = total > 0 ? score / total : 0
      const earnedStars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0
      const bestScore = Math.max(prev.bestScore, score)
      const bestStars = Math.max(prev.stars, earnedStars)
      return {
        ...s,
        tests: {
          ...s.tests,
          [topicId]: {
            bestScore,
            total,
            stars: bestStars,
            lastScore: score,
            attempts: prev.attempts + 1,
          },
        },
      }
    })
  }, [])

  const awardBadge = useCallback((badgeId) => {
    setState((s) => (s.badges.includes(badgeId) ? s : { ...s, badges: [...s.badges, badgeId] }))
  }, [])

  const resetProgress = useCallback(() => {
    setState({ ...DEFAULT_STATE })
  }, [])

  const value = useMemo(
    () => ({ ...state, setPlayer, recordPractice, recordTest, updateSettings, recordGame, recordDaily, recordAdventure, awardBadge, resetProgress }),
    [state, setPlayer, recordPractice, recordTest, updateSettings, recordGame, recordDaily, recordAdventure, awardBadge, resetProgress],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
