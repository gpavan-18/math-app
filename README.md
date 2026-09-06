# 🦉 Math Whiz Junior

A rich, kid‑friendly math learning web app built for **Grade 2**, stretching up to **Grade 4 competitive / olympiad** level. Your child can **learn** each concept with colorful pictures, **practice** with unlimited questions, and take **tests** to earn ⭐ stars and 🏅 badges.

Meet **Ollie the Owl**, the friendly guide who cheers on every correct answer and gently helps after a mistake.

## ✨ Features

- **15 topics, 92 skills** — a full end‑to‑end syllabus (see below).
- **Unlimited questions** — every skill is powered by a question *generator*, so practice never runs out (59,400+ combinations validated for correctness).
- **Pictures everywhere** — crisp inline SVG visuals: counting objects, base‑ten blocks, number lines, arrays, fraction bars & circles, analog clocks, dollar bills & coins, 2D/3D shapes, bar graphs, pictographs, tally marks.
- **Three modes per topic**
  - 📖 **Learn** — concept cards with worked examples and tips.
  - ✏️ **Practice** — endless questions, instant feedback, streaks, adaptive difficulty.
  - 🏆 **Test** — 10 questions that ramp in difficulty, scored with 1–3 stars.
- **Competitive / olympiad content** — number patterns, odd‑one‑out, logic puzzles and challenge problems.
- **Progress & rewards** — stars, badges, per‑topic medals and mastery tracking, saved in the browser (localStorage).
- **Kid‑first UX** — big tappable number pad, playful sounds, confetti, an owl mascot, chunky buttons, and a bright rainbow theme. Also fully keyboard‑friendly.
- **Interactive question engine** — true/false, multi-select, grid fill, matching, ordering, number-line, hotspot and equation-builder questions include accessible touch/keyboard controls, hint ladders and worked-solution replay.
- **Game modes & Puzzle Lab** — seeded daily challenges, speed rounds, mixed review, boss battles, adventure progression, practice-your-misses and brain puzzles.
- **Family tools** — read-aloud Web Speech API toggle, adjustable ranges and difficulty, printable worksheets, and a parent dashboard with accuracy and learning gaps.

## 📚 Syllabus

| Topic | Sample skills |
|---|---|
| 🔢 Numbers & Place Value | counting, skip counting, odd/even, place value, expanded form, comparing, ordering, number names, rounding |
| ➕ Addition | pictures, number line, within 20, 2‑ & 3‑digit, missing numbers, word problems |
| ➖ Subtraction | pictures, number line, within 20, 2‑ & 3‑digit, missing numbers, word problems |
| ✖️ Multiplication | arrays, equal groups, times tables, 2‑digit × 1‑digit, missing factors, word problems |
| ➗ Division | sharing, facts, 2‑digit ÷ 1‑digit, remainders, word problems |
| 🍕 Fractions | name the fraction, identify, fraction of a set, compare, equivalent |
| 💰 Money ($) | count coins & bills, compare, make amounts, give change, shopping problems |
| 📏 Measurement | length (in/ft), weight (oz/lb), capacity (cups/gal), unit conversion, word problems |
| ⏰ Time | o'clock & half past, read the clock, elapsed time, calendar |
| 🔺 Geometry | 2D shapes, 3D shapes, sides & corners, symmetry, shape patterns |
| 📊 Data & Graphs | pictographs, bar graphs, tally marks, comparing data |
| 🧩 Patterns & Brain Teasers | number patterns, odd one out, logic puzzles, olympiad challenge |
| 🧠 Number Sense Plus | ordinal numbers, bonds, Roman numerals, estimation, mental math, balancing equations, fact families |
| 🔬 Fractions, Factors & Decimals | fraction operations, mixed numbers, factors, multiples, primes, decimals |
| 🌎 Real-World Math | perimeter, area, elapsed time, probability, coordinates & maps, temperature and negative numbers |

## 🚀 Getting started

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the app at http://localhost:5173
```

Then open **http://localhost:5173** in your browser.

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## 🛠️ Tech stack

- **React 18** + **Vite** — fast, modern single‑page app.
- **React Router** — Learn / Practice / Test navigation.
- **Tailwind CSS** — the bright, playful design system.
- **localStorage** — saves the child's name, stars, badges and progress on the device.

## 📁 Project structure

```
src/
├── components/
│   ├── ui/            # Button, Card, Mascot (Ollie), NumberPad, Confetti + sounds
│   ├── visuals/       # all SVG "picture" components + QuestionVisual dispatcher
│   └── Question.jsx   # the interactive question player (used by Practice, Test, Games & Puzzles)
├── context/
│   └── ProgressContext.jsx   # stars, badges, mastery (localStorage)
├── data/
│   ├── topics.js      # the syllabus (topics & skills)
│   ├── strings.js     # central UI copy ready for translation
│   ├── lessons.js     # Learn content
│   ├── emoji.js       # themed emoji sets
│   └── generators/    # one file per topic — the question engines
└── pages/             # learning, games, puzzles, settings, awards and parent views
```

## ➕ Adding a new skill

1. Add the skill to its topic in `src/data/topics.js`.
2. Write a generator `(rng, level) => question` in the matching `src/data/generators/*.js` file, keyed by the skill id.
3. (Optional) Add a Learn card in `src/data/lessons.js`.

A question object looks like:

```js
{
  prompt: '5 + 2 = ?',
  visual: { type: 'addGroups', props: { a: 5, b: 2, emojiA: '🍎', emojiB: '🍎' } },
  type: 'number',            // number | text | mcq | boolean | multi-select | grid-fill | matching | ordering | number-line | hotspot | equation-builder
  answer: 7,
  explanation: '5 + 2 = 7.',
}
```

---

Made with 💜 for young mathematicians.
