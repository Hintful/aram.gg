import { Button, Center, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import IconBox from './IconBox';


import MultikillTag from './tags/MultikillTag';
import WinLossKDA from './WinLossKDA';
import { getCarryPotential, getDamageStarRating, getIndividualKDAStarRating } from './functions/CommonFunctions';
import WinratePerformance from './WinratePerformance';
import ChampionStatsContainer from './ChampionStatsContainer';

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const { id } = useParams();
  const username = id;

  const [userStats, setUserStats] = useState(null);
  const [performance, setPerformance] = useState(null);

  // for link
  const history = useHistory();

  const formatUsername = (username) => {
    return username.split(" ").join("").toLowerCase();
  }

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
  }, []); // didComponentMount

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

    // calculate overall performance
    const totalPerformance = userChampionStats.reduce((total, championStat) => total + (
      getCarryPotential(championStat.win, championStat.loss, getIndividualKDAStarRating((championStat.kill + championStat.assist) / championStat.death / (championStat.win + championStat.loss)),
        getDamageStarRating((championStat.total_damage_done + championStat.total_healing_done) / (championStat.total_game_length / 60)),
        getDamageStarRating(championStat.total_damage_taken / (championStat.total_game_length / 60)))), 0);

    // set overall performance
    setPerformance(totalPerformance / userChampionStats.length); // average performance
  }, [userChampionStats])

  return (
    <>
      { userStats ?
        <Center h="auto" mt="50px" mb="50px" className="profile-container">
          <VStack spacing={5}>
            <VStack>
              <Text fontSize={32} className="sName" mt={10}>{username}</Text>
              {userDetail ?
                <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} totalKDA={(userStats.numKills + userStats.numAssists) / userStats.numDeaths} performance={performance} />
                :
                <div>
                  <Spinner color="teal.500" /> Loading..
            </div>
              }
            </VStack>


            { /* Multi-kill stats */}
            <Flex direction="row" align="center" justify="center" style={{ fontSize: "14px", gap: "3px" }}>
              <MultikillTag multikill={2} count={userStats.numDoubleKill} />
              <MultikillTag multikill={3} count={userStats.numTripleKill} />
              <MultikillTag multikill={4} count={userStats.numQuadraKill} />
              <MultikillTag multikill={5} count={userStats.numPentaKill} />
              <MultikillTag multikill={6} count={userStats.numLegendaryKill} />
            </Flex>


            { /* Achievement/Stats Button */}
            <HStack>
              <Button onClick={() => {
                history.push({
                  pathname: `/profile/${username}/achievements`
                })
              }}>Achievements</Button>
              <Button onClick={() => {
                history.push({
                  pathname: `/profile/${username}/stats`
                })
              }}>Stats/Records</Button>
            </HStack>



            { /* Wins/Losses/KDA Stat */}
            <WinLossKDA wins={userStats.numWins} losses={userStats.numLosses} KDA={(userStats.numKills + userStats.numAssists) / userStats.numDeaths} />


            { /* Winrate/Performance Stats */}
            <WinratePerformance wins={userStats.numWins} losses={userStats.numLosses} performance={performance} />


            {/* Number of games analyzed / Refresh button */}
            {userStats ?
              <Text fontFamily="Roboto" fontSize={14}>
                Total number of games analyzed:&nbsp;
            <span style={{ fontWeight: 600 }}>
                  {userStats.numWins + userStats.numLosses}
                </span>
              </Text>
              :
              <Text fontFamily="Toboto" fontSize={14}>
                Total number of games analyzed:&nbsp;&nbsp;<Spinner color="teal.500" size="xs" /> <span style={{ fontWeight: 600 }}>Loading...</span>
              </Text>
            }

            {userChampionStats.length > 0 ?
              <Button colorScheme="teal" variant="outline" onClick={() => {
                window.location.reload();
              }}
                leftIcon={<i className="fas fa-sync-alt"></i>}
              >
                <Text mb="2px">Refresh</Text>
              </Button>
              :
              <>
              </>
            }

            { /* Champion Stats */ }
            <ChampionStatsContainer wins={userStats.numWins} losses={userStats.numLosses} _userChampionStats={userChampionStats}/>
          </VStack>

        </Center>
        :
        <>
        </>
      }
    </>
  );
}

export default Profile;