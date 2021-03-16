import { HStack, Text, VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import IconBox from './IconBox';
import { getIndividualKDAStarRating, getDamageStarRating, getCarryPotential, roundNumber, formatNumber } from './functions/CommonFunctions';
import { Spinner } from '@chakra-ui/spinner';
import { Button } from '@chakra-ui/button';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';

const formatUsername = (username) => {
  return username.split(" ").join("").toLowerCase();
}

const secondsToTime = (t) => {
  let time = t;
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = time;

  return `${hours > 0 ? hours + ' hour' : ''}${hours > 1 ? 's' : ''} ${minutes > 0 ? minutes + ' minute' : ''}${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`;
}

const Stats = () => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const { id } = useParams();
  const username = id;

  // user cumulative stats
  const [userStats, setUserStats] = useState(null);
  const [performance, setPerformance] = useState(null);

  // for link
  const history = useHistory();

  async function getUserData() {
    // user data
    axios.get(`http://localhost:8000/aramgg/rest_api/user_detail/${formatUsername(username)}/`)
      .then(res => {
        setUserDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    // user champion data
    axios.get(`http://localhost:8000/aramgg/rest_api/user_champion/${formatUsername(username)}/`)
      .then(res => {
        setUserChampionStats(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let localNumWins = 0;
    let localNumLosses = 0;
    let localNumKills = 0;
    let localNumDeaths = 0;
    let localNumAssists = 0;
    let localTotalDamageDone = 0;
    let localTotalDamageTaken = 0;
    let localTotalHealingDone = 0;
    let localTotalGameLength = 0;
    let localTotalGoldSpent = 0;
    let localTotalGoldEarned = 0;
    let localLargestKillingSpree = 0;
    let localNumDoubleKill = 0;
    let localNumTripleKill = 0;
    let localNumQuadraKill = 0;
    let localNumPentaKill = 0;
    let localNumLegendaryKill = 0;
    let localNumMaxKill = 0;
    let localNumMaxDeath = 0;
    let localNumMaxAssist = 0;
    let localMostGoldSpent = 0;
    let localMostGoldEarned = 0;
    let localMostDamageDone = 0;
    let localMostDamageTaken = 0;
    let localMostHealingDone = 0;
    let localLongestGameLength = 0;
    let localNumMaxDoubleKill = 0;
    let localNumMaxTripleKill = 0;
    let localNumMaxQuadraKill = 0;
    let localNumMaxPentaKill = 0;
    let localNumMaxLegendaryKill = 0;

    // load stats
    userChampionStats.forEach(stats => {
      localNumWins += stats.win;
      localNumLosses += stats.loss;
      localNumKills += stats.kill;
      localNumDeaths += stats.death;
      localNumAssists += stats.assist;
      localTotalDamageDone += stats.total_damage_done;
      localTotalDamageTaken += stats.total_damage_taken;
      localTotalHealingDone += stats.total_healing_done;
      localTotalGameLength += stats.total_game_length;
      localTotalGoldSpent += stats.total_gold_spent;
      localTotalGoldEarned += stats.total_gold_earned;
      localLargestKillingSpree = Math.max(localLargestKillingSpree, stats.largest_killing_spree);
      localNumDoubleKill += stats.num_double_kill;
      localNumTripleKill += stats.num_triple_kill;
      localNumQuadraKill += stats.num_quadra_kill;
      localNumPentaKill += stats.num_penta_kill;
      localNumLegendaryKill += stats.num_legendary_kill;
      localNumMaxKill = Math.max(localNumMaxKill, stats.num_max_kill);
      localNumMaxDeath = Math.max(localNumMaxDeath, stats.num_max_death);
      localNumMaxAssist = Math.max(localNumMaxAssist, stats.num_max_assist);
      localMostGoldSpent = Math.max(localMostGoldSpent, stats.most_gold_spent);
      localMostGoldEarned = Math.max(localMostGoldEarned, stats.most_gold_earned);
      localMostDamageDone = Math.max(localMostDamageDone, stats.most_damage_done);
      localMostDamageTaken = Math.max(localMostDamageTaken, stats.most_damage_taken);
      localMostHealingDone = Math.max(localMostHealingDone, stats.most_healing_done);
      localLongestGameLength = Math.max(localLongestGameLength, stats.longest_game_length);
      localNumMaxDoubleKill = Math.max(localNumMaxDoubleKill, stats.num_max_double_kill);
      localNumMaxTripleKill = Math.max(localNumMaxTripleKill, stats.num_max_triple_kill);
      localNumMaxQuadraKill = Math.max(localNumMaxQuadraKill, stats.num_max_quadra_kill);
      localNumMaxPentaKill = Math.max(localNumMaxPentaKill, stats.num_max_penta_kill);
      localNumMaxLegendaryKill = Math.max(localNumMaxLegendaryKill, stats.num_max_legendary_kill);
    })

    // calculate performance
    const totalPerformance = userChampionStats.reduce((total, championStat) => total + (
      getCarryPotential(championStat.win, championStat.loss, getIndividualKDAStarRating((championStat.kill + championStat.assist) / championStat.death / (championStat.win + championStat.loss)),
        getDamageStarRating((championStat.total_damage_done + championStat.total_healing_done) / (championStat.total_game_length / 60)),
        getDamageStarRating(championStat.total_damage_taken / (championStat.total_game_length / 60)))), 0);

    setUserStats({
      numWins: localNumWins,
      numLosses: localNumLosses,
      numKills: localNumKills,
      numDeaths: localNumDeaths,
      numAssists: localNumAssists,
      totalDamageDone: localTotalDamageDone,
      totalDamageTaken: localTotalDamageTaken,
      totalHealingDone: localTotalHealingDone,
      totalGameLength: localTotalGameLength,
      totalGoldSpent: localTotalGoldSpent,
      totalGoldEarned: localTotalGoldEarned,
      numDoubleKill: localNumDoubleKill,
      numTripleKill: localNumTripleKill,
      numQuadraKill: localNumQuadraKill,
      numPentaKill: localNumPentaKill,
      numLegendaryKill: localNumLegendaryKill,
      numMaxKill: localNumMaxKill,
      numMaxAssist: localNumMaxAssist,
      numMaxDeath: localNumMaxDeath,
      mostGoldSpent: localMostGoldSpent,
      mostGoldEarned: localMostGoldEarned,
      mostDamageDone: localMostDamageDone,
      mostDamageTaken: localMostDamageTaken,
      mostHealingDone: localMostHealingDone,
      longestGameLength: localLongestGameLength,
      numMaxDoubleKill: localNumMaxDoubleKill,
      numMaxTripleKill: localNumMaxTripleKill,
      numMaxQuadraKill: localNumMaxQuadraKill,
      numMaxPentaKill: localNumMaxPentaKill,
      numMaxLegendaryKill: localNumMaxLegendaryKill,
      largestKillingSpree: localLargestKillingSpree
    })

    setPerformance(totalPerformance / userChampionStats.length);
  }, [userChampionStats]);

  return (
    <VStack mt="50px" className="achievement-container">
      <VStack mb={5}>
        <Text fontSize={32} className="sName" mt={10} mb={1}>{username}</Text>
        {userDetail && userStats ?
          <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} totalKDA={(userStats.numKills + userStats.numAssists) / userStats.numDeaths} performance={performance} />
          :
          <div>
            <Spinner color="teal.500" /> Loading..
          </div>
        }
      </VStack>

      { /* Back to Profile/Achievements button */}
      <HStack>
        <Button mb={10} onClick={() => {
          history.push({
            pathname: `/profile/${username}`
          })
        }}>Back to Profile</Button>
        <Button mb={10} onClick={() => {
          history.push({
            pathname: `/profile/${username}/achievements`
          })
        }}>Achievements</Button>
      </HStack>

      <VStack>
        <Text fontSize={26} fontFamily="Roboto Condensed">📊 Statistics and Records</Text>
        {userStats ?
          <Table w="600px" variant="striped" colorScheme="gray" mb="100px">
            <TableCaption>Various Stats/Records</TableCaption>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th isNumeric>Record</Th>
              </Tr>
            </Thead>
            <Tbody fontFamily="Roboto" fontSize="14px">
              <Tr>
                <Td>Total Games</Td>
                <Td isNumeric>{formatNumber(userStats.numWins + userStats.numLosses)}</Td>
              </Tr>
              <Tr>
                <Td>Total Wins</Td>
                <Td isNumeric>{formatNumber(userStats.numWins)}</Td>
              </Tr>
              <Tr>
                <Td>Total Losses</Td>
                <Td isNumeric>{formatNumber(userStats.numLosses)}</Td>
              </Tr>
              <Tr>
                <Td>Win Rate</Td>
                <Td isNumeric>{`${roundNumber(userStats.numWins / (userStats.numWins + userStats.numLosses) * 100)}%`}</Td>
              </Tr>
              <Tr>
                <Td>Total Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numKills)}</Td>
              </Tr>
              <Tr>
                <Td>Total Deaths</Td>
                <Td isNumeric>{formatNumber(userStats.numDeaths)}</Td>
              </Tr>
              <Tr>
                <Td>Total Assists</Td>
                <Td isNumeric>{formatNumber(userStats.numAssists)}</Td>
              </Tr>
              <Tr>
                <Td>Average Kills per game</Td>
                <Td isNumeric>{roundNumber(userStats.numKills / (userStats.numWins + userStats.numLosses))}/game</Td>
              </Tr>
              <Tr>
                <Td>Average Deaths per game</Td>
                <Td isNumeric>{roundNumber(userStats.numDeaths / (userStats.numWins + userStats.numLosses))}/game</Td>
              </Tr>
              <Tr>
                <Td>Average Assists per game</Td>
                <Td isNumeric>{roundNumber(userStats.numAssists / (userStats.numWins + userStats.numLosses))}/game</Td>
              </Tr>
              <Tr>
                <Td>Average KDA</Td>
                <Td isNumeric>{`${roundNumber((userStats.numKills + userStats.numAssists) / userStats.numDeaths)}`}</Td>
              </Tr>
              <Tr>
                <Td>Total Damage Done</Td>
                <Td isNumeric>{formatNumber(userStats.totalDamageDone)}</Td>
              </Tr>
              <Tr>
                <Td>Total Damage Taken</Td>
                <Td isNumeric>{formatNumber(userStats.totalDamageTaken)}</Td>
              </Tr>
              <Tr>
                <Td>Total Healing Done</Td>
                <Td isNumeric>{formatNumber(userStats.totalHealingDone)}</Td>
              </Tr>
              <Tr>
                <Td>Average Effective Damage Done</Td>
                <Td isNumeric>{formatNumber(roundNumber((userStats.totalDamageDone + userStats.totalHealingDone) / (userStats.totalGameLength / 60)))}/min</Td>
              </Tr>
              <Tr>
                <Td>Average Damage Taken</Td>
                <Td isNumeric>{formatNumber(roundNumber(userStats.totalDamageTaken / (userStats.totalGameLength / 60)))}/min</Td>
              </Tr>
              <Tr>
                <Td>Total Game Length</Td>
                <Td isNumeric>{secondsToTime(userStats.totalGameLength)}</Td>
              </Tr>
              <Tr>
                <Td>Total Double Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numDoubleKill)}</Td>
              </Tr>
              <Tr>
                <Td>Total Triple Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numTripleKill)}</Td>
              </Tr>
              <Tr>
                <Td>Total Quadra Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numQuadraKill)}</Td>
              </Tr>
              <Tr>
                <Td>Total Penta Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numPentaKill)}</Td>
              </Tr>
              <Tr>
                <Td>Total Legendary Kills</Td>
                <Td isNumeric>{formatNumber(userStats.numLegendaryKill)}</Td>
              </Tr>
              <Tr>
                <Td>Average Double Kills per game</Td>
                <Td isNumeric>{roundNumber(userStats.numDoubleKill / (userStats.numWins + userStats.numLosses), 2)}/game</Td>
              </Tr>
              <Tr>
                <Td>Average Triple Kills per game</Td>
                <Td isNumeric>{roundNumber(userStats.numTripleKill / (userStats.numWins + userStats.numLosses), 2)}/game</Td>
              </Tr>
              <Tr>
                <Td>Average Quadra Kills per game</Td>
                <Td isNumeric>{roundNumber(userStats.numQuadraKill / (userStats.numWins + userStats.numLosses), 2)}/game</Td>
              </Tr>
              <Tr>
                <Td>Average Penta Kills per game</Td>
                <Td isNumeric>{roundNumber(userStats.numPentaKill / (userStats.numWins + userStats.numLosses), 2)}/game</Td>
              </Tr>
              <Tr>
                <Td>Maximum Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxKill)}</Td>
              </Tr>
              <Tr>
                <Td>Maximum Deaths in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxDeath)}</Td>
              </Tr>
              <Tr>
                <Td>Maximum Assists in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxAssist)}</Td>
              </Tr>
              <Tr>
                <Td>Most Gold spent in one game</Td>
                <Td isNumeric>{formatNumber(userStats.mostGoldSpent)}</Td>
              </Tr>
              <Tr>
                <Td>Most Gold earned in one game</Td>
                <Td isNumeric>{formatNumber(userStats.mostGoldEarned)}</Td>
              </Tr>
              <Tr>
                <Td>Most damage done in one game</Td>
                <Td isNumeric>{formatNumber(userStats.mostDamageDone)}</Td>
              </Tr>
              <Tr>
                <Td>Most Damage Taken in one game</Td>
                <Td isNumeric>{formatNumber(userStats.mostDamageTaken)}</Td>
              </Tr>
              <Tr>
                <Td>Most Healing done in one game</Td>
                <Td isNumeric>{formatNumber(userStats.mostHealingDone)}</Td>
              </Tr>
              <Tr>
                <Td>Longest Game Length</Td>
                <Td isNumeric>{secondsToTime(userStats.longestGameLength)}</Td>
              </Tr>
              <Tr>
                <Td>Most Double Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxDoubleKill)}</Td>
              </Tr>
              <Tr>
                <Td>Most Triple Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxTripleKill)}</Td>
              </Tr>
              <Tr>
                <Td>Most Quadra Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxQuadraKill)}</Td>
              </Tr>
              <Tr>
                <Td>Most Penta Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxPentaKill)}</Td>
              </Tr>
              <Tr>
                <Td>Most Legendary Kills in one game</Td>
                <Td isNumeric>{formatNumber(userStats.numMaxLegendaryKill)}</Td>
              </Tr>
              <Tr>
                <Td>Largest Killing Spree</Td>
                <Td isNumeric>{formatNumber(userStats.largestKillingSpree)}</Td>
              </Tr>
            </Tbody>

          </Table>
          :
          <Spinner />
        }
      </VStack>


    </VStack>
  );
}

export default Stats;