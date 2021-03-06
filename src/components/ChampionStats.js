import { Image } from '@chakra-ui/image';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
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
  if (name.includes(' ')) { // name contains whitespace
    return name.replace(' ', ''); // remove whitespace
  } else if(name.includes("'")) { // name contains small quotes
    const quoteIndex = name.indexOf("'");
    return name.substring(0, quoteIndex) + name[quoteIndex + 1].toLowerCase() + name.substring(quoteIndex + 2);
  } else {
    return name;
  }
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
        <Image mb={2} className="champion-icon-image" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(championName)}.png`} />
        <Flex className="champion-name-label">
          <Text fontSize="sm">{championName}</Text>
        </Flex>
      </Flex>

    </Flex>
  );
}

export default ChampionStats;