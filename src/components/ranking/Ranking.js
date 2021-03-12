import React from 'react';
import { Divider, Text, VStack } from '@chakra-ui/layout';
import MostKillInOneGameRanking from './MostKillInOneGameRanking';
import MostDeathInOneGameRanking from './MostDeathInOneGameRanking';
import MostAssistInOneGameRanking from './MostAssistInOneGameRanking';
import MostDamageDoneInOneGameRanking from './MostDamageDoneInOneGameRanking';
import MostHealingDoneInOneGameRanking from './MostHealingDoneInOneGameRanking';
import MostDamageTakenInOneGameRanking from './MostDamageDoneInOneGameRanking';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';

const Ranking = () => {
  const history = useHistory();
  return (
    <VStack mt="100px">
      <Text fontSize="36px" mb={10} style={{ letterSpacing: "-1px" }}>
        👑 Ranking
      </Text>

      <VStack spacing="20px">
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_kills_one_game' });
          }}
        >
          Most Kills in a Single Game
        </Button>
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_assists_one_game' });
          }}
        >
          Most Assists in a Single Game
        </Button>
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_deaths_one_game' });
          }}
        >
          Most Deaths in a Single Game
        </Button>
        <Divider />
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_damage_done_one_game' });
          }}
        >
          Most Damage Done in a Single Game
        </Button>
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_damage_taken_one_game' });
          }}
        >
          Most Damage Taken in a Single Game
        </Button>
        <Button colorScheme="blue"
          onClick={() => {
            history.push({ pathname: '/ranking/most_healing_done_one_game' });
          }}
        >
          Most Healing Done in a Single Game
        </Button>
      </VStack>
    </VStack >
  );
}

export default Ranking;