import { HStack } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { getOverallKDAElement } from './functions/CommonFunctions';


const WinLossKDA = ({ wins, losses, KDA }) => {
  return (
    <HStack spacing="40px">
      <Stat width="120px">
        <StatLabel>Wins</StatLabel>
        <StatNumber color="blue.300">
          {wins}
        </StatNumber>
        <StatHelpText>Games Won</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Losses</StatLabel>
        <StatNumber color="red.300">
          {losses}
        </StatNumber>
        <StatHelpText>Games Lost</StatHelpText>
      </Stat>
      <Stat width="160px">
        <StatLabel>KDA</StatLabel>
        <StatNumber>
          {getOverallKDAElement(KDA)}
        </StatNumber>
        <StatHelpText>
          Over {wins + losses} Games
            </StatHelpText>
      </Stat>
    </HStack>
  );
}

export default WinLossKDA;