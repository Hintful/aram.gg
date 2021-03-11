import React from 'react';

export const winsDesc = (a, b) => {
  if (a.win > b.win) { return -1; }
  else if(a.win < b.win) { return 1; }
  else { return 0; }
}

export const winsAsc = (a, b) => {
  if (a.win < b.win) { return -1; }
  else if(a.win > b.win) { return 1; }
  else { return 0; }
}

export const gamesDesc = (a, b) => {
  if (a.win + a.loss > b.win + b.loss) { return -1; }
  else if(a.win + a.loss < b.win + b.loss) { return 1; }
  else { return 0; }
}
export const gamesAsc = (a, b) => {
  if (a.win + a.loss < b.win + b.loss) { return -1; }
  else if(a.win + a.loss > b.win + b.loss) { return 1; }
  else { return 0; }
}

export const kdaDesc = (a, b) => {
  if ((a.kill + a.assist) / a.death > (b.kill + b.assist) / b.death) { return -1; }
  else if ((a.kill + a.assist) / a.death < (b.kill + b.assist) / b.death) { return 1; }
  else { return 0; }
}

export const kdaAsc = (a, b) => {
  if ((a.kill + a.assist) / a.death < (b.kill + b.assist) / b.death) { return -1; }
  else if ((a.kill + a.assist) / a.death > (b.kill + b.assist) / b.death) { return 1; }
  else { return 0; }
}

export const effectiveDamageDesc = (a, b) => {
  if ((a.total_damage_done + a.total_healing_done) / a.total_game_length > (b.total_damage_done + b.total_healing_done) / b.total_game_length) { return -1; }
  else if ((a.total_damage_done + a.total_healing_done) / a.total_game_length < (b.total_damage_done + b.total_healing_done) / b.total_game_length) { return 1; }
  else { return 0; }
}

export const effectiveDamageAsc = (a, b) => {
  if ((a.total_damage_done + a.total_healing_done) / a.total_game_length < (b.total_damage_done + b.total_healing_done) / b.total_game_length) { return -1; }
  else if ((a.total_damage_done + a.total_healing_done) / a.total_game_length > (b.total_damage_done + b.total_healing_done) / b.total_game_length) { return 1; }
  else { return 0; }
}

export const damageTakenDesc = (a, b) => {
  if (a.total_damage_taken / a.total_game_length > b.total_damage_taken / b.total_game_length) { return -1; }
  else if (a.total_damage_taken / a.total_game_length < b.total_damage_taken / b.total_game_length) { return 1; }
  else { return 0; }
}

export const damageTakenAsc = (a, b) => {
  if (a.total_damage_taken / a.total_game_length < b.total_damage_taken / b.total_game_length) { return -1; }
  else if (a.total_damage_taken / a.total_game_length > b.total_damage_taken / b.total_game_length) { return 1; }
  else { return 0; }
}

export const achievementRarityDesc = (a, b) => {
  if (a.rarity > b.rarity) { return -1; }
  else if(a.rarity < b.rarity) { return 1; }
  else { return 0; }
}

export const achievementRarityAsc = (a, b) => {
  if (a.rarity < b.rarity) { return -1; }
  else if(a.rarity > b.rarity) { return 1; }
  else { return 0; }
}