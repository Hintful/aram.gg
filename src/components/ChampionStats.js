import { Image } from '@chakra-ui/image';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText, CircularProgress, CircularProgressLabel, Tooltip, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import champion_data_json from './json/champion.json';
import { GiDiceSixFacesTwo, GiDiceSixFacesThree, GiDiceSixFacesFour, GiDiceSixFacesFive, GiDiceSixFacesSix } from 'react-icons/gi'
import MultikillTag from './tags/MultikillTag';
import StarTag from './tags/StarTag';


/* stats = {
  "id"
  "champion_id"
  "win"
  "loss"
  "kill"
  "death"
  "assist"

  "total_damage_done"
  "total_damage_taken"
  "total_healing_done"
  "total_game_length"
  "longest_game_length"
  "most_damage_done"
  "most_damage_taken"

  "most_gold_spent"
  "most_gold_earned"
  "total_gold_spent"
  "total_gold_earned"

  "largest_killing_spree"
  "num_double_kill"
  "num_triple_kill"
  "num_quadra_kill"
  "num_penta_kill"
  "num_legendary_kill"

  "num_max_double_kill"
  "num_max_triple_kill"
  "num_max_quadra_kill"
  "num_max_penta_kill"
  "num_max_legendary_kill"
} */

export const getURLName = (name) => {
  if (name === "Wukong") {
    return 'MonkeyKing';
  } else if (name === "LeBlanc") {
    return 'Leblanc';
  } else if (name === "Kog'Maw") {
    return 'KogMaw';
  } else if (name === 'Dr. Mundo') {
    return 'DrMundo';
  } else if (name.includes(' ')) { // name contains whitespace
    return name.replace(' ', ''); // remove whitespace
  } else if (name.includes("'")) { // name contains small quotes
    const quoteIndex = name.indexOf("'");
    return name.substring(0, quoteIndex) + name[quoteIndex + 1].toLowerCase() + name.substring(quoteIndex + 2);
  } else {
    return name;
  }
}

const getKDAStyle = (rating, shadow = false) => {
  if (rating < 1) { return { color: '#ababab' }; }
  else if (rating < 2) { return { color: '#676767' }; }
  else if (rating < 3) { return { color: '#90ee90' }; }
  else if (rating < 4) { return { color: '#87cefa' }; }
  else if (rating < 5) { return { color: '#ffa500', textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

const getDamageStyle = (rating, shadow = false) => {
  if (rating < 1) { return { color: "#ababab" }; }
  else if (rating < 2) { return { color: "#676767" }; }
  else if (rating < 3) { return { color: "#90ee90" }; }
  else if (rating < 4) { return { color: "#87cefa" }; }
  else if (rating < 5) { return { color: "#ffa500", textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

export const getPotentialColor = (potential) => {
  if (potential < 0.3) { return '#ababab'; }
  else if (potential < 0.5) { return '#676767'; }
  else if (potential < 0.65) { return '#90ee90'; }
  else if (potential < 0.75) { return '#87cefa'; }
  else if (potential < 0.9) { return '#ffa500'; }
  else if (potential < 1) { return '#ff4500'; }
  else { return '#d900e4'; }
}

export const getPotentialRank = (potential) => {
  const potentialThreshold = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 100];
  const potentialRank = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+', 'SS', 'SSS'];

  for (let i = 0; i < potentialThreshold.length; i++) {
    if (potential < potentialThreshold[i]) {
      return potentialRank[i];
    }
  }
}

export const roundNumber = (num) => {
  return (Math.round(num * 10) / 10).toFixed(1);
}

const getKDAElement = (kda) => {

  return (
    <span style={getKDAStyle(getKDAStarRating(kda))}>
      {kda}
    </span>
  )
}

const getDamageElement = (value) => {
  return (
    <span style={getDamageStyle(getDamageStarRating(parseInt(value.split(',').join(''))))}>
      {value}
    </span>
  )
}

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getKDAStarRating = (kda) => {
  if (kda < 2) { return kda / 1; }
  else if(kda < 2.8) { return 2 + (kda - 2)/0.8; }
  else if(kda < 3.5) { return 3 + (kda - 2.8)/0.7; }
  else if(kda < 4.5) { return 4 + (kda - 3.5); }
  else { return 5; }
}

export const getDamageStarRating = (value) => {
  if (value < 500) { return value / 500; }
  else if (value < 1000) { return 1 + (value - 500)/500; }
  else if(value < 1400) { return 2 + (value - 1000)/400; }
  else if(value < 1800) { return 3 + (value - 1400)/400; }
  else if(value < 2350) { return 4 + (value - 1850)/550; }
  else { return 5; }
}

export const getCarryPotential = (wins, losses, kdaStarRating, effectiveDamageStarRating, damageTakenStarRating) => {
  const starRatingPotential = (kdaStarRating + Math.max(effectiveDamageStarRating, damageTakenStarRating)) / 10;
  // const winrate = wins / (wins + losses);

  // if (wins + losses > 2) {
  //   return (starRatingPotential + winrate) / 2;
  // } else {
    return starRatingPotential;
  // }
}

const ChampionStats = ({ stats }) => {
  const [championData, setChampionData] = useState([]);
  const [championName, setChampionName] = useState('');
  const [kda, setKDA] = useState(null);
  const [effectiveDamage, setEffectiveDamage] = useState(null); // total damage done + total healing done
  const [damageTaken, setDamageTaken] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(null);

  const [kdaStarRating, setKdaStarRating] = useState(null);
  const [effectiveDamageStarRating, setEffectiveDamageStarRating] = useState(null);
  const [damageTakenStarRating, setDamageTakenStarRating] = useState(null);

  const [carryPotential, setCarryPotential] = useState(null);

  useEffect(() => {
    setChampionData(Object.values(JSON.parse(JSON.stringify(champion_data_json)).data));
  }, []);

  useEffect(() => {
    const championInfo = championData.filter(data => parseInt(data.key) === stats.champion_id)[0];
    if (championInfo !== undefined) {
      setChampionName(championInfo.name);
      setKDA(stats.death > 0 ? roundNumber((stats.kill + stats.assist) / stats.death) : roundNumber(stats.kill + stats.assist));
      setEffectiveDamage(stats.total_damage_done + stats.total_healing_done);
      setDamageTaken(stats.total_damage_taken);
      setTotalMinutes(stats.total_game_length / 60);
    }
  }, [championData, stats]) // run when championData finishes loading

  useEffect(() => {
    setKdaStarRating(getKDAStarRating(kda));
    setEffectiveDamageStarRating(getDamageStarRating(effectiveDamage / totalMinutes));
    setDamageTakenStarRating(getDamageStarRating(damageTaken / totalMinutes));
    setCarryPotential(getCarryPotential(stats.win, stats.loss, kdaStarRating, effectiveDamageStarRating, damageTakenStarRating));
  }, [kda, effectiveDamage, damageTaken, kdaStarRating]);

  return (
    <Flex direction="column">
      <Flex direction="row" className="champion-stats" width="auto">
        <Flex direction="column" justify="center" align="center" className="champion-icon">
          {championName !== '' ?
            <Image mb={1} className="champion-icon-image" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(championName)}.png`} />
            :
            <div style={{ background: 'black' }}>
            </div>
          }
          <Flex className="champion-name-label">
            <Text fontSize="sm">{championName}</Text>
          </Flex>
        </Flex>
        <Flex direction="column" mt={2}>
          <HStack ml={5} mb={2} height={5} spacing="4px" style={{ fontSize: "14px" }}>
            <MultikillTag multikill={2} count={stats.num_double_kill} />
            <MultikillTag multikill={3} count={stats.num_triple_kill} />
            <MultikillTag multikill={4} count={stats.num_quadra_kill} />
            <MultikillTag multikill={5} count={stats.num_penta_kill} />
            <MultikillTag multikill={6} count={stats.num_legendary_kill} />
          </HStack>
          <HStack>
            <HStack ml={7} mr="100px" spacing="40px">
              <Stat width="120px">
                <StatLabel>Wins</StatLabel>
                <StatNumber color="blue.300">{stats.win}</StatNumber>
                <StatHelpText>Games Won</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Losses</StatLabel>
                <StatNumber color="red.300">{stats.loss}</StatNumber>
                <StatHelpText>Games Lost</StatHelpText>
              </Stat>
              <Tooltip hasArrow label={`${roundNumber(stats.kill / (stats.win + stats.loss))} / ${roundNumber(stats.death / (stats.win + stats.loss))} / ${roundNumber(stats.assist / (stats.win + stats.loss))}`}>
                <Stat width="120px">
                  <StatLabel>KDA</StatLabel>
                  <StatNumber>{getKDAElement(kda)}</StatNumber>
                  <StatHelpText>
                    <StarTag style={getKDAStyle(kdaStarRating, true)} value={kdaStarRating} />
                  </StatHelpText>
                </Stat>
              </Tooltip>
            </HStack>
            <HStack>
              <Tooltip hasArrow label={`Damage: ${roundNumber(stats.total_damage_done / totalMinutes)} / Healing: ${roundNumber(stats.total_healing_done / totalMinutes)}`}>
                <Stat width="140px">
                  <StatLabel>Effective Damage/min</StatLabel>
                  <StatNumber>{getDamageElement(formatNumber(Math.round(effectiveDamage / totalMinutes)))}</StatNumber>
                  <StatHelpText>{
                    <StarTag style={getDamageStyle(effectiveDamageStarRating, true)} value={effectiveDamageStarRating} />
                  }</StatHelpText>
                </Stat>
              </Tooltip>
              <Stat width="140px">
                <StatLabel>Damage Taken/min</StatLabel>
                <StatNumber>{getDamageElement(formatNumber(Math.round(damageTaken / totalMinutes)))}</StatNumber>
                <StatHelpText>{
                  <StarTag style={getDamageStyle(damageTakenStarRating, true)} value={damageTakenStarRating} />
                }</StatHelpText>
              </Stat>
            </HStack>
            <Tooltip hasArrow label={`${roundNumber(carryPotential * 100)}%`}>
              <VStack>
                <Text><span style={{ fontSize: "14px", width: "auto" }}>Potential</span></Text>
                {carryPotential ?
                  <CircularProgress size="60px" thickness="5px" key={carryPotential} value={carryPotential * 100} color={getPotentialColor(carryPotential)}>
                    <CircularProgressLabel><span style={{ fontFamily: "Roboto", fontSize: "12px", color: getPotentialColor(carryPotential) }}>{getPotentialRank(carryPotential)}</span></CircularProgressLabel>
                  </CircularProgress>
                  :
                  <CircularProgress isIndeterminate size="60px" thickness="5px" color="blue.500" />
                }
              </VStack>
            </Tooltip>
          </HStack>
        </Flex>
      </Flex>
    </Flex >
  );
}

export default ChampionStats;