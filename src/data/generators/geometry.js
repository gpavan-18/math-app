// Generators for Geometry.
import { randInt, pick, shuffle } from './util.js'

const SHAPES_2D = [
  { name: 'triangle', sides: 3, corners: 3, symmetry: 3 },
  { name: 'square', sides: 4, corners: 4, symmetry: 4 },
  { name: 'rectangle', sides: 4, corners: 4, symmetry: 2 },
  { name: 'pentagon', sides: 5, corners: 5, symmetry: 5 },
  { name: 'hexagon', sides: 6, corners: 6, symmetry: 6 },
  { name: 'rhombus', sides: 4, corners: 4, symmetry: 2 },
  { name: 'circle', sides: 0, corners: 0, symmetry: null },
]
const SHAPES_3D = [
  { name: 'cube', faces: 6, edges: 12, vertices: 8 },
  { name: 'sphere', faces: 1, edges: 0, vertices: 0 },
  { name: 'cylinder', faces: 3, edges: 2, vertices: 0 },
  { name: 'cone', faces: 2, edges: 1, vertices: 1 },
  { name: 'pyramid', faces: 5, edges: 8, vertices: 5 },
]
const COLORS = ['blue', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow']

export const geometryGenerators = {
  'shapes-2d'(rng) {
    const shape = pick(rng, SHAPES_2D)
    const color = pick(rng, COLORS)
    const distract = shuffle(rng, SHAPES_2D.filter((s) => s.name !== shape.name)).slice(0, 3)
    return {
      prompt: 'What is the name of this shape?',
      visual: { type: 'shape2d', props: { shape: shape.name, color, size: 130 } },
      type: 'mcq',
      choices: shuffle(rng, [shape, ...distract]).map((s) => ({ value: s.name, label: cap(s.name) })),
      answer: shape.name,
      explanation: `This shape is a ${shape.name}.`,
    }
  },

  'shapes-3d'(rng) {
    const shape = pick(rng, SHAPES_3D)
    const color = pick(rng, COLORS)
    const distract = shuffle(rng, SHAPES_3D.filter((s) => s.name !== shape.name)).slice(0, 3)
    return {
      prompt: 'What is the name of this 3D shape?',
      visual: { type: 'shape3d', props: { shape: shape.name, color, size: 130 } },
      type: 'mcq',
      choices: shuffle(rng, [shape, ...distract]).map((s) => ({ value: s.name, label: cap(s.name) })),
      answer: shape.name,
      explanation: `This 3D shape is a ${shape.name}.`,
    }
  },

  'sides-corners'(rng, level = 0) {
    const shape = pick(rng, SHAPES_2D.filter((s) => s.name !== 'circle'))
    const color = pick(rng, COLORS)
    const askCorners = rng() < 0.5
    return {
      prompt: `How many ${askCorners ? 'corners (vertices)' : 'sides'} does a ${shape.name} have?`,
      visual: { type: 'shape2d', props: { shape: shape.name, color, size: 130, showVertices: askCorners } },
      type: 'number',
      answer: askCorners ? shape.corners : shape.sides,
      hint: 'Count carefully around the shape.',
      explanation: `A ${shape.name} has ${shape.sides} sides and ${shape.corners} corners.`,
    }
  },

  symmetry(rng, level = 0) {
    if (level >= 1 && rng() < 0.5) {
      // 3D faces question (competitive)
      const shape = pick(rng, SHAPES_3D.filter((s) => s.faces > 1))
      const color = pick(rng, COLORS)
      return {
        prompt: `How many flat faces does a ${shape.name} have?`,
        visual: { type: 'shape3d', props: { shape: shape.name, color, size: 130 } },
        type: 'number',
        answer: shape.faces,
        explanation: `A ${shape.name} has ${shape.faces} faces.`,
      }
    }
    const shape = pick(rng, SHAPES_2D.filter((s) => s.symmetry != null))
    const color = pick(rng, COLORS)
    return {
      prompt: `How many lines of symmetry does a regular ${shape.name} have?`,
      sub: 'A line of symmetry folds the shape into two matching halves.',
      visual: { type: 'shape2d', props: { shape: shape.name, color, size: 130 } },
      type: 'number',
      answer: shape.symmetry,
      hint: 'Imagine folding the shape so both halves match exactly.',
      explanation: `A regular ${shape.name} has ${shape.symmetry} lines of symmetry.`,
    }
  },

  'shape-patterns'(rng, level = 0) {
    const palette = shuffle(rng, SHAPES_2D.filter((s) => s.name !== 'circle')).slice(0, 3)
    const colors = shuffle(rng, COLORS)
    const patterns = [
      [0, 1, 0, 1, 0, 1], // AB
      [0, 0, 1, 0, 0, 1], // AAB
      [0, 1, 2, 0, 1, 2], // ABC
      [0, 1, 1, 0, 1, 1], // ABB
    ]
    const pat = pick(rng, level === 0 ? patterns.slice(0, 2) : patterns)
    const unit = detectUnit(pat)
    const nextIdx = pat[pat.length % unit]
    const next = palette[nextIdx]
    const colorFor = (paletteIdx) => colors[paletteIdx]

    const visuals = pat.map((idx) => ({ type: 'shape2d', props: { shape: palette[idx].name, color: colorFor(idx), size: 60 } }))
    visuals.push({ type: 'mystery', props: { size: 60 } })

    const options = shuffle(rng, palette).map((s) => ({
      value: s.name,
      visual: { type: 'shape2d', props: { shape: s.name, color: colorFor(palette.indexOf(s)), size: 56 } },
    }))
    return {
      prompt: 'What shape comes NEXT in the pattern?',
      visual: visuals,
      choices: options,
      type: 'mcq',
      answer: next.name,
      hint: 'Find the part that repeats, then continue it.',
      explanation: `The pattern repeats every ${unit} shapes, so the next shape is a ${next.name}.`,
    }
  },
}

function detectUnit(pat) {
  for (let u = 1; u <= pat.length / 2; u++) {
    let ok = true
    for (let i = 0; i < pat.length; i++) {
      if (pat[i] !== pat[i % u]) {
        ok = false
        break
      }
    }
    if (ok) return u
  }
  return pat.length
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
