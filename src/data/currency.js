// Currency configuration for the Money topic (US Dollars).
// Coins are valued in cents (¢); bills in dollars ($).

export const CURRENCIES = {
  USD: {
    code: 'USD',
    name: 'US Dollars',
    symbol: '$',
    flag: '🇺🇸',
    unified: false, // coins (¢) and bills ($) are different units — don't mix them
    coins: [1, 5, 10, 25], // cents: penny, nickel, dime, quarter
    coinUnit: '¢',
    coinAfter: true, // 25¢  (symbol comes after the number)
    notes: [1, 5, 10, 20], // dollar bills
    noteUnit: '$',
    noteWord: 'bill',
  },
}

let active = 'USD'

export function setActiveCurrency(code) {
  if (CURRENCIES[code]) active = code
}

export function getCurrency() {
  return CURRENCIES[active]
}

// Format an amount that is expressed in a given unit symbol.
export function money(amount, unit = getCurrency().symbol, after = false) {
  return after ? `${amount}${unit}` : `${unit}${amount}`
}
