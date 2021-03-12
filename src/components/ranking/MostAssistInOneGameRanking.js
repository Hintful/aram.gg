import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import champion_data_json from '../json/champion.json';
import SilverPodium from './SilverPodium';
import GoldPodium from './GoldPodium';
import BronzePodium from './BronzePodium';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Link } from 'react-router-dom';



const MostAssistInOneGameRanking = () => {

  const [rankingData, setRankingData] = useState(null);
  const [championData, setChampionData] = useState([]);

  const [top50Data, setTop50Data] = useState(null);

  // parse user data
  const goldUserData = rankingData ? rankingData[0].user : null;
  const silverUserData = rankingData ? rankingData[1].user : null;
  const bronzeUserData = rankingData ? rankingData[2].user : null;

  // parse record
  const goldRecord = rankingData ? rankingData[0] : null
  const silverRecord = rankingData ? rankingData[1] : null
  const bronzeRecord = rankingData ? rankingData[2] : null

  // used champion info
  const [goldChampionName, setGoldChampionName] = useState('');
  const [silverChampionName, setSilverChampionName] = useState('');
  const [bronzeChampionName, setBronzeChampionName] = useState('');

  async function getRankingData() {
    // ranking data
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/most_assist_in_one_game/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:8000/aramgg/rest_api/ranking/top50_most_assists_in_one_game/')
      .then(res => {
        setTop50Data(res.data);
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
      goldChampionInfo = championData.filter(data => parseInt(data.key) === (goldRecord ? goldRecord.champion_id : ''))[0];
      silverChampionInfo = championData.filter(data => parseInt(data.key) === (silverRecord ? silverRecord.champion_id : ''))[0];
      bronzeChampionInfo = championData.filter(data => parseInt(data.key) === (bronzeRecord ? bronzeRecord.champion_id : ''))[0];

      if (goldChampionInfo !== undefined) { setGoldChampionName(goldChampionInfo.name) }
      if (silverChampionInfo !== undefined) { setSilverChampionName(silverChampionInfo.name) }
      if (bronzeChampionInfo !== undefined) { setBronzeChampionName(bronzeChampionInfo.name) }
    }
  }, [championData, goldRecord, silverRecord, bronzeRecord])

  return (
    <VStack mt="100px" mb="100px">
      <Text fontFamily="Roboto Condensed" fontSize="24px">🤝 Most Assists in One Game</Text>
      <HStack spacing="40px" mb={10}>
        {rankingData &&
          <>
            <SilverPodium username={silverUserData.username} profile_icon={silverUserData.profile_icon} level={silverUserData.level} value={silverRecord.max_assist} championName={silverChampionName} unit='Assists' />
            <GoldPodium username={goldUserData.username} profile_icon={goldUserData.profile_icon} level={goldUserData.level} value={goldRecord.max_assist} championName={goldChampionName} unit='Assists' />
            <BronzePodium username={bronzeUserData.username} profile_icon={bronzeUserData.profile_icon} level={bronzeUserData.level} value={bronzeRecord.max_assist} championName={bronzeChampionName} unit='Assists' />
          </>
        }
      </HStack>
      <Text fontFamily="Roboto Condensed" fontSize="22px">👑 Leaderboard</Text>
      { top50Data &&
        <Table w="500px" variant="striped" colorScheme="gray" mb="100px">
          <TableCaption>Most Assists in One Game Ranking</TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Summoner Name</Th>
              <Th isNumeric>Number of Assists</Th>
            </Tr>
          </Thead>
          <Tbody fontFamily="Roboto" fontSize="14px">
            { top50Data.map((entry, i) => {
              return (
                <Tr>
                  <Td>{ i === 0 ? '1 🥇' : i === 1 ? '2 🥈' : i === 2 ? '3 🥉' : i + 1 }</Td>
                  <Td><Link href={`/profile/${entry.user.username}`}>
                    <span style={{ color: "#008080" }}>{ entry.user.username.toUpperCase() }</span>
                  </Link></Td>
                  <Td isNumeric>{ entry.max_assist }</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      }
    </VStack>
    
  );
}

export default MostAssistInOneGameRanking;