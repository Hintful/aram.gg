import React from 'react';
import { Divider, Text, VStack } from '@chakra-ui/layout';
import MostKillInOneGameRanking from './MostKillInOneGameRanking';
import MostDeathInOneGameRanking from './MostDeathInOneGameRanking';
import MostAssistInOneGameRanking from './MostAssistInOneGameRanking';

const Ranking = () => {
  return (  
    <VStack mt="100px">
      <Text fontSize="36px" mb={10} style={{ letterSpacing: "-1px" }}>
        👑 Ranking
      </Text>

      { /* Ranking Panel */ }
      <MostKillInOneGameRanking />
      <MostAssistInOneGameRanking />
      <MostDeathInOneGameRanking />
    </VStack>
  );
}
 
export default Ranking;