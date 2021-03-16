import { HStack, Text, VStack } from "@chakra-ui/layout";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import { Tooltip } from "@chakra-ui/tooltip";
import { getWinrateColor, roundNumber, getOverallPotentialColor, getOverallPotentialRank } from './functions/CommonFunctions';

const WinratePerformance = ({ wins, losses, performance}) => {
  return (
    <HStack p="20px" spacing="50px">
      <VStack>
        <Text fontWeight="600">Winrate</Text>
        {wins ?
          <CircularProgress size="100px" thickness="5px" value={wins/ (wins + losses) * 100} color={getWinrateColor(wins / (wins + losses))}>
            <CircularProgressLabel ml="1px" mt="-3px" ><span style={{ fontFamily: "Roboto", fontSize: "18px" }}>{roundNumber(wins / (wins + losses) * 100)}%</span></CircularProgressLabel>
          </CircularProgress>
          :
          <CircularProgress isIndeterminate size="100px" thickness="5px" color="purple.200">

          </CircularProgress>
        }
      </VStack>
      <Tooltip hasArrow label={`${roundNumber(performance * 100)}%`}>
        <VStack>
          <Text fontWeight="600">Performance</Text>
          {performance ?
            <CircularProgress size="100px" thickness="5px" value={performance * 100} color={getOverallPotentialColor(performance)}>
              <CircularProgressLabel ml="1px" mt="-3px" ><span style={{ fontFamily: "Roboto", fontSize: "18px", color: getOverallPotentialColor(performance) }}>{getOverallPotentialRank(performance)}</span></CircularProgressLabel>
            </CircularProgress>
            :
            <CircularProgress isIndeterminate size="100px" thickness="5px" color="purple.200">

            </CircularProgress>
          }
        </VStack>
      </Tooltip>
    </HStack>
  );
}

export default WinratePerformance;