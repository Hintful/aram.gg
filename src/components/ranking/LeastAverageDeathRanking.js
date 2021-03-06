import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HStack, Link, Text, VStack } from '@chakra-ui/layout';
import SilverPodium from './SilverPodium';
import GoldPodium from './GoldPodium';
import BronzePodium from './BronzePodium';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { roundNumber } from '../functions/CommonFunctions';


const LeastAverageDeathRanking = () => {

  const [rankingData, setRankingData] = useState(null);

  const [top50Data, setTop50Data] = useState(null);

  // parse user data
  const goldUserData = rankingData ? rankingData[0] ? rankingData[0].user : null : null
  const silverUserData = rankingData ? rankingData[1] ? rankingData[1].user : null : null
  const bronzeUserData = rankingData ? rankingData[2] ? rankingData[2].user : null : null

  // parse record
  const goldRecord = rankingData ? rankingData[0] ? rankingData[0] : null : null
  const silverRecord = rankingData ? rankingData[1] ? rankingData[1] : null : null
  const bronzeRecord = rankingData ? rankingData[2] ? rankingData[2] : null : null

  async function getRankingData() {
    // ranking data
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/least_avg_death/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:8000/aramgg/rest_api/ranking/top50_least_avg_death/')
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

  return (
    <VStack mt="100px" mb="100px">
      <Text fontFamily="Roboto Condensed" fontSize="24px">⚔️ Least Average Death Per Game (min. 20 games)</Text>
      <HStack spacing="40px" mb={10}>
        {(rankingData && rankingData[2]) &&
          <>
            <SilverPodium username={silverUserData.username} profile_icon={silverUserData.profile_icon} level={silverUserData.level} value={roundNumber(silverRecord.avg_death, 2)} unit='Deaths/game' />
            <GoldPodium username={goldUserData.username} profile_icon={goldUserData.profile_icon} level={goldUserData.level} value={roundNumber(goldRecord.avg_death, 2)} unit='Deaths/game' />
            <BronzePodium username={bronzeUserData.username} profile_icon={bronzeUserData.profile_icon} level={bronzeUserData.level} value={roundNumber(bronzeRecord.avg_death, 2)} unit='Deaths/game' />
          </>
        }
      </HStack>
      <Text fontFamily="Roboto Condensed" fontSize="22px">👑 Leaderboard</Text>
      { top50Data &&
        <Table w="500px" variant="striped" colorScheme="gray" mb="100px">
          <TableCaption>Least Average Death per game Ranking</TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Summoner Name</Th>
              <Th isNumeric>Avg. number of Deaths</Th>
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
                  <Td isNumeric>{roundNumber(entry.avg_death, 2)}/game</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      }

    </VStack>
  );
}

export default LeastAverageDeathRanking;