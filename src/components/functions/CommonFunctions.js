import { HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export const roundNumber = (num, dec = 1) => {
  return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}

export const getWinrateColor = (winrate) => {
  if (winrate < 0.4) { return '#ababab'; }
  else if (winrate < 0.5) { return '#676767'; }
  else if (winrate < 0.6) { return '#90ee90'; }
  else if (winrate < 0.7) { return '#87cefa'; }
  else if (winrate < 0.8) { return '#ffa500'; }
  else { return '#ff4500'; }
}

export const getOverallPotentialRank = (potential) => {
  const potentialThreshold = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 1, 100];
  const potentialRank = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+', 'SS', 'SSS'];

  for (let i = 0; i < potentialThreshold.length; i++) {
    if (potential < potentialThreshold[i]) {
      return potentialRank[i];
    }
  }
}

export const getIndividualPotentialRank = (potential) => {
  const potentialThreshold = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 100];
  const potentialRank = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+', 'SS', 'SSS'];

  for (let i = 0; i < potentialThreshold.length; i++) {
    if (potential < potentialThreshold[i]) {
      return potentialRank[i];
    }
  }
}

export const getCarryPotential = (wins, losses, kdaStarRating, effectiveDamageStarRating, damageTakenStarRating) => {
  const starRatingPotential = (kdaStarRating + Math.max(effectiveDamageStarRating, damageTakenStarRating)) / 10;
  return starRatingPotential;
}

export const getOverallPotentialColor = (potential) => {
  if (potential < 0.2) { return '#ababab'; }
  else if (potential < 0.43) { return '#676767'; }
  else if (potential < 0.55) { return '#90ee90'; }
  else if (potential < 0.65) { return '#87cefa'; }
  else if (potential < 0.8) { return '#ffa500'; }
  else if (potential < 0.9) { return '#ff4500'; }
  else { return '#d900e4'; }
}


export const getIndividualPotentialColor = (potential) => {
  if (potential < 0.3) { return '#ababab'; }
  else if (potential < 0.5) { return '#676767'; }
  else if (potential < 0.65) { return '#90ee90'; }
  else if (potential < 0.75) { return '#87cefa'; }
  else if (potential < 0.9) { return '#ffa500'; }
  else if (potential < 1) { return '#ff4500'; }
  else { return '#d900e4'; }
}


export const getOverallKDAStyle = (kda, shadow = false) => {
  if (kda < 1.0) { return { color: '#ababab' }; }
  else if (kda < 2.0) { return { color: '#676767' }; }
  else if (kda < 3.0) { return { color: '#90ee90' }; }
  else if (kda < 3.7) { return { color: '#87cefa' }; }
  else if (kda < 4.3) { return { color: '#ffa500', textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

export const getIndividualKDAStyle = (rating, shadow = false) => {
  if (rating < 1) { return { color: '#ababab' }; }
  else if (rating < 2) { return { color: '#676767' }; }
  else if (rating < 3) { return { color: '#90ee90' }; }
  else if (rating < 4) { return { color: '#87cefa' }; }
  else if (rating < 5) { return { color: '#ffa500', textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

export const getDamageStyle = (rating, shadow = false) => {
  if (rating < 1) { return { color: "#ababab" }; }
  else if (rating < 2) { return { color: "#676767" }; }
  else if (rating < 3) { return { color: "#90ee90" }; }
  else if (rating < 4) { return { color: "#87cefa" }; }
  else if (rating < 5) { return { color: "#ffa500", textShadow: shadow ? '0px 0px 4px #ffa500' : '0' }; }
  else { return { color: '#ff4500', textShadow: shadow ? '0px 0px 4px #ff4500' : '0' }; }
}

export const getDamageStarRating = (value) => {
  if (value < 500) { return value / 500; }
  else if (value < 1000) { return 1 + (value - 500)/500; }
  else if(value < 1400) { return 2 + (value - 1000)/400; }
  else if(value < 1800) { return 3 + (value - 1400)/400; }
  else if(value < 2350) { return 4 + (value - 1850)/550; }
  else { return 5; }
}

export const getDamageElement = (value) => {
  return (
    <span style={getDamageStyle(getDamageStarRating(parseInt(value.split(',').join(''))))}>
      {value}
    </span>
  )
}


export const getOverallKDAElement = (kda) => {
  if (kda) {
    return (
      <span style={getOverallKDAStyle(kda)}>
        {roundNumber(kda)}
      </span>
    )
  } else {
    return (
      <HStack>
        <Spinner color="purple.300" size="sm" />
        <Text>Loading...</Text>
      </HStack>
    )
  }
}

export const getOverallKDAStarRating = (kda) => {
  if (kda < 2) { return kda / 1; }
  else if(kda < 2.8) { return 2 + (kda - 2)/0.8; }
  else if(kda < 3.5) { return 3 + (kda - 2.8)/0.7; }
  else if(kda < 4.5) { return 4 + (kda - 3.5); }
  else { return 5; }
}

export const getIndividualKDAStarRating = (kda) => {
  if (kda < 2) { return kda / 1; }
  else if(kda < 2.8) { return 2 + (kda - 2)/0.8; }
  else if(kda < 3.5) { return 3 + (kda - 2.8)/0.7; }
  else if(kda < 4.5) { return 4 + (kda - 3.5); }
  else { return 5; }
}

export const getIndividualKDAElement = (kda) => {
  return (
    <span style={getIndividualKDAStyle(getOverallKDAStarRating(kda))}>
      {kda}
    </span>
  )
}

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}