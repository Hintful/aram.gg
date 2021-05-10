import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';
import ChampionStats from './ChampionStats';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { winsAsc, winsDesc, gamesAsc, gamesDesc, kdaAsc, kdaDesc, effectiveDamageAsc, effectiveDamageDesc, damageTakenAsc, damageTakenDesc } from './functions/ComparisonFunctions';
import { Spinner } from '@chakra-ui/spinner';
import { BiChevronDown } from 'react-icons/bi';

const INITIAL_CHAMP_LOAD = 6;

const ChampionStatsContainer = ({ wins, losses, _userChampionStats }) => {
  const [userChampionStats, setUserChampionStats] = useState(null); // init

  // sort button orientations
  // 0 unselected, 1 descending, 2 ascending
  const [gamesSort, setGamesSort] = useState(0);
  const [winsSort, setWinsSort] = useState(0);
  const [kdaSort, setKdaSort] = useState(0);
  const [effectiveDamageSort, setEffectiveDamageSort] = useState(0);
  const [damageTakenSort, setDamageTakenSort] = useState(0);

  const [loadChampion, setLoadChampion] = useState(INITIAL_CHAMP_LOAD);

  const pageBottom = useRef();

  useEffect(() => {
    setUserChampionStats(_userChampionStats);
  }, [_userChampionStats])

  return (
    <>
    <VStack>
      { userChampionStats ?
        <Flex direction="row" justify="center" align="center" width="50vw" style={{ gap: "5px", margin: "20px 0" }}>
          <Button colorScheme="purple"
            onClick={() => {
              if (gamesSort === 1) { setGamesSort(2); }
              else { setGamesSort(1); }

              // TODO --------- Hacky solution; need fix
              if (gamesSort === 1) { setUserChampionStats([...userChampionStats].sort(gamesAsc)); }
              else { setUserChampionStats([...userChampionStats].sort(gamesDesc)); }

              setWinsSort(0);
              setKdaSort(0);
              setEffectiveDamageSort(0);
              setDamageTakenSort(0);
            }}
          >
            # of Games&nbsp;
            {gamesSort === 1 ? <Icon as={AiOutlineArrowDown} /> : gamesSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
          </Button>

          <Button colorScheme="purple"
            onClick={() => {
              if (winsSort === 1) { setWinsSort(2); }
              else { setWinsSort(1); }

              // TODO --------- Hacky solution; need fix
              if (winsSort === 1) { setUserChampionStats([...userChampionStats].sort(winsAsc)); }
              else { setUserChampionStats([...userChampionStats].sort(winsDesc)); }

              setGamesSort(0);
              setKdaSort(0);
              setEffectiveDamageSort(0);
              setDamageTakenSort(0);
            }}
          >
            Wins&nbsp;
            {winsSort === 1 ? <Icon as={AiOutlineArrowDown} /> : winsSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
          </Button>

          <Button colorScheme="purple"
            onClick={() => {
              if (kdaSort === 1) { setKdaSort(2); }
              else { setKdaSort(1); }

              // TODO --------- Hacky solution; need fix
              if (kdaSort === 1) { setUserChampionStats([...userChampionStats].sort(kdaAsc)); }
              else { setUserChampionStats([...userChampionStats].sort(kdaDesc)); }

              setGamesSort(0);
              setWinsSort(0);
              setEffectiveDamageSort(0);
              setDamageTakenSort(0);
            }}
          >
            KDA&nbsp;
            {kdaSort === 1 ? <Icon as={AiOutlineArrowDown} /> : kdaSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
          </Button>

          <Button colorScheme="purple"
            onClick={() => {
              if (effectiveDamageSort === 1) { setEffectiveDamageSort(2); }
              else { setEffectiveDamageSort(1); }

              // TODO --------- Hacky solution; need fix
              if (effectiveDamageSort === 1) { setUserChampionStats([...userChampionStats].sort(effectiveDamageAsc)); }
              else { setUserChampionStats([...userChampionStats].sort(effectiveDamageDesc)); }

              setGamesSort(0);
              setWinsSort(0);
              setKdaSort(0);
              setDamageTakenSort(0);
            }}
          >
            Effective Damage&nbsp;
            {effectiveDamageSort === 1 ? <Icon as={AiOutlineArrowDown} /> : effectiveDamageSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
          </Button>

          <Button colorScheme="purple"
            onClick={() => {
              if (damageTakenSort === 1) { setDamageTakenSort(2); }
              else { setDamageTakenSort(1); }

              // TODO --------- Hacky solution; need fix
              if (damageTakenSort === 1) { setUserChampionStats([...userChampionStats].sort(damageTakenAsc)); }
              else { setUserChampionStats([...userChampionStats].sort(damageTakenDesc)); }

              setGamesSort(0);
              setWinsSort(0);
              setKdaSort(0);
              setEffectiveDamageSort(0);
            }}
          >
            Damage Taken&nbsp;
            {damageTakenSort === 1 ? <Icon as={AiOutlineArrowDown} /> : damageTakenSort === 2 ? <Icon as={AiOutlineArrowUp} /> : <></>}
          </Button>
        </Flex>
        :
        <Spinner color="purple.300" mt="50px" />
      }

      {/* { userChampionStats && <Divider />} */}
      <VStack width="50vw">

        {userChampionStats ?
          <VStack>
            {userChampionStats.slice(0, loadChampion).map((stat, i) => (
              <div key={i}>
                <ChampionStats stats={stat} key={`ChampionStats-${i}`} />
                { i < loadChampion - 1 && <Divider orientation="horizontal" />}
              </div>
            ))}
            <HStack className="champion-stats-load-button" onClick={() => {
              setLoadChampion(loadChampion + 5);
              // setTimeout(() => pageBottom.current.scrollIntoView({ behavior: "smooth" }), 1000);
            }}>
              <div ref={pageBottom} />
              <Text>Load More</Text>
              <BiChevronDown />
            </HStack>
            
          </VStack>
          :
          <VStack>
            <Text mt={10} mb={5} fontWeight="600">
              Please refresh the page in a bit - we're fetching your ARAM game data!
              </Text>
            <Button colorScheme="purple" variant="outline"
              onClick={() => {
                window.location.reload();
              }}
              leftIcon={<i className="fas fa-sync-alt"></i>}
            >
              <Text mb="2px">Refresh</Text>
            </Button>
          </VStack>
        }
      </VStack>
      
    </VStack>
    </>
  );
}

export default ChampionStatsContainer;