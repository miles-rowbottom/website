const POKEDEX = document.getElementById('pokedex');
const POKEDEX_TITLE = document.getElementById('pokedex-title');
const POKEDEX_CONTENT = document.getElementById('pokedex-content');

const POKEDEX_FILTER = document.getElementById('pokedex-filter');
const POKEDEX_FILTER_BUTTON = document.getElementById('pokedex-filter-button');

const POKEDEX_SEARCH_INPUT = document.getElementById('pokedex-search-input');
const POKEDEX_SEARCH_BUTTON = document.getElementById('pokedex-search-button');

//defines generation start and end point indexes
const GENERATION_1_START = 1;
const GENERATION_1_END = 151;
const GENERATION_2_START = 152;
const GENERATION_2_END = 251;
const GENERATION_3_START = 252;
const GENERATION_3_END = 386;
const GENERATION_4_START = 387;
const GENERATION_4_END = 493;
const GENERATION_5_START = 494;
const GENERATION_5_END = 649;
const GENERATION_6_START = 650;
const GENERATION_6_END = 721;
const GENERATION_7_START = 722;
const GENERATION_7_END = 807;

//capitalises only the first letter of the entered string
const capitaliseWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//codes a delay to allow a fetch to be completed
function resolveDelay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

//aesthetics when opening specific pokemon page
const openPokemonPage = () => {
  POKEDEX.style.display = 'none';
  TYPE_PAGE.style.display = 'none';
  POKEMON_PAGE.style.display = 'block';
};

//aesthetics when opening specific type page
const openTypePage = () => {
  POKEDEX.style.display = 'none';
  POKEMON_PAGE.style.display = 'none';
  TYPE_PAGE.style.display = 'block';
};

//returns the primary colour associated with each type
const typeColourReturn = (string) => {
  switch (string) {
    case 'normal':
      return '#AAAA99';
    case 'grass':
      return '#77CC55';
    case 'fire':
      return '#FF4422';
    case 'water':
      return '#3399FF';
    case 'fighting':
      return '#BB5544';
    case 'flying':
      return '#8899FF';
    case 'poison':
      return '#AA5599';
    case 'ground':
      return '#DDBB55';
    case 'rock':
      return '#BBAA66';
    case 'bug':
      return '#AABB22';
    case 'ghost':
      return '#6666BB';
    case 'electric':
      return '#FFCC33';
    case 'psychic':
      return '#FF5599';
    case 'ice':
      return '#66CCFF';
    case 'dragon':
      return '#7766EE';
    case 'dark':
      return '#775544';
    case 'steel':
      return '#AAAABB';
    case 'fairy':
      return '#EE99EE';
  }
};

//returns the secondary colour for each type
const secondaryTypeColourReturn = (string) => {
  switch (string) {
    case 'normal':
      return '#88887A';
    case 'grass':
      return '#5FA344';
    case 'fire':
      return '#CC361B';
    case 'water':
      return '#297ACC';
    case 'fighting':
      return '#964436';
    case 'flying':
      return '#6D7ACC';
    case 'poison':
      return '#88447A';
    case 'ground':
      return '#B19644';
    case 'rock':
      return '#968852';
    case 'bug':
      return '#88961B';
    case 'ghost':
      return '#525296';
    case 'electric':
      return '#CCA329';
    case 'psychic':
      return '#CC447A';
    case 'ice':
      return '#52A3CC';
    case 'dragon':
      return '#5F52BE';
    case 'dark':
      return '#5F4436';
    case 'steel':
      return '#888896';
    case 'fairy':
      return '#BE7ABE';
  }
};

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

//each type has both an ID and a name (helps iterate loops). This takes ID and returns string
const typeReturnFromID = (ID) => {
  switch (ID) {
    case 0:
      return 'normal';
    case 1:
      return 'fighting';
    case 2:
      return 'flying';
    case 3:
      return 'poison';
    case 4:
      return 'ground';
    case 5:
      return 'rock';
    case 6:
      return 'bug';
    case 7:
      return 'ghost';
    case 8:
      return 'steel';
    case 9:
      return 'fire';
    case 10:
      return 'water';
    case 11:
      return 'grass';
    case 12:
      return 'electric';
    case 13:
      return 'psychic';
    case 14:
      return 'ice';
    case 15:
      return 'dragon';
    case 16:
      return 'dark';
    case 17:
      return 'fairy';
  }
};

//takes the pokemon generation data and converts it into corresponding integer
const formatPokemonGeneration = (name) => {
  if (name === 'generation-i') {
    return '1';
  } else if (name === 'generation-ii') {
    return '2';
  } else if (name === 'generation-iii') {
    return '3';
  } else if (name === 'generation-iv') {
    return '4';
  } else if (name === 'generation-v') {
    return '5';
  } else if (name === 'generation-vi') {
    return '6';
  } else if (name === 'generation-vii') {
    return '7';
  } else if (name === 'generation-viii') {
    return '8';
  }
}

//returns the colour for each attack multiplier value
const returnTypeDefenseColour = (multiplier) => {
  switch (multiplier) {
    case 0:
      return '#2E3436';
    case 0.25:
      return '#7C0000';
    case 0.5:
      return '#A40000';
    case 1:
      return 'white';
    case 2:
      return '#4E9A06';
    case 4:
      return '#73D216';
  }
};

//adds additional 0s where the pokemon ID is less than 100
const formatPokemonID = (ID) => {
  if (ID.toString().length === 1) {
    return '00' + ID.toString();
  } else if (ID.toString().length === 2) {
    return '0' + ID.toString();
  } else {
    return ID.toString();
  }
};

//resets the entered data on the type page to prevent duplicates
const resetTypes = () => {
  type2 = '';
  POKEDEX_DATA_TYPE_2.textContent = '';
  POKEDEX_DATA_TYPE_2.style.backgroundColor = 'white';
  POKEDEX_DATA_TYPE_2.style.borderColor = '';
  POKEDEX_DATA_TYPE_2.style.display = 'none';
  POKEDEX_DATA_TYPE_1.classList.remove(...POKEDEX_DATA_TYPE_1.classList);
  POKEDEX_DATA_TYPE_1.classList.add('pokedex-data-type', 'type');
  POKEDEX_DATA_TYPE_2.classList.remove(...POKEDEX_DATA_TYPE_2.classList);
  POKEDEX_DATA_TYPE_2.classList.add('pokedex-data-type', 'type');
};

//converts evolution stone data into user friendly translation
const convertEvolutionStone = (stone) => {
  switch (stone) {
    case 'fire-stone':
      return 'Fire Stone';
    case 'water-stone':
      return 'Water Stone';
    case 'thunder-stone':
      return 'Thunder Stone';
    case 'leaf-stone':
      return 'Leaf Stone';
    case 'moon-stone':
      return 'Moon Stone';
    case 'sun-stone':
      return 'Sun Stone';
    case 'shiny-stone':
      return 'Shiny Stone';
    case 'dusk-stone':
      return 'Dusk Stone';
    case 'dawn-stone':
      return 'Dawn Stone';
    case 'ice-stone':
      return 'Ice Stone';
  }
};

//converts trade item data into a user friendly translation
const convertTradeItem = (item) => {
  switch (item) {
    case 'deep-sea-scale':
      return 'Deep Sea Scale';
    case 'deep-sea-tooth':
      return 'Deep Sea Tooth';
    case 'dragon-scale':
      return 'Dragon Scale';
    case 'dubious-disc':
      return 'Dubious Disc';
    case 'electirizer':
      return 'Electirizer';
    case 'kings-rock':
      return "King's Rock";
    case 'magmarizer':
      return 'Magmarizer';
    case 'metal-coat':
      return 'Metal Coat';
    case 'oval-stone':
      return 'Oval Stone';
    case 'prism-scale':
      return 'Prism Scale';
    case 'protector':
      return 'Protector';
    case 'razor-claw':
      return 'Razor Claw';
    case 'razor-fang':
      return 'Razor Fang';
    case 'reaper-cloth':
      return 'Reaper Cloth';
    case 'sachet':
      return 'Sachet';
    case 'upgrade':
      return 'Upgrade';
    case 'whipped-dream':
      return 'Whipped Dream';
  }
};

//converts evolution moves into user friendly output
const convertEvolutionMove = (move) => {
  switch (move) {
    case 'ancient-power':
      return 'Ancient Power';
    case 'dragon-pulse':
      return 'Dragon Pulse';
    case 'mimic':
      return 'Mimic';
    case 'double-hit':
      return 'Double Hit';
    case 'rollout':
      return 'Rollout';
    case 'stomp':
      return 'Stomp';
    case 'taunt':
      return 'Taunt';
  }
};

//converts evolution location data into user friendly output
const convertEvolutionLocation = (location) => {
  switch (location) {
    case 'mount-lanakila':
      return 'Mount Lanakila';
    case 'sinnoh-route-217':
    case 'twist-mountain':
    case 'frost-cavern':
      return 'Icy Rock';
    case 'eterna-forest':
    case 'pinwheel-forest':
    case 'kalos-route-20':
      return 'Mossy Rock';
    case 'mt-coronet':
    case 'chargestone-cave':
    case 'kalos-route-13':
      return 'Magnetic Field';
  }
};

// converts day data into user friendly output
const convertTime = (time) => {
  switch (time) {
    case 'day':
      return 'Daytime';
    case 'night':
      return 'Nighttime';
  }
};

//converts gender values into string
const convertGender = (genderValue) => {
  switch (genderValue) {
    case 1:
      return 'Female';
    case 2:
      return 'Male';
  }
};

//converts physical stat evolution data into user friendly output
const convertPhysicalStats = (integer) => {
  switch (integer) {
    case -1:
      return 'Attack < Defense';
    case 0:
      return 'Attack = Defense';
    case 1:
      return 'Attack > Defense';
  }
};

let selectedPokemonID;
let selectedType;

//global event delegation
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('type')) {
    for (let i = 0; i <= 17; i++) {
      //iterates through type IDs to open the correct type page
      if (event.target.classList.contains(typeReturnFromID(i))) {
        populateTypePage(typeReturnFromID(i), i);
      }
    }
  } else if (event.target.id === 'pokedex-filter-button') {
    //filters the pokedex when clicked
    filterPokedex();
  } else if (event.target.id === 'pokedex-search-button') {
    //searches the pokedex when clicked
    searchPokedex();
  }
  for (let k = 0; k < pokemonUsefulArray.length; k++) {
    //iterates throuh pokemon data to open correct pokemon page
    if (
      event.target.classList.contains(`pokemon-id-${pokemonUsefulArray[k].id}`)
    ) {
      selectedPokemonID = pokemonUsefulArray[k].id;
      createPokemonData(selectedPokemonID);
      break;
    }
  }
});
