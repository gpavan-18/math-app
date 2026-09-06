// Lesson content per topic — friendly concept cards with visuals.
// Each card: { title, emoji, text, visual?, tip? }

export const LESSONS = {
  numbers: [
    {
      title: 'Counting',
      emoji: '🍎',
      text: 'Counting tells us HOW MANY. Point at each object and say one number for each: 1, 2, 3... The last number you say is the total!',
      visual: { type: 'countingObjects', props: { count: 6, emoji: '🍎', size: 34 } },
      tip: 'Touch each object once so you never miss or double-count.',
    },
    {
      title: 'Place Value',
      emoji: '🏠',
      text: 'Every digit lives in a "house". The ones house is on the right, then tens, then hundreds. In 234 there are 2 hundreds, 3 tens and 4 ones.',
      visual: { type: 'baseTenBlocks', props: { value: 234 } },
      tip: 'A big flat = 100, a rod = 10, a tiny cube = 1.',
    },
    {
      title: 'Compare Numbers',
      emoji: '🐊',
      text: 'The hungry crocodile always opens its mouth to eat the BIGGER number. > means greater than, < means less than, = means equal.',
      visual: { type: 'compare', props: { left: 3, right: 7, emoji: '⭐' } },
      tip: '3 < 7 because 7 is bigger. The mouth points to 7!',
    },
    {
      title: 'Odd & Even',
      emoji: '⚖️',
      text: 'Even numbers can be split into 2 equal groups with none left over (2, 4, 6, 8, 0 at the end). Odd numbers always have 1 left over (1, 3, 5, 7, 9 at the end).',
      visual: { type: 'tenFrame', props: { count: 8, color: '#60a5fa' } },
      tip: 'Look at the last digit to decide odd or even.',
    },
    {
      title: 'Skip Counting',
      emoji: '🦘',
      text: 'Skip counting means jumping by the same number each time. By 2s: 2, 4, 6, 8. By 5s: 5, 10, 15, 20. By 10s: 10, 20, 30!',
      visual: { type: 'numberLine', props: { from: 0, to: 10, marks: [2, 4, 6, 8, 10] } },
      tip: 'Skip counting helps you multiply super fast later!',
    },
  ],

  addition: [
    {
      title: 'What is Addition?',
      emoji: '➕',
      text: 'Addition means putting groups together to find how many altogether. 3 apples and 2 apples make 5 apples: 3 + 2 = 5.',
      visual: { type: 'addGroups', props: { a: 3, b: 2, emojiA: '🍎', emojiB: '🍎', size: 32 } },
      tip: 'The + sign means "put together".',
    },
    {
      title: 'Count On',
      emoji: '🔢',
      text: 'To add, start at the bigger number and count on. For 6 + 3, start at 6 then hop 7, 8, 9. The answer is 9!',
      visual: { type: 'numberLine', props: { from: 0, to: 10, hop: { from: 6, to: 9 } } },
      tip: 'Starting at the bigger number means fewer hops.',
    },
    {
      title: 'Add with Columns',
      emoji: '🧱',
      text: 'For big numbers, line up ones under ones and tens under tens. Add the ones first. If you get 10 or more, carry a ten to the next column.',
      visual: { type: 'baseTenBlocks', props: { value: 25 } },
      tip: '25 + 13: add ones (5+3=8), add tens (2+1=3) → 38.',
    },
  ],

  subtraction: [
    {
      title: 'What is Subtraction?',
      emoji: '➖',
      text: 'Subtraction means taking away to find what is left. 5 balloons, 2 pop, 3 are left: 5 − 2 = 3.',
      visual: { type: 'countingObjects', props: { count: 5, crossedOut: 2, emoji: '🎈', size: 34 } },
      tip: 'The − sign means "take away".',
    },
    {
      title: 'Count Back',
      emoji: '⏪',
      text: 'To subtract, start at the big number and hop backwards. For 9 − 3, start at 9 then hop back 8, 7, 6. The answer is 6!',
      visual: { type: 'numberLine', props: { from: 0, to: 10, hop: { from: 9, to: 6 } } },
      tip: 'Subtraction is the opposite of addition.',
    },
    {
      title: 'Borrowing',
      emoji: '🤝',
      text: 'When the top ones digit is too small, borrow 1 ten from the tens column. It becomes 10 extra ones. Then subtract.',
      tip: '32 − 15: 2 is smaller than 5, so borrow a ten → 12 − 5 = 7.',
    },
  ],

  multiplication: [
    {
      title: 'Equal Groups',
      emoji: '🍬',
      text: 'Multiplication is a fast way to add EQUAL groups. 3 groups of 4 = 4 + 4 + 4 = 12. We write it as 3 × 4 = 12.',
      visual: { type: 'equalGroups', props: { groups: 3, perGroup: 4, emoji: '🍬', size: 22 } },
      tip: '× means "groups of".',
    },
    {
      title: 'Arrays',
      emoji: '🐞',
      text: 'An array is objects in neat rows and columns. Count the rows and the columns. 2 rows of 5 = 2 × 5 = 10.',
      visual: { type: 'arrayDots', props: { rows: 2, cols: 5, emoji: '🐞', size: 24 } },
      tip: 'Rows go across, columns go down.',
    },
    {
      title: 'Times Tables',
      emoji: '🎵',
      text: 'Times tables are multiplication facts you learn by heart. The 2 times table: 2, 4, 6, 8, 10... Learn them like a song!',
      tip: 'Knowing tables makes ALL of math faster.',
    },
  ],

  division: [
    {
      title: 'Sharing Equally',
      emoji: '🍭',
      text: 'Division means sharing into equal groups. Share 12 sweets among 3 friends: each gets 4. We write 12 ÷ 3 = 4.',
      visual: { type: 'equalGroups', props: { groups: 3, perGroup: 4, emoji: '🍭', size: 22 } },
      tip: '÷ means "shared equally into".',
    },
    {
      title: 'Division & Multiplication',
      emoji: '🔁',
      text: 'Division is the opposite of multiplication. If 3 × 4 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3. They are a fact family!',
      visual: { type: 'arrayDots', props: { rows: 3, cols: 4, emoji: '⭐', size: 22 } },
      tip: 'Use times tables to solve division quickly.',
    },
    {
      title: 'Remainders',
      emoji: '🧮',
      text: 'Sometimes things do not share evenly. 7 ÷ 2 = 3 with 1 left over. That leftover is called the REMAINDER.',
      tip: '7 sweets, 2 friends → 3 each and 1 remainder.',
    },
  ],

  fractions: [
    {
      title: 'Equal Parts',
      emoji: '🍕',
      text: 'A fraction shows equal parts of a whole. The bottom number tells how many equal parts in all. The top number tells how many are shaded.',
      visual: { type: 'fractionCircle', props: { numerator: 1, denominator: 4, size: 130 } },
      tip: 'This circle shows 1/4 — one out of four equal parts.',
    },
    {
      title: 'Halves & Quarters',
      emoji: '🌗',
      text: '1/2 (a half) is 1 of 2 equal parts. 1/4 (a quarter) is 1 of 4 equal parts. The more parts, the smaller each piece!',
      visual: { type: 'fractionBar', props: { numerator: 1, denominator: 2, width: 260 } },
      tip: 'Cutting a pizza into more slices makes each slice smaller.',
    },
    {
      title: 'Equivalent Fractions',
      emoji: '🟰',
      text: 'Different fractions can show the SAME amount. 1/2 = 2/4 = 3/6. Multiply the top and bottom by the same number.',
      visual: [
        { type: 'fractionBar', props: { numerator: 1, denominator: 2, width: 200 }, label: '1/2' },
        { type: 'fractionBar', props: { numerator: 2, denominator: 4, width: 200 }, label: '2/4' },
      ],
      tip: 'They cover the same space — they are equal!',
    },
  ],

  money: [
    {
      title: 'Coins & Bills',
      emoji: '🪙',
      text: 'We use dollars ($) and cents (¢) to buy things. Coins: penny = 1¢, nickel = 5¢, dime = 10¢, quarter = 25¢. Bills come in $1, $5, $10, $20 and more.',
      visual: { type: 'moneyRow', props: { items: [{ type: 'coin', value: 25, unit: '¢', after: true }, { type: 'coin', value: 10, unit: '¢', after: true }, { type: 'note', value: 5, unit: '$' }] } },
      tip: '100 cents (¢) make 1 dollar ($1).',
    },
    {
      title: 'Making Amounts',
      emoji: '🧮',
      text: 'You can make the same amount in different ways. 25¢ = one quarter = two dimes and one nickel = five nickels!',
      visual: { type: 'coin', props: { value: 25, size: 60, unit: '¢', after: true } },
      tip: 'Count by 5s, 10s and 25s to make amounts quickly.',
    },
    {
      title: 'Giving Change',
      emoji: '🛒',
      text: 'Change is the money you get back. If a toy costs $15 and you pay with a $20 bill, your change is $20 − $15 = $5.',
      visual: { type: 'note', props: { value: 20, width: 130, unit: '$' } },
      tip: 'Change = money you pay − price of the item.',
    },
  ],

  measurement: [
    {
      title: 'Length',
      emoji: '📏',
      text: 'Length is how long something is. We use inches (in) for small things like a pencil, and feet (ft) or yards for big things like a room.',
      tip: '12 inches = 1 foot, and 3 feet = 1 yard.',
    },
    {
      title: 'Weight',
      emoji: '⚖️',
      text: 'Weight is how heavy something is. Light things (a strawberry) use ounces (oz). Heavy things (a backpack) use pounds (lb).',
      tip: '16 ounces = 1 pound.',
    },
    {
      title: 'Capacity',
      emoji: '🥤',
      text: 'Capacity is how much a container holds. A glass holds a few cups. A big jug holds quarts or gallons.',
      tip: '2 cups = 1 pint, 2 pints = 1 quart, 4 quarts = 1 gallon.',
    },
  ],

  time: [
    {
      title: 'Reading a Clock',
      emoji: '⏰',
      text: 'The short hand shows the HOUR. The long hand shows the MINUTES. When the long hand points to 12, it is o\'clock.',
      visual: { type: 'clock', props: { hours: 3, minutes: 0, size: 160 } },
      tip: 'This clock shows 3 o\'clock.',
    },
    {
      title: 'Half Past',
      emoji: '🕧',
      text: 'When the long hand points to 6, it is HALF PAST the hour (30 minutes). The short hand is halfway between two numbers.',
      visual: { type: 'clock', props: { hours: 3, minutes: 30, size: 160 } },
      tip: 'This clock shows half past 3 (3:30).',
    },
    {
      title: 'Calendar',
      emoji: '📅',
      text: 'A week has 7 days: Sunday to Saturday. A year has 12 months and 365 days. Each month has 28 to 31 days.',
      tip: '30 days has September, April, June and November.',
    },
  ],

  geometry: [
    {
      title: '2D Shapes',
      emoji: '🔷',
      text: 'Flat shapes are 2D. A triangle has 3 sides, a square has 4 equal sides, a pentagon has 5 sides and a hexagon has 6.',
      visual: [
        { type: 'shape2d', props: { shape: 'triangle', color: 'green', size: 80 } },
        { type: 'shape2d', props: { shape: 'square', color: 'blue', size: 80 } },
        { type: 'shape2d', props: { shape: 'hexagon', color: 'orange', size: 80 } },
      ],
      tip: 'Sides are the straight edges; corners are where sides meet.',
    },
    {
      title: '3D Shapes',
      emoji: '📦',
      text: 'Solid shapes are 3D. A cube has 6 square faces. A sphere is round like a ball. A cylinder is like a can, and a cone is like an ice-cream.',
      visual: [
        { type: 'shape3d', props: { shape: 'cube', color: 'purple', size: 80 } },
        { type: 'shape3d', props: { shape: 'sphere', color: 'pink', size: 80 } },
        { type: 'shape3d', props: { shape: 'cone', color: 'orange', size: 80 } },
      ],
      tip: 'Faces are flat sides, edges are lines, vertices are corners.',
    },
    {
      title: 'Symmetry',
      emoji: '🦋',
      text: 'A shape has symmetry if you can fold it so both halves match exactly. The fold line is a line of symmetry. A square has 4!',
      visual: { type: 'shape2d', props: { shape: 'square', color: 'teal', size: 100 } },
      tip: 'A butterfly has 1 line of symmetry down the middle.',
    },
  ],

  data: [
    {
      title: 'Pictographs',
      emoji: '🖼️',
      text: 'A pictograph uses pictures to show data. Count the pictures in each row. Sometimes one picture stands for more than one!',
      visual: { type: 'pictograph', props: { data: [{ label: 'Dogs', value: 4 }, { label: 'Cats', value: 2 }, { label: 'Fish', value: 5 }], emoji: '🐾', per: 1 } },
      tip: 'Check the key: it tells you what each picture is worth.',
    },
    {
      title: 'Bar Graphs',
      emoji: '📊',
      text: 'A bar graph uses bars of different heights. The taller the bar, the bigger the number. Read across to the numbers on the side.',
      visual: { type: 'barGraph', props: { data: [{ label: 'Red', value: 3, color: '#ef4444' }, { label: 'Blue', value: 6, color: '#3b82f6' }, { label: 'Green', value: 4, color: '#22c55e' }] } },
      tip: 'The tallest bar has the most.',
    },
    {
      title: 'Tally Marks',
      emoji: '✏️',
      text: 'Tally marks help us count. Draw one line for each thing. Every 5th mark goes across the group of 4, making a bundle of 5.',
      visual: { type: 'tally', props: { count: 7 } },
      tip: 'This tally shows 7: one bundle of 5 and 2 more.',
    },
  ],

  patterns: [
    {
      title: 'Number Patterns',
      emoji: '➡️',
      text: 'A pattern follows a rule. Find how the numbers change: 2, 4, 6, 8 grows by 2 each time. The next number is 10!',
      visual: { type: 'numberLine', props: { from: 0, to: 10, marks: [2, 4, 6, 8, 10] } },
      tip: 'Ask: what do I do to get from one number to the next?',
    },
    {
      title: 'Odd One Out',
      emoji: '🕵️',
      text: 'Look for what most items have in common, then spot the one that breaks the rule. In 4, 6, 7, 8 — seven is the odd one (it is odd!).',
      tip: 'Check for even/odd, or times tables.',
    },
    {
      title: 'Think Like a Champion',
      emoji: '🏆',
      text: 'Competition math uses clever thinking, not just sums. Read carefully, draw a picture, look for a pattern, and check your answer.',
      tip: 'Slow down and picture the problem in your head.',
    },
  ],
}

export function getLessons(topicId) {
  if (LESSONS[topicId]?.length) return LESSONS[topicId]
  const topicLessons = {
    'number-sense': [
      { title: 'Number Bonds', emoji: '🌈', text: 'A number bond shows parts that join to make a whole. If the whole is 10 and one part is 6, the missing part is 4.', tip: 'Think: what goes with this number to make a friendly ten?' },
      { title: 'Estimate First', emoji: '🎯', text: 'An estimate is a close answer. Round each number to a friendly ten, then solve to check whether your exact answer makes sense.', tip: 'An estimate is not a guess; it is a smart close answer.' },
      { title: 'Fact Families', emoji: '🔁', text: 'The same three numbers can make related multiplication and division facts. For 3, 4 and 12: 3 × 4 = 12 and 12 ÷ 3 = 4.', tip: 'The numbers stay together even when the operation changes.' },
    ],
    'advanced-arithmetic': [
      { title: 'Add Like Fractions', emoji: '🍰', text: 'When fractions have the same denominator, keep the denominator and add the numerators: 2/5 + 1/5 = 3/5.', tip: 'The denominator names the size of the pieces.' },
      { title: 'Factors and Primes', emoji: '🧩', text: 'Factors divide a number evenly. A prime number has exactly two factors: 1 and itself. A composite number has more.', tip: 'Try factor pairs to test a number.' },
      { title: 'Tenths', emoji: '🔟', text: 'A digit one place to the right of the decimal is tenths. The decimal 2.4 means 2 wholes and 4 tenths, or 24/10.', tip: 'Money uses tenths and hundredths too.' },
    ],
    'real-world-math': [
      { title: 'Perimeter and Area', emoji: '📐', text: 'Perimeter is the distance around a shape. Area is the space inside it. For a rectangle, perimeter is 2 × (length + width), and area is length × width.', tip: 'Walk around for perimeter; cover the inside for area.' },
      { title: 'Probability', emoji: '🎲', text: 'Probability tells how likely something is. An event can be impossible, unlikely, likely, or certain.', tip: 'Compare favorable outcomes with all possible outcomes.' },
      { title: 'Coordinates and Temperature', emoji: '🗺️', text: 'Coordinates are written (across, up). Temperatures below zero are negative, and a rise moves right on a number line.', tip: 'Always read the x-coordinate before the y-coordinate.' },
    ],
  }
  if (topicLessons[topicId]) return topicLessons[topicId]
  const fallback = {
    ordinal: ['Ordinal numbers tell position: first, second, third, and so on.'],
    'number-bonds': ['Number bonds show parts that join to make a whole.'],
    'roman-numerals': ['Roman numerals use I, V, X and other symbols to write numbers.'],
    estimation: ['An estimate is a close answer. Round numbers first, then calculate.'],
    'mental-math': ['Use friendly tens, doubles and known facts to calculate in your head.'],
    'balancing-equations': ['An equation is balanced when both sides have the same value.'],
    'fact-families': ['A multiplication and division fact family uses the same three numbers.'],
    'number-line-place': ['A number line shows numbers in order. Place a number by finding its neighbors and the equal spaces between them.'],
    'equation-builder': ['An equation is a math sentence. Arrange the numbers and signs so both sides tell the same truth.'],
    'fraction-addition': ['When denominators match, add the numerators and keep the denominator.'],
    'fraction-mixed-numbers': ['A mixed number has a whole number and a fraction part.'],
    factors: ['Factors divide a number evenly. Find factor pairs by testing small numbers.'],
    multiples: ['Multiples are the skip-counting numbers in a times table.'],
    'prime-composite': ['A prime has exactly two factors. A composite has more than two.'],
    decimals: ['The first digit after the decimal point is the tenths place.'],
    perimeter: ['Perimeter is the distance around a shape. Add every side.'],
    area: ['Area measures the space inside a shape. For a rectangle, multiply length by width.'],
    'time-deeper': ['Elapsed time is how long between a start and end time.'],
    probability: ['Probability describes how likely an event is: impossible, possible or certain.'],
    coordinates: ['Coordinates name a point as (across, up). Always read x before y.'],
    temperature: ['Numbers below zero are negative. A rise moves right on the number line.'],
    'shape-hotspot': ['Shapes can be sorted by their attributes. Count straight sides and corners to identify a shape.'],
  }
  return [{
    title: 'Your new skill',
    emoji: '🌟',
    text: fallback[topicId] || 'Try a question, use a hint, and explain your strategy out loud.',
    tip: 'Read carefully, draw a picture, and check your answer.',
  }]
}
