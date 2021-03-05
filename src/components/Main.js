import { Box, Button, Center, Container, FormControl, Input, InputGroup, InputLeftElement, Spacer, Stack, Text, VStack, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const Main = () => {
  const [summonerName, setSummonerName] = useState("");

  const history = useHistory();

  return (
    <Center h="90vh">
      <Container maxW="xl" centerContent>
        <form 
        // onSubmit={() => {
        //   history.push({
        //     pathname: `/profile/${summonerName}`,
        //     state: { sName: summonerName }
        //   })
        // }}
        >
          <VStack spacing={6}>
            <Text className="title" fontSize="4xl">
              ARAM.GG
            </Text>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<i class="fas fa-user"></i>} />
                <Input type='name' placeholder='Summoner Name' aria-label='Summoner Name' width="400px"
                  onChange={(e) => { setSummonerName(e.target.value) }}
                />
              </InputGroup>
            </FormControl>
            <RouterLink to={`/profile/${summonerName}`}>
              <Button type="submit" variant="solid" size="sm" colorScheme="teal" width="40%">
                Search
              </Button>
            </RouterLink>
          </VStack>
        </form>
      </Container>
    </Center>
  );
}

export default Main;