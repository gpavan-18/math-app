// Money visuals — US Dollars ($ bills, ¢ coins).
export function Coin({ value = 25, size = 56, unit = '¢', after = true }) {
  let fill, ring
  if (unit === '¢') {
    // US coins: penny is copper, the rest are silver.
    ;[fill, ring] = value === 1 ? ['#f59e0b', '#b45309'] : ['#e5e7eb', '#9ca3af']
  } else {
    const map = {
      1: ['#e5e7eb', '#9ca3af'],
      2: ['#e5e7eb', '#9ca3af'],
      5: ['#fde68a', '#d97706'],
      10: ['#fcd34d', '#b45309'],
      20: ['#fbbf24', '#b45309'],
      25: ['#fde68a', '#d97706'],
    }
    ;[fill, ring] = map[value] || ['#fde68a', '#d97706']
  }
  const label = after ? `${value}${unit}` : `${unit}${value}`
  const fontSize = label.length >= 3 ? 30 : 36
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow">
      <circle cx="50" cy="50" r="46" fill={ring} />
      <circle cx="50" cy="50" r="40" fill={fill} stroke={ring} strokeWidth="3" />
      <text x="50" y="50" dominantBaseline="central" textAnchor="middle" fontSize={fontSize} fontWeight="800" fill={ring}>
        {label}
      </text>
    </svg>
  )
}

export function Note({ value = 10, width = 130, unit = '$' }) {
  const height = width * 0.46
  const word = 'DOLLARS'
  const colors = {
    1: '#a7f3d0',
    5: '#86efac',
    10: '#fca5a5',
    20: '#fdba74',
    50: '#93c5fd',
    100: '#c4b5fd',
  }
  const fill = colors[value] || '#a7f3d0'
  return (
    <svg width={width} height={height} viewBox="0 0 260 120" className="drop-shadow">
      <rect x="3" y="3" width="254" height="114" rx="12" fill={fill} stroke="#334155" strokeWidth="3" />
      <rect x="14" y="14" width="232" height="92" rx="8" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="210" cy="60" r="26" fill="#ffffff88" stroke="#334155" strokeWidth="1.5" />
      <text x="210" y="70" textAnchor="middle" fontSize="26" fontWeight="800" fill="#334155">
        {unit}
        {value}
      </text>
      <text x="30" y="52" fontSize="34" fontWeight="800" fill="#334155">
        {unit}
        {value}
      </text>
      <text x="30" y="82" fontSize="13" fontWeight="700" fill="#334155">
        {word}
      </text>
    </svg>
  )
}

// Show a wallet of mixed money. Each item may carry its own unit info.
export function MoneyRow({ items = [] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((m, i) =>
        m.type === 'coin' ? (
          <Coin key={i} value={m.value} size={48} unit={m.unit ?? '¢'} after={m.after ?? true} />
        ) : (
          <Note key={i} value={m.value} width={110} unit={m.unit ?? '$'} />
        ),
      )}
    </div>
  )
}
