import React from 'react';
import { Divider, Text, VStack } from '@chakra-ui/layout';
import MostKillInOneGameRanking from './MostKillInOneGameRanking';
import MostDeathInOneGameRanking from './MostDeathInOneGameRanking';
import MostAssistInOneGameRanking from './MostAssistInOneGameRanking';
import MostDamageDoneInOneGameRanking from './MostDamageDoneInOneGameRanking';
import MostHealingDoneInOneGameRanking from './MostHealingDoneInOneGameRanking';
import MostDamageTakenInOneGameRanking from './MostDamageDoneInOneGameRanking copy';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';

const Ranking = () => {
  const history = useHistory();
  return (  
    <VStack mt="100px">
      <Text fontSize="36px" mb={10} style={{ letterSpacing: "-1px" }}>
        👑 Ranking
      </Text>

      <Button colorScheme="teal"
        onClick={() => {
          history.push({ pathname: '/ranking/most_kills_one_game' });
        }}
      >
        Most Kills in a Single Game
      </Button>
      { /* Ranking Panel */ }
      <MostAssistInOneGameRanking />
      <MostDeathInOneGameRanking />
      <MostDamageDoneInOneGameRanking />
      <MostHealingDoneInOneGameRanking />
      <MostDamageTakenInOneGameRanking />
    </VStack>
  );
}
 
export default Ranking;