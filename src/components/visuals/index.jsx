// Central export + a dispatcher that turns a `visual` spec object into a component.
import {
  CountingObjects,
  AddGroups,
  TenFrame,
  BaseTenBlocks,
  NumberLine,
  ArrayDots,
  EqualGroups,
  FractionCircle,
  FractionBar,
  CompareVisual,
} from './MathVisuals'
import { Clock } from './Clock'
import { Coin, Note, MoneyRow } from './Money'
import { Shape2D, Shape3D } from './Shapes'
import { BarGraph, Pictograph, Tally } from './Charts'

// A "?" placeholder tile used in pattern questions.
export function MysteryTile({ size = 60 }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl border-4 border-dashed border-purple-300 bg-purple-50 font-display font-black text-purple-400"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      ?
    </div>
  )
}

export {
  CountingObjects,
  AddGroups,
  TenFrame,
  BaseTenBlocks,
  NumberLine,
  ArrayDots,
  EqualGroups,
  FractionCircle,
  FractionBar,
  CompareVisual,
  Clock,
  Coin,
  Note,
  MoneyRow,
  Shape2D,
  Shape3D,
  BarGraph,
  Pictograph,
  Tally,
}

const REGISTRY = {
  countingObjects: CountingObjects,
  addGroups: AddGroups,
  tenFrame: TenFrame,
  baseTenBlocks: BaseTenBlocks,
  numberLine: NumberLine,
  arrayDots: ArrayDots,
  equalGroups: EqualGroups,
  fractionCircle: FractionCircle,
  fractionBar: FractionBar,
  compare: CompareVisual,
  clock: Clock,
  coin: Coin,
  note: Note,
  moneyRow: MoneyRow,
  shape2d: Shape2D,
  shape3d: Shape3D,
  barGraph: BarGraph,
  pictograph: Pictograph,
  tally: Tally,
  mystery: MysteryTile,
}

// Render a visual from a spec: { type: 'clock', props: { hours: 3 } }
export function QuestionVisual({ spec }) {
  if (!spec) return null
  const specs = Array.isArray(spec) ? spec : [spec]
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {specs.map((s, i) => {
        const Cmp = REGISTRY[s.type]
        if (!Cmp) return null
        return (
          <div key={i} className="animate-pop">
            {s.label && <div className="mb-1 text-center text-sm font-bold text-purple-500">{s.label}</div>}
            <Cmp {...(s.props || {})} />
          </div>
        )
      })}
    </div>
  )
}
