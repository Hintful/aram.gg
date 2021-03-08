import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText, CircularProgress, CircularProgressLabel, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import champion_data_json from './json/champion.json';


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
} */

const getURLName = (name) => {
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

const getKDAStyle = (kda, shadow = false) => {
  if (kda < 1.5) { return { color: '#ababab' }; }
  else if (kda < 2.3) { return { color: '#676767' }; }
  else if (kda < 3.1) { return { color: '#90ee90' }; }
  else if (kda < 4) { return { color: '#87cefa' }; }
  else if (kda < 5) { return { color: '#ffa500', textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

const getDamageStyle = (value, shadow = false) => {
  if (value < 700) { return { color: "#ababab" }; }
  else if (value < 1200) { return { color: "#676767" }; }
  else if (value < 1650) { return { color: "#90ee90" }; }
  else if (value < 2100) { return { color: "#87cefa" }; }
  else if (value < 2700) { return { color: "#ffa500", textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

const getPotentialColor = (potential) => {
  if (potential < 0.3) { return '#ababab'; }
  else if (potential < 0.5) { return '#676767'; }
  else if (potential < 0.65) { return '#90ee90'; }
  else if (potential < 0.75) { return '#87cefa'; }
  else if (potential < 0.9) { return '#ffa500'; }
  else { return '#ff4500'; }
}

const getPotentialRank = (potential) => {
  const potentialThreshold = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
  const potentialRank = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+', 'SS'];

  for (let i = 0; i < potentialThreshold.length; i++) {
    if (potential <= potentialThreshold[i]) {
      return potentialRank[i];
    }
  }
}

export const roundNumber = (num) => {
  return (Math.round(num * 10) / 10).toFixed(1);
}

const getKDAElement = (stats) => {
  const kda = stats.death > 0 ? roundNumber((stats.kill + stats.assist) / stats.death) : roundNumber(stats.kill + stats.assist);

  return (
    <span style={getKDAStyle(kda)}>
      {kda}
    </span>
  )
}

const getDamageElement = (value) => {
  return (
    <span style={getDamageStyle(parseInt(value.split(',').join('')))}>
      {value}
    </span>
  )
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getKDAStarRating = (kda) => {
  if (kda < 1) { return 0; }
  else if (kda < 1.5) { return 1; }
  else if (kda < 2.3) { return 2; }
  else if (kda < 3.1) { return 3; }
  else if (kda < 4) { return 4; }
  else { return 5; }
}

const kdaStarRating = (kda) => {
  const star = getKDAStarRating(kda);

  return (
    Array(5).fill("").map((_, i) => (
      <span style={i < star ? getKDAStyle(kda, true) : { color: "gray.500" }} key={i}><i className="fas fa-star"></i></span>
    ))
  )
}

const getDamageStarRating = (value) => {
  if (value < 500) { return 0; }
  else if (value < 750) { return 1; }
  else if (value < 1200) { return 2; }
  else if (value < 1650) { return 3; }
  else if (value < 2100) { return 4; }
  else { return 5; }
}

const damageStarRating = (value) => {
  const star = getDamageStarRating(value);

  return (
    Array(5).fill("").map((_, i) => (
      <span style={i < star ? getDamageStyle(value, true) : { color: "gray.500" }} key={i}><i className="fas fa-star"></i></span>
    ))
  )
}

const getCarryPotential = (wins, losses, kda, effectiveDamage, damageTaken) => {
  const starRatingPotential = ((getKDAStarRating(kda)) + Math.max(getDamageStarRating(effectiveDamage), getDamageStarRating(damageTaken))) / 10;
  const winrate = wins / (wins + losses);

  if (wins + losses > 2) {
    return (starRatingPotential + winrate) / 2;
  } else {
    return starRatingPotential;
  }
}

const ChampionStats = ({ stats }) => {
  const [championData, setChampionData] = useState([]);
  const [championName, setChampionName] = useState('');
  const [kda, setKDA] = useState(null);
  const [effectiveDamage, setEffectiveDamage] = useState(null); // total damage done + total healing done
  const [damageTaken, setDamageTaken] = useState(null);
  const [carryPotential, setCarryPotential] = useState(null);


  const getTotalMinutes = () => {
    return stats.total_game_length / 60;
  }

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
    }
  }, [championData]) // run when championData finishes loading

  useEffect(() => {
    setCarryPotential(getCarryPotential(stats.win, stats.loss, kda, effectiveDamage / getTotalMinutes(), damageTaken / getTotalMinutes()));
  }, [kda])

  return (
    <div>
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
            <Tooltip hasArrow label={`K/D/A: ${roundNumber(stats.kill/(stats.win + stats.loss))}/${roundNumber(stats.death/(stats.win + stats.loss))}/${roundNumber(stats.assist/(stats.win + stats.loss))}`}>
              <Stat width="120px">
                <StatLabel>KDA</StatLabel>
                <StatNumber>{getKDAElement(stats)}</StatNumber>
                <StatHelpText>
                  {kdaStarRating(kda)}
                </StatHelpText>
              </Stat>
            </Tooltip>
          </HStack>
          <HStack>
            <Tooltip hasArrow label={`Damage: ${roundNumber(stats.total_damage_done / getTotalMinutes())} / Healing: ${roundNumber(stats.total_healing_done / getTotalMinutes())}`}>
              <Stat width="140px">
                <StatLabel>Effective Damage/min</StatLabel>
                <StatNumber>{getDamageElement(formatNumber(Math.round(effectiveDamage / getTotalMinutes())))}</StatNumber>
                <StatHelpText>{damageStarRating(effectiveDamage / getTotalMinutes())}</StatHelpText>
              </Stat>
            </Tooltip>
            <Stat width="140px">
              <StatLabel>Damage Taken/min</StatLabel>
              <StatNumber>{getDamageElement(formatNumber(Math.round(damageTaken / getTotalMinutes())))}</StatNumber>
              <StatHelpText>{damageStarRating(damageTaken / getTotalMinutes())}</StatHelpText>
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
    </div>
  );
}

export default ChampionStats;