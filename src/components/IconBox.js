import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';

const IconBox = ({ profile_icon_id, level }) => {
  return (
    <Box className="icon-box" boxSize="100px">
      <Image src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/profileicon/${profile_icon_id}.png`} />
      <Box className="icon-box-level-badge">
        {level}
      </Box>
    </Box>
  );
}

export default IconBox;