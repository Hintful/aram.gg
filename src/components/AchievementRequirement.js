// Rarity
// 0: Gray
// 1: Green
// 2: Blue
// 3: Orange
// 4: Red
// 5: Purple

export const achievements = [
  {
    name: "Penta-kill Achiever",
    rarity: 2,
    requirements: {
      numPentaKill: 1
    },
    description: 'Perform 1 Pentakill'
  }, {
    name: "Penta-kill Expert",
    rarity: 4,
    requirements: {
      numPentaKill: 5
    },
    description: 'Perform 5 Pentakills'
  }, {
    name: "Penta-kill God",
    rarity: 5,
    requirements: {
      numPentaKill: 10
    },
    description: 'Perform 10 Pentakills'
  }, {
    name: "Double Penta-killer",
    rarity: 4,
    requirements: {
      numMaxPentaKill: 2
    },
    description: 'Perform 2 Pentakills in one game'
  }, {
    name: "Triple Penta-killer",
    rarity: 5,
    requirements: {
      numMaxPentaKill: 3
    },
    description: 'Perform 3 Pentakills in one game'
  }
]