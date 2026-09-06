import { useEffect, useRef, useState } from 'react'
import { QuestionVisual } from './visuals'
import { NumberPad } from './ui/NumberPad'
import { sound } from './ui/Confetti'
import { checkAnswer } from '../data/generators'
import { OwlSvg } from './ui/Mascot'
import { cn } from './ui/index'
import { useProgress } from '../context/ProgressContext'

const PRAISE = ['Awesome! 🎉', 'You got it! 🌟', 'Brilliant! 💫', 'Way to go! 🚀', 'Super! 🏆', 'Nailed it! ✨']
const ENCOURAGE = ['Good try!', 'Almost there!', 'Keep going!', 'Nice effort!']

export function Question({ question, onResult, onNext, mode = 'practice', index, total }) {
  const { settings } = useProgress()
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [hintStep, setHintStep] = useState(0)
  const praiseRef = useRef(PRAISE[Math.floor(Math.random() * PRAISE.length)])
  const interactive = ['mcq', 'boolean', 'multi-select', 'grid-fill', 'matching', 'ordering', 'number-line', 'hotspot', 'equation-builder'].includes(question.type)

  useEffect(() => {
    setValue('')
    setSelected(question.type === 'multi-select' ? [] : question.type === 'grid-fill' ? (question.grid || []).map(() => '') : null)
    setChecked(false)
    setCorrect(false)
    setHintStep(0)
    praiseRef.current = PRAISE[Math.floor(Math.random() * PRAISE.length)]
  }, [question])
  useEffect(() => {
    if (!settings?.readAloud || typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${question.prompt}. ${question.sub || ''}`))
    return () => window.speechSynthesis.cancel()
  }, [question, settings?.readAloud])

  const submitted = question.type === 'number' || question.type === 'text' ? value : selected
  function doCheck(override = submitted) {
    if (checked || override == null || override === '' || (Array.isArray(override) && !override.length)) return
    const ok = checkAnswer(question, override)
    setChecked(true)
    setCorrect(ok)
    ok ? sound.correct() : sound.wrong()
    onResult?.(ok)
    if (mode === 'test') setTimeout(() => onNext?.(), ok ? 850 : 1600)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Enter') { checked ? onNext?.() : doCheck(); return }
      if (interactive || checked || question.type !== 'number') return
      if (/^[0-9-]$/.test(e.key)) setValue((v) => v + e.key)
      if (e.key === 'Backspace') setValue((v) => v.slice(0, -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const choose = (next) => { if (!checked) { setSelected(next); sound.click() } }
  return (
    <div className="animate-pop">
      {total ? <div className="mb-3 flex justify-center gap-1.5" aria-label={`Question ${index + 1} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => <span key={i} className={cn('h-2.5 rounded-full transition-all', i === index ? 'w-6 bg-brand-purple' : i < index ? 'w-2.5 bg-brand-green' : 'w-2.5 bg-purple-200')} />)}
      </div> : null}
      <div className="text-center">
        <p className="mx-auto max-w-2xl font-display text-2xl font-bold leading-snug text-purple-900 sm:text-3xl">{question.prompt}</p>
        {question.sub && <p className="mt-1 font-display text-3xl font-extrabold tracking-wide text-brand-pink sm:text-4xl">{question.sub}</p>}
      </div>
      {question.visual && <div className="my-5 flex justify-center"><QuestionVisual spec={question.visual} /></div>}
      <div className="mt-4">
        {question.type === 'mcq' || question.type === 'boolean' ? <McqOptions question={question} selected={selected} checked={checked} onSelect={(v) => { choose(v); doCheck(v) }} /> :
          question.type === 'multi-select' ? <MultiSelect question={question} selected={selected || []} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'grid-fill' ? <GridFill question={question} value={selected || []} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'matching' ? <Matching question={question} value={selected || {}} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'ordering' ? <Ordering question={question} value={selected || question.items} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'number-line' ? <NumberLine question={question} value={selected} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'hotspot' ? <Hotspot question={question} value={selected} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          question.type === 'equation-builder' ? <EquationBuilder question={question} value={selected || []} checked={checked} onChange={setSelected} onCheck={() => doCheck(selected)} /> :
          <TextAnswer question={question} value={value} checked={checked} setValue={setValue} onCheck={() => doCheck(value)} />
        }
      </div>
      {!checked && question.hint && <div className="mx-auto mt-4 max-w-2xl text-center">
        {hintStep > 0 && <p className="rounded-2xl bg-yellow-50 p-3 text-sm font-bold text-amber-700">💡 {Array.isArray(question.hint) ? question.hint[Math.min(hintStep - 1, question.hint.length - 1)] : question.hint}</p>}
        <button className="mt-2 text-sm font-bold text-purple-500 underline" onClick={() => setHintStep((s) => s + 1)} aria-label="Show next hint">Need a hint? {hintStep ? `(${hintStep}/${Array.isArray(question.hint) ? question.hint.length : 1})` : ''}</button>
      </div>}
      {checked && <Feedback correct={correct} question={question} praise={praiseRef.current} onNext={onNext} mode={mode} />}
    </div>
  )
}

function McqOptions({ question, selected, checked, onSelect }) {
  const choices = question.choices || [{ value: true, label: 'True ✅' }, { value: false, label: 'False ❌' }]
  return <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2" role="group" aria-label="Answer choices">
    {choices.map((choice) => {
      const isSel = String(selected) === String(choice.value)
      const isAnswer = String(question.answer) === String(choice.value)
      const state = checked && isAnswer ? 'correct' : checked && isSel ? 'wrong' : isSel ? 'selected' : 'idle'
      return <button key={String(choice.value)} onClick={() => onSelect(choice.value)} disabled={checked} aria-pressed={isSel} className={cn('flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border-4 p-3 font-display text-xl font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300', state === 'idle' && 'border-purple-200 bg-white text-purple-800 hover:border-purple-400', state === 'selected' && 'border-brand-blue bg-blue-50 text-blue-700', state === 'correct' && 'border-green-400 bg-green-50 text-green-700', state === 'wrong' && 'border-red-300 bg-red-50 text-red-600')}>{choice.visual ? <QuestionVisual spec={choice.visual} /> : choice.label}{checked && isAnswer && ' ✓'}{checked && state === 'wrong' && ' ✗'}</button>
    })}
  </div>
}

function TextAnswer({ question, value, checked, setValue, onCheck }) {
  return <div className="mx-auto max-w-xs"><div className={cn('mb-3 flex h-16 items-center justify-center rounded-2xl border-4 bg-white px-4 font-display text-4xl font-extrabold', checked ? 'border-purple-300' : 'border-purple-200 text-purple-800')}>
    {question.unit && <span className="mr-1 text-2xl text-purple-400">{question.unit}</span>}
    {question.type === 'text' ? <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} disabled={checked} placeholder="?" aria-label="Your answer" className="w-full bg-transparent text-center outline-none placeholder:text-purple-200" /> : <span>{value || <span className="text-purple-200">?</span>}</span>}
    {question.unitSuffix && <span className="ml-1 text-2xl text-purple-400">{question.unitSuffix}</span>}
  </div>{question.type === 'number' ? <NumberPad value={value} onChange={setValue} onEnter={onCheck} allowMinus={question.allowMinus} disabled={checked} /> : <button onClick={onCheck} disabled={checked || !value} className="h-14 w-full rounded-2xl border-b-4 border-green-700 bg-brand-green font-display text-2xl font-bold text-white disabled:opacity-40">✓ Check</button>}</div>
}

function MultiSelect({ question, selected, checked, onChange, onCheck }) {
  const toggle = (v) => onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v])
  return <div><div className="grid gap-3 sm:grid-cols-2">{question.choices.map((c) => <button key={String(c.value)} disabled={checked} onClick={() => toggle(c.value)} aria-pressed={selected.includes(c.value)} className={cn('rounded-2xl border-4 p-4 font-display text-xl font-bold', selected.includes(c.value) ? 'border-brand-blue bg-blue-50' : 'border-purple-200 bg-white')}>{c.label}</button>)}</div><CheckButton disabled={checked || !selected.length} onClick={onCheck} /></div>
}
function GridFill({ question, value, checked, onChange, onCheck }) {
  return <div><div className="mx-auto grid max-w-xs gap-2" style={{ gridTemplateColumns: `repeat(${question.columns || 3}, minmax(0, 1fr))` }}>{(question.grid || []).map((cell, i) => cell === null ? <input key={i} value={value[i] || ''} disabled={checked} onChange={(e) => { const n = [...value]; n[i] = e.target.value; onChange(n) }} className="h-14 w-full rounded-xl border-4 border-purple-200 text-center text-2xl font-bold" aria-label={`Grid cell ${i + 1}`} /> : <div key={i} className="flex h-14 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold">{cell}</div>)}</div><CheckButton disabled={checked} onClick={onCheck} /></div>
}
function Matching({ question, value, checked, onChange, onCheck }) {
  const choose = (left, right) => onChange({ ...value, [left]: right })
  return <div><div className="grid gap-2">{question.pairs.map((p) => <div key={p.left} className="flex items-center gap-2"><span className="flex-1 rounded-xl bg-purple-100 p-3 font-bold">{p.left}</span><select disabled={checked} value={value[p.left] || ''} onChange={(e) => choose(p.left, e.target.value)} className="flex-1 rounded-xl border-4 border-purple-200 bg-white p-3 font-bold" aria-label={`Match ${p.left}`}><option value="">Choose…</option>{question.rights.map((r) => <option key={r} value={r}>{r}</option>)}</select></div>)}</div><CheckButton disabled={checked || Object.keys(value).length < question.pairs.length} onClick={onCheck} /></div>
}
function Ordering({ question, value, checked, onChange, onCheck }) {
  const move = (i, d) => { const a = [...value]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a) }
  return <div><div className="mx-auto max-w-md space-y-2">{value.map((item, i) => <div key={String(item)} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-pop-sm"><span className="flex-1 text-center text-lg font-bold">{item}</span><button disabled={checked || i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button><button disabled={checked || i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button></div>)}</div><CheckButton disabled={checked} onClick={onCheck} /></div>
}
function NumberLine({ question, value, checked, onChange, onCheck }) {
  const min = question.min ?? 0; const max = question.max ?? 10
  return <div className="mx-auto max-w-xl"><input type="range" min={min} max={max} step={question.step || 1} value={value ?? min} disabled={checked} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-purple-600" aria-label="Place on number line" /><div className="flex justify-between font-bold text-purple-600"><span>{min}</span><span className="text-2xl text-brand-pink">{value ?? '?'}</span><span>{max}</span></div><CheckButton disabled={checked || value == null} onClick={onCheck} /></div>
}
function Hotspot({ question, value, checked, onChange, onCheck }) {
  return <div className="mx-auto max-w-md"><div className="grid grid-cols-2 gap-2 rounded-2xl bg-purple-50 p-3" role="group" aria-label="Choose a spot">{(question.zones || [1, 2, 3, 4, 5, 6]).map((zone) => { const z = typeof zone === 'object' ? zone.value : zone; const label = typeof zone === 'object' ? zone.label || `Choice ${z}` : String(z); return <button key={String(z)} disabled={checked} onClick={() => onChange(z)} aria-label={label} aria-pressed={value === z} className={cn('flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-4 p-2 text-sm font-bold', value === z ? 'border-pink-500 bg-pink-100' : 'border-purple-200 bg-white')}>{zone.visual && <QuestionVisual spec={zone.visual} />}<span>{label}</span></button> })}</div><CheckButton disabled={checked || value == null} onClick={onCheck} /></div>
}
function EquationBuilder({ question, value, checked, onChange, onCheck }) {
  const add = (token) => onChange([...value, token])
  return <div><div className="mb-3 min-h-14 rounded-2xl border-4 border-purple-200 bg-white p-3 text-center font-display text-2xl font-bold">{value.join(' ') || 'Build the equation'}</div><div className="flex flex-wrap justify-center gap-2">{question.tokens.map((t) => <button key={t} disabled={checked} onClick={() => add(t)} className="rounded-xl bg-purple-100 px-4 py-2 font-bold hover:bg-purple-200">{t}</button>)}</div><button onClick={() => onChange([])} disabled={checked} className="mt-2 text-sm font-bold text-purple-400 underline">Clear</button><CheckButton disabled={checked || !value.length} onClick={onCheck} /></div>
}
function CheckButton({ disabled, onClick }) { return <button onClick={onClick} disabled={disabled} className="mx-auto mt-4 block h-12 rounded-2xl border-b-4 border-green-700 bg-brand-green px-8 font-display text-xl font-bold text-white disabled:opacity-40">✓ Check</button> }

function Feedback({ correct, question, praise, onNext, mode }) {
  return <div className={cn('mx-auto mt-5 max-w-2xl rounded-3xl border-4 p-4', correct ? 'border-green-300 bg-green-50' : 'border-orange-300 bg-orange-50')}><div className="flex items-start gap-3"><div className={correct ? 'animate-popIn' : 'animate-shake'}><OwlSvg mood={correct ? 'celebrate' : 'thinking'} size={64} /></div><div className="flex-1"><p className={cn('font-display text-2xl font-extrabold', correct ? 'text-green-600' : 'text-orange-600')}>{correct ? praise : ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]}</p>{!correct && <p className="mt-0.5 font-bold text-purple-800">The answer is <span className="text-brand-pink">{formatAnswer(question)}</span></p>}{question.explanation && <p className="mt-1 text-sm font-semibold text-purple-600">{question.explanation}</p>}{question.steps && <details className="mt-2 rounded-xl bg-white/70 p-2 text-sm font-semibold text-purple-700"><summary className="cursor-pointer font-bold">Replay the worked solution</summary><ol className="ml-5 list-decimal">{question.steps.map((s, i) => <li key={i}>{s}</li>)}</ol></details>}</div></div>{mode !== 'test' && <button onClick={onNext} className="mt-3 h-12 w-full rounded-2xl border-b-4 border-purple-800 bg-brand-purple font-display text-xl font-bold text-white">Next question →</button>}</div>
}
function formatAnswer(question) {
  if (question.type === 'mcq' || question.type === 'boolean') return question.choices?.find((x) => String(x.value) === String(question.answer))?.label || String(question.answer)
  if (question.type === 'matching') return Object.entries(question.answer || {}).map(([left, right]) => `${left} → ${right}`).join(', ')
  if (Array.isArray(question.answer)) return question.answer.join(', ')
  return `${question.unit || ''}${question.answer}${question.unitSuffix || ''}`
}
