import React from 'react';
import { Divider, Text, VStack } from '@chakra-ui/layout';
import MostKillInOneGameRanking from './MostKillInOneGameRanking';

const Ranking = () => {
  return (  
    <VStack mt="100px">
      <Text fontSize="36px" mb={10} style={{ letterSpacing: "-1px" }}>
        👑 Ranking
      </Text>

      { /* Ranking Panel */ }
      <MostKillInOneGameRanking />
      <Divider/>
    </VStack>
  );
}
 
export default Ranking;