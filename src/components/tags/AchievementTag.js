import { Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';

const rarityColor = ["676767", "#5bd75b", "#87cefa", "#ffa500", "#ff4500", "#c700fd"];
const rarityDesc = ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare", "Legendary"];

const AchievementTag = ({ achievement }) => {
  return (
    <>
      {console.log("test")}
      <Tooltip label={`[${rarityDesc[achievement.rarity]}] ${achievement.description}`}>
        <Flex direction="row" align="center" style={{ background: rarityColor[achievement.rarity], fontSize: "14px", color: 'white', padding: '0 4px', borderRadius: '4px' }}>
          {achievement.name}
        </Flex>
      </Tooltip>
    </>
  );
}

export default AchievementTag;