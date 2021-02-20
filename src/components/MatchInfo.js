import { StarIcon } from '@chakra-ui/icons';
import { Box, Badge } from '@chakra-ui/react';
import React from 'react';

const MatchInfo = ({ matchInfo }) => {
  const bg = matchInfo.victory ? "#9dceff" : "#e16262";
  const starColor = matchInfo.victory ? "#3b9dff" : "#d83131"

  return (  
    <Box w="90%" h="120px" bg={bg} rounded="md">
      { matchInfo.victory ? 
        <Badge colorScheme="blue" ml="7px" mt="7px" mr="4px">Victory</Badge> :
        <Badge colorScheme="red" ml="7px" mt="7px" mr="4px">Defeat</Badge>
      }
      { Array(5).fill("").map((_, i) => (
        <StarIcon w={3} h={3} mt="7px" key={i} color={i < matchInfo.playRating ? starColor : "gray.500"} />
      ))}
    </Box>
  );
}
 
export default MatchInfo;