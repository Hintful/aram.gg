import { Button, Center, CircularProgress, CircularProgressLabel, Divider, Flex, HStack, Icon, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, useForceUpdate, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';
import { roundNumber } from './ChampionStats';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import useForceUpdate_ from 'use-force-update';
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
  const [numGames, setNumGames] = useState(null);
  const [totalKDA, setTotalKDA] = useState(null);
  const [numWins, setNumWins] = useState(null);
  const [numLosses, setNumLosses] = useState(null);
  const { id } = useParams();
  const username = id;

  // multikill stats
  const [numDoubleKill, setNumDoubleKill] = useState(null);
  const [numTripleKill, setNumTripleKill] = useState(null);
  const [numQuadraKill, setNumQuadraKill] = useState(null);
  const [numPentaKill, setNumPentaKill] = useState(null);
  const [numLegendaryKill, setNumLegendaryKill] = useState(null);

  // sort button orientations
  // 0 unselected, 1 descending, 2 ascending
  const [gamesSort, setGamesSort] = useState(0);
  const [winsSort, setWinsSort] = useState(0);
  const [kdaSort, setKdaSort] = useState(0);
  const [effectiveDamageSort, setEffectiveDamageSort] = useState(0);
  const [damageTakenSort, setDamageTakenSort] = useState(0);



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
    const totalNumGames = userChampionStats.reduce((total, championStat) => total + (championStat.win + championStat.loss), 0);
    const kills = userChampionStats.reduce((total, championStat) => total + championStat.kill, 0);
    const deaths = userChampionStats.reduce((total, championStat) => total + championStat.death, 0);
    const assists = userChampionStats.reduce((total, championStat) => total + championStat.assist, 0);
    const wins = userChampionStats.reduce((total, championStat) => total + championStat.win, 0)
    const losses = userChampionStats.reduce((total, championStat) => total + championStat.loss, 0)

    const double = userChampionStats.reduce((total, championStat) => total + championStat.num_double_kill, 0);
    const triple = userChampionStats.reduce((total, championStat) => total + championStat.num_triple_kill, 0);
    const quadra = userChampionStats.reduce((total, championStat) => total + championStat.num_quadra_kill, 0);
    const penta = userChampionStats.reduce((total, championStat) => total + championStat.num_penta_kill, 0);
    const legendary = userChampionStats.reduce((total, championStat) => total + championStat.num_legendary_kill, 0);

    // set basic stat states
    setNumGames(totalNumGames);
    setTotalKDA((kills + assists) / deaths)
    setNumWins(wins);
    setNumLosses(losses);

    // set multikill stat states
    setNumDoubleKill(double);
    setNumTripleKill(triple);
    setNumQuadraKill(quadra);
    setNumPentaKill(penta);
    setNumLegendaryKill(legendary);
  }, [userChampionStats])

  return (
    <Center h="auto" mt="50px" mb="50px" className="profile-container">
      <VStack spacing={5}>
        <VStack>
          <Text fontSize={32} className="sName" mt={10}>{username}</Text>
          {userDetail ?
            <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} totalKDA={totalKDA} />
            :
            <div>
              <Spinner color="teal.500" /> Loading..
            </div>
          }
        </VStack>

        <Flex direction="row" align="center" justify="center" style={{ fontSize: "14px", gap: "3px" }}>
          <MultikillTag multikill={2} count={numDoubleKill} />
          <MultikillTag multikill={3} count={numTripleKill} />
          <MultikillTag multikill={4} count={numQuadraKill} />
          <MultikillTag multikill={5} count={numPentaKill} />
          <MultikillTag multikill={6} count={numLegendaryKill} />
        </Flex>

        <HStack spacing="40px">
          <Stat width="120px">
            <StatLabel>Wins</StatLabel>
            <StatNumber color="blue.300">
              {numWins}
            </StatNumber>
            <StatHelpText>Games Won</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Losses</StatLabel>
            <StatNumber color="red.300">
              {numLosses}
            </StatNumber>
            <StatHelpText>Games Lost</StatHelpText>
          </Stat>
          <Stat width="160px">
            <StatLabel>KDA</StatLabel>
            <StatNumber>
              {getKDAElement(totalKDA)}
            </StatNumber>
            <StatHelpText>
              Over {numGames} Games
            </StatHelpText>
          </Stat>
        </HStack>

        <VStack>
          <Text fontWeight="600">Winrate</Text>
          {numWins ?
            <CircularProgress size="100px" thickness="5px" value={numWins / (numWins + numLosses) * 100} color={getWinrateColor(numWins / (numWins + numLosses))}>
              <CircularProgressLabel ml="1px" mt="-3px" ><span style={{ fontFamily: "Roboto", fontSize: "18px" }}>{roundNumber(numWins / (numWins + numLosses) * 100)}%</span></CircularProgressLabel>
            </CircularProgress>
            :
            <CircularProgress isIndeterminate size="100px" thickness="5px" color="teal.500">

            </CircularProgress>
          }
        </VStack>

        {numGames ?
          <Text fontFamily="Roboto" fontSize={14}>
            Total number of games analyzed:&nbsp;
            <span style={{ fontWeight: 600 }}>
              {numGames}
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

        { /* Show sort menu only if numGames > 0 */ }
        {numGames > 0 &&
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
  );
}

export default Profile;