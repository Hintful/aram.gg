import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import champion_data_json from '../json/champion.json';
import SilverPodium from './SilverPodium';
import GoldPodium from './GoldPodium';
import BronzePodium from './BronzePodium';
import { formatNumber } from '../ChampionStats';



const MostDamageDoneInOneGameRanking = () => {

  const [rankingData, setRankingData] = useState(null);
  const [championData, setChampionData] = useState([]);

  // parse user data
  const goldUserData = rankingData ? rankingData[0]["1"].user : null;
  const silverUserData = rankingData ? rankingData[1]["2"].user : null;
  const bronzeUserData = rankingData ? rankingData[2]["3"].user : null;

  // parse record
  const goldRecord = rankingData ? rankingData[0]["1"] : null
  const silverRecord = rankingData ? rankingData[1]["2"] : null
  const bronzeRecord = rankingData ? rankingData[2]["3"] : null

  // used champion info
  const [goldChampionName, setGoldChampionName] = useState('');
  const [silverChampionName, setSilverChampionName] = useState('');
  const [bronzeChampionName, setBronzeChampionName] = useState('');

  async function getRankingData() {
    // ranking data
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/most_damage_done_in_one_game/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getRankingData();
  }, []);

  useEffect(() => {
    // load champion.json
    setChampionData(Object.values(JSON.parse(JSON.stringify(champion_data_json)).data));
  }, [])

  useEffect(() => {
    let goldChampionInfo = undefined;
    let silverChampionInfo = undefined;
    let bronzeChampionInfo = undefined;

    if (championData.length > 0) {
      goldChampionInfo = championData.filter(data => parseInt(data.key) === (goldRecord ? goldRecord.champ_id : ''))[0];
      silverChampionInfo = championData.filter(data => parseInt(data.key) === (silverRecord ? silverRecord.champ_id : ''))[0];
      bronzeChampionInfo = championData.filter(data => parseInt(data.key) === (bronzeRecord ? bronzeRecord.champ_id : ''))[0];

      if (goldChampionInfo !== undefined) { setGoldChampionName(goldChampionInfo.name) }
      if (silverChampionInfo !== undefined) { setSilverChampionName(silverChampionInfo.name) }
      if (bronzeChampionInfo !== undefined) { setBronzeChampionName(bronzeChampionInfo.name) }
    }
  }, [championData, goldRecord, silverRecord, bronzeRecord])

  return (
    <VStack mt="50px" mb="100px">
      <Text fontFamily="Roboto Condensed" fontSize="24px">💥 Most Damage Done in One Game</Text>
      <HStack spacing="40px">
        {rankingData &&
          <>
            <SilverPodium username={silverUserData.username} profile_icon={silverUserData.profile_icon} level={silverUserData.level} value={formatNumber(silverRecord.damage_done)} championName={silverChampionName} unit='Damage' />
            <GoldPodium username={goldUserData.username} profile_icon={goldUserData.profile_icon} level={goldUserData.level} value={formatNumber(goldRecord.damage_done)} championName={goldChampionName} unit='Damage' />
            <BronzePodium username={bronzeUserData.username} profile_icon={bronzeUserData.profile_icon} level={bronzeUserData.level} value={formatNumber(bronzeRecord.damage_done)} championName={bronzeChampionName} unit='Damage' />
          </>
        }
      </HStack>
    </VStack>
  );
}

export default MostDamageDoneInOneGameRanking;