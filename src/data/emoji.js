// Themed emoji sets so questions feel playful and varied.
export const EMOJI_SETS = {
  fruit: ['🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🍍', '🥝'],
  animals: ['🐶', '🐱', '🐰', '🐼', '🦊', '🐸', '🐵', '🐧'],
  bugs: ['🐞', '🦋', '🐝', '🐛', '🐌', '🕷️'],
  sweets: ['🍬', '🍭', '🍪', '🧁', '🍩', '🍫'],
  toys: ['⚽', '🏀', '🎈', '🧸', '🎁', '🪀', '🚗', '✏️'],
  space: ['⭐', '🌟', '🚀', '🪐', '☀️', '🌙'],
  nature: ['🌸', '🌻', '🌈', '🌵', '🍁', '🌷'],
  food: ['🍕', '🍔', '🌭', '🍟', '🥨', '🧀'],
}

const ALL = Object.values(EMOJI_SETS).flat()

export function emojiFor(seed = 0, theme) {
  if (theme && EMOJI_SETS[theme]) {
    const set = EMOJI_SETS[theme]
    return set[Math.abs(seed) % set.length]
  }
  return ALL[Math.abs(seed) % ALL.length]
}

export function randomTheme(rng = Math.random) {
  const keys = Object.keys(EMOJI_SETS)
  return keys[Math.floor(rng() * keys.length)]
}
