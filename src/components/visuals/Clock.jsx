// Analog + digital clock visual for telling time.
export function Clock({ hours = 3, minutes = 0, size = 180, showDigital = false }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 6

  const minuteAngle = (minutes / 60) * 360
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30

  const hand = (angleDeg, length, width, color) => {
    const a = ((angleDeg - 90) * Math.PI) / 180
    const x = cx + length * Math.cos(a)
    const y = cy + length * Math.sin(a)
    return <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth={width} strokeLinecap="round" />
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="#fff7ed" stroke="#f59e0b" strokeWidth="6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180
          const x1 = cx + (r - 8) * Math.cos(a)
          const y1 = cy + (r - 8) * Math.sin(a)
          const x2 = cx + (r - 2) * Math.cos(a)
          const y2 = cy + (r - 2) * Math.sin(a)
          const nx = cx + (r - 22) * Math.cos(a)
          const ny = cy + (r - 22) * Math.sin(a)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b45309" strokeWidth="3" />
              <text x={nx} y={ny + 5} textAnchor="middle" fontSize={size * 0.09} fontWeight="800" fill="#92400e">
                {i === 0 ? 12 : i}
              </text>
            </g>
          )
        })}
        {hand(hourAngle, r * 0.5, 6, '#7c3aed')}
        {hand(minuteAngle, r * 0.72, 4, '#ec4899')}
        <circle cx={cx} cy={cy} r="6" fill="#7c3aed" />
      </svg>
      {showDigital && (
        <div className="rounded-xl bg-slate-900 px-3 py-1 font-mono text-2xl font-bold text-lime-400 shadow-inner">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
        </div>
      )}
    </div>
  )
}
