import { Button, Center, CircularProgress, CircularProgressLabel, Divider, HStack, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';
import { roundNumber } from './ChampionStats';
import { StarIcon } from '@chakra-ui/icons';

const getKDAStyle = (kda, shadow = false) => {
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

export const kdaStarRating = (kda, starSize = 3) => {
  let star = 0;

  if (!kda) { star = 0; }
  else if (kda < 1.0) { star = 1; }
  else if (kda < 2.0) { star = 2; }
  else if (kda < 3.0) { star = 3; }
  else if (kda < 3.7) { star = 4; }
  else { star = 5; }

  return (
    Array(5).fill("").map((_, i) => (
      <span style={i < star ? getKDAStyle(kda, true) : { color: "gray.500" }} key={i}><i className="fas fa-star"></i></span>
    ))
  )
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

    setNumGames(totalNumGames);
    setTotalKDA((kills + assists) / deaths)
    setNumWins(wins);
    setNumLosses(losses);
  }, [userChampionStats])

  return (
    <Center h="auto" mb="50px">
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
              <CircularProgressLabel><span style={{ fontFamily: "Roboto" }}>{roundNumber(numWins / (numWins + numLosses) * 100)}%</span></CircularProgressLabel>
            </CircularProgress>
            :
            <CircularProgress isIndeterminate size="100px" thickness="5px" color="blue.500">

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

        <Divider />
        <VStack width="50vw">

          {userChampionStats.length > 0 ?
            userChampionStats.map((stat, i) => (
              <div key={i}>
                <ChampionStats stats={stat} />
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