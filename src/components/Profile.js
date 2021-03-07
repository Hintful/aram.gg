import { Center, Divider, HStack, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';
import { roundNumber } from './ChampionStats';
import { StarIcon } from '@chakra-ui/icons';

const getKDAColor = (kda) => {
  if (kda < 1.0) { return '#ababab'; }
  else if (kda < 2.0) { return '#454545'; }
  else if (kda < 3.0) { return '#90ee90'; }
  else if (kda < 3.7) { return '#87cefa'; }
  else if (kda < 4.3) { return '#ffa500'; }
  else { return '#ff4500'; }
}

const getKDAElement = (kda) => {
  if (kda) {
    return (
      <span style={{ color: getKDAColor(kda) }}>
        {roundNumber(kda)}
      </span>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
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
      <StarIcon w={starSize} h={starSize} mt="7px" key={i} color={i < star ? getKDAColor(kda) : "gray.500"} />
    ))
  )
}

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const [numGames, setNumGames] = useState(null);
  const [totalKDA, setTotalKDA] = useState(null);
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

    setNumGames(totalNumGames);
    setTotalKDA((kills + assists) / deaths)
  }, [userChampionStats])

  return (
    <Center h="auto" mb="50px">
      <VStack spacing={5}>
        <VStack>
          <Text fontSize={32} className="sName" mt={10}>{username}</Text>
          {userDetail !== undefined ?
            <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} totalKDA={totalKDA} />
            :
            <div>
              Loading..
            </div>
          }

        </VStack>

        <HStack spacing="40px">
          <Stat width="120px">
            <StatLabel>Wins</StatLabel>
            <StatNumber color="blue.300">
              {userChampionStats.reduce((total, championStat) => total + championStat.win, 0)}
            </StatNumber>
            <StatHelpText>Games Won</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Losses</StatLabel>
            <StatNumber color="red.300">
              {userChampionStats.reduce((total, championStat) => total + championStat.loss, 0)}
            </StatNumber>
            <StatHelpText>Games Lost</StatHelpText>
          </Stat>
          <Stat width="120px">
            <StatLabel>KDA</StatLabel>
            <StatNumber>
              { getKDAElement(totalKDA) }
            </StatNumber>
            <StatHelpText>
              Over {numGames} Games
            </StatHelpText>
          </Stat>
        </HStack>
        { numGames ?
          <Text fontFamily="Roboto" fontSize={14}>
            Total number of games analyzed:&nbsp;
            <span style={{ fontWeight: 600 }}>
              {numGames}
            </span>
          </Text>
          :
          <Text fontFamily="Toboto" fontSize={14}>
            Loading...
          </Text>
        }

        <Divider />

        <VStack width="50vw">
          {userChampionStats.map((stat, i) => (
            <>
              <ChampionStats stats={stat} key={i} />
              <Divider orientation="horizontal" />
            </>
          ))}
        </VStack>

      </VStack>

    </Center>
  );
}

export default Profile;