import { Box, Center, Divider, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchHistory from './MatchHistory';

// const
const API_KEY = "RGAPI-caff676e-3db2-4433-a046-e087af7275a4"
const SERVER = "na1"
const BASE = "https://" + SERVER + ".api.riotgames.com"
const END_POINT = "/lol/summoner/v4/summoners/by-name/"

const TEST_DATA = {
  "id": "ruq9BdLGJUNvuCDfiDyGk5FMXc1T2AUCTIB9XN2IBdTDQGc",
  "accountId": "rOhSHasXV7cWlUOentAnCvV6sKoEJJcUTCRiCONOojfYCw",
  "puuid": "jieCzVj_wYxpuQkH_3kLxGPgefjx91-sftEU8O1p0m8CkMTL7i6uWIKmIHmYgLLdsTm3L13kVBrFTg",
  "name": "Hint",
  "profileIconId": 4631,
  "revisionDate": 1613198330000,
  "summonerLevel": 168
}



const Profile = ({ location }) => {
  return (
    <Center h="90vh">
      <VStack spacing={5}>
        <Text fontSize={32} className="sName">{ location.state.sName }</Text>
        <Divider />
        <MatchHistory />
      </VStack>
      
    </Center>
  );
}
 
export default Profile;