import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HStack, Link, Text, VStack } from '@chakra-ui/layout';
import SilverPodium from './SilverPodium';
import GoldPodium from './GoldPodium';
import BronzePodium from './BronzePodium';
import { formatNumber } from '../ChampionStats';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { ChampId } from '../data/ChampId';



const MostDamageDoneInOneGameRanking = () => {

  const [rankingData, setRankingData] = useState(null);

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
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/most_damage_done_in_one_game/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:8000/aramgg/rest_api/ranking/top50_most_damage_done_in_one_game/')
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
    let goldChampionInfo = undefined;
    let silverChampionInfo = undefined;
    let bronzeChampionInfo = undefined;

    goldChampionInfo = goldRecord ? ChampId[goldRecord.champion_id] : null;
    silverChampionInfo = silverRecord ? ChampId[silverRecord.champion_id] : null;
    bronzeChampionInfo = bronzeRecord ? ChampId[bronzeRecord.champion_id] : null;

    if (goldChampionInfo !== null) { setGoldChampionName(goldChampionInfo.name) }
    if (silverChampionInfo !== null) { setSilverChampionName(silverChampionInfo.name) }
    if (bronzeChampionInfo !== null) { setBronzeChampionName(bronzeChampionInfo.name) }
  }, [goldRecord, silverRecord, bronzeRecord])

  return (
    <VStack mt="100px" mb="100px">
      <Text fontFamily="Roboto Condensed" fontSize="24px">💥 Most Damage Done in One Game</Text>
      <HStack spacing="40px" mb={10}>
        {rankingData &&
          <>
            <SilverPodium username={silverUserData.username} profile_icon={silverUserData.profile_icon} level={silverUserData.level} value={formatNumber(silverRecord.damage_done)} champId={silverRecord.champion_id} championName={silverChampionName} unit='Damage' />
            <GoldPodium username={goldUserData.username} profile_icon={goldUserData.profile_icon} level={goldUserData.level} value={formatNumber(goldRecord.damage_done)} champId={goldRecord.champion_id} championName={goldChampionName} unit='Damage' />
            <BronzePodium username={bronzeUserData.username} profile_icon={bronzeUserData.profile_icon} level={bronzeUserData.level} value={formatNumber(bronzeRecord.damage_done)} champId={bronzeRecord.champion_id} championName={bronzeChampionName} unit='Damage' />
          </>
        }
      </HStack>
      <Text fontFamily="Roboto Condensed" fontSize="22px">👑 Leaderboard</Text>
      { top50Data &&
        <Table w="500px" variant="striped" colorScheme="gray" mb="100px">
          <TableCaption>Most Damage Done in One Game Ranking</TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Summoner Name</Th>
              <Th isNumeric>Damage Done in One Game</Th>
            </Tr>
          </Thead>
          <Tbody fontFamily="Roboto" fontSize="14px">
            {top50Data.map((entry, i) => {
              return (
                <Tr>
                  <Td>{i === 0 ? '1 🥇' : i === 1 ? '2 🥈' : i === 2 ? '3 🥉' : i + 1}</Td>
                  <Td><Link href={`/profile/${entry.user.username}`}>
                    <span style={{ color: "#008080" }}>{entry.user.username.toUpperCase()}</span>
                  </Link></Td>
                  <Td isNumeric>{formatNumber(entry.damage_done)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      }
    </VStack>
  );
}

export default MostDamageDoneInOneGameRanking;