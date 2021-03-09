import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, Text, VStack, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect } from 'react';
import { getKDAStyle } from './Profile';

const kdaStarRating = (kda, starSize = 3) => {
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

const IconBox = ({ profile_icon_id, level, totalKDA }) => {
  return (
    <VStack mb={5}>
      { profile_icon_id ?
        <Box className="icon-box" boxSize="100px" mb={-2}>
          <Image className="icon-box-image" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/profileicon/${profile_icon_id}.png`} />
          <Box className="icon-box-level-badge">
            {level}
          </Box>
        </Box>
        :
        <Flex align="center" justify="center" boxSize="100px" mb={-2}>
          <Spinner color="teal.500" />
        </Flex>
      }
      <Flex flexDirection="row">
        {kdaStarRating(totalKDA, 5)}
      </Flex>
    </VStack>
  );
}

export default IconBox;