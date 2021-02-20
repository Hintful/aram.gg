import { Box, Center, Divider, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { m } from 'framer-motion';
import React from 'react';
import MatchInfo from './MatchInfo';

function getNumWins(matches) {
  return matches.filter(match => (match.victory)).length
}

const MatchHistory = () => {
  const placeholderMatches = [
    {
      victory: true
    },
    {
      victory: true
    },
    {
      victory: false
    },
    {
      victory: true
    },
    {
      victory: false
    }
  ]

  const matchesStat = {
    wins: getNumWins(placeholderMatches),
    losses: placeholderMatches.length - getNumWins(placeholderMatches)
  }

  return (
    <Box h="50vh" w="80vw">
      <Center mb={3}>
        <StatGroup w="50%">
          <Stat>
            <StatLabel>Wins</StatLabel>
            <StatNumber>{ matchesStat.wins }</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />1
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Losses</StatLabel> 
            <StatNumber>{ matchesStat.losses }</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Win-rate</StatLabel>
            <StatNumber>{ matchesStat.wins / placeholderMatches.length * 100 }%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />10%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Center>
      
      <Divider />

      <VStack spacing={4} mt={5}>
        {placeholderMatches.map(match => (
          <MatchInfo matchInfo={match} />
        ))}
      </VStack>
    </Box>
  );
}

export default MatchHistory;