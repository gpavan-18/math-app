// Ollie the Owl — the app mascot, with expressions and an optional speech bubble.
export function Mascot({ mood = 'happy', size = 120, message, className = '' }) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <OwlSvg mood={mood} size={size} />
      {message && (
        <div className="relative mb-4 max-w-xs rounded-2xl bg-white px-4 py-3 font-display text-lg font-bold text-purple-700 shadow-card">
          <span className="absolute -left-2 bottom-3 h-4 w-4 rotate-45 bg-white" />
          {message}
        </div>
      )}
    </div>
  )
}

export function OwlSvg({ mood = 'happy', size = 120 }) {
  const eyeShape = () => {
    switch (mood) {
      case 'celebrate':
      case 'happy':
        return (
          <>
            <circle cx="42" cy="52" r="15" fill="#fff" />
            <circle cx="78" cy="52" r="15" fill="#fff" />
            <circle cx="44" cy="54" r="7" fill="#1f2937" />
            <circle cx="80" cy="54" r="7" fill="#1f2937" />
            <circle cx="46" cy="51" r="2.5" fill="#fff" />
            <circle cx="82" cy="51" r="2.5" fill="#fff" />
          </>
        )
      case 'thinking':
        return (
          <>
            <circle cx="42" cy="52" r="15" fill="#fff" />
            <circle cx="78" cy="52" r="15" fill="#fff" />
            <circle cx="42" cy="55" r="7" fill="#1f2937" />
            <circle cx="80" cy="50" r="7" fill="#1f2937" />
          </>
        )
      case 'sad':
        return (
          <>
            <circle cx="42" cy="54" r="15" fill="#fff" />
            <circle cx="78" cy="54" r="15" fill="#fff" />
            <circle cx="42" cy="57" r="6" fill="#1f2937" />
            <circle cx="78" cy="57" r="6" fill="#1f2937" />
            <path d="M30 40 L52 46" stroke="#5b21b6" strokeWidth="3" strokeLinecap="round" />
            <path d="M90 40 L68 46" stroke="#5b21b6" strokeWidth="3" strokeLinecap="round" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={mood === 'celebrate' ? 'animate-float' : ''}>
      {/* branch / feet */}
      <ellipse cx="60" cy="112" rx="26" ry="6" fill="#00000018" />
      {/* body */}
      <ellipse cx="60" cy="70" rx="40" ry="42" fill="#7c3aed" />
      <ellipse cx="60" cy="78" rx="30" ry="30" fill="#c4b5fd" />
      {/* ear tufts */}
      <path d="M30 34 L26 12 L44 30 Z" fill="#7c3aed" />
      <path d="M90 34 L94 12 L76 30 Z" fill="#7c3aed" />
      {/* eyes */}
      {eyeShape()}
      {/* beak */}
      <path d="M60 62 l8 8 -16 0 z" fill="#f59e0b" />
      {/* wings */}
      <path d="M22 66 q-8 18 6 30 q6 -14 4 -30 z" fill="#6d28d9" />
      <path d="M98 66 q8 18 -6 30 q-6 -14 -4 -30 z" fill="#6d28d9" />
      {/* mouth expression */}
      {mood === 'sad' ? (
        <path d="M52 84 q8 -8 16 0" stroke="#6d28d9" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M52 82 q8 8 16 0" stroke="#6d28d9" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {mood === 'celebrate' && (
        <>
          <text x="14" y="24" fontSize="16">✨</text>
          <text x="92" y="26" fontSize="16">🎉</text>
        </>
      )}
    </svg>
  )
}
