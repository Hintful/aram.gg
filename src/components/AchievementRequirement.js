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
    rarity: 1,
    requirements: {
      numWins: 50
    },
    description: 'Win 50 games of ARAM'
  }, {
    name: "ARAM Enthusiast",
    rarity: 2,
    requirements: {
      numWins: 100
    },
    description: 'Win 100 games of ARAM'
  }, {
    name: "ARAM Expert",
    rarity: 2,
    requirements: {
      numWins: 250
    },
    description: 'Win 250 games of ARAM'
  }, {
    name: "ARAM Veteran",
    rarity: 3,
    requirements: {
      numWins: 500
    },
    description: 'Win 500 games of ARAM'
  }, {
    name: "ARAM Star",
    rarity: 4,
    requirements: {
      numWins: 1000
    },
    description: 'Win 1,000 games of ARAM'
  }, {
    name: "ARAM God",
    rarity: 5,
    requirements: {
      numWins: 5000
    },
    description: 'Win 5,000 games of ARAM'
  },
  
  // num kills
  {
    name: "Hundred Down",
    rarity: 0,
    requirements: {
      numKills: 100
    },
    description: 'Achieve 100 total kills'
  }, {
    name: "500 Kills?",
    rarity: 1,
    requirements: {
      numKills: 500
    },
    description: 'Achieve 500 total kills'
  }, {
    name: "4-digit Kills Club",
    rarity: 2,
    requirements: {
      numKills: 1000
    },
    description: 'Achieve 1,000 total kills'
  }, {
    name: "I Hate COVID",
    rarity: 3,
    requirements: {
      numKills: 2020
    },
    description: 'Achieve 2,020 total kills'
  }, {
    name: "Bulldozer",
    rarity: 3,
    requirements: {
      numKills: 5000
    },
    description: 'Achieve 5,000 total kills'
  }, {
    name: "Stop The Massacre",
    rarity: 4,
    requirements: {
      numKills: 10000
    },
    description: 'Achieve 10,000 total kills'
  }, {
    name: "Sinner",
    rarity: 5,
    requirements: {
      numKills: 50000
    },
    description: 'Achieve 50,000 total kills'
  },

  // num deaths
  {
    name: "Not a Big Deal",
    rarity: 0,
    requirements: {
      numDeaths: 100
    },
    description: 'Achieve 100 total deaths'
  }, {
    name: "Ouch",
    rarity: 1,
    requirements: {
      numDeaths: 500
    },
    description: 'Achieve 500 total deaths'
  }, {
    name: "4-digit Death Club",
    rarity: 2,
    requirements: {
      numDeaths: 1000
    },
    description: 'Achieve 1,000 total kills'
  }, {
    name: "Kinda Hurts",
    rarity: 3,
    requirements: {
      numDeaths: 2000
    },
    description: 'Achieve 2,000 total deaths'
  }, {
    name: "Taste My Blood",
    rarity: 3,
    requirements: {
      numDeaths: 5000
    },
    description: 'Achieve 5,000 total deaths'
  }, {
    name: "Undying",
    rarity: 4,
    requirements: {
      numDeaths: 10000
    },
    description: 'Achieve 10,000 total deaths'
  }, {
    name: "Ultimate Sacrifice",
    rarity: 5,
    requirements: {
      numDeaths: 50000
    },
    description: 'Achieve 50,000 total deaths'
  },

  // num assists
  {
    name: "Novice Helper",
    rarity: 0,
    requirements: {
      numAssists: 200
    },
    description: 'Achieve 200 total assists'
  }, {
    name: "4-digit Assist Club",
    rarity: 1,
    requirements: {
      numAssists: 1000
    },
    description: 'Achieve 1,000 total assists'
  }, {
    name: "Helper",
    rarity: 2,
    requirements: {
      numAssists: 2000
    },
    description: 'Achieve 2,000 total assists'
  }, {
    name: "Need some help?",
    rarity: 3,
    requirements: {
      numAssists: 5000
    },
    description: 'Achieve 5,000 total assists'
  }, {
    name: "5-digit Assist Club",
    rarity: 3,
    requirements: {
      numAssists: 10000
    },
    description: 'Achieve 10,000 total assists'
  }, {
    name: "Angel",
    rarity: 4,
    requirements: {
      numAssists: 25000
    },
    description: 'Achieve 25,000 total assists'
  }, {
    name: "Archangel",
    rarity: 5,
    requirements: {
      numAssists: 100000
    },
    description: 'Achieve 100,000 total assists'
  },
  // total damage done/damage taken/healing done
  {
    name: "A Million Damage",
    rarity: 2,
    requirements: {
      totalDamageDone: 1000000
    },
    description: 'Deal 1,000,000 damage'
  }, {
    name: "5 Million Damage",
    rarity: 3,
    requirements: {
      totalDamageDone: 5000000
    },
    description: 'Deal 5,000,000 damage'
  }, {
    name: "10 Million Damage",
    rarity: 4,
    requirements: {
      totalDamageDone: 10000000
    },
    description: 'Deal 10,000,000 damage'
  }, {
    name: "0.1 Billion Damage!",
    rarity: 5,
    requirements: {
      totalDamageDone: 100000000
    },
    description: 'Deal 100,000,000 damage'
  }, {
    name: "Tanked A Million",
    rarity: 2,
    requirements: {
      totalDamageTaken: 1000000
    },
    description: 'Take 1,000,000 damage'
  }, {
    name: "Tanked 5 Million",
    rarity: 3,
    requirements: {
      totalDamageTaken: 5000000
    },
    description: 'Take 5,000,000 damage'
  }, {
    name: "Tanked 10 Million",
    rarity: 4,
    requirements: {
      totalDamageTaken: 10000000
    },
    description: 'Take 10,000,000 damage'
  }, {
    name: "Tanked 0.1 Billion!",
    rarity: 5,
    requirements: {
      totalDamageTaken: 100000000
    },
    description: 'Take 100,000,000 damage'
  }, {
    name: "Healing for Days",
    rarity: 2,
    requirements: {
      totalHealingDone: 1000000
    },
    description: 'Heal 1,000,000 points'
  }, {
    name: "Healing for Weeks",
    rarity: 3,
    requirements: {
      totalHealingDone: 5000000
    },
    description: 'Heal 5,000,000 points'
  }, {
    name: "Healing for Months",
    rarity: 4,
    requirements: {
      totalHealingDone: 10000000
    },
    description: 'Heal 10,000,000 points'
  }, {
    name: "Healing for Years",
    rarity: 5,
    requirements: {
      totalHealingDone: 100000000
    },
    description: 'Heal 100,000,000 points'
  },

  // total gold earned
  {
    name: "1/10 Millionaire",
    rarity: 1,
    requirements: {
      totalGoldEarned: 100000
    },
    description: 'Earn 100,000 gold'
  }, {
    name: "Millionaire",
    rarity: 2,
    requirements: {
      totalGoldEarned: 1000000
    },
    description: 'Earn 1,000,000 gold'
  }, {
    name: "Almost 8-digit Club",
    rarity: 3,
    requirements: {
      totalGoldEarned: 5000000
    },
    description: 'Earn 5,000,000 gold'
  }, {
    name: "8-digit Club",
    rarity: 4,
    requirements: {
      totalGoldEarned: 10000000
    },
    description: 'Earn 10,000,000 gold'
  }, {
    name: "9-digit Net Worth",
    rarity: 5,
    requirements: {
      totalGoldEarned: 100000000
    },
    description: 'Earn 100,000,000 gold'
  },

  // num multikills
  {
    name: "Double-kill Achiever",
    rarity: 0,
    requirements: {
      numDoubleKill: 1 
    },
    description: 'Perform 1 Double Kill'
  }, {
    name: "Double-kill Apprentice",
    rarity: 1,
    requirements: {
      numDoubleKill: 10
    },
    description: 'Perform 10 Double Kills'
  }, {
    name: "Double-kill Expert",
    rarity: 2,
    requirements: {
      numDoubleKill: 50
    },
    description: 'Perform 100 Double Kills'
  }, {
    name: "I Breathe Double-kill",
    rarity: 3,
    requirements: {
      numDoubleKill: 500
    },
    description: 'Perform 500 Double Kills'
  }, {
    name: "Triple-kill Achiever",
    rarity: 1,
    requirements: {
      numTripleKill: 1
    },
    description: 'Perform 1 Triple Kill'
  }, {
    name: "Triple-kill Apprentice",
    rarity: 2,
    requirements: {
      numTripleKill: 10
    },
    description: 'Perform 10 Triple Kills'
  }, {
    name: "Triple-kill Expert",
    rarity: 3,
    requirements: {
      numTripleKill: 100
    },
    description: 'Perform 100 Triple Kills'
  }, {
    name: "Triple 5s",
    rarity: 4,
    requirements: {
      numTripleKill: 555
    },
    description: 'Perform 555 Triple Kills'
  }, {
    name: "Quadra-kill Achiever",
    rarity: 2,
    requirements: {
      numQuadraKill: 1
    },
    description: 'Perform 1 Quadra Kill'
  }, {
    name: "Quadra-kill Apprentice",
    rarity: 3,
    requirements: {
      numQuadraKill: 5
    },
    description: 'Perform 5 Quadra Kills'
  }, {
    name: "Quadra-kill Expert",
    rarity: 4,
    requirements: {
      numQuadraKill: 25
    },
    description: 'Perform 25 Quadra Kills'
  }, {
    name: "Lots of Quadra-kills",
    rarity: 5,
    requirements: {
      numQuadraKill: 250
    },
    description: 'Perform 250 Quadra Kills'
  }, {
    name: "Penta-kill Achiever",
    rarity: 3,
    requirements: {
      numPentaKill: 1
    },
    description: 'Perform 1 Penta Kill'
  }, {
    name: "Penta-kill Expert",
    rarity: 4,
    requirements: {
      numPentaKill: 5
    },
    description: 'Perform 5 Penta Kills'
  }, {
    name: "Penta-kill God",
    rarity: 5,
    requirements: {
      numPentaKill: 25
    },
    description: 'Perform 10 Penta Kills'
  }, {
    name: "This is actually possible?",
    rarity: 5,
    requirements: {
      numLegendaryKill: 1
    },
    description: 'Perform 1 Legendary Kill'
  },

  // num max kill/assist
  {
    name: "10 Kills in One Game",
    rarity: 0,
    requirements: {
      numMaxKill: 10
    },
    description: 'Achieve 10 kills in one game'
  }, {
    name: "15 Kills in One Game",
    rarity: 1,
    requirements: {
      numMaxKill: 15
    },
    description: 'Achieve 15 kills in one game'
  }, {
    name: "25 Kills in One Game",
    rarity: 2,
    requirements: {
      numMaxKill: 25
    },
    description: 'Achieve 25 kills in one game'
  }, {
    name: "30 Kills in One Game",
    rarity: 3,
    requirements: {
      numMaxKill: 30
    },
    description: 'Achieve 30 kills in one game'
  }, {
    name: "40 Kills in One Game",
    rarity: 4,
    requirements: {
      numMaxKill: 40
    },
    description: 'Achieve 40 kills in one game'
  }, {
    name: "50 Kills in One Game",
    rarity: 5,
    requirements: {
      numMaxKill: 50
    },
    description: 'Achieve 50 kills in one game'
  }, {
    name: "15 Assists in One Game",
    rarity: 0,
    requirements: {
      numMaxAssist: 15
    },
    description: 'Achieve 15 assists in one game'
  }, {
    name: "25 Assists in One Game",
    rarity: 1,
    requirements: {
      numMaxAssist: 25
    },
    description: 'Achieve 25 assists in one game'
  }, {
    name: "35 Assists in One Game",
    rarity: 2,
    requirements: {
      numMaxAssist: 35
    },
    description: 'Achieve 35 assists in one game'
  }, {
    name: "50 Assists in One Game",
    rarity: 3,
    requirements: {
      numMaxAssist: 50
    },
    description: 'Achieve 50 assists in one game'
  }, {
    name: "65 Assists in One Game",
    rarity: 4,
    requirements: {
      numMaxAssist: 65
    },
    description: 'Achieve 65 assists in one game'
  }, {
    name: "80 Assists in One Game",
    rarity: 5,
    requirements: {
      numMaxAssists: 80
    },
    description: 'Achieve 80 assists in one game'
  },

  // most gold earned in one game
  {
    name: "Iron Miner",
    rarity: 0,
    requirements: {
      mostGoldEarned: 10000
    },
    description: 'Earn 10,000 gold in one game'
  }, {
    name: "Bronze Miner",
    rarity: 1,
    requirements: {
      mostGoldEarned: 15000
    },
    description: 'Earn 15,000 gold in one game'
  }, {
    name: "Silver Miner",
    rarity: 2,
    requirements: {
      mostGoldEarned: 20000
    },
    description: 'Earn 20,000 gold in one game'
  }, {
    name: "Gold Miner",
    rarity: 3,
    requirements: {
      mostGoldEarned: 24000
    },
    description: 'Earn 24,000 gold in one game'
  }, {
    name: "Platinum Miner",
    rarity: 4,
    requirements: {
      mostGoldEarned: 27000
    },
    description: 'Earn 27,000 gold in one game'
  }, {
    name: "Diamond Miner",
    rarity: 5,
    requirements: {
      mostGoldEarned: 30000
    },
    description: 'Earn 30,000 gold in one game'
  },

  // most damage done
  {
    name: "Iron Fists",
    rarity: 0,
    requirements: {
      mostDamageDone: 10000
    },
    description: 'Inflict 10,000 damage to enemy champions in one game'
  }, {
    name: "Bronze Fists",
    rarity: 1,
    requirements: {
      mostDamageDone: 25000
    },
    description: 'Inflict 25,000 damage to enemy champions in one game'
  }, {
    name: "Silver Fists",
    rarity: 2,
    requirements: {
      mostDamageDone: 50000
    },
    description: 'Inflict 50,000 damage to enemy champions in one game'
  }, {
    name: "Gold Fists",
    rarity: 3,
    requirements: {
      mostDamageDone: 75000
    },
    description: 'Inflict 75,000 damage to enemy champions in one game'
  }, {
    name: "Platinum Fists",
    rarity: 4,
    requirements: {
      mostDamageDone: 100000
    },
    description: 'Inflict 100,000 damage to enemy champions in one game'
  }, {
    name: "Diamond Fists",
    rarity: 5,
    requirements: {
      mostDamageDone: 150000
    },
    description: 'Inflict 150,000 damage to enemy champions in one game'
  }, 
  // most damage taken
  {
    name: "Iron Armor",
    rarity: 0,
    requirements: {
      mostDamageTaken: 10000
    },
    description: 'Take 10,000 damage from enemy champions in one game'
  }, {
    name: "Bronze Armor",
    rarity: 1,
    requirements: {
      mostDamageTaken: 25000
    },
    description: 'Take 25,000 damage from enemy champions in one game'
  }, {
    name: "Silver Armor",
    rarity: 2,
    requirements: {
      mostDamageTaken: 45000
    },
    description: 'Take 45,000 damage from enemy champions in one game'
  }, {
    name: "Gold Armor",
    rarity: 3,
    requirements: {
      mostDamageTaken: 65000
    },
    description: 'Take 65,000 damage from enemy champions in one game'
  }, {
    name: "Platinum Armor",
    rarity: 4,
    requirements: {
      mostDamageTaken: 90000
    },
    description: 'Take 90,000 damage from enemy champions in one game'
  }, {
    name: "Diamond Armor",
    rarity: 5,
    requirements: {
      mostDamageTaken: 120000
    },
    description: 'Take 120,000 damage from enemy champions in one game'
  },

  // most healing done
  {
    name: "Rookie Healer",
    rarity: 0,
    requirements: {
      mostHealingDone: 5000
    },
    description: 'Heal/Self-heal 5,000 points in one game'
  }, {
    name: "Novice Healer",
    rarity: 1,
    requirements: {
      mostHealingDone: 10000
    },
    description: 'Heal/Self-heal 10,000 points in one game'
  }, {
    name: "Experienced Healer",
    rarity: 2,
    requirements: {
      mostHealingDone: 20000
    },
    description: 'Heal/Self-heal 20,000 points in one game'
  }, {
    name: "Skilled Healer",
    rarity: 3,
    requirements: {
      mostHealingDone: 35000
    },
    description: 'Heal/Self-heal 35,000 points in one game'
  }, {
    name: "Master Healer",
    rarity: 4,
    requirements: {
      mostHealingDone: 50000
    },
    description: 'Heal/Self-heal 50,000 points in one game'
  }, {
    name: "Godly Healer",
    rarity: 5,
    requirements: {
      mostHealingDone: 70000
    },
    description: 'Heal/Self-heal 70,000 points in one game'
  },
  
  // num max multi-kills
  {
    name: "Double Double",
    rarity: 0,
    requirements: {
      numMaxDoubleKill: 2
    },
    description: 'Perform 2 Double Kills in one game'
  }, {
    name: "Three Doubles",
    rarity: 1,
    requirements: {
      numMaxDoubleKill: 3
    },
    description: 'Perform 3 Double Kills in one game'
  }, {
    name: "Five Doubles",
    rarity: 2,
    requirements: {
      numMaxDoubleKill: 5
    },
    description: 'Perform 5 Double Kills in one game'
  }, {
    name: "Lucky Doubles",
    rarity: 3,
    requirements: {
      numMaxDoubleKill: 7
    },
    description: 'Perform 7 Double Kills in one game'
  }, {
    name: "2-digit Doubles",
    rarity: 4,
    requirements: {
      numMaxDoubleKill: 10
    },
    description: 'Perform 10 Double Kills in one game'
  }, {
    name: "Yet another Double Kill",
    rarity: 5,
    requirements: {
      numMaxDoubleKill: 15
    },
    description: 'Perform 15 Double Kills in one game'
  }, {
    name: "Double Triple",
    rarity: 2,
    requirements: {
      numMaxTripleKill: 2
    },
    description: 'Perform 2 Triple Kills in one game'
  }, {
    name: "Quad Triple",
    rarity: 3,
    requirements: {
      numMaxTripleKill: 4
    },
    description: 'Perform 4 Triple Kills in one game'
  }, {
    name: "Lucky Triples",
    rarity: 4,
    requirements: {
      numMaxTripleKill: 7
    },
    description: 'Perform 7 Triple Kills in one game'
  }, {
    name: "Two-digit Triples",
    rarity: 5,
    requirements: {
      numMaxTripleKill: 10
    },
    description: 'Perform 10 Triple Kills in one game'
  }, {
    name: "Back-to-back Quadra-killer",
    rarity: 3,
    requirements: {
      numMaxQuadraKill: 2
    },
    description: 'Perform 2 Quadra Kills in one game'
  }, {
    name: "Quadra Quadra",
    rarity: 4,
    requirements: {
      numMaxQuadraKill: 4
    },
    description: 'Perform 4 Quadra Kills in one game'
  }, {
    name: "Quadra-kill Maniac",
    rarity: 5,
    requirements: {
      numMaxQuadraKill: 6
    },
    description: 'Perform 6 Quadra Kills in one game'
  }, {
    name: "Back-to-back Penta-killer",
    rarity: 4,
    requirements: {
      numMaxPentaKill: 2
    },
    description: 'Perform 2 Penta Kills in one game'
  }, {
    name: "Back-to-back-to-back Penta-killer",
    rarity: 5,
    requirements: {
      numMaxPentaKill: 3
    },
    description: 'Perform 3 Penta Kills in one game'
  },

  // largest killing spree
  {
    name: "3-in-a-row",
    rarity: 0,
    requirements: {
      largestKillingSpree: 3
    },
    description: 'Eliminate 3 enemies in a row without dying'
  }, {
    name: "5-in-a-row",
    rarity: 1,
    requirements: {
      largestKillingSpree: 5
    },
    description: 'Eliminate 5 enemies in a row without dying'
  }, {
    name: "7-in-a-row",
    rarity: 2,
    requirements: {
      largestKillingSpree: 7
    },
    description: 'Eliminate 7 enemies in a row without dying'
  }, {
    name: "10-in-a-row",
    rarity: 3,
    requirements: {
      largestKillingSpree: 10
    },
    description: 'Eliminate 10 enemies in a row without dying'
  }, {
    name: "Unkillable",
    rarity: 4,
    requirements: {
      largestKillingSpree: 15
    },
    description: 'Eliminate 15 enemies in a row without dying'
  }, {
    name: "Indestructible",
    rarity: 5,
    requirements: {
      largestKillingSpree: 20
    },
    description: 'Eliminate 20 enemies in a row without dying'
  }
]