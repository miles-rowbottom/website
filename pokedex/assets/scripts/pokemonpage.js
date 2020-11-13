//code for correct operations within individual pokemon page

//initiates globally used data arrays
let pokemonData;
let speciesData;
let evolutionChainData;

//delegates the opening of the pokemon page to functions throughout the JS file
const initiatePokemonPageFill = async (data) => {
  pokemonData = data;
  createSpeciesData(pokemonData.id);
  //awaits to allow data to be fetched before continuing
  await resolveDelay(1250);
  console.log(pokemonData);
  console.log(speciesData);
  console.log(evolutionChainData);
  window.scrollTo(0, 0);
  populateNavigationBar();
  populateHeader();
  fillPokemonDescription();
  fillPokemonMainImage();
  fillPokemonBaseStats();
  fillPokemonPokedexData();
  fillPokemonTraining();
  fillPokemonBreeding();
  fillPokemonTypeDefenses();
  //see evolutionChain.js
  resetEvolutionData();
  //see evolutionChain.js
  fillEvolutionChain();
  openPokemonPage();
};

//fills in the navigation bar at the top for the loaded pokemon
const populateNavigationBar = () => {
  //loads previous pokemon navigation
  let previousPokemonID;
  let previousPokemonName;
  if (pokemonData.id - 1 === 0) {
    //doesn't load previous pokemon if this is first pokemon in dataset
    POKEMON_PAGE_PREVIOUS_POKEMON.textContent = '';
  } else {
    previousPokemonID = pokemonData.id - 1;
    let formattedPreviousPokemonID = formatPokemonID(previousPokemonID);
    previousPokemonName =
      fullPokemonUsefulArray[`${previousPokemonID - 1}`].name;
    let formattedPreviousPokemonName = capitaliseWord(previousPokemonName);
    POKEMON_PAGE_PREVIOUS_POKEMON.textContent = `Previous: ${formattedPreviousPokemonName} #${formattedPreviousPokemonID}`;
  }
  //loads next pokemon navigation
  let nextPokemonID;
  let nextPokemonName;
  if (pokemonData.id === SIZE_OF_POKEDEX) {
    //doesn't load next pokemon if this is the last pokemon in dataset
    POKEMON_PAGE_NEXT_POKEMON.textContent = '';
  } else {
    nextPokemonID = pokemonData.id + 1;
    let formattedNextPokemonID = formatPokemonID(nextPokemonID);
    nextPokemonName = fullPokemonUsefulArray[`${nextPokemonID - 1}`].name;
    let formattedNextPokemonName = capitaliseWord(nextPokemonName);
    POKEMON_PAGE_NEXT_POKEMON.textContent = `Next: ${formattedNextPokemonName} #${formattedNextPokemonID}`;
  }
};

//populates pokemon page title depending on name of pokemon
const populateHeader = () => {
  POKEMON_HEADER.textContent = `${capitaliseWord(pokemonData.name)}`;
};

//populates pokemon description tag
const fillPokemonDescription = () => {
  //populates the pokemon name
  let pokemonName = capitaliseWord(pokemonData.name);
  POKEMON_DESCRIPTION_NAME.textContent = pokemonName;
  //populates the pokemon generation
  let pokemonGeneration;
  pokemonGeneration = formatPokemonGeneration(speciesData.generation.name);
  POKEMON_DESCRIPTION_GENERATION.textContent = pokemonGeneration;
  //populates the first type (all pokemon have at least 1 type)
  let pokemonType1;
  pokemonType1 = capitaliseWord(pokemonData.types['0'].type.name);
  POKEMON_DESCRIPTION_TYPES.textContent += pokemonType1;
  let pokemonType2;
  if (Object.keys(pokemonData.types).length === 2) {
    //only populates if the pokemon has 2 types
    pokemonType2 = capitaliseWord(pokemonData.types['1'].type.name);
    POKEMON_DESCRIPTION_TYPES.textContent += `/${pokemonType2}`;
  }
};

//populates the main pokemon image
const fillPokemonMainImage = () => {
  const pokemonMainImage = document.getElementById('pokemon-main-image');
  pokemonMainImage.style.backgroundImage = `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png)`;
};

//populates the base stats
const fillPokemonBaseStats = () => {
  //iterates through each of the six pokemon stats
  for (let i = 0; i <= 5; i++) {
    //populates each stat value
    POKEMON_STATS[i].textContent = pokemonData.stats[`${i}`]['base_stat'];
    if (pokemonData.stats[`${i}`].stat.name === 'hp') {
      //populates HP value minimum and maximum (different calculation for HP)
      POKEMON_MIN_STATS[i].textContent = Math.floor(
        (pokemonData.stats[`${i}`]['base_stat'] * 2 + 110) * 0.9
      );
      POKEMON_MAX_STATS[i].textContent = Math.floor(
        pokemonData.stats[`${i}`]['base_stat'] * 2 + 204
      );
    } else {
      //populates other stats minimum and maximum value
      POKEMON_MIN_STATS[i].textContent = Math.floor(
        (pokemonData.stats[`${i}`]['base_stat'] * 2 + 5) * 0.9
      );
      POKEMON_MAX_STATS[i].textContent = Math.floor(
        (pokemonData.stats[`${i}`]['base_stat'] * 2 + 5 + 31 + 63) * 1.1
      );
    }
    if (pokemonData.stats[`${i}`]['base_stat'] <= 180) {
      //bar maximum width is at stat of 180, but some pokemon have a value of above 180
      let barWidth = (pokemonData.stats[`${i}`]['base_stat'] / 180) * 100;
      POKEMON_STAT_BARS[i].style.width = `${barWidth}%`;
    } else {
      POKEMON_STAT_BARS[i].style.width = '100%';
    }
    //fills in stat bar colours dependent on the value
    if (pokemonData.stats[`${i}`]['base_stat'] < 30) {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#F34444';
      POKEMON_STAT_BARS[i].style.borderColor = '#CF3A3A';
    } else if (pokemonData.stats[`${i}`]['base_stat'] < 60) {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#FF7F0F';
      POKEMON_STAT_BARS[i].style.borderColor = '#D96C0D';
    } else if (pokemonData.stats[`${i}`]['base_stat'] < 90) {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#FFDD57';
      POKEMON_STAT_BARS[i].style.borderColor = '#D9BC4A';
    } else if (pokemonData.stats[`${i}`]['base_stat'] < 120) {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#A0E515';
      POKEMON_STAT_BARS[i].style.borderColor = '#88C312';
    } else if (pokemonData.stats[`${i}`]['base_stat'] < 150) {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#23CD5E';
      POKEMON_STAT_BARS[i].style.borderColor = '#1EAE50';
    } else {
      POKEMON_STAT_BARS[i].style.backgroundColor = '#00C2B8';
      POKEMON_STAT_BARS[i].style.borderColor = '#00A59D';
    }
  }
  //calculates total base stat by iterating through each stat
  let baseStatTotal = 0;
  for (let j = 0; j <= 5; j++) {
    baseStatTotal += pokemonData.stats[`${j}`]['base_stat'];
  }
  BASE_STAT_TOTAL.textContent = baseStatTotal;
};

//declares type variables
let type1;
let type2;

//fills the Pokedex Data table
const fillPokemonPokedexData = () => {
  //fills national number
  let nationalNumber = pokemonData.id;
  nationalNumber = formatPokemonID(nationalNumber);
  POKEDEX_DATA_NATIONAL_NUMBER.style.fontWeight = 'bold';
  POKEDEX_DATA_NATIONAL_NUMBER.textContent = nationalNumber;
  //fills the first pokemon type
  type1 = pokemonData.types['0'].type.name;
  resetTypes();
  POKEDEX_DATA_TYPE_1.textContent = capitaliseWord(type1);
  POKEDEX_DATA_TYPE_1.style.backgroundColor = typeColourReturn(type1);
  POKEDEX_DATA_TYPE_1.style.borderColor = secondaryTypeColourReturn(type1);
  POKEDEX_DATA_TYPE_1.classList.add(`${type1}`);
  if (Object.keys(pokemonData.types).length === 2) {
    //only fills second type if pokemon has two types
    type2 = pokemonData.types['1'].type.name;
    POKEDEX_DATA_TYPE_2.textContent = capitaliseWord(type2);
    POKEDEX_DATA_TYPE_2.style.backgroundColor = typeColourReturn(type2);
    POKEDEX_DATA_TYPE_2.style.borderColor = secondaryTypeColourReturn(type2);
    POKEDEX_DATA_TYPE_2.classList.add(`${type2}`);
    POKEDEX_DATA_TYPE_2.style.display = 'flex';
  }
  //fills species
  let species = speciesData.genera['7'].genus;
  POKEDEX_DATA_SPECIES.textContent = species;
  //fills height
  let height = pokemonData.height / 10;
  POKEDEX_DATA_HEIGHT.textContent = `${height} m`;
  //fills weight
  let weight = pokemonData.weight / 10;
  POKEDEX_DATA_WEIGHT.textContent = `${weight} kg`;
  //fills abilities
};

//fills the Training table
const fillPokemonTraining = () => {
  //fills EV yield
  let EVYieldObject = pokemonData.stats;
  let EVString = [];
  for (let i = 0; i <= 5; i++) {
    //iterates through EV data and records which EV and what value it has
    if (EVYieldObject[`${i}`].effort === 0) {
      continue;
    } else {
      EVString.push([i, EVYieldObject[`${i}`].effort]);
    }
  }
  let totalEVString = '';
  for (let j = 0; j < EVString.length; j++) {
    //iterates through the recorded EVs and returns the correct user friendly string
    let EVStat;
    if (EVString[j][0] === 0) {
      EVStat = 'HP';
    } else if (EVString[j][0] === 1) {
      EVStat = 'Attack';
    } else if (EVString[j][0] === 2) {
      EVStat = 'Defense';
    } else if (EVString[j][0] === 3) {
      EVStat = 'Sp. Attack';
    } else if (EVString[j][0] === 4) {
      EVStat = 'Sp. Defense';
    } else {
      EVStat = 'Speed';
    }
    //adds each EV value to the total string
    totalEVString += `${EVString[j][1]} ${EVStat}`;
    if (j === EVString.length - 1) {
      break;
    } else {
      totalEVString += ', ';
      continue;
    }
  }
  TRAINING_EV_YIELD.textContent = totalEVString;
  //fills catch rate
  let catchRate = speciesData['capture_rate'];
  let a = catchRate / 3;
  let b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));
  let c = b / 65535;
  let probability = c * c * c * c;
  let percentage = Math.round(probability * 100 * 10) / 10;
  TRAINING_CATCH_RATE.textContent = `${catchRate} (${percentage}% with Pokeball, full HP)`;
  //fills base friendship
  let baseFriendship = speciesData['base_happiness'];
  if (baseFriendship < 70) {
    TRAINING_BASE_FRIENDSHIP.textContent = `${baseFriendship} (lower than normal)`;
  } else if (baseFriendship === 70) {
    TRAINING_BASE_FRIENDSHIP.textContent = `${baseFriendship} (normal)`;
  } else {
    TRAINING_BASE_FRIENDSHIP.textContent = `${baseFriendship} (higher than normal)`;
  }
  //fills base experience
  let baseExperience = pokemonData['base_experience'];
  TRAINING_BASE_EXPERIENCE.textContent = baseExperience;
  //fills growth rate
  let growthRate = speciesData['growth_rate'].name;
  TRAINING_GROWTH_RATE.textContent = capitaliseWord(growthRate);
};

//populates the Breeding table
const fillPokemonBreeding = () => {
  //fills egg groups
  let eggGroupArray = [];
  let numberOfEggGroups = speciesData['egg_groups'].length;
  let eggGroupString = '';
  for (i = 0; i < numberOfEggGroups; i++) {
    //iterates through egg group data and returns for each the converted name
    eggGroupArray.push(convertEggGroup(speciesData['egg_groups'][`${i}`].name));
    eggGroupString += eggGroupArray[i];
    if (i === numberOfEggGroups - 1) {
      break;
    } else {
      eggGroupString += ', ';
      continue;
    }
  }
  BREEDING_EGG_GROUPS.textContent = eggGroupString;
  //fills gender
  let genderRate = speciesData['gender_rate'];
  if (genderRate === -1) {
    BREEDING_GENDER.textContent = 'Genderless';
  } else {
    let femalePercentage = (genderRate / 8) * 100;
    let malePercentage = ((8 - genderRate) / 8) * 100;
    BREEDING_GENDER.textContent = `${malePercentage}% male, ${femalePercentage}% female`;
  }
  //fills egg cycles
  let eggCycles = speciesData['hatch_counter'];
  let fewestSteps = (eggCycles - 1) * 257 + 1;
  let mostSteps = eggCycles * 257;
  BREEDING_EGG_CYCLES.textContent = `${eggCycles} (${fewestSteps}-${mostSteps} steps)`;
};

//populates the type defenses table
const fillPokemonTypeDefenses = () => {
  TYPE_DEFENSES_INTRO.textContent = `The effectiveness of each type on ${capitaliseWord(
    pokemonData.name
  )}`;
  //fills types in type defenses
  for (let i = 0; i <= 17; i++) {
    //iterates through each attack type
    let attackType = typeReturnFromID(i);
    TYPE_DEFENSES[i].textContent = attackType.toUpperCase();
    TYPE_DEFENSES[i].style.backgroundColor = typeColourReturn(attackType);
    TYPE_DEFENSES[i].style.borderColor = secondaryTypeColourReturn(attackType);
    TYPE_DEFENSES[i].classList.add('type', `${attackType}`);
    let typeDamage = 1;
    for (let j = 0; j < typeData[`${i}`]['double_damage_to'].length; j++) {
      //iterates through the types the attack type is super effective against to check for defense type
      if (
        typeData[`${i}`]['double_damage_to'][`${j}`].name === type1 ||
        typeData[`${i}`]['double_damage_to'][`${j}`].name === type2
      ) {
        typeDamage *= 2;
      } else {
        continue;
      }
    }
    for (let j = 0; j < typeData[`${i}`]['half_damage_to'].length; j++) {
      //iterates through the types the attack type is not very effective against to check for defense type
      if (
        typeData[`${i}`]['half_damage_to'][`${j}`].name === type1 ||
        typeData[`${i}`]['half_damage_to'][`${j}`].name === type2
      ) {
        typeDamage *= 0.5;
      } else {
        continue;
      }
    }
    for (let j = 0; j < typeData[`${i}`]['no_damage_to'].length; j++) {
      //iterates through the types the attack type is not effective against to check for defense type
      if (
        typeData[`${i}`]['no_damage_to'][`${j}`].name === type1 ||
        typeData[`${i}`]['no_damage_to'][`${j}`].name === type2
      ) {
        typeDamage *= 0;
      } else {
        continue;
      }
    }
    //returns final type damage 
    TYPE_DEFENSES_VALUE[i].textContent = typeDamage;
    //styles the damage box dependent on value
    TYPE_DEFENSES_VALUE[i].style.backgroundColor = returnTypeDefenseColour(
      typeDamage
    );
    TYPE_DEFENSES_VALUE[i].style.borderColor = returnTypeDefenseColour(
      typeDamage
    );
    //styles the damage box uniquely if the value is 1
    if (typeDamage === 1) {
      TYPE_DEFENSES_VALUE[i].style.color = returnTypeDefenseColour(typeDamage);
    } else {
      TYPE_DEFENSES_VALUE[i].style.color = '#F2D044';
    }
  }
};

//listens for click on the return to pokedex button
POKEMON_PAGE_RETURN_TO_POKEDEX.addEventListener('click', () => {
  POKEMON_PAGE.style.display = 'none';
  POKEDEX.style.display = 'block';
});
//listens for click on the previous pokemon button
POKEMON_PAGE_PREVIOUS_POKEMON.addEventListener('click', () => {
  createPokemonData(pokemonData.id - 1);
});
//listens for click on the next pokemon button
POKEMON_PAGE_NEXT_POKEMON.addEventListener('click', () => {
  createPokemonData(pokemonData.id + 1);
});
