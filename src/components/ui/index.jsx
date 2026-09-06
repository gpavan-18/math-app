import { Link } from 'react-router-dom'

export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

/* -------------------------------- Button ---------------------------------- */
const VARIANTS = {
  purple: 'bg-brand-purple text-white border-purple-800 hover:bg-purple-600',
  pink: 'bg-brand-pink text-white border-pink-700 hover:bg-pink-500',
  blue: 'bg-brand-blue text-white border-blue-700 hover:bg-blue-500',
  green: 'bg-brand-green text-white border-green-700 hover:bg-green-500',
  yellow: 'bg-brand-yellow text-amber-900 border-amber-500 hover:bg-yellow-300',
  orange: 'bg-brand-orange text-white border-orange-600 hover:bg-orange-400',
  white: 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50',
  ghost: 'bg-white/60 text-purple-700 border-transparent hover:bg-white',
}
const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
  xl: 'px-9 py-4 text-2xl',
}

export function Button({ as = 'button', to, href, variant = 'purple', size = 'md', className, children, ...rest }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-2xl border-b-4 font-display font-bold',
    'shadow-pop-sm transition active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:active:translate-y-0',
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const Tag = as
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

/* --------------------------------- Card ----------------------------------- */
export function Card({ className, children, ...rest }) {
  return (
    <div className={cn('rounded-3xl bg-white/90 p-6 shadow-card backdrop-blur', className)} {...rest}>
      {children}
    </div>
  )
}

/* ------------------------------ Progress bar ------------------------------ */
export function ProgressBar({ value = 0, max = 100, color = '#22c55e', className }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('h-4 w-full overflow-hidden rounded-full bg-purple-100', className)}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

/* ------------------------------- Star rating ------------------------------ */
export function StarRating({ value = 0, max = 3, size = 'text-2xl' }) {
  return (
    <span className={cn('inline-flex gap-0.5', size)} aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < value ? 'text-brand-yellow drop-shadow' : 'text-purple-200'}>
          ★
        </span>
      ))}
    </span>
  )
}

/* --------------------------------- Pill ----------------------------------- */
export function Pill({ children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold', className)}>
      {children}
    </span>
  )
}

/* --------------------------------- Badge ---------------------------------- */
export function Badge({ emoji = '🏅', label, earned = true }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 rounded-2xl p-3 text-center transition',
        earned ? 'bg-yellow-50 shadow-pop-sm' : 'bg-slate-100 opacity-50 grayscale',
      )}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-xs font-bold text-purple-700">{label}</span>
    </div>
  )
}
