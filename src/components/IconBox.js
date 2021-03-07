import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, Text, VStack, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect } from 'react';
import { kdaStarRating } from './Profile.js';

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