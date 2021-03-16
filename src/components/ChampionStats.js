import { Image } from '@chakra-ui/image';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber, StatHelpText, CircularProgress, CircularProgressLabel, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import champion_data_json from './json/champion.json';
import MultikillTag from './tags/MultikillTag';
import StarTag from './tags/StarTag';
import { ChampId } from './data/ChampId';
import { roundNumber, getIndividualKDAStarRating, getDamageStarRating, getDamageElement, getDamageStyle, formatNumber, getIndividualKDAStyle, getIndividualKDAElement, getIndividualPotentialRank, getIndividualPotentialColor, getCarryPotential } from './functions/CommonFunctions';

const ChampionStats = ({ stats }) => {
  const [championData, setChampionData] = useState([]);
  const [championName, setChampionName] = useState('');
  const [kda, setKDA] = useState(null);
  const [effectiveDamage, setEffectiveDamage] = useState(null); // total damage done + total healing done
  const [damageTaken, setDamageTaken] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(null);

  const [kdaStarRating, setKdaStarRating] = useState(null);
  const [effectiveDamageStarRating, setEffectiveDamageStarRating] = useState(null);
  const [damageTakenStarRating, setDamageTakenStarRating] = useState(null);

  const [carryPotential, setCarryPotential] = useState(null);

  useEffect(() => {
    setChampionData(Object.values(JSON.parse(JSON.stringify(champion_data_json)).data));
  }, []);

  useEffect(() => {
    const championInfo = ChampId[stats.champion_id];
    if (championInfo !== undefined) {
      setChampionName(championInfo.name);
      setKDA(stats.death > 0 ? roundNumber((stats.kill + stats.assist) / stats.death) : roundNumber(stats.kill + stats.assist));
      setEffectiveDamage(stats.total_damage_done + stats.total_healing_done);
      setDamageTaken(stats.total_damage_taken);
      setTotalMinutes(stats.total_game_length / 60);
    }
  }, [championData, stats]) // run when championData finishes loading

  useEffect(() => {
    setKdaStarRating(getIndividualKDAStarRating(kda));
    setEffectiveDamageStarRating(getDamageStarRating(effectiveDamage / totalMinutes));
    setDamageTakenStarRating(getDamageStarRating(damageTaken / totalMinutes));
    setCarryPotential(getCarryPotential(stats.win, stats.loss, kdaStarRating, effectiveDamageStarRating, damageTakenStarRating));
  }, [kda, effectiveDamage, damageTaken, kdaStarRating]);

  return (
    <Flex direction="column">
      <Flex direction="row" className="champion-stats" width="auto">
        <Flex direction="column" justify="center" align="center" className="champion-icon">
          {championName !== '' ?
            <Image mb={1} className="champion-icon-image" src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${ChampId[stats.champion_id].image}`} />
            :
            <div style={{ background: 'black' }}>
            </div>
          }
          <Flex className="champion-name-label">
            <Text fontSize="sm">{championName}</Text>
          </Flex>
        </Flex>
        <Flex direction="column" mt={2}>
          <HStack ml={5} mb={2} height={5} spacing="4px" style={{ fontSize: "14px" }}>
            <MultikillTag multikill={2} count={stats.num_double_kill} />
            <MultikillTag multikill={3} count={stats.num_triple_kill} />
            <MultikillTag multikill={4} count={stats.num_quadra_kill} />
            <MultikillTag multikill={5} count={stats.num_penta_kill} />
            <MultikillTag multikill={6} count={stats.num_legendary_kill} />
          </HStack>
          <HStack>
            <HStack ml={7} mr="100px" spacing="40px">
              <Stat width="120px">
                <StatLabel>Wins</StatLabel>
                <StatNumber color="blue.300">{stats.win}</StatNumber>
                <StatHelpText>Games Won</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Losses</StatLabel>
                <StatNumber color="red.300">{stats.loss}</StatNumber>
                <StatHelpText>Games Lost</StatHelpText>
              </Stat>
              <Tooltip hasArrow label={`${roundNumber(stats.kill / (stats.win + stats.loss))} / ${roundNumber(stats.death / (stats.win + stats.loss))} / ${roundNumber(stats.assist / (stats.win + stats.loss))}`}>
                <Stat width="120px">
                  <StatLabel>KDA</StatLabel>
                  <StatNumber>{getIndividualKDAElement(kda)}</StatNumber>
                  <StatHelpText>
                    <StarTag style={getIndividualKDAStyle(kdaStarRating, true)} value={kdaStarRating} />
                  </StatHelpText>
                </Stat>
              </Tooltip>
            </HStack>
            <HStack>
              <Tooltip hasArrow label={`Damage: ${roundNumber(stats.total_damage_done / totalMinutes)} / Healing: ${roundNumber(stats.total_healing_done / totalMinutes)}`}>
                <Stat width="140px">
                  <StatLabel>Effective Damage/min</StatLabel>
                  <StatNumber>{getDamageElement(formatNumber(Math.round(effectiveDamage / totalMinutes)))}</StatNumber>
                  <StatHelpText>{
                    <StarTag style={getDamageStyle(effectiveDamageStarRating, true)} value={effectiveDamageStarRating} />
                  }</StatHelpText>
                </Stat>
              </Tooltip>
              <Stat width="140px">
                <StatLabel>Damage Taken/min</StatLabel>
                <StatNumber>{getDamageElement(formatNumber(Math.round(damageTaken / totalMinutes)))}</StatNumber>
                <StatHelpText>{
                  <StarTag style={getDamageStyle(damageTakenStarRating, true)} value={damageTakenStarRating} />
                }</StatHelpText>
              </Stat>
            </HStack>
            <Tooltip hasArrow label={`${roundNumber(carryPotential * 100)}%`}>
              <VStack>
                <Text><span style={{ fontSize: "14px", width: "auto" }}>Potential</span></Text>
                {carryPotential ?
                  <CircularProgress size="60px" thickness="5px" key={carryPotential} value={carryPotential * 100} color={getIndividualPotentialColor(carryPotential)}>
                    <CircularProgressLabel><span style={{ fontFamily: "Roboto", fontSize: "12px", color: getIndividualPotentialColor(carryPotential) }}>{getIndividualPotentialRank(carryPotential)}</span></CircularProgressLabel>
                  </CircularProgress>
                  :
                  <CircularProgress isIndeterminate size="60px" thickness="5px" color="blue.500" />
                }
              </VStack>
            </Tooltip>
          </HStack>
        </Flex>
      </Flex>
    </Flex >
  );
}

export default ChampionStats;