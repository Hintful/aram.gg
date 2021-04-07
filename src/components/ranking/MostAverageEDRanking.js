import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HStack, Link, Text, VStack } from '@chakra-ui/layout';
import SilverPodium from './SilverPodium';
import GoldPodium from './GoldPodium';
import BronzePodium from './BronzePodium';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { roundNumber } from '../functions/CommonFunctions';


const MostAverageEDRanking = () => {

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
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/most_avg_ed/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:8000/aramgg/rest_api/ranking/top50_most_avg_ed/')
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
      <Text fontFamily="Roboto Condensed" fontSize="24px">⚔️ Most Average Effective Damage Per Minute (min. 20 games)</Text>
      <HStack spacing="40px" mb={10}>
        {(rankingData && rankingData[2]) &&
          <>
            <SilverPodium username={silverUserData.username} profile_icon={silverUserData.profile_icon} level={silverUserData.level} value={roundNumber(silverRecord.avg_ed, 2)} unit='ED/min' />
            <GoldPodium username={goldUserData.username} profile_icon={goldUserData.profile_icon} level={goldUserData.level} value={roundNumber(goldRecord.avg_ed, 2)} unit='ED/min' />
            <BronzePodium username={bronzeUserData.username} profile_icon={bronzeUserData.profile_icon} level={bronzeUserData.level} value={roundNumber(bronzeRecord.avg_ed, 2)} unit='ED/min' />
          </>
        }
      </HStack>
      <Text fontFamily="Roboto Condensed" fontSize="22px">👑 Leaderboard</Text>
      { top50Data &&
        <Table w="500px" variant="striped" colorScheme="gray" mb="100px">
          <TableCaption>Average Effective Damage per game Ranking</TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Summoner Name</Th>
              <Th isNumeric>Avg. ED</Th>
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
                  <Td isNumeric>{roundNumber(entry.avg_ed, 2)}/min</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      }

    </VStack>
  );
}

export default MostAverageEDRanking;