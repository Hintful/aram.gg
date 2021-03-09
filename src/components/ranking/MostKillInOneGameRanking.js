import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import IconBox from '../IconBox';
import { Link } from 'react-router-dom';
import champion_data_json from '../json/champion.json';
import { getURLName } from '../ChampionStats';
import { Image } from '@chakra-ui/image';
import { v4 as uuidv4 } from 'uuid';

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
  const [championData, setChampionData] = useState([]);

  // parse user data
  const goldUserData = rankingData ? rankingData[0]["1"].user : null;
  const silverUserData = rankingData ? rankingData[1]["2"].user : null;
  const bronzeUserData = rankingData ? rankingData[2]["3"].user : null;

  // parse record
  const goldRecord = rankingData ? rankingData[0]["1"] : null
  const silverRecord = rankingData ? rankingData[1]["2"] : null
  const bronzeRecord = rankingData ? rankingData[2]["3"] : null

  // used champion info
  const [goldChampionName, setGoldChampionName] = useState('');
  const [silverChampionName, setSilverChampionName] = useState('');
  const [bronzeChampionName, setBronzeChampionName] = useState('');

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

  useEffect(() => {
    // load champion.json
    setChampionData(Object.values(JSON.parse(JSON.stringify(champion_data_json)).data));
  }, [])

  useEffect(() => {
    let goldChampionInfo = undefined;
    let silverChampionInfo = undefined;
    let bronzeChampionInfo = undefined;

    if (championData.length > 0) {
      goldChampionInfo = championData.filter(data => parseInt(data.key) === (goldRecord ? goldRecord.champ_id : ''))[0];
      silverChampionInfo = championData.filter(data => parseInt(data.key) === (silverRecord ? silverRecord.champ_id : ''))[0];
      bronzeChampionInfo = championData.filter(data => parseInt(data.key) === (bronzeRecord ? bronzeRecord.champ_id : ''))[0];

      if (goldChampionInfo !== undefined) { setGoldChampionName(goldChampionInfo.name) }
      if (silverChampionInfo !== undefined) { setSilverChampionName(silverChampionInfo.name) }
      if (bronzeChampionInfo !== undefined) { setBronzeChampionName(bronzeChampionInfo.name) }
    }
  }, [championData, goldRecord, silverRecord, bronzeRecord])

  return (
    <VStack mt="50px" mb={10}>
      <Text fontFamily="Roboto Condensed" fontSize="24px">⚔️ Most Kills in One Game</Text>
      <HStack spacing="40px">
        {rankingData &&
          <>
            <Link to={`/profile/${silverUserData.username}`}>
              <Flex className="rank-element" p="40px" mt="50px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.silver, boxShadow: `0 10px 0px ${bgColor.silver}` }}>
                <IconBox profile_icon_id={silverUserData.profile_icon} level={silverUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="18px"><span style={{ fontWeight: 600 }}>{silverUserData.username.toUpperCase()}</span></Text>
                <Text fontFamily="Source Sans Pro" fontSize="14px">🥈 <span style={{ fontWeight: 600 }}>{silverRecord.max_kill}</span> Kills</Text>

                <VStack mt={7} spacing="5px">
                  {console.log(silverChampionName)}
                  {silverChampionName !== '' ?
                    <Image w="40px" key={silverChampionName} src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(silverChampionName)}.png`} />
                    :
                    <>
                    </>
                  }
                  <Text fontFamily="Source Sans Pro" fontSize="14px"><span style={{ fontWeight: 600 }}>{silverChampionName}</span></Text>
                </VStack>
              </Flex>
            </Link>
            <Link to={`/profile/${goldUserData.username}`}>
              <Flex className="rank-element" p="40px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.gold, boxShadow: `0 10px 0px ${bgColor.gold}` }}>
                <IconBox profile_icon_id={goldUserData.profile_icon} level={goldUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="18px"><span style={{ fontWeight: 600 }}>{goldUserData.username.toUpperCase()}</span></Text>
                <Text fontFamily="Source Sans Pro" fontSize="14px">🥇 <span style={{ fontWeight: 600 }}>{goldRecord.max_kill}</span> Kills</Text>

                <VStack mt={7} spacing="5px">
                  {goldChampionName !== '' ?
                    <Image w="40px" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(goldChampionName)}.png`} />
                    :
                    <>
                    </>
                  }
                  <Text fontFamily="Source Sans Pro" fontSize="14px"><span style={{ fontWeight: 600 }}>{goldChampionName}</span></Text>
                </VStack>
              </Flex>
            </Link>
            <Link to={`/profile/${bronzeUserData.username}`}>
              <Flex className="rank-element" p="40px" mt="100px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.bronze, boxShadow: `0 10px 0px ${bgColor.bronze}` }}>
                <IconBox profile_icon_id={bronzeUserData.profile_icon} level={bronzeUserData.level} showStarRating={false} />
                <Text fontFamily="Source Sans Pro" fontSize="18px"><span style={{ fontWeight: 600 }}>{bronzeUserData.username.toUpperCase()}</span></Text>
                <Text fontFamily="Source Sans Pro" fontSize="14px">🥉 <span style={{ fontWeight: 600 }}>{bronzeRecord.max_kill}</span> Kills</Text>

                <VStack mt={7} spacing="5px">
                  {bronzeChampionName !== '' ?
                    <Image w="40px" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(bronzeChampionName)}.png`} />
                    :
                    <>
                    </>
                  }
                  <Text fontFamily="Source Sans Pro" fontSize="14px"><span style={{ fontWeight: 600 }}>{bronzeChampionName}</span></Text>
                </VStack>
              </Flex>
            </Link>
          </>
        }
      </HStack>
    </VStack>
  );
}

export default MostKillInOneGameRanking;