import { Avatar, AvatarBadge, Box, Center, Divider, Flex, HStack, Image, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchHistory from './MatchHistory';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';
import { roundNumber } from './ChampionStats';
import { StarIcon } from '@chakra-ui/icons';

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const [numGames, setNumGames] = useState(0);
  const [totalKDA, setTotalKDA] = useState(-1);
  const { id } = useParams();
  const username = id;

  async function getUserData() {
    // user data
    axios.get(`http://localhost:8000/aramgg/rest_api/user_detail/${username}/`)
      .then(res => {
        setUserDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    // user champion data
    axios.get(`http://localhost:8000/aramgg/rest_api/user_champion/${username}/`)
      .then(res => {
        setUserChampionStats(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getKDAColor = (kda) => {
    if (kda < 1.0) { return '#888888'; }
    else if (kda < 1.8) { return '#454545'; }
    else if (kda < 2.5) { return '#90ee90'; }
    else if (kda < 3.2) { return '#87cefa'; }
    else if (kda < 4) { return '#ffa500'; }
    else { return '#ff4500'; }
  }

  const kdaStarRating = (kda) => {
    let star = 0;

    if (kda < 1.0) { star = 1; }
    else if (kda < 1.8) { star = 2; }
    else if (kda < 2.5) { star = 3; }
    else if (kda < 3.2) { star = 4; }
    else { star = 5; }

    return (
      Array(5).fill("").map((_, i) => (
       <StarIcon w={3} h={3} mt="7px" key={i} color={i < star ? getKDAColor(kda) : "gray.500"} />
     ))
   )
  }

  const getKDAElement = (kda) => {
    return (
      <span style={{ color: getKDAColor(kda) }}>
        {roundNumber(kda)}
      </span>
    )
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
        <Text fontSize={32} className="sName" mt={10}>{username}</Text>
        {userDetail !== undefined ?
          <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} />
          :
          <div>
            Loading..
            </div>
        }

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
          <Stat>
            <StatLabel>KDA</StatLabel>
            <StatNumber>
              {totalKDA !== -1 ?
                getKDAElement(totalKDA)
                :
                <div>
                  Loading...
                </div>
              }
            </StatNumber>
            <StatHelpText>
              { kdaStarRating(totalKDA) }
            </StatHelpText>
          </Stat>
        </HStack>
        <Text fontFamily="Roboto" fontSize={14}>
          Total number of games analyzed:&nbsp;
          <span style={{ fontWeight: 600 }}>
            {numGames}
          </span>
        </Text>

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