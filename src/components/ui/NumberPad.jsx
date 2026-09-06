import { sound } from './Confetti'

// A big, tappable number pad for young children (also supports the keyboard).
export function NumberPad({ value, onChange, onEnter, allowMinus = false, disabled }) {
  const press = (key) => {
    if (disabled) return
    sound.click()
    if (key === 'del') return onChange(String(value).slice(0, -1))
    if (key === 'clr') return onChange('')
    if (key === '-') {
      if (!allowMinus) return
      return onChange(String(value).startsWith('-') ? String(value).slice(1) : '-' + value)
    }
    onChange(String(value) + key)
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', allowMinus ? '-' : 'clr', '0', 'del']

  return (
    <div className="mx-auto grid w-full max-w-xs grid-cols-3 gap-2">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => press(k)}
          disabled={disabled}
          className={`h-14 rounded-2xl border-b-4 font-display text-2xl font-bold transition active:translate-y-0.5 active:border-b-0 disabled:opacity-40 ${
            k === 'del' || k === 'clr'
              ? 'border-orange-300 bg-orange-100 text-orange-600'
              : k === '-'
                ? 'border-purple-300 bg-purple-100 text-purple-600'
                : 'border-purple-200 bg-white text-purple-700 hover:bg-purple-50'
          }`}
        >
          {k === 'del' ? '⌫' : k === 'clr' ? 'C' : k}
        </button>
      ))}
      <button
        type="button"
        onClick={() => !disabled && onEnter?.()}
        disabled={disabled}
        className="col-span-3 h-14 rounded-2xl border-b-4 border-green-700 bg-brand-green font-display text-2xl font-bold text-white transition active:translate-y-0.5 active:border-b-0 disabled:opacity-40"
      >
        ✓ Check
      </button>
    </div>
  )
}
