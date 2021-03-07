import { Avatar, AvatarBadge, Box, Center, Divider, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchHistory from './MatchHistory';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IconBox from './IconBox';
import ChampionStats from './ChampionStats';

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
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

  useEffect(() => {
    getUserData();
  }, []); // didComponentMount

  return (
    <Center h="auto" mb="50px">
      <VStack spacing={5}>
        <Text fontSize={32} className="sName" mt={10}>{username}</Text>
          { userDetail !== undefined ?
            <IconBox profile_icon_id={userDetail.profile_icon} level={userDetail.level} />
            :
            <div>
              Loading..
            </div>
          }
        <Divider />

        {userChampionStats.map((stat, i) =>
          <ChampionStats stats={stat} key={i} />
        )}
      </VStack>

    </Center>
  );
}

export default Profile;