import { useEffect, useState } from 'react'

const COLORS = ['#f472b6', '#facc15', '#34d399', '#60a5fa', '#c084fc', '#fb923c', '#f87171']

// A one-shot confetti burst. Render it when `show` is true; it removes itself.
export function Confetti({ count = 80, duration = 2600 }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 1.8 + Math.random() * 1.4,
      color: COLORS[i % COLORS.length],
      size: 8 + Math.random() * 8,
      rotate: Math.random() * 360,
      round: Math.random() > 0.5,
    })),
  )
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(t)
  }, [duration])
  if (!visible) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------ Sound effects ----------------------------- */
let audioCtx = null
function ctx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioCtx
}

function tone(freq, start, dur, type = 'sine', gain = 0.15) {
  const ac = ctx()
  if (!ac) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0, ac.currentTime + start)
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur)
  osc.connect(g)
  g.connect(ac.destination)
  osc.start(ac.currentTime + start)
  osc.stop(ac.currentTime + start + dur)
}

export const sound = {
  correct() {
    tone(660, 0, 0.15, 'triangle')
    tone(880, 0.1, 0.2, 'triangle')
  },
  wrong() {
    tone(300, 0, 0.18, 'sawtooth', 0.1)
    tone(200, 0.12, 0.22, 'sawtooth', 0.1)
  },
  win() {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle'))
  },
  click() {
    tone(520, 0, 0.06, 'square', 0.06)
  },
}
