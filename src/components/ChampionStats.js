import { StarIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, HStack, Spacer, Text } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react';
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
} */

const getURLName = (name) => {
  if (name === "Kog'Maw") {
    return 'KogMaw';
  } else if (name === 'Dr. Mundo') {
    return 'DrMundo';
  } else if (name.includes(' ')) { // name contains whitespace
    return name.replace(' ', ''); // remove whitespace
  } else if(name.includes("'")) { // name contains small quotes
    const quoteIndex = name.indexOf("'");
    return name.substring(0, quoteIndex) + name[quoteIndex + 1].toLowerCase() + name.substring(quoteIndex + 2);
  } else {
    return name;
  }
}

const getKDAColor = (kda) => {
  if (kda < 1.5) { return '#888888'; }
  else if (kda < 2.3) { return 'black'; }
  else if (kda < 3.1) { return '#90ee90'; }
  else if (kda < 4) { return '#87cefa'; }
  else if (kda < 5) { return '#ffa500'; }
  else { return '#ff4500'; }
}

const roundNumber = (num) => {
  return (Math.round(num * 10) / 10).toFixed(1);
}

const getKDAElement = (stats) => {
  const kda = roundNumber((stats.kill + stats.assist) / stats.death);

  return (
    <span style={{ color: getKDAColor(kda) }}>
      {kda}
    </span>
  )
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const kdaStarRating = (stats) => {
  const kda = roundNumber((stats.kill + stats.assist) / stats.death);
  let star = 0;
  if (kda < 1.5) { star = 1; }
  else if (kda < 2.3) { star = 2; }
  else if (kda < 3.1) { star = 3; }
  else if (kda < 4) { star = 4; }
  else { star = 5; }

  return (
     Array(5).fill("").map((_, i) => (
      <StarIcon w={3} h={3} mt="7px" key={i} color={i < star ? "yellow.400" : "gray.500"} />
    ))
  )
}

const ChampionStats = ({ stats }) => {
  const [championData, setChampionData] = useState([]);
  const [championName, setChampionName] = useState('');

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
    <Flex direction="row" className="champion-stats">
      <Flex direction="column" justify="center" align="center" className="champion-icon">
        { championName !== '' ?
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
        <HStack ml={3} spacing="40px">
          <Stat>
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
          <Stat width="100px">
            <StatLabel>KDA</StatLabel>
            {/* <StatNumber>{`${roundNumber((stats.kill + stats.assist) / stats.death)}`}</StatNumber> */}
            <StatNumber>{ getKDAElement(stats) }</StatNumber>
            <StatHelpText>
              { kdaStarRating(stats) }
            </StatHelpText>
          </Stat>
          <Stat width="120px">
            <StatLabel>Damage Done</StatLabel>
            <StatNumber>{formatNumber(Math.round(stats.total_damage_done / (stats.win + stats.loss)))}</StatNumber>
            <StatHelpText>Per Game</StatHelpText>
          </Stat>
          <Stat width="120px">
            <StatLabel>Damage Taken</StatLabel>
            <StatNumber>{formatNumber(Math.round(stats.total_damage_taken / (stats.win + stats.loss)))}</StatNumber>
            <StatHelpText>Per Game</StatHelpText>
          </Stat>
        </HStack>
      </Flex>

    </Flex>
  );
}

export default ChampionStats;