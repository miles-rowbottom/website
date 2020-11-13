let SIZE_OF_POKEDEX = 807;

const displayData = (usefulArray) => {
  POKEDEX_CONTENT.textContent = "";
  let i = 0;
  let pokedexCards = [];
  let cardImages = [];
  let cardIDs = [];
  let cardNames = [];
  let cardTypes = [];
  let imageListeners = [];
  //loops through pokemondata
  usefulArray.forEach((element) => {
    //create Cards
    pokedexCards[i] = document.createElement('div');
    POKEDEX_CONTENT.insertAdjacentElement('beforeend', pokedexCards[i]);
    pokedexCards[i].classList.add('pokedex-card');
    //create Images
    cardImages[i] = document.createElement('section');
    pokedexCards[i].appendChild(cardImages[i]);
    cardImages[i].classList.add('card-image', `pokemon-id-${element.id}`);
    cardImages[i].style.backgroundImage = `url(${element.image})`; //note to move this later
    // create IDs
    cardIDs[i] = document.createElement('span');
    pokedexCards[i].appendChild(cardIDs[i]);
    cardIDs[i].classList.add('card-text', 'card-ID');
    cardIDs[i].textContent = `#${formatPokemonID(element.id)}`;
    //create Names
    cardNames[i] = document.createElement('a');
    pokedexCards[i].appendChild(cardNames[i]);
    cardNames[i].classList.add(
      'card-text',
      'card-name',
      `pokemon-id-${element.id}`
    );
    cardNames[i].textContent = `${capitaliseWord(element.name)}`;
    //create Types
    if (Object.keys(element.type).length === 1) {
      //if one type
      cardTypes[i] = document.createElement('a');
      pokedexCards[i].appendChild(cardTypes[i]);
      cardTypes[i].classList.add('card-text', 'card-type', 'type', `${element.type['0'].type.name}`);
      cardTypes[i].textContent = `${capitaliseWord(
        element.type['0'].type.name
      )}`;
      cardTypes[i].style.color = `${secondaryTypeColourReturn(
        element.type['0'].type.name
      )}`;
    } else {
      //if two types, create second array of elements that nest inside cardTypes array
      let twoCardTypes = [
        document.createElement('a'),
        document.createElement('a'),
      ];
      for (let j = 0; j < 2; j++) {
        //loop through the nested array
        pokedexCards[i].appendChild(twoCardTypes[j]);
        twoCardTypes[j].classList.add('card-text-two-types', 'card-type', 'type', `${element.type[j].type.name}`);
        twoCardTypes[j].textContent = `${capitaliseWord(
          element.type[`${j}`].type.name
        )}`;
        twoCardTypes[j].style.color = `${secondaryTypeColourReturn(
          element.type[`${j}`].type.name
        )}`;
      }
      cardTypes[i] = twoCardTypes;
    }
    //add image event listeners
  });
  //creates aesthetic white space at bottom of pokedex
  const whiteBottom = document.createElement('div');
  whiteBottom.classList.add('white-bottom');
  POKEDEX_CONTENT.insertAdjacentElement('beforeend', whiteBottom);
};

//determines which generation to filter to depending on entered value of drop down list
const filterPokedex = () => {
  POKEDEX_TITLE.textContent = POKEDEX_FILTER.value;
  switch (POKEDEX_FILTER.value) {
    case 'All Generations':
      fetchPokemon(GENERATION_1_START, GENERATION_7_END);
      return;
    case 'Generation 1':
      fetchPokemon(GENERATION_1_START, GENERATION_1_END);
      return;
    case 'Generation 2':
      fetchPokemon(GENERATION_2_START, GENERATION_2_END);
      return;
    case 'Generation 3':
      fetchPokemon(GENERATION_3_START, GENERATION_3_END);
      return;
    case 'Generation 4':
      fetchPokemon(GENERATION_4_START, GENERATION_4_END);
      return;
    case 'Generation 5':
      fetchPokemon(GENERATION_5_START, GENERATION_5_END);
      return;
    case 'Generation 6':
      fetchPokemon(GENERATION_6_START, GENERATION_6_END);
      return;
    case 'Generation 7':
      fetchPokemon(GENERATION_7_START, GENERATION_7_END);
      return;
  }
};

//determines which pokemon page to open depending on entered pokemon name or ID
const searchPokedex = () => {
  if (POKEDEX_SEARCH_INPUT.value) {
    if (POKEDEX_SEARCH_INPUT.value >= 1 && POKEDEX_SEARCH_INPUT.value <= 807) {
      createPokemonData(POKEDEX_SEARCH_INPUT.value);
    } else {
      for (let i = 0; i < 807; i++) {
        if (POKEDEX_SEARCH_INPUT.value.toLowerCase() === fullPokemonUsefulArray[`${i}`].name) {
          createPokemonData(fullPokemonUsefulArray[`${i}`].id);
        }
      }
    }
  } else {
    return;
  }
}

//initiates pokedex data creation and opening of site
fetchTypeData();
fetchPokemon(1, SIZE_OF_POKEDEX);
