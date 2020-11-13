//converts the egg group in dataset to user friendly translation
const convertEggGroup = (eggGroup) => {
  switch (eggGroup) {
    case 'monster':
      return 'Monster';
    case 'water1':
      return 'Water 1';
    case 'bug':
      return 'Bug';
    case 'flying':
      return 'Flying';
    case 'ground':
      return 'Field';
    case 'fairy':
      return 'Fairy';
    case 'plant':
      return 'Grass';
    case 'humanshape':
      return 'Human-Like';
    case 'water3':
      return 'Water 3';
    case 'mineral':
      return 'Mineral';
    case 'indeterminate':
      return 'Amorphous';
    case 'water2':
      return 'Water 2';
    case 'ditto':
      return 'Ditto';
    case 'dragon':
      return 'Dragon';
    case 'no-eggs':
      return 'Undiscovered';
  }
};

const convertEVYield = (integer) => {
  if (integer === 0) {
    return 'HP';
  } else if (integer === 1) {
    return 'Attack';
  } else if (integer === 2) {
    return 'Defense';
  } else if (integer === 3) {
    return 'Sp. Attack';
  } else if (integer === 4) {
    return 'Sp. Defense';
  } else if (integer === 5) {
    return 'Speed';
  }
};

const formatAbility = ability => {
    formattedAbility = ability.replace(/-/g, " ");
    formattedAbility = capitaliseWord(formattedAbility);
    return formattedAbility;
}

const formatMove = move => {
    formattedMove = move.replace(/-/g, " ");
    formattedMove = capitaliseWord(formattedMove);
    return formattedMove;
}

const sortAndRemoveDuplicates = array => {
    //sorts all levels used
  array = array.sort((a, b) => (a > b ? 1 : -1));
  //removes duplicates from levels used
  array = Array.from(new Set(array));
  return array;
}