import { StarIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
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
  if (name === "Kog'Maw") {
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
  // else {
  //   return {
  //     background: "linear-gradient(135deg, #c544e6 0%, #2eb6d8 100%)",
  //     WebkitBackgroundClip: "text",
  //     WebkitTextFillColor: "transparent",
  //     textShadow: shadow ? '0px 0px 4px ' : '0'
  //   };
  // }
}

const getDamageStyle = (value, shadow = false) => {
  if (value < 600) { return { color: "#ababab" }; }
  else if (value < 1000) { return { color: "#676767" }; }
  else if (value < 1500) { return { color: "#90ee90" }; }
  else if (value < 2000) { return { color: "#87cefa" }; }
  else if (value < 2500) { return { color: "#ffa500", textShadow: shadow ? '0px 0px 4px #ffa500' : '0'  }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0'  }; }
  // else {
  //   return {
  //     background: "linear-gradient(135deg, #c544e6 0%, #2eb6d8 100%)",
  //     WebkitBackgroundClip: "text",
  //     WebkitTextFillColor: "transparent"
  //   };
  // }
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
    <span style={ getDamageStyle(parseInt(value.split(',').join(''))) }>
      {value}
    </span>
  )
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const kdaStarRating = (stats) => {
  const kda = stats.death > 0 ? roundNumber((stats.kill + stats.assist) / stats.death) : roundNumber(stats.kill + stats.assist);
  let star = 0;
  if (kda < 1.5) { star = 1; }
  else if (kda < 2.3) { star = 2; }
  else if (kda < 3.1) { star = 3; }
  else if (kda < 4) { star = 4; }
  else { star = 5; }

  return (
    Array(5).fill("").map((_, i) => (
      // <StarIcon w={3} h={3} mt="7px" key={i} bgGradient="linear(to-t, green.200, pink.500)" bgClip="text" />
      <span style={i < star ? getKDAStyle(kda, true) : { color: "gray.500" }}><i className="fas fa-star"></i></span>
    ))
  )
}

const damageStarRating = (value) => {
  let star = 0;
  if (value < 600) { star = 1; }
  else if (value < 1000) { star = 2; }
  else if (value < 1500) { star = 3; }
  else if (value < 2000) { star = 4; }
  else { star = 5; }

  return (
    Array(5).fill("").map((_, i) => (
      // <StarIcon w={3} h={3} mt="7px" key={i} bgGradient="linear(to-t, green.200, pink.500)" bgClip="text" />
      <span style={i < star ? getDamageStyle(value, true) : { color: "gray.500" }}><i className="fas fa-star"></i></span>
    ))
  )
}

const ChampionStats = ({ stats }) => {
  const [championData, setChampionData] = useState([]);
  const [championName, setChampionName] = useState('');

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
    }
  }, [championData]) // run when championData finishes loading

  return (
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
      <Flex>
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
          {/* <Divider orientation="vertical" /> */}
          <Stat width="120px">
            <StatLabel>KDA</StatLabel>
            {/* <StatNumber>{`${roundNumber((stats.kill + stats.assist) / stats.death)}`}</StatNumber> */}
            <StatNumber>{getKDAElement(stats)}</StatNumber>
            <StatHelpText>
              {kdaStarRating(stats)}
            </StatHelpText>
          </Stat>
        </HStack>
        <HStack>
          <Stat width="140px">
            <StatLabel>Damage Dealt/min</StatLabel>
            <StatNumber>{getDamageElement(formatNumber(Math.round(stats.total_damage_done / getTotalMinutes())))}</StatNumber>
            <StatHelpText>{ damageStarRating(stats.total_damage_done / getTotalMinutes()) }</StatHelpText>
          </Stat>
          <Stat width="140px">
            <StatLabel>Damage Taken/min</StatLabel>
            <StatNumber>{getDamageElement(formatNumber(Math.round(stats.total_damage_taken / getTotalMinutes())))}</StatNumber>
            <StatHelpText>{ damageStarRating(stats.total_damage_taken / getTotalMinutes()) }</StatHelpText>
          </Stat>
        </HStack>
      </Flex>

    </Flex>
  );
}

export default ChampionStats;