// Data visuals: bar graph and pictograph for the Data & Graphs topic.
export function BarGraph({ data = [], max, unit = '', height = 220, highlight }) {
  const values = data.map((d) => d.value)
  const top = max || Math.max(...values, 1)
  const barW = 46
  const gap = 26
  const width = data.length * (barW + gap) + gap
  const chartH = height - 40
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg">
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line
            x1="4"
            y1={10 + chartH * (1 - f)}
            x2={width - 4}
            y2={10 + chartH * (1 - f)}
            stroke="#e9d5ff"
            strokeWidth="2"
          />
          <text x="2" y={10 + chartH * (1 - f) - 3} fontSize="10" fill="#a78bfa">
            {Math.round(top * f)}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const h = (d.value / top) * chartH
        const x = gap + i * (barW + gap)
        const isHi = highlight === i
        return (
          <g key={i}>
            <rect
              x={x}
              y={10 + chartH - h}
              width={barW}
              height={h}
              rx="6"
              fill={d.color || (isHi ? '#ec4899' : '#8b5cf6')}
              stroke={isHi ? '#be185d' : '#6d28d9'}
              strokeWidth="2.5"
            />
            <text x={x + barW / 2} y={10 + chartH - h - 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#5b21b6">
              {d.value}
            </text>
            <text x={x + barW / 2} y={height - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function Pictograph({ data = [], emoji = '🍎', per = 1 }) {
  return (
    <div className="space-y-2 rounded-2xl bg-white/70 p-4 shadow-card">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-20 text-right font-bold text-purple-700">{d.label}</span>
          <span className="text-2xl leading-none">
            {emoji.repeat(Math.round(d.value / per))}
          </span>
          <span className="text-sm font-semibold text-purple-400">({d.value})</span>
        </div>
      ))}
      <div className="pt-1 text-xs font-semibold text-purple-500">
        Key: {emoji} = {per}
      </div>
    </div>
  )
}

// A simple tally-marks visual drawn as SVG so it renders consistently.
export function Tally({ count = 7, color = '#4c1d95' }) {
  const groups = Math.floor(count / 5)
  const rem = count % 5
  const groupW = 34
  const width = (groups + (rem > 0 ? 1 : 0)) * groupW + 10
  const mark = (x, i) => <line key={i} x1={x} y1="6" x2={x} y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
  let gx = 6
  return (
    <svg width={width} height="48" viewBox={`0 0 ${width} 48`}>
      {Array.from({ length: groups }).map((_, g) => {
        const base = gx + g * groupW
        return (
          <g key={g}>
            {[0, 1, 2, 3].map((k) => mark(base + k * 6, k))}
            <line x1={base - 3} y1="40" x2={base + 21} y2="6" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </g>
        )
      })}
      {rem > 0 &&
        Array.from({ length: rem }).map((_, k) => mark(gx + groups * groupW + k * 6, 'r' + k))}
    </svg>
  )
}
