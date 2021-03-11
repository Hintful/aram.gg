// Rarity
// 0: Gray
// 1: Green
// 2: Blue
// 3: Orange
// 4: Red
// 5: Purple

export const achievements = [
  // numWins
  { name: "ARAM Newbie",
    rarity: 0,
    requirements: {
      numWins: 1
    },
    description: 'Win a game of ARAM'
  }, {
    name: "ARAM Novice",
    rarity: 0,
    requirements: {
      numWins: 5
    },
    description: 'Win 5 games of ARAM'
  }, {
    name: "ARAM Beginner",
    rarity: 1,
    requirements: {
      numWins: 20
    },
    description: 'Win 20 games of ARAM'
  }, {
    name: "ARAM Apprentice",
    rarity: 2,
    requirements: {
      numWins: 50
    },
    description: 'Win 50 games of ARAM'
  }, {
    name: "ARAM Enthusiast",
    rarity: 3,
    requirements: {
      numWins: 100
    },
    description: 'Win 100 games of ARAM'
  }, {
    name: "ARAM Expert",
    rarity: 3,
    requirements: {
      numWins: 250
    },
    description: 'Win 250 games of ARAM'
  }, {
    name: "ARAM Veteran",
    rarity: 4,
    requirements: {
      numWins: 500
    },
    description: 'Win 500 games of ARAM'
  }, {
    name: "ARAM Star",
    rarity: 5,
    requirements: {
      numWins: 1000
    },
    description: 'Win 1000 games of ARAM'
  }, 
  
  // num kills
  {
    name: "Hundred Down",
    rarity: 1,
    requirements: {
      numKills: 100
    },
    description: 'Achieve 100 total kills'
  }, {
    name: "500 Kills?",
    rarity: 2,
    requirements: {
      numKills: 500
    },
    description: 'Achieve 500 total kills'
  }, {
    name: "4-digit Killer Club",
    rarity: 3,
    requirements: {
      numKills: 1000
    },
    description: 'Achieve 1000 total kills'
  }, {
    name: "I Hate COVID",
    rarity: 3,
    requirements: {
      numKills: 2020
    },
    description: 'Achieve 2020 total kills'
  }, {
    name: "Sinner",
    rarity: 4,
    requirements: {
      numKills: 5000
    },
    description: 'Achieve 5000 total kills'
  }, {
    name: "Stop The Massacre",
    rarity: 5,
    requirements: {
      numKills: 10000
    },
    description: 'Achieve 10000 total kills'
  },
  {
    name: "Penta-kill Achiever",
    rarity: 3,
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