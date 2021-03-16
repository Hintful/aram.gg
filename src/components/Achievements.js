import { Divider, HStack, Text, VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { achievements } from './AchievementRequirement';
import AchievementTag from './tags/AchievementTag';
import IconBox from './IconBox';
import { getOverallKDAStarRating, getDamageStarRating, getCarryPotential } from './functions/CommonFunctions';
import { Spinner } from '@chakra-ui/spinner';
import { Button } from '@chakra-ui/button';
import { achievementRarityDesc } from './functions/ComparisonFunctions';

const formatUsername = (username) => {
  return username.split(" ").join("").toLowerCase();
}

const rarityColor = ["#676767", "#5bd75b", "#87cefa", "#ffa500", "#ff4500", "#c700fd"];
const rarityDesc = ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare", "Legendary"];

const Achievements = () => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const { id } = useParams();
  const username = id;

  // user cumulative stats
  const [userStats, setUserStats] = useState(null);
  const [performance, setPerformance] = useState(null);

  // for link
  const history = useHistory();

  // categorize achievements
  const [categorizeAchievements, setCategorizeAchievements] = useState(true);

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
      getCarryPotential(championStat.win, championStat.loss, getOverallKDAStarRating((championStat.kill + championStat.assist) / championStat.death / (championStat.win + championStat.loss)),
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
    <VStack pt="30px" className="achievement-container">
      {/* <Button mb="100px" colorScheme="teal" onClick={() => {
        setCategorizeAchievements(!categorizeAchievements)
      }}>
        {categorizeAchievements ? "Categorized by Rarity" : "Non-categorized"}
      </Button> */}

      <VStack mb="100px">
        <Text fontSize={26} fontFamily="Roboto Condensed">🏆 Achievements Earned</Text>
        <Text fontSize={16} fontFamily="Roboto Condensed" mb={7}>
          Hover the mouse over each achievement to see detailed description!
        </Text>

        {!categorizeAchievements ?
          <HStack wrap="wrap" p={10}>
            {
              userStats &&
              achievements.sort(achievementRarityDesc).map(achievement => {
                let reqMet = 0;
                Object.keys(achievement.requirements).forEach(requirement => {
                  if (userStats[requirement] >= achievement.requirements[requirement]) {
                    reqMet += 1;
                  }
                })
                if (reqMet === Object.keys(achievement.requirements).length) {
                  return <AchievementTag achievement={achievement} />
                }
              })
            }
          </HStack>
          :
          Array(6).fill(0).map((_, i) => (
            <>
              <VStack mb={10}>
                <Text fontSize={18} fontWeight='600' color={rarityColor[5 - i]} fontFamily="Roboto Condensed" mb={5}>{rarityDesc[5 - i]}</Text>
                <HStack wrap="wrap" p={10}>
                  {userStats &&
                    achievements.filter(achievement => achievement.rarity === (5 - i)).map(achievement => {
                      let reqMet = 0;
                      Object.keys(achievement.requirements).forEach(requirement => {

                        if (userStats[requirement] >= achievement.requirements[requirement]) {
                          reqMet += 1;
                        }
                      })
                      if (reqMet === Object.keys(achievement.requirements).length) {
                        return <AchievementTag achievement={achievement} />
                      }
                    })
                  }
                </HStack>
              </VStack>
              <Divider mb={5} />
            </>
          ))
        }
      </VStack>
    </VStack>
  );
}

export default Achievements;