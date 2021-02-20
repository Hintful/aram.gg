import { Box, Badge } from '@chakra-ui/react';
import React from 'react';

const MatchInfo = ({ matchInfo }) => {
  const bg = matchInfo.victory ? "#9dceff" : "#e16262";

  return (  
    <Box w="90%" h="120px" bg={bg} rounded="md">
      { matchInfo.victory ? 
        <Badge colorScheme="blue" ml="7px" mt="7px">Victory</Badge> :
        <Badge colorScheme="red" ml="7px" mt="7px">Defeat</Badge>
      }
    </Box>
  );
}
 
export default MatchInfo;