// Common US first names, used across word-problem generators.
export const NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'Lucas', 'Mia', 'Jacob', 'Charlotte', 'Henry', 'Amelia', 'Jack',
  'Harper', 'Owen', 'Evelyn', 'Leo', 'Abigail', 'Aiden', 'Ella', 'Grayson',
]

export function pickName(rng, exclude) {
  const pool = exclude ? NAMES.filter((n) => n !== exclude) : NAMES
  return pool[Math.floor(rng() * pool.length)]
}
