//declares the evolution block arrays to be global
let evolutionBlockArray = [];
let evolutionBlockArray1 = [];
let evolutionBlockArray2 = [];
let evolutionBlockArray3 = [];

//resets evolution data so that when opening new pokemon page the data is not duplicate
const resetEvolutionData = () => {
  evolutionBlockArray = [];
  evolutionBlockArray1 = [];
  evolutionBlockArray2 = [];
  evolutionBlockArray3 = [];
  EVOLUTION_CHAIN.style.height = '300px';
  EVOLUTION_CHART_1.style.display = 'none';
  EVOLUTION_CHART_2.style.display = 'none';
  EVOLUTION_CHART_3.style.display = 'none';
  EVOLUTION_CHART.textContent = '';
  EVOLUTION_CHART_1.textContent = '';
  EVOLUTION_CHART_2.textContent = '';
  EVOLUTION_CHART_3.textContent = '';
};

//function that triggers creation of evolution chain. Delegates to different functions
const fillEvolutionChain = () => {
  if (evolutionChainData.chain['evolves_to'].length === 0) {
    //if no evolution
    noEvolution();
  } else if (
    //if evolves once into 1 possible pokemon
    evolutionChainData.chain['evolves_to'].length === 1 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 0
  ) {
    standardOneEvolution();
  } else if (
    //if evolves twice each into 1 possible pokemon
    evolutionChainData.chain['evolves_to'].length === 1 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 1
  ) {
    standardTwoEvolution();
  } else if (
    //if evolves once into 2 different possible pokemon
    evolutionChainData.chain['evolves_to'].length === 2 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 0 &&
    evolutionChainData.chain['evolves_to']['1']['evolves_to'].length === 0
  ) {
    finalOnly1Evolution2();
  } else if (
    //if evolves once into 3 different possible pokemon
    evolutionChainData.chain['evolves_to'].length === 3 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 0 &&
    evolutionChainData.chain['evolves_to']['1']['evolves_to'].length === 0 &&
    evolutionChainData.chain['evolves_to']['2']['evolves_to'].length === 0
  ) {
    finalOnly1Evolution3();
  } else if (
    //if evolves once into 1 possible pokemon then once into 2 possible pokemon
    evolutionChainData.chain['evolves_to'].length === 1 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 2
  ) {
    finalOnly2Evolution();
  } else if (
    //if evolves once into 2 possible pokemon then each once into 1 different possible pokemon
    evolutionChainData.chain['evolves_to'].length === 2 &&
    evolutionChainData.chain['evolves_to']['0']['evolves_to'].length === 1 &&
    evolutionChainData.chain['evolves_to']['1']['evolves_to'].length === 1
  ) {
    secondOnly2Evolution();
  } else if (evolutionChainData.chain.species.name === 'eevee') {
    //only if the evolution chain is the eevee family (unique)
    eeveeEvolution();
  }
};

//if no evolution
const noEvolution = () => {
  //simply returns text stating no evolution
  EVOLUTION_CHAIN_STATEMENT.textContent = `${capitaliseWord(
    pokemonData.name
  )} does not evolve.`;
  EVOLUTION_CHAIN.style.height = '120px';
  EVOLUTION_CHART_BOX.style.display = 'none';
};

//if evolves once into 1 possible pokemon
const standardOneEvolution = () => {
  //sets first pokemon name
  let pokemon1;
  if (evolutionChainData.chain.species.name === 'pumpkaboo') {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon1 = findFromUsefulArray('pumpkaboo-average');
  } else {
    pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  }
  //sets second pokemon name
  let pokemon2;
  if (evolutionChainData.chain['evolves_to']['0'].species.name === 'lycanroc') {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon2 = findFromUsefulArray('lycanroc-midday');
  } else if (
    evolutionChainData.chain['evolves_to']['0'].species.name === 'darmanitan'
  ) {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon2 = findFromUsefulArray('darmanitan-standard');
  } else if (
    evolutionChainData.chain['evolves_to']['0'].species.name === 'meowstic'
  ) {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon2 = findFromUsefulArray('meowstic-male');
  } else if (
    evolutionChainData.chain['evolves_to']['0'].species.name === 'gourgeist'
  ) {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon2 = findFromUsefulArray('gourgeist-average');
  } else {
    pokemon2 = findFromUsefulArray(
      evolutionChainData.chain['evolves_to']['0'].species.name
    );
  }
  console.log(pokemon1);
  console.log(pokemon2);
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART, evolutionBlockArray);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
};

//if evolves twice each into 1 possible pokemon
const standardTwoEvolution = () => {
  //sets first pokemon
  let pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  //sets second pokemon
  let pokemon2 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0'].species.name
  );
  //sets third pokemom
  if (
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'].species
      .name === 'aegislash'
  ) {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon3 = findFromUsefulArray('aegislash-shield');
  } else {
    pokemon3 = findFromUsefulArray(
      evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'].species
        .name
    );
  }
  console.log(pokemon1);
  console.log(pokemon2);
  console.log(pokemon3);
  //creates row of cards 
  createEvolutionBlockArray(5, EVOLUTION_CHART, evolutionBlockArray);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'][
      'evolution_details'
    ]['0'],
    evolutionBlockArray[3]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray[4]);
};

const finalOnly1Evolution2 = () => {
  //sets first pokemon
  let pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  //sets second pokemon
  let pokemon2;
  if (evolutionChainData.chain['evolves_to']['0'].species.name === 'wormadam') {
    //errors arise in this pokemons name due to inconsistencies in data
    pokemon2 = findFromUsefulArray('wormadam-plant');
  } else {
    pokemon2 = findFromUsefulArray(
      evolutionChainData.chain['evolves_to']['0'].species.name
    );
  }
  //sets third pokemon
  let pokemon3 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['1'].species.name
  );
  EVOLUTION_CHAIN.style.height = '480px';
  EVOLUTION_CHART_1.style.display = 'block';
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART, evolutionBlockArray);
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART_1, evolutionBlockArray1);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['1']['evolution_details']['0'],
    evolutionBlockArray1[1]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray1[2]);
};

const finalOnly1Evolution3 = () => {
  //sets first pokemon
  let pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  //sets second pokemon
  let pokemon2 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0'].species.name
  );
  //sets third pokemon
  let pokemon3 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['1'].species.name
  );
  //sets fourth pokemon
  let pokemon4 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['2'].species.name
  );
  EVOLUTION_CHAIN.style.height = '660px';
  EVOLUTION_CHART_1.style.display = 'block';
  EVOLUTION_CHART_2.style.display = 'block';
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART, evolutionBlockArray);
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART_1, evolutionBlockArray1);
  //creates row of cards 
  createEvolutionBlockArray(3, EVOLUTION_CHART_2, evolutionBlockArray2);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['1']['evolution_details']['0'],
    evolutionBlockArray1[1]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray1[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['2']['evolution_details']['0'],
    evolutionBlockArray2[1]
  );
  createEvolutionChartCard(pokemon4, evolutionBlockArray2[2]);
};

const finalOnly2Evolution = () => {
  //sets first pokemon
  let pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  //sets second pokemon
  let pokemon2 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0'].species.name
  );
  //sets third pokemon
  let pokemon3 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'].species.name
  );
  //sets fourth pokemon
  let pokemon4 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['1'].species.name
  );
  EVOLUTION_CHAIN.style.height = '480px';
  EVOLUTION_CHART_1.style.display = 'block';
  //creates row of cards 
  createEvolutionBlockArray(5, EVOLUTION_CHART, evolutionBlockArray);
  //creates row of cards 
  createEvolutionBlockArray(5, EVOLUTION_CHART_1, evolutionBlockArray1);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'][
      'evolution_details'
    ]['0'],
    evolutionBlockArray[3]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray[4]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['1'][
      'evolution_details'
    ]['0'],
    evolutionBlockArray1[3]
  );
  createEvolutionChartCard(pokemon4, evolutionBlockArray1[4]);
};

const secondOnly2Evolution = () => {
  //sets first pokemon
  let pokemon1 = findFromUsefulArray(evolutionChainData.chain.species.name);
  //sets second pokemon
  let pokemon2 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0'].species.name
  );
  //sets third pokemon
  let pokemon3 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'].species.name
  );
  //sets fourth pokemon
  let pokemon4 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['1'].species.name
  );
  //sets fifth pokemon
  let pokemon5 = findFromUsefulArray(
    evolutionChainData.chain['evolves_to']['1']['evolves_to']['0'].species.name
  );
  EVOLUTION_CHAIN.style.height = '480px';
  EVOLUTION_CHART_1.style.display = 'block';
  //creates row of cards 
  createEvolutionBlockArray(5, EVOLUTION_CHART, evolutionBlockArray);
  //creates row of cards 
  createEvolutionBlockArray(5, EVOLUTION_CHART_1, evolutionBlockArray1);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolves_to']['0'][
      'evolution_details'
    ]['0'],
    evolutionBlockArray[3]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray[4]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['1']['evolution_details']['0'],
    evolutionBlockArray1[1]
  );
  createEvolutionChartCard(pokemon4, evolutionBlockArray1[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['1']['evolves_to']['0'][
      'evolution_details'
    ]['0'],
    evolutionBlockArray1[3]
  );
  createEvolutionChartCard(pokemon5, evolutionBlockArray1[4]);
};

const eeveeEvolution = () => {
  let pokemon1 = findFromUsefulArray('eevee');
  let pokemon2 = findFromUsefulArray('vaporeon');
  let pokemon3 = findFromUsefulArray('jolteon');
  let pokemon4 = findFromUsefulArray('flareon');
  let pokemon5 = findFromUsefulArray('espeon');
  let pokemon6 = findFromUsefulArray('umbreon');
  let pokemon7 = findFromUsefulArray('leafeon');
  let pokemon8 = findFromUsefulArray('glaceon');
  let pokemon9 = findFromUsefulArray('sylveon');
  EVOLUTION_CHAIN.style.height = '840px';
  EVOLUTION_CHART_1.style.display = 'block';
  EVOLUTION_CHART_2.style.display = 'block';
  EVOLUTION_CHART_3.style.display = 'block';
  //creates row of cards 
  createEvolutionBlockArray(6, EVOLUTION_CHART, evolutionBlockArray);
  //creates row of cards 
  createEvolutionBlockArray(6, EVOLUTION_CHART_1, evolutionBlockArray1);
  //creates row of cards 
  createEvolutionBlockArray(6, EVOLUTION_CHART_2, evolutionBlockArray2);
  //creates row of cards 
  createEvolutionBlockArray(6, EVOLUTION_CHART_3, evolutionBlockArray3);
  //all below assigns the correct pokemon and arrow cards depending on shape of evolution chain
  createEvolutionChartCard(pokemon1, evolutionBlockArray[0]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['0']['evolution_details']['0'],
    evolutionBlockArray[1]
  );
  createEvolutionChartCard(pokemon2, evolutionBlockArray[2]);
  createEvolutionChartCard(pokemon1, evolutionBlockArray[3]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['4']['evolution_details']['0'],
    evolutionBlockArray[4]
  );
  createEvolutionChartCard(pokemon6, evolutionBlockArray[5]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['1']['evolution_details']['0'],
    evolutionBlockArray1[1]
  );
  createEvolutionChartCard(pokemon3, evolutionBlockArray1[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['5']['evolution_details']['0'],
    evolutionBlockArray1[4]
  );
  createEvolutionChartCard(pokemon7, evolutionBlockArray1[5]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['2']['evolution_details']['0'],
    evolutionBlockArray2[1]
  );
  createEvolutionChartCard(pokemon4, evolutionBlockArray2[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['6']['evolution_details']['0'],
    evolutionBlockArray2[4]
  );
  createEvolutionChartCard(pokemon8, evolutionBlockArray2[5]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['3']['evolution_details']['0'],
    evolutionBlockArray3[1]
  );
  createEvolutionChartCard(pokemon5, evolutionBlockArray3[2]);
  createEvolutionArrowCard(
    evolutionChainData.chain['evolves_to']['7']['evolution_details']['0'],
    evolutionBlockArray3[4]
  );
  createEvolutionChartCard(pokemon9, evolutionBlockArray3[5]);
};

//finds useful array data from the entered pokemon name
const findFromUsefulArray = (string) => {
  for (i = 0; i < SIZE_OF_POKEDEX; i++) {
    if (string !== fullPokemonUsefulArray[i].name) {
      continue;
    } else {
      return fullPokemonUsefulArray[i];
    }
  }
};

//creates row of cards to be populated by either evolution card or arrow card
const createEvolutionBlockArray = (number, parent, array) => {
  for (let i = 0; i < number; i++) {
    array[i] = document.createElement('div');
    array[i].classList.add('pokedex-card');
    parent.insertAdjacentElement('beforeend', array[i]);
  }
};

//creates a pokemon evolution card (not arrow card)
const createEvolutionChartCard = (data, parent) => {
  //fills the pokemon image
  pokemonImage = document.createElement('div');
  pokemonImage.style.backgroundImage = `url(${data.image})`;
  pokemonImage.classList.add('card-image', `pokemon-id-${data.id}`);
  parent.insertAdjacentElement('beforeend', pokemonImage);
  //fills the pokemon ID
  pokemonID = document.createElement('span');
  pokemonID.classList.add('card-text', 'card-ID');
  pokemonID.textContent = `#${formatPokemonID(data.id)}`;
  parent.insertAdjacentElement('beforeend', pokemonID);
  //fills the pokemon name
  pokemonName = document.createElement('a');
  pokemonName.classList.add('card-text', 'card-name', `pokemon-id-${data.id}`);
  pokemonName.textContent = `${capitaliseWord(data.name)}`;
  parent.insertAdjacentElement('beforeend', pokemonName);
  //fills the types depending on whether pokemon has 1 type or 2
  if (Object.keys(data.type).length === 1) {
    //if one type
    let pokemonType = document.createElement('a');
    let type = data.type['0'].type.name;
    pokemonType.classList.add('card-text', 'card-type', 'type', `${type}`);
    pokemonType.textContent = `${capitaliseWord(type)}`;
    pokemonType.style.color = `${secondaryTypeColourReturn(type)}`;
    parent.insertAdjacentElement('beforeend', pokemonType);
  } else {
    //if two types, create second array of elements that nest inside cardTypes array
    let twoPokemonTypes = [
      document.createElement('a'),
      document.createElement('a'),
    ];
    for (let j = 0; j < 2; j++) {
      //loop through the nested array
      let type = data.type[`${j}`].type.name;
      twoPokemonTypes[j].classList.add(
        'card-text-two-types',
        'card-type',
        'type',
        `${type}`
      );
      twoPokemonTypes[j].textContent = `${capitaliseWord(type)}`;
      twoPokemonTypes[j].style.color = `${typeColourReturn(type)}`;
      parent.insertAdjacentElement('beforeend', twoPokemonTypes[j]);
    }
  }
};

//creates evoltion arrow card
const createEvolutionArrowCard = (details, parent) => {
  //creates the arrow
  let arrowBox = document.createElement('div');
  arrowBox.classList.add('evolution-chart-small-box', 'evolution-chart-arrow');
  parent.insertAdjacentElement('beforeend', arrowBox);
  //creates the details box (how it evolves)
  let detailsBox = document.createElement('div');
  detailsBox.classList.add('evolution-chart-small-box');
  parent.insertAdjacentElement('beforeend', detailsBox);
  console.log(details);
  //populates the details box depending on the details of how it evolves
  let detailsText = setEvolutionDetails(details);
  detailsBox.textContent = detailsText;
};

//lots of ways to evolve. Delegates the population of the details box depending on the various ways each pokemon can evolve and how these interact.
const setEvolutionDetails = (details) => {
  if (details.trigger.name === 'level-up') {
    //if level up
    if (details.gender) {
      //if level up and certain gender
      return `(Level ${details['min_level']}, ${convertGender(
        details.gender
      )})`;
    }
    if (details['time_of_day']) {
      //if involves time of day
      if (details['held_item']) {
        //if requires held item and time of day
        return `(Hold ${convertTradeItem(
          details['held_item'].name
        )}, ${convertTime(details['time_of_day'])})`;
      } else if (details['min_happiness'] >= 100) {
        //if minimum happiness and time of day
        return `(High friendship, ${convertTime(details['time_of_day'])})`;
      } else if (details['min_level']) {
        //if certain level and time of day
        return `(Level ${details['min_level']}, ${convertTime(
          details['time_of_day']
        )})`;
      }
    } else if (details['min_happiness'] >= 100) {
      //if minimum happiness
      return '(High Friendship)';
    } else if (details['known_move']) {
      //if once move learned
      return `(After ${convertEvolutionMove(
        details['known_move'].name
      )} learned)`;
    } else if (details.location) {
      //if only in location
      return `(Level up near ${convertEvolutionLocation(
        details.location.name
      )})`;
    } else if (details['relative_physical_stats']) {
      //if depends on relative physical stats
      return `(Level 20, ${convertPhysicalStats(
        details['relative_physical_stats']
      )})`;
    } else if (details['min_beauty']) {
      //if min beauty
      return '(Level up with max beauty)';
    } else if (details['turn_upside_down']) {
      //if device upside down
      return '(Level 30, holding console upside down)';
    } else if (details['party_type']) {
      //if certain type in party
      return `(Level up with a ${capitaliseWord(
        details['party_type'].name
      )} type in party)`;
    } else if (details['needs_overworld_rain']) {
      //if needs rain
      return `(Level ${details['min_level']}, during rain)`;
    } else if (details['known_move_type']) {
      //if knows move of type
      return `(High Affection, knowing ${capitaliseWord(
        details['known_move_type'].name
      )} move)`;
    } else if (details['party_species']) {
      //if pokemon in party
      return `(Level up with ${capitaliseWord(
        details['party_species'].name
      )} in party)`;
    } else {
      //if just normal level up
      return `(Level ${details['min_level']})`;
    }
  } else if (details.trigger.name === 'use-item') {
    if (details.gender) {
      return `(Use ${convertEvolutionStone(details.item.name)}, ${convertGender(
        details.gender
      )})`;
    } else {
      return `(Use ${convertEvolutionStone(details.item.name)})`;
    }
  } else if (details.trigger.name === 'shed') {
    //if shedinja
    return '(Level 20, empty spot in party, Pokeball in bag)';
  } else if (details.trigger.name === 'trade') {
    //if when trade involved
    if (details['held_item']) {
      //if trade with held item
      return `(Trade holding ${convertTradeItem(details['held_item'].name)})`;
    } else if (details['trade_species']) {
      //if trade for certain pokemon
      return `(Trade with ${capitaliseWord(details['trade_species'].name)})`;
    } else {
      //if normal trade
      return '(Trade)';
    }
  }
};
