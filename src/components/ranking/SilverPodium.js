import { Image } from '@chakra-ui/image';
import { Flex, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';
import { Link } from 'react-router-dom';
import IconBox from '../IconBox';
import { bgColorRGBA, bgColor } from './ColorData';
import { getURLName } from '../ChampionStats';

const SilverPodium = ({ username, profile_icon, level, value, showChampion = true, championName = '', unit }) => {
  return (
    <Link to={`/profile/${username}`}>
      <Flex className="rank-element" p="40px" mt="50px" direction="column" align="center" justify="center" style={{ background: bgColorRGBA.silver, boxShadow: `0 10px 0px ${bgColor.silver}` }}>
        <IconBox profile_icon_id={profile_icon} level={level} showStarRating={false} />
        <Text fontFamily="Source Sans Pro" fontSize="18px"><span style={{ fontWeight: 600 }}>{username.toUpperCase()}</span></Text>
        <Text fontFamily="Source Sans Pro" fontSize="14px">🥈 <span style={{ fontWeight: 600 }}>{value}</span> {unit}</Text>

        {showChampion &&
          <VStack mt={7} spacing="5px">
            {championName !== '' ?
              <Image w="40px" key={championName} src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${getURLName(championName)}.png`} />
              :
              <Spinner size="40px" color="teal.500" />
            }
            <Text fontFamily="Source Sans Pro" fontSize="14px"><span style={{ fontWeight: 600 }}>{championName}</span></Text>
          </VStack>
        }
      </Flex>
    </Link>
  );
}

export default SilverPodium;