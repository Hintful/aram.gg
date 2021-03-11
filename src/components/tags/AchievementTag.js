import { Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import ReactTooltip from 'react-tooltip';

const rarityColor = ["#676767", "#5bd75b", "#87cefa", "#ffa500", "#ff4500", "#c700fd"];
const rarityDesc = ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare", "Legendary"];

const AchievementTag = ({ achievement }) => {
  return (
    <>
      <ReactTooltip place="top" type="dark" effect="float"/>
        <Flex direction="row" align="center" style={{ background: rarityColor[achievement.rarity], fontSize: "14px", color: 'white', padding: '0 5px', borderRadius: '4px' }}
          data-html={true}
          data-tip={`<span style='font-weight: 600; color: ${rarityColor[achievement.rarity]}'>${rarityDesc[achievement.rarity]}</span><hr>${achievement.description}`}
        >
          {achievement.name}
        </Flex>
    </>
  );
}

export default AchievementTag;