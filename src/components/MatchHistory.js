import { Box, Button, Center, Divider, Flex, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { m } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import MatchInfo from './MatchInfo';

const SAMPLE_MATCH_SIZE = 250;
const RENDER_MATCH_SIZE = 10;

function getNumWins(matches) {
  return matches.filter(match => (match.victory)).length
}

const getMatchData = () => {
  const matches = []
  for (let i = 0; i < SAMPLE_MATCH_SIZE; i++) {
    matches.push({
      victory: Math.floor(Math.random() * 2),
      playRating: Math.floor(Math.random() * 6)
    })
  }

  return matches;
}

const MatchHistory = () => {
  const placeholderMatches = getMatchData();
  const [numViewableMatches, setNumViewableMatches] = useState(RENDER_MATCH_SIZE)
  
  const matchesStat = {
    wins: getNumWins(placeholderMatches),
    losses: placeholderMatches.length - getNumWins(placeholderMatches)
  }

  return (
    <Flex w="80vw" flexDirection="column">
      <Center mb={3}>
        <StatGroup w="50%">
          <Stat>
            <StatLabel>Wins</StatLabel>
            <StatNumber>{matchesStat.wins}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />1
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Losses</StatLabel>
            <StatNumber>{matchesStat.losses}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Win-rate</StatLabel>
            <StatNumber>{(matchesStat.wins / placeholderMatches.length * 100).toFixed(1)}%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />10%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Center>

      <Divider />

      <VStack spacing={4} mt={5} mb={20}>
        {placeholderMatches.slice(0, numViewableMatches).map(match => (
          <MatchInfo matchInfo={match} />
        ))}
      </VStack>

      <Button colorScheme="teal" size="md" onClick={() => { setNumViewableMatches(numViewableMatches + RENDER_MATCH_SIZE)}}>
        <i className="fas fa-caret-down fa-lg"></i> &nbsp;View More Matches
      </Button>
    </Flex>
  );
}

export default MatchHistory;