import { Box, HStack, Divider, FormControl, Input, InputGroup, Stack, Text, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const [summonerName, setSummonerName] = useState('');
  const history = useHistory();

  return (
    <Stack direction={'column'} style={{ position: 'fixed', top: '0', left: '0', width: '100%', background: 'rgba(255,255,255,0.8)', zIndex: "1" }}>
      <HStack justify="space-between" pt="8px" pl="8px">
        <HStack>
          <Link to='/'>
            <Text className="navbar-logo" fontSize={20}>
              ARAM.GG
          </Text>
          </Link>
          <Link to='/ranking'>
            <Text fontFamily="Roboto Condensed" ml={3} fontSize={16}>
              👑 Ranking
            </Text>
          </Link>
        </HStack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSummonerName('');
            history.push({
              pathname: `/profile/${summonerName}`
            })
          }}
        >
          <FormControl isRequired>
            <HStack spacing={0} mr={2}>
              <InputGroup>
                <Input type='name' value={summonerName} size="sm" placeholder='Summoner Name' aria-label="Summoner Name" width="250px"
                  onChange={(e) => { setSummonerName(e.target.value) }}
                />
              </InputGroup>
              <Button type="submit" variant="solid" size="sm" colorScheme="teal">
                <i className="fas fa-search"></i>
              </Button>
            </HStack>
          </FormControl>
        </form>
      </HStack>
      <Divider />
    </Stack>
  );
}

export default Navbar;