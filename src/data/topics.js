// Full syllabus: topics and their subtopics.
// Each subtopic id maps to a generator in ./generators/index.js and a lesson in ./lessons.
// `levels` describes difficulty tiers used by Practice/Test (grade 2 → 4).

export const TOPICS = [
  {
    id: 'numbers',
    name: 'Numbers & Place Value',
    icon: '🔢',
    color: 'blue',
    gradient: 'from-sky-400 to-blue-600',
    tagline: 'Count, compare and build big numbers!',
    subtopics: [
      { id: 'count-objects', name: 'Counting Fun', emoji: '🍎', grade: 2 },
      { id: 'skip-count', name: 'Skip Counting', emoji: '🦘', grade: 2 },
      { id: 'odd-even', name: 'Odd & Even', emoji: '⚖️', grade: 2 },
      { id: 'place-value', name: 'Place Value', emoji: '🏠', grade: 2 },
      { id: 'expanded-form', name: 'Expanded Form', emoji: '🧩', grade: 3 },
      { id: 'compare-numbers', name: 'Compare Numbers', emoji: '🐊', grade: 2 },
      { id: 'order-numbers', name: 'Before, After & Order', emoji: '📶', grade: 2 },
      { id: 'number-names', name: 'Number Names', emoji: '🔤', grade: 2 },
      { id: 'rounding', name: 'Rounding', emoji: '🎯', grade: 4 },
    ],
  },
  {
    id: 'addition',
    name: 'Addition',
    icon: '➕',
    color: 'green',
    gradient: 'from-green-400 to-emerald-600',
    tagline: 'Put groups together to find how many!',
    subtopics: [
      { id: 'add-pictures', name: 'Add with Pictures', emoji: '🍓', grade: 2 },
      { id: 'add-number-line', name: 'Add on a Number Line', emoji: '📏', grade: 2 },
      { id: 'add-within-20', name: 'Add within 20', emoji: '✋', grade: 2 },
      { id: 'add-2digit', name: '2-Digit Addition', emoji: '🔟', grade: 2 },
      { id: 'add-3digit', name: '3-Digit Addition', emoji: '💯', grade: 3 },
      { id: 'add-missing', name: 'Missing Numbers', emoji: '❓', grade: 2 },
      { id: 'add-word', name: 'Word Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'subtraction',
    name: 'Subtraction',
    icon: '➖',
    color: 'orange',
    gradient: 'from-orange-400 to-orange-600',
    tagline: 'Take away and find what is left!',
    subtopics: [
      { id: 'sub-pictures', name: 'Subtract with Pictures', emoji: '🎈', grade: 2 },
      { id: 'sub-number-line', name: 'Subtract on a Number Line', emoji: '📏', grade: 2 },
      { id: 'sub-within-20', name: 'Subtract within 20', emoji: '✋', grade: 2 },
      { id: 'sub-2digit', name: '2-Digit Subtraction', emoji: '🔟', grade: 2 },
      { id: 'sub-3digit', name: '3-Digit Subtraction', emoji: '💯', grade: 3 },
      { id: 'sub-missing', name: 'Missing Numbers', emoji: '❓', grade: 2 },
      { id: 'sub-word', name: 'Word Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'multiplication',
    name: 'Multiplication',
    icon: '✖️',
    color: 'pink',
    gradient: 'from-pink-400 to-rose-600',
    tagline: 'Add equal groups the fast way!',
    subtopics: [
      { id: 'mult-arrays', name: 'Arrays', emoji: '🐞', grade: 2 },
      { id: 'mult-groups', name: 'Equal Groups', emoji: '🍬', grade: 2 },
      { id: 'times-tables', name: 'Times Tables', emoji: '🎵', grade: 3 },
      { id: 'mult-2x1', name: '2-Digit × 1-Digit', emoji: '🔢', grade: 3 },
      { id: 'mult-missing', name: 'Missing Factors', emoji: '❓', grade: 3 },
      { id: 'mult-word', name: 'Word Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'division',
    name: 'Division',
    icon: '➗',
    color: 'purple',
    gradient: 'from-violet-400 to-purple-600',
    tagline: 'Share fairly into equal groups!',
    subtopics: [
      { id: 'div-sharing', name: 'Sharing Equally', emoji: '🍭', grade: 3 },
      { id: 'div-facts', name: 'Division Facts', emoji: '🎯', grade: 3 },
      { id: 'div-2x1', name: '2-Digit ÷ 1-Digit', emoji: '🔢', grade: 4 },
      { id: 'div-remainder', name: 'Remainders', emoji: '🧮', grade: 4 },
      { id: 'div-word', name: 'Word Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'fractions',
    name: 'Fractions',
    icon: '🍕',
    color: 'red',
    gradient: 'from-red-400 to-rose-600',
    tagline: 'Equal parts of a whole!',
    subtopics: [
      { id: 'frac-identify', name: 'Name the Fraction', emoji: '🍕', grade: 3 },
      { id: 'frac-shade', name: 'Which Shows...?', emoji: '🎨', grade: 3 },
      { id: 'frac-of-set', name: 'Fraction of a Set', emoji: '🍬', grade: 3 },
      { id: 'frac-compare', name: 'Compare Fractions', emoji: '⚖️', grade: 4 },
      { id: 'frac-equivalent', name: 'Equivalent Fractions', emoji: '🟰', grade: 4 },
    ],
  },
  {
    id: 'money',
    name: 'Money',
    icon: '💰',
    color: 'yellow',
    gradient: 'from-amber-300 to-yellow-500',
    tagline: 'Count dollars and make smart buys!',
    subtopics: [
      { id: 'money-count', name: 'Count the Money', emoji: '🪙', grade: 2 },
      { id: 'money-compare', name: 'Which is More?', emoji: '⚖️', grade: 2 },
      { id: 'money-make', name: 'Make the Amount', emoji: '🧮', grade: 3 },
      { id: 'money-change', name: 'Give the Change', emoji: '🛒', grade: 3 },
      { id: 'money-word', name: 'Shopping Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'measurement',
    name: 'Measurement',
    icon: '📏',
    color: 'teal',
    gradient: 'from-teal-400 to-cyan-600',
    tagline: 'Length, weight and how much it holds!',
    subtopics: [
      { id: 'meas-length', name: 'Length', emoji: '📐', grade: 2 },
      { id: 'meas-weight', name: 'Weight', emoji: '⚖️', grade: 2 },
      { id: 'meas-capacity', name: 'Capacity', emoji: '🥤', grade: 2 },
      { id: 'meas-convert', name: 'Unit Conversion', emoji: '🔁', grade: 4 },
      { id: 'meas-word', name: 'Measure Problems', emoji: '📖', grade: 3 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    icon: '⏰',
    color: 'blue',
    gradient: 'from-indigo-400 to-blue-600',
    tagline: 'Read clocks and know your calendar!',
    subtopics: [
      { id: 'time-oclock', name: "O'clock & Half Past", emoji: '🕒', grade: 2 },
      { id: 'time-read', name: 'Read the Clock', emoji: '⏱️', grade: 3 },
      { id: 'time-elapsed', name: 'How Much Time?', emoji: '⏳', grade: 3 },
      { id: 'calendar', name: 'Calendar', emoji: '📅', grade: 2 },
    ],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    icon: '🔺',
    color: 'purple',
    gradient: 'from-fuchsia-400 to-purple-600',
    tagline: 'Shapes, sides, corners and symmetry!',
    subtopics: [
      { id: 'shapes-2d', name: '2D Shapes', emoji: '🔷', grade: 2 },
      { id: 'shapes-3d', name: '3D Shapes', emoji: '📦', grade: 2 },
      { id: 'sides-corners', name: 'Sides & Corners', emoji: '📐', grade: 2 },
      { id: 'symmetry', name: 'Symmetry', emoji: '🦋', grade: 3 },
      { id: 'shape-patterns', name: 'Shape Patterns', emoji: '🔁', grade: 2 },
    ],
  },
  {
    id: 'data',
    name: 'Data & Graphs',
    icon: '📊',
    color: 'green',
    gradient: 'from-emerald-400 to-green-600',
    tagline: 'Read graphs like a data detective!',
    subtopics: [
      { id: 'read-pictograph', name: 'Pictographs', emoji: '🖼️', grade: 2 },
      { id: 'read-bargraph', name: 'Bar Graphs', emoji: '📊', grade: 3 },
      { id: 'tally-marks', name: 'Tally Marks', emoji: '✏️', grade: 2 },
      { id: 'data-compare', name: 'Compare Data', emoji: '🔍', grade: 3 },
    ],
  },
  {
    id: 'patterns',
    name: 'Patterns & Brain Teasers',
    icon: '🧩',
    color: 'orange',
    gradient: 'from-amber-400 to-orange-600',
    tagline: 'Olympiad puzzles that grow your brain!',
    subtopics: [
      { id: 'number-patterns', name: 'Number Patterns', emoji: '➡️', grade: 2 },
      { id: 'odd-one-out', name: 'Odd One Out', emoji: '🕵️', grade: 3 },
      { id: 'logic-puzzles', name: 'Logic Puzzles', emoji: '🧠', grade: 3 },
      { id: 'olympiad', name: 'Olympiad Challenge', emoji: '🏆', grade: 4 },
    ],
  },
  {
    id: 'number-sense',
    name: 'Number Sense Plus',
    icon: '🧠',
    color: 'purple',
    gradient: 'from-indigo-400 to-violet-600',
    tagline: 'Spot patterns and calculate cleverly!',
    subtopics: [
      { id: 'ordinal', name: 'Ordinal Numbers', emoji: '🥇', grade: 2 },
      { id: 'number-bonds', name: 'Number Bonds', emoji: '🌈', grade: 2 },
      { id: 'roman-numerals', name: 'Roman Numerals', emoji: '🏛️', grade: 3 },
      { id: 'estimation', name: 'Estimation', emoji: '🎯', grade: 3 },
      { id: 'mental-math', name: 'Mental Math', emoji: '⚡', grade: 3 },
      { id: 'balancing-equations', name: 'Balance Equations', emoji: '⚖️', grade: 3 },
      { id: 'fact-families', name: 'Fact Families', emoji: '🔁', grade: 3 },
      { id: 'ordering-challenge', name: 'Ordering Challenge', emoji: '📊', grade: 3 },
      { id: 'number-line-place', name: 'Number Line Placement', emoji: '📍', grade: 3 },
      { id: 'equation-builder', name: 'Equation Builder', emoji: '🧱', grade: 3 },
    ],
  },
  {
    id: 'advanced-arithmetic',
    name: 'Fractions, Factors & Decimals',
    icon: '🔬',
    color: 'teal',
    gradient: 'from-teal-400 to-emerald-600',
    tagline: 'Explore parts, patterns and place value!',
    subtopics: [
      { id: 'fraction-addition', name: 'Add Fractions', emoji: '🍰', grade: 4 },
      { id: 'fraction-mixed-numbers', name: 'Mixed Numbers', emoji: '🥧', grade: 4 },
      { id: 'factors', name: 'Factors', emoji: '🧩', grade: 4 },
      { id: 'multiples', name: 'Multiples', emoji: '🚂', grade: 3 },
      { id: 'prime-composite', name: 'Prime or Composite', emoji: '💎', grade: 4 },
      { id: 'decimals', name: 'Decimals', emoji: '🔟', grade: 4 },
    ],
  },
  {
    id: 'real-world-math',
    name: 'Real-World Math',
    icon: '🌎',
    color: 'orange',
    gradient: 'from-orange-400 to-rose-600',
    tagline: 'Measure, map, predict and explore!',
    subtopics: [
      { id: 'perimeter', name: 'Perimeter', emoji: '📐', grade: 3 },
      { id: 'area', name: 'Area', emoji: '🟦', grade: 3 },
      { id: 'time-deeper', name: 'Elapsed Time', emoji: '⏳', grade: 3 },
      { id: 'probability', name: 'Probability', emoji: '🎲', grade: 4 },
      { id: 'coordinates', name: 'Coordinates & Maps', emoji: '🗺️', grade: 4 },
      { id: 'temperature', name: 'Temperature & Negatives', emoji: '🌡️', grade: 4 },
      { id: 'grid-sums', name: 'Grid Sums', emoji: '🔲', grade: 3 },
      { id: 'match-equivalents', name: 'Match Equivalents', emoji: '🔗', grade: 3 },
      { id: 'true-false-reasoning', name: 'True or False', emoji: '✅', grade: 3 },
      { id: 'shape-hotspot', name: 'Shape Hotspot', emoji: '🎯', grade: 3 },
    ],
  },
]

export const TOPIC_MAP = Object.fromEntries(TOPICS.map((t) => [t.id, t]))

export function getTopic(id) {
  return TOPIC_MAP[id]
}

export function getSubtopic(topicId, subId) {
  const t = TOPIC_MAP[topicId]
  return t?.subtopics.find((s) => s.id === subId)
}

export function allSubtopics() {
  return TOPICS.flatMap((t) => t.subtopics.map((s) => ({ ...s, topicId: t.id, topicColor: t.color })))
}

// Tailwind text/bg helpers per brand color (kept explicit so Tailwind keeps them)
export const COLOR_CLASSES = {
  blue: { text: 'text-blue-600', bg: 'bg-blue-500', soft: 'bg-blue-100', ring: 'ring-blue-300', border: 'border-blue-400' },
  green: { text: 'text-green-600', bg: 'bg-green-500', soft: 'bg-green-100', ring: 'ring-green-300', border: 'border-green-400' },
  orange: { text: 'text-orange-600', bg: 'bg-orange-500', soft: 'bg-orange-100', ring: 'ring-orange-300', border: 'border-orange-400' },
  pink: { text: 'text-pink-600', bg: 'bg-pink-500', soft: 'bg-pink-100', ring: 'ring-pink-300', border: 'border-pink-400' },
  purple: { text: 'text-purple-600', bg: 'bg-purple-500', soft: 'bg-purple-100', ring: 'ring-purple-300', border: 'border-purple-400' },
  red: { text: 'text-red-600', bg: 'bg-red-500', soft: 'bg-red-100', ring: 'ring-red-300', border: 'border-red-400' },
  yellow: { text: 'text-amber-600', bg: 'bg-amber-500', soft: 'bg-amber-100', ring: 'ring-amber-300', border: 'border-amber-400' },
  teal: { text: 'text-teal-600', bg: 'bg-teal-500', soft: 'bg-teal-100', ring: 'ring-teal-300', border: 'border-teal-400' },
}
