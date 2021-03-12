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
      <Tooltip hasArrow label={achievement.description} 
        // bg={rarityColor[achievement.rarity]}
      >
        <Flex direction="row" align="center"
          style={{
            position: 'relative',
            background: rarityColor[achievement.rarity],
            boxShadow: achievement.rarity >= 2 ? `0px 0px 3px ${(achievement.rarity - 1) / 2}px ${rarityColor[achievement.rarity]}` : 'none',
            fontSize: "14px",
            color: 'white',
            padding: '1px 5px',
            margin: '7px 5px',
            borderRadius: '4px'
          }}>
          {
            achievement.rarity === 3 ?
              <Sparkles color="yellow" count={5} overflowPx={5} fadeoutSpeed={10} flicker={false} />
              : achievement.rarity === 4 ?
                <Sparkles color={rarityColor[4]} count={25} overflowPx={15} fadeOutSpeed={20} flicker={false} />
                : achievement.rarity === 5 ?
                  <Sparkles color={rarityColor[5]} count={50} overflowPx={25} fadeOutSpeed={30} flicker={false} />
                  :
                  <>
                  </>
          }
          {
            achievement.rarity === 0 ?
              <BsCircleFill size="0.7em" />
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
      </Tooltip>
    </>
  );
}

export default AchievementTag;