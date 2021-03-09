import Icon from '@chakra-ui/icon';
import { Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { GiDiceSixFacesTwo, GiDiceSixFacesThree, GiDiceSixFacesFour, GiDiceSixFacesFive, GiDiceSixFacesSix } from 'react-icons/gi'

const tagColor = {
  double: "#5bd75b",
  triple: "#87cefa",
  quadra: "#ffa500",
  penta: "#ff4500",
  legendary: "#c700fd"
}

const MultikillTag = ({ multikill, count }) => {
  if (count > 0) {
    if (multikill === 2) {
      return (
        <Tooltip hasArrow label={count !== 1 ? `${count} Double Kills` : `${count} Double Kill`}>
          <Flex direction="row" align="center" style={{ background: tagColor.double, color: 'white', padding: "0 4px", borderRadius: "4px" }}>
            <Icon as={GiDiceSixFacesTwo} />&nbsp;{count}
          </Flex>
        </Tooltip>
      )
    } else if (multikill === 3) {
      return (
        <Tooltip hasArrow label={count !== 1 ? `${count} Triple Kills` : `${count} Triple Kill`}>
          <Flex direction="row" align="center" style={{ background: tagColor.triple, color: 'white', padding: "0 4px", borderRadius: "4px" }}>
            <Icon as={GiDiceSixFacesThree} />&nbsp;{count}
          </Flex>
        </Tooltip>
      )
    } else if (multikill === 4) {
      return (
        <Tooltip hasArrow label={count !== 1 ? `${count} Quadra Kills` : `${count} Quadra Kill`}>
          <Flex direction="row" align="center" style={{ background: tagColor.quadra, color: 'white', padding: "0 4px", borderRadius: "4px" }}>
            <Icon as={GiDiceSixFacesFour} />&nbsp;{count}
          </Flex>
        </Tooltip>
      )
    } else if (multikill === 5) {
      return (
        <Tooltip hasArrow label={count !== 1 ? `${count} Penta Kills` : `${count} Penta Kill`}>
          <Flex direction="row" align="center" style={{ background: tagColor.penta, color: 'white', padding: "0 4px", borderRadius: "4px" }}>
            <Icon as={GiDiceSixFacesFive} />&nbsp;{count}
          </Flex>
        </Tooltip>
      )
    } else if (multikill >= 6) {
      return (
        <Tooltip hasArrow label={count !== 1 ? `${count} Legendary Kills` : `${count} Legendary Kill`}>
          <Flex direction="row" align="center" style={{ background: tagColor.legendary, color: 'white', padding: "0 4px", borderRadius: "4px" }}>
            <Icon as={GiDiceSixFacesSix} />&nbsp;{count}
          </Flex>
        </Tooltip>
      )
    }
  } else {
    return <div></div>
  }
}
 
export default MultikillTag;