// Generators for Time.
import { randInt, pick, shuffle } from './util.js'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_IN_MONTH = { January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31 }

function timeLabel(h, m) {
  if (m === 0) return `${h} o'clock`
  if (m === 30) return `half past ${h}`
  if (m === 15) return `quarter past ${h}`
  if (m === 45) return `quarter to ${h === 12 ? 1 : h + 1}`
  return `${h}:${String(m).padStart(2, '0')}`
}

export const timeGenerators = {
  'time-oclock'(rng, level = 0) {
    const h = randInt(rng, 1, 12)
    const m = pick(rng, level === 0 ? [0, 30] : [0, 15, 30, 45])
    const correct = timeLabel(h, m)
    const distract = new Set([correct])
    while (distract.size < 4) {
      const dh = randInt(rng, 1, 12)
      const dm = pick(rng, [0, 15, 30, 45])
      distract.add(timeLabel(dh, dm))
    }
    return {
      prompt: 'What time is it?',
      visual: { type: 'clock', props: { hours: h, minutes: m, size: 180 } },
      type: 'mcq',
      choices: shuffle(rng, [...distract]).map((v) => ({ value: v, label: v })),
      answer: correct,
      hint: 'The short hand shows the hour. The long hand shows the minutes.',
      explanation: `The time is ${correct}.`,
    }
  },

  'time-read'(rng) {
    const h = randInt(rng, 1, 12)
    const m = randInt(rng, 0, 11) * 5
    return {
      prompt: 'Write this time in digital form (H:MM).',
      visual: { type: 'clock', props: { hours: h, minutes: m, size: 180 } },
      sub: 'For example  3:15',
      type: 'text',
      answer: `${h}:${String(m).padStart(2, '0')}`,
      normalize: (s) => s.replace(/\s/g, '').replace(/^0/, ''),
      hint: 'Read the hour from the short hand, minutes from the long hand (count by 5s).',
      explanation: `The time is ${h}:${String(m).padStart(2, '0')}.`,
    }
  },

  'time-elapsed'(rng, level = 0) {
    const startH = randInt(rng, 1, 9)
    const dur = randInt(rng, 1, level === 0 ? 3 : 6)
    const kind = pick(rng, ['hours', 'half'])
    if (kind === 'hours') {
      return {
        prompt: `A movie starts at ${startH}:00 and lasts ${dur} hour${dur > 1 ? 's' : ''}. What time does it END?`,
        visual: { type: 'clock', props: { hours: startH, minutes: 0, size: 150 } },
        type: 'text',
        answer: `${startH + dur}:00`,
        normalize: (s) => s.replace(/\s/g, ''),
        hint: `Add ${dur} to the hour.`,
        explanation: `${startH}:00 + ${dur} hours = ${startH + dur}:00.`,
      }
    }
    const mins = 30
    const endM = 30
    return {
      prompt: `A class starts at ${startH}:00 and lasts ${mins} minutes. What time does it END?`,
      visual: { type: 'clock', props: { hours: startH, minutes: 0, size: 150 } },
      type: 'text',
      answer: `${startH}:${endM}`,
      normalize: (s) => s.replace(/\s/g, ''),
      hint: '30 minutes after o\'clock is half past.',
      explanation: `${startH}:00 + 30 minutes = ${startH}:30.`,
    }
  },

  calendar(rng, level = 0) {
    const kind = pick(rng, ['day-after', 'day-before', 'days-week', 'month-order', 'days-month'])
    switch (kind) {
      case 'day-after': {
        const i = randInt(rng, 0, 6)
        return {
          prompt: `Which day comes just AFTER ${DAYS[i]}?`,
          type: 'mcq',
          choices: shuffle(rng, [DAYS[(i + 1) % 7], DAYS[(i + 2) % 7], DAYS[(i + 6) % 7], DAYS[(i + 3) % 7]]).map((v) => ({ value: v, label: v })),
          answer: DAYS[(i + 1) % 7],
          explanation: `After ${DAYS[i]} comes ${DAYS[(i + 1) % 7]}.`,
        }
      }
      case 'day-before': {
        const i = randInt(rng, 0, 6)
        return {
          prompt: `Which day comes just BEFORE ${DAYS[i]}?`,
          type: 'mcq',
          choices: shuffle(rng, [DAYS[(i + 6) % 7], DAYS[(i + 5) % 7], DAYS[(i + 1) % 7], DAYS[(i + 2) % 7]]).map((v) => ({ value: v, label: v })),
          answer: DAYS[(i + 6) % 7],
          explanation: `Before ${DAYS[i]} comes ${DAYS[(i + 6) % 7]}.`,
        }
      }
      case 'days-week':
        return {
          prompt: 'How many days are there in one week?',
          type: 'number',
          answer: 7,
          explanation: 'There are 7 days in a week.',
        }
      case 'days-month': {
        const m = pick(rng, MONTHS)
        return {
          prompt: `How many days are in ${m}? (in a normal year)`,
          type: 'number',
          answer: DAYS_IN_MONTH[m],
          hint: 'Remember: 30 days has September, April, June and November...',
          explanation: `${m} has ${DAYS_IN_MONTH[m]} days.`,
        }
      }
      default: {
        const i = randInt(rng, 0, 11)
        return {
          prompt: `Which is the ${i + 1}${['st', 'nd', 'rd'][i] || 'th'} month of the year?`,
          type: 'mcq',
          choices: shuffle(rng, [MONTHS[i], MONTHS[(i + 1) % 12], MONTHS[(i + 11) % 12], MONTHS[(i + 6) % 12]]).map((v) => ({ value: v, label: v })),
          answer: MONTHS[i],
          explanation: `Month number ${i + 1} is ${MONTHS[i]}.`,
        }
      }
    }
  },
}
