import { Button, Center, CircularProgress, CircularProgressLabel, Divider, Flex, HStack, Icon, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';
import { roundNumber, getKDAStarRating, getDamageStarRating, getCarryPotential } from './ChampionStats';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { winsAsc, winsDesc, gamesAsc, gamesDesc, kdaAsc, kdaDesc, effectiveDamageAsc, effectiveDamageDesc, damageTakenAsc, damageTakenDesc } from './functions/ComparisonFunctions';
import MultikillTag from './tags/MultikillTag';

export const getKDAStyle = (kda, shadow = false) => {
  if (kda < 1.0) { return { color: '#ababab' }; }
  else if (kda < 2.0) { return { color: '#676767' }; }
  else if (kda < 3.0) { return { color: '#90ee90' }; }
  else if (kda < 3.7) { return { color: '#87cefa' }; }
  else if (kda < 4.3) { return { color: '#ffa500', textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

const getKDAElement = (kda) => {
  if (kda) {
    return (
      <span style={getKDAStyle(kda)}>
        {roundNumber(kda)}
      </span>
    )
  } else {
    return (
      <HStack>
        <Spinner color="teal.500" size="sm" />
        <Text>Loading...</Text>
      </HStack>
    )
  }
}

const getPotentialColor = (potential) => {
  if (potential < 0.2) { return '#ababab'; }
  else if (potential < 0.43) { return '#676767'; }
  else if (potential < 0.55) { return '#90ee90'; }
  else if (potential < 0.65) { return '#87cefa'; }
  else if (potential < 0.8) { return '#ffa500'; }
  else if (potential < 0.9) { return '#ff4500'; }
  else { return '#d900e4'; }
}

const getPotentialRank = (potential) => {
  const potentialThreshold = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 1, 100];
  const potentialRank = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+', 'SS', 'SSS'];

  for (let i = 0; i < potentialThreshold.length; i++) {
    if (potential < potentialThreshold[i]) {
      return potentialRank[i];
    }
  }
}

const getWinrateColor = (winrate) => {
  if (winrate < 0.4) { return '#ababab'; }
  else if (winrate < 0.5) { return '#676767'; }
  else if (winrate < 0.6) { return '#90ee90'; }
  else if (winrate < 0.7) { return '#87cefa'; }
  else if (winrate < 0.8) { return '#ffa500'; }
  else { return '#ff4500'; }
}

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const { id } = useParams();
  const username = id;

  // sort button orientations
  // 0 unselected, 1 descending, 2 ascending
  const [gamesSort, setGamesSort] = useState(0);
  const [winsSort, setWinsSort] = useState(0);
  const [kdaSort, setKdaSort] = useState(0);
  const [effectiveDamageSort, setEffectiveDamageSort] = useState(0);
  const [damageTakenSort, setDamageTakenSort] = useState(0);

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
      getCarryPotential(championStat.win, championStat.loss, getKDAStarRating((championStat.kill + championStat.assist) / championStat.death / (championStat.win + championStat.loss)),
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
            <HStack spacing="40px">
              <Stat width="120px">
                <StatLabel>Wins</StatLabel>
                <StatNumber color="blue.300">
                  {userStats.numWins}
                </StatNumber>
                <StatHelpText>Games Won</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Losses</StatLabel>
                <StatNumber color="red.300">
                  {userStats.numLosses}
                </StatNumber>
                <StatHelpText>Games Lost</StatHelpText>
              </Stat>
              <Stat width="160px">
                <StatLabel>KDA</StatLabel>
                <StatNumber>
                  {getKDAElement((userStats.numKills + userStats.numAssists) / userStats.numDeaths)}
                </StatNumber>
                <StatHelpText>
                  Over {userStats.numWins + userStats.numLosses} Games
            </StatHelpText>
              </Stat>
            </HStack>


            { /* Winrate/Performance Stats */}
            <HStack spacing="50px">
              <VStack>
                <Text fontWeight="600">Winrate</Text>
                {userStats.numWins ?
                  <CircularProgress size="100px" thickness="5px" value={userStats.numWins / (userStats.numWins + userStats.numLosses) * 100} color={getWinrateColor(userStats.numWins / (userStats.numWins + userStats.numLosses))}>
                    <CircularProgressLabel ml="1px" mt="-3px" ><span style={{ fontFamily: "Roboto", fontSize: "18px" }}>{roundNumber(userStats.numWins / (userStats.numWins + userStats.numLosses) * 100)}%</span></CircularProgressLabel>
                  </CircularProgress>
                  :
                  <CircularProgress isIndeterminate size="100px" thickness="5px" color="teal.500">

                  </CircularProgress>
                }
              </VStack>
              <Tooltip hasArrow label={`${roundNumber(performance * 100)}%`}>
                <VStack>
                  <Text fontWeight="600">Performance</Text>
                  {performance ?
                    <CircularProgress size="100px" thickness="5px" value={performance * 100} color={getPotentialColor(performance)}>
                      <CircularProgressLabel ml="1px" mt="-3px" ><span style={{ fontFamily: "Roboto", fontSize: "18px", color: getPotentialColor(performance) }}>{getPotentialRank(performance)}</span></CircularProgressLabel>
                    </CircularProgress>
                    :
                    <CircularProgress isIndeterminate size="100px" thickness="5px" color="teal.500">

                    </CircularProgress>
                  }
                </VStack>
              </Tooltip>
            </HStack>


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

            { /* Sorting Menu */}
            {userStats.numGames > 0 &&
              <Flex direction="row" justify="center" align="center" width="50vw" style={{ gap: "5px", marginTop: "70px" }}>
                <Button colorScheme="teal"
                  onClick={() => {
                    if (gamesSort === 1) { setGamesSort(2); }
                    else { setGamesSort(1); }

                    // TODO --------- Hacky solution; need fix
                    if (gamesSort === 1) { setUserChampionStats([...userChampionStats].sort(gamesAsc)); }
                    else { setUserChampionStats([...userChampionStats].sort(gamesDesc)); }

                    setWinsSort(0);
                    setKdaSort(0);
                    setEffectiveDamageSort(0);
                    setDamageTakenSort(0);
                  }}
                >
                  # of Games&nbsp;
            {gamesSort === 1 ? <Icon as={AiOutlineArrowDown} /> : gamesSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
                </Button>

                <Button colorScheme="teal"
                  onClick={() => {
                    if (winsSort === 1) { setWinsSort(2); }
                    else { setWinsSort(1); }

                    // TODO --------- Hacky solution; need fix
                    if (winsSort === 1) { setUserChampionStats([...userChampionStats].sort(winsAsc)); }
                    else { setUserChampionStats([...userChampionStats].sort(winsDesc)); }

                    setGamesSort(0);
                    setKdaSort(0);
                    setEffectiveDamageSort(0);
                    setDamageTakenSort(0);
                  }}
                >
                  Wins&nbsp;
            {winsSort === 1 ? <Icon as={AiOutlineArrowDown} /> : winsSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
                </Button>

                <Button colorScheme="teal"
                  onClick={() => {
                    if (kdaSort === 1) { setKdaSort(2); }
                    else { setKdaSort(1); }

                    // TODO --------- Hacky solution; need fix
                    if (kdaSort === 1) { setUserChampionStats([...userChampionStats].sort(kdaAsc)); }
                    else { setUserChampionStats([...userChampionStats].sort(kdaDesc)); }

                    setGamesSort(0);
                    setWinsSort(0);
                    setEffectiveDamageSort(0);
                    setDamageTakenSort(0);
                  }}
                >
                  KDA&nbsp;
            {kdaSort === 1 ? <Icon as={AiOutlineArrowDown} /> : kdaSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
                </Button>

                <Button colorScheme="teal"
                  onClick={() => {
                    if (effectiveDamageSort === 1) { setEffectiveDamageSort(2); }
                    else { setEffectiveDamageSort(1); }

                    // TODO --------- Hacky solution; need fix
                    if (effectiveDamageSort === 1) { setUserChampionStats([...userChampionStats].sort(effectiveDamageAsc)); }
                    else { setUserChampionStats([...userChampionStats].sort(effectiveDamageDesc)); }

                    setGamesSort(0);
                    setWinsSort(0);
                    setKdaSort(0);
                    setDamageTakenSort(0);
                  }}
                >
                  Effective Damage&nbsp;
            {effectiveDamageSort === 1 ? <Icon as={AiOutlineArrowDown} /> : effectiveDamageSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
                </Button>

                <Button colorScheme="teal"
                  onClick={() => {
                    if (damageTakenSort === 1) { setDamageTakenSort(2); }
                    else { setDamageTakenSort(1); }

                    // TODO --------- Hacky solution; need fix
                    if (damageTakenSort === 1) { setUserChampionStats([...userChampionStats].sort(damageTakenAsc)); }
                    else { setUserChampionStats([...userChampionStats].sort(damageTakenDesc)); }

                    setGamesSort(0);
                    setWinsSort(0);
                    setKdaSort(0);
                    setEffectiveDamageSort(0);
                  }}
                >
                  Damage Taken&nbsp;
            {damageTakenSort === 1 ? <Icon as={AiOutlineArrowDown} /> : damageTakenSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
                </Button>
              </Flex>
            }


            { /* Champion stats */}
            <Divider />
            <VStack width="50vw">

              {userChampionStats.length > 0 ?
                userChampionStats.map((stat, i) => (
                  <div key={i}>
                    <ChampionStats stats={stat} key={`ChampionStats-${i}`} />
                    <Divider orientation="horizontal" />
                  </div>
                ))
                :
                <VStack>
                  <Text mt={10} mb={5} fontWeight="600">
                    Please refresh the page in a bit - we're fetching your ARAM game data!
              </Text>
                  <Button colorScheme="teal" variant="outline"
                    onClick={() => {
                      window.location.reload();
                    }}
                    leftIcon={<i className="fas fa-sync-alt"></i>}
                  >
                    <Text mb="2px">Refresh</Text>
                  </Button>
                </VStack>
              }
            </VStack>

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