import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Stack direction={'column'}>
      <Stack direction={'row'} pt="8px" pl="8px">
        <Link to='/'>
          <Text className="navbar-logo" fontSize={20}>
            ARAM.GG
          </Text>
        </Link>
      </Stack>
      <Divider />
    </Stack>
  );
}
 
export default Navbar;