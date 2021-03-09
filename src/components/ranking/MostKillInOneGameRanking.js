import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import IconBox from '../IconBox';
import { Link } from 'react-router-dom';

const bgColor = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700'
}
const bgColorRGBA = {
  bronze: 'rgba(205,127,50,0.6)',
  silver: 'rgba(192,192,192,0.6)',
  gold: 'rgba(255,215,0,0.6)'
}

const MostKillInOneGameRanking = () => {

  const [rankingData, setRankingData] = useState(null);

  // parse user data
  const goldUserData = rankingData ? rankingData[0]["1"].user : null;
  const silverUserData = rankingData ? rankingData[1]["2"].user : null;
  const bronzeUserData = rankingData ? rankingData[2]["3"].user : null;

  // parse record
  const goldRecord = rankingData ? rankingData[0]["1"]: null
  const silverRecord = rankingData ? rankingData[1]["2"] : null
  const bronzeRecord = rankingData ? rankingData[2]["3"] : null

  async function getRankingData() {
    // ranking data
    axios.get('http://localhost:8000/aramgg/rest_api/ranking/most_kill_in_one_game/')
      .then(res => {
        setRankingData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getRankingData();
  }, []);

  return (
    <VStack mt="50px" mb={10}>
      <Text fontFamily="Roboto Condensed" fontSize="24px">⚔️ Most Kills in One Game</Text>
      <HStack spacing="40px">
        {rankingData &&
          <>
            <Link to={`/profile/${silverUserData.username}`}>
              <Flex className="rank-element" p="20px" mt="50px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.silver, boxShadow: `0 10px 7px ${bgColor.silver}` }}>
                <IconBox profile_icon_id={silverUserData.profile_icon} level={silverUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="16px">{silverUserData.username.toUpperCase()}</Text>
                <Text fontFamily="Source Sans Pro" fontSize="16px">🥈 <span style={{ fontWeight: 600 }}>{silverRecord.max_kill}</span> Kills</Text>
              </Flex>
            </Link>
            <Link to={`/profile/${goldUserData.username}`}>
              <Flex className="rank-element" p="20px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.gold, boxShadow: `0 10px 7px ${bgColor.gold}` }}>
                <IconBox profile_icon_id={goldUserData.profile_icon} level={goldUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="16px">{goldUserData.username.toUpperCase()}</Text>
                <Text fontFamily="Source Sans Pro" fontSize="16px">🥇 <span style={{ fontWeight: 600 }}>{goldRecord.max_kill}</span> Kills</Text>
              </Flex>
            </Link>
            <Link to={`/profile/${bronzeUserData.username}`}>
              <Flex className="rank-element" p="20px" mt="100px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.bronze, boxShadow: `0 10px 7px ${bgColor.bronze}` }}>
                <IconBox profile_icon_id={bronzeUserData.profile_icon} level={bronzeUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="16px">{bronzeUserData.username.toUpperCase()}</Text>
                <Text fontFamily="Source Sans Pro" fontSize="16px">🥉 <span style={{ fontWeight: 600 }}>{bronzeRecord.max_kill}</span> Kills</Text>
              </Flex>
            </Link>
          </>
        }
      </HStack>
    </VStack>
  );
}

export default MostKillInOneGameRanking;