import { Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { BsCircleFill, BsTriangleFill, BsSquareFill, BsPentagonFill, BsStarFill, BsFillXDiamondFill } from 'react-icons/bs';
import Sparkles from 'react-sparkle';

const rarityColor = ["#676767", "#5bd75b", "#87cefa", "#ffa500", "#ff4500", "#c700fd"];
const rarityDesc = ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare", "Legendary"];

const AchievementTag = ({ achievement }) => {
  return (
    <>
      <ReactTooltip place="top" type="dark" effect="float"/>
        <Flex direction="row" align="center" 
        style={{ 
          position: 'relative',
          background: rarityColor[achievement.rarity], 
          boxShadow: achievement.rarity >= 2 ? `0px 0px 3px ${(achievement.rarity - 1)/2}px ${rarityColor[achievement.rarity]}` : 'none',
          fontSize: "14px", 
          color: 'white', 
          padding: '0 5px', 
          borderRadius: '4px' }}
          data-html={true}
          data-tip={`<span style='font-weight: 600; color: ${rarityColor[achievement.rarity]}'>${rarityDesc[achievement.rarity]}</span><hr>${achievement.description}`}
        >
          {
            achievement.rarity === 3 ?
            <Sparkles color="yellow" count={5} overflowPx={5} fadeoutSpeed={5} flicker={false} />
            : achievement.rarity === 4 ? 
            <Sparkles color="red" count={25} overflowPx={10} fadeOutSpeed={25} flicker={false} />
            : achievement.rarity === 5 ?
            <Sparkles color="pink" count={50} overflowPx={20} fadeOutSpeed={50} flicker={false} />
            :
            <>
            </>
          }
          { 
            achievement.rarity === 0 ?
            <BsCircleFill size="0.8em" />
            : achievement.rarity === 1 ?
            <BsTriangleFill size="0.8em" />
            : achievement.rarity === 2 ?
            <BsSquareFill size="0.8em" />
            : achievement.rarity === 3 ?
            <BsPentagonFill size="0.9em" />
            : achievement.rarity === 4 ?
            <BsStarFill />
            : <BsFillXDiamondFill />
          }
          &nbsp;{achievement.name}
        </Flex>
    </>
  );
}

export default AchievementTag;