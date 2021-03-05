import { Box, Center, Divider, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchHistory from './MatchHistory';
import axios from 'axios';

const Profile = ({ location }) => {
  const [userDetail, setUserDetail] = useState([]); // init
  const [userChampionStats, setUserChampionStats] = useState([]); // init
  const username = location.state.sName;

  useEffect(() => {
    // user data
    axios.get(`http://localhost:8000/aramgg/rest_api/user_detail/${username}`)
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
    
    console.log(username);
    console.log(userDetail);
    console.log(userChampionStats);
  }, []); // didComponentMount

  return (
    <Center h="auto" mb="50px">
      <VStack spacing={5}>
        <Text fontSize={32} className="sName" mt={10}>{location.state.sName}</Text>
        <Divider />
         <MatchHistory />
      </VStack>

    </Center>
  );
}

export default Profile;