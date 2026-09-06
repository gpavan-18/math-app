// 2D and 3D geometry shape visuals.
const FILL = {
  purple: '#c4b5fd',
  pink: '#f9a8d4',
  blue: '#93c5fd',
  green: '#86efac',
  yellow: '#fde047',
  orange: '#fdba74',
  teal: '#5eead4',
  red: '#fca5a5',
}
const STROKE = {
  purple: '#7c3aed',
  pink: '#db2777',
  blue: '#2563eb',
  green: '#16a34a',
  yellow: '#ca8a04',
  orange: '#ea580c',
  teal: '#0d9488',
  red: '#dc2626',
}

export function Shape2D({ shape = 'triangle', size = 120, color = 'blue', showVertices = false }) {
  const fill = FILL[color] || FILL.blue
  const stroke = STROKE[color] || STROKE.blue
  const s = size
  const c = s / 2
  const props = { fill, stroke, strokeWidth: 4, strokeLinejoin: 'round' }

  let el = null
  let verts = []
  switch (shape) {
    case 'circle':
      el = <circle cx={c} cy={c} r={c - 6} {...props} />
      break
    case 'square':
      el = <rect x="6" y="6" width={s - 12} height={s - 12} rx="4" {...props} />
      verts = [[6, 6], [s - 6, 6], [s - 6, s - 6], [6, s - 6]]
      break
    case 'rectangle':
      el = <rect x="6" y={s * 0.2} width={s - 12} height={s * 0.6} rx="4" {...props} />
      verts = [[6, s * 0.2], [s - 6, s * 0.2], [s - 6, s * 0.8], [6, s * 0.8]]
      break
    case 'triangle': {
      const pts = `${c},8 ${s - 8},${s - 8} 8,${s - 8}`
      el = <polygon points={pts} {...props} />
      verts = [[c, 8], [s - 8, s - 8], [8, s - 8]]
      break
    }
    case 'pentagon': {
      verts = pointsOnPolygon(5, c, c - 6, -90)
      el = <polygon points={verts.map((p) => p.join(',')).join(' ')} {...props} />
      break
    }
    case 'hexagon': {
      verts = pointsOnPolygon(6, c, c - 6, -90)
      el = <polygon points={verts.map((p) => p.join(',')).join(' ')} {...props} />
      break
    }
    case 'oval':
      el = <ellipse cx={c} cy={c} rx={c - 6} ry={(c - 6) * 0.7} {...props} />
      break
    case 'star': {
      const outer = pointsOnPolygon(5, c, c - 6, -90)
      const inner = pointsOnPolygon(5, c, (c - 6) / 2.4, -90 + 36)
      const merged = []
      for (let i = 0; i < 5; i++) {
        merged.push(outer[i], inner[i])
      }
      el = <polygon points={merged.map((p) => p.join(',')).join(' ')} {...props} />
      break
    }
    case 'rhombus': {
      const pts = `${c},6 ${s - 6},${c} ${c},${s - 6} 6,${c}`
      el = <polygon points={pts} {...props} />
      verts = [[c, 6], [s - 6, c], [c, s - 6], [6, c]]
      break
    }
    default:
      el = <circle cx={c} cy={c} r={c - 6} {...props} />
  }

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {el}
      {showVertices &&
        verts.map((v, i) => <circle key={i} cx={v[0]} cy={v[1]} r="5" fill={stroke} />)}
    </svg>
  )
}

function pointsOnPolygon(n, c, r, startDeg) {
  return Array.from({ length: n }).map((_, i) => {
    const a = ((startDeg + (360 / n) * i) * Math.PI) / 180
    return [Number((c + r * Math.cos(a)).toFixed(1)), Number((c + r * Math.sin(a)).toFixed(1))]
  })
}

export function Shape3D({ shape = 'cube', size = 120, color = 'purple' }) {
  const fill = FILL[color] || FILL.purple
  const stroke = STROKE[color] || STROKE.purple
  const light = '#ffffffcc'
  const s = size

  switch (shape) {
    case 'cube':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120">
          <polygon points="30,40 70,20 110,40 70,60" fill={light} stroke={stroke} strokeWidth="3" />
          <polygon points="30,40 70,60 70,105 30,85" fill={fill} stroke={stroke} strokeWidth="3" />
          <polygon points="70,60 110,40 110,85 70,105" fill={stroke} opacity="0.55" stroke={stroke} strokeWidth="3" />
        </svg>
      )
    case 'sphere':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120">
          <defs>
            <radialGradient id="sph" cx="38%" cy="35%" r="70%">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={fill} />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="46" fill="url(#sph)" stroke={stroke} strokeWidth="3" />
        </svg>
      )
    case 'cylinder':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120">
          <rect x="28" y="30" width="64" height="60" fill={fill} stroke={stroke} strokeWidth="3" />
          <ellipse cx="60" cy="90" rx="32" ry="12" fill={stroke} opacity="0.55" stroke={stroke} strokeWidth="3" />
          <ellipse cx="60" cy="30" rx="32" ry="12" fill={light} stroke={stroke} strokeWidth="3" />
        </svg>
      )
    case 'cone':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120">
          <polygon points="60,18 92,92 28,92" fill={fill} stroke={stroke} strokeWidth="3" />
          <ellipse cx="60" cy="92" rx="32" ry="12" fill={light} stroke={stroke} strokeWidth="3" />
        </svg>
      )
    case 'pyramid':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120">
          <polygon points="60,16 100,92 60,74" fill={stroke} opacity="0.55" stroke={stroke} strokeWidth="3" />
          <polygon points="60,16 20,92 60,74" fill={fill} stroke={stroke} strokeWidth="3" />
          <polygon points="20,92 100,92 60,74" fill={light} stroke={stroke} strokeWidth="3" />
        </svg>
      )
    default:
      return <Shape2D shape="square" size={size} color={color} />
  }
}
