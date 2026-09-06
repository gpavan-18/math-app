// Core math SVG/visual components. All are lightweight, colorful and scalable.
import { emojiFor } from '../../data/emoji'

/* ----------------------------- Counting objects ---------------------------- */
// Renders a wrapped row of emoji objects – great for counting / add / subtract.
export function CountingObjects({ count = 5, emoji = '🍎', crossedOut = 0, size = 40, max = 40 }) {
  const total = Math.min(count, max)
  const items = Array.from({ length: total })
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {items.map((_, i) => {
        const isCrossed = i >= total - crossedOut
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center transition ${
              isCrossed ? 'opacity-40 grayscale' : ''
            }`}
            style={{ fontSize: size, lineHeight: 1, position: 'relative' }}
          >
            {emoji}
            {isCrossed && (
              <span
                className="absolute inset-0 flex items-center justify-center text-red-500 font-black"
                style={{ fontSize: size }}
              >
                ✗
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

// Two groups joined for addition problems
export function AddGroups({ a = 3, b = 2, emojiA = '🍓', emojiB = '🍓', size = 36 }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <Bubble color="#dcfce7">
        <CountingObjects count={a} emoji={emojiA} size={size} />
      </Bubble>
      <span className="text-4xl font-display text-brand-purple">+</span>
      <Bubble color="#dbeafe">
        <CountingObjects count={b} emoji={emojiB} size={size} />
      </Bubble>
    </div>
  )
}

function Bubble({ children, color = '#f3e8ff' }) {
  return (
    <div className="rounded-3xl p-3 shadow-inner" style={{ background: color }}>
      {children}
    </div>
  )
}

/* -------------------------------- Ten frame -------------------------------- */
export function TenFrame({ count = 7, color = '#f472b6' }) {
  const cells = Array.from({ length: 10 })
  return (
    <div className="inline-grid grid-cols-5 gap-1 rounded-2xl bg-white p-2 shadow-card">
      {cells.map((_, i) => (
        <div
          key={i}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple-200"
        >
          {i < count && (
            <div className="h-7 w-7 rounded-full" style={{ background: color }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ----------------------------- Base ten blocks ----------------------------- */
// Visualises hundreds, tens and ones – core to place value.
export function BaseTenBlocks({ value = 123, max = 999 }) {
  const v = Math.min(value, max)
  const hundreds = Math.floor(v / 100)
  const tens = Math.floor((v % 100) / 10)
  const ones = v % 10

  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      {hundreds > 0 && (
        <Group label="Hundreds" count={hundreds}>
          {Array.from({ length: hundreds }).map((_, i) => (
            <HundredFlat key={i} />
          ))}
        </Group>
      )}
      {tens > 0 && (
        <Group label="Tens" count={tens}>
          {Array.from({ length: tens }).map((_, i) => (
            <TenRod key={i} />
          ))}
        </Group>
      )}
      <Group label="Ones" count={ones}>
        {Array.from({ length: ones }).map((_, i) => (
          <OneCube key={i} />
        ))}
      </Group>
    </div>
  )
}

function Group({ label, children }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-1">{children}</div>
      <span className="text-xs font-bold text-purple-500">{label}</span>
    </div>
  )
}
function HundredFlat() {
  return (
    <svg width="52" height="52" viewBox="0 0 100 100">
      <rect x="2" y="2" width="96" height="96" rx="4" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="3" />
      {[...Array(9)].map((_, i) => (
        <line key={'h' + i} x1="2" y1={2 + (i + 1) * 9.6} x2="98" y2={2 + (i + 1) * 9.6} stroke="#7c3aed" strokeWidth="1" />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={'v' + i} x1={2 + (i + 1) * 9.6} y1="2" x2={2 + (i + 1) * 9.6} y2="98" stroke="#7c3aed" strokeWidth="1" />
      ))}
    </svg>
  )
}
function TenRod() {
  return (
    <svg width="14" height="52" viewBox="0 0 20 100">
      <rect x="2" y="2" width="16" height="96" rx="3" fill="#5eead4" stroke="#0d9488" strokeWidth="3" />
      {[...Array(9)].map((_, i) => (
        <line key={i} x1="2" y1={2 + (i + 1) * 9.6} x2="18" y2={2 + (i + 1) * 9.6} stroke="#0d9488" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
function OneCube() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20">
      <rect x="2" y="2" width="16" height="16" rx="3" fill="#fca5a5" stroke="#dc2626" strokeWidth="2.5" />
    </svg>
  )
}

/* -------------------------------- Number line ------------------------------ */
export function NumberLine({ from = 0, to = 10, marks = [], hop }) {
  const width = 520
  const pad = 24
  const span = to - from
  const step = (width - pad * 2) / span
  const x = (n) => pad + (n - from) * step
  return (
    <svg viewBox={`0 0 ${width} 90`} className="w-full max-w-xl">
      <line x1={pad} y1="55" x2={width - pad} y2="55" stroke="#7c3aed" strokeWidth="3" />
      {Array.from({ length: span + 1 }).map((_, i) => {
        const n = from + i
        return (
          <g key={i}>
            <line x1={x(n)} y1="48" x2={x(n)} y2="62" stroke="#7c3aed" strokeWidth="3" />
            <text x={x(n)} y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">
              {n}
            </text>
          </g>
        )
      })}
      {hop && (
        <g>
          {Array.from({ length: Math.abs(hop.to - hop.from) }).map((_, i) => {
            const dir = hop.to > hop.from ? 1 : -1
            const start = hop.from + i * dir
            const end = start + dir
            const midX = (x(start) + x(end)) / 2
            return (
              <path
                key={i}
                d={`M ${x(start)} 55 Q ${midX} 20 ${x(end)} 55`}
                fill="none"
                stroke="#ec4899"
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />
            )
          })}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#ec4899" />
            </marker>
          </defs>
        </g>
      )}
      {marks.map((m, i) => (
        <circle key={i} cx={x(m)} cy="55" r="7" fill="#facc15" stroke="#b45309" strokeWidth="2" />
      ))}
    </svg>
  )
}

/* --------------------------- Multiplication arrays ------------------------- */
export function ArrayDots({ rows = 3, cols = 4, emoji = '🐞', size = 30 }) {
  return (
    <div className="inline-block rounded-2xl bg-white/70 p-3 shadow-card">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: rows * cols }).map((_, i) => (
          <span key={i} style={{ fontSize: size, lineHeight: 1 }} className="text-center">
            {emoji}
          </span>
        ))}
      </div>
    </div>
  )
}

/* --------------------------- Equal groups (÷ and ×) ------------------------ */
export function EqualGroups({ groups = 3, perGroup = 4, emoji = '🍬', size = 26 }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {Array.from({ length: groups }).map((_, g) => (
        <div key={g} className="rounded-2xl border-2 border-dashed border-purple-300 bg-white/70 p-2">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: perGroup }).map((_, i) => (
              <span key={i} style={{ fontSize: size, lineHeight: 1 }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------- Fractions -------------------------------- */
export function FractionCircle({ numerator = 1, denominator = 2, size = 130, colorA = '#a78bfa', colorB = '#ede9fe' }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 6
  const slices = Array.from({ length: denominator })
  const anglePer = (2 * Math.PI) / denominator
  const arc = (i) => {
    const start = -Math.PI / 2 + i * anglePer
    const end = start + anglePer
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = anglePer > Math.PI ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((_, i) => (
        <path key={i} d={arc(i)} fill={i < numerator ? colorA : colorB} stroke="#6d28d9" strokeWidth="2.5" />
      ))}
    </svg>
  )
}

export function FractionBar({ numerator = 2, denominator = 4, width = 260, height = 56, colorA = '#f472b6' }) {
  const cell = width / denominator
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: denominator }).map((_, i) => (
        <rect
          key={i}
          x={i * cell}
          y="2"
          width={cell}
          height={height - 4}
          fill={i < numerator ? colorA : '#fce7f3'}
          stroke="#be185d"
          strokeWidth="2.5"
        />
      ))}
    </svg>
  )
}

/* ---------------------------- Balance / comparison ------------------------- */
export function CompareVisual({ left = 3, right = 5, emoji = '⭐' }) {
  return (
    <div className="flex items-center justify-center gap-5">
      <Bubble color="#fef9c3">
        <CountingObjects count={left} emoji={emoji} size={28} />
        <div className="mt-1 text-center font-display text-2xl text-amber-700">{left}</div>
      </Bubble>
      <Bubble color="#e0e7ff">
        <CountingObjects count={right} emoji={emoji} size={28} />
        <div className="mt-1 text-center font-display text-2xl text-indigo-700">{right}</div>
      </Bubble>
    </div>
  )
}

export { emojiFor }
