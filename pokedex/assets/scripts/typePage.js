//all populates the individual type page

//globally loads the type page data so it can be accessed elsewhere
let typePageData;

//initiates delegation of populating the type page
const populateTypePage = async (type, ID) => {
  console.log(type);
  createTypePageData(ID);
  createAllMoveData();
  //awaits to allow the type data and move data to be fetched
  await resolveDelay(2000);
  window.scrollTo(0, 0);
  fillTypePageTitle(type);
  fillTypePagePokemon(type);
  fillTypePageMoves(type);
  openTypePage();
};

//populates the type page title based on the type
const fillTypePageTitle = (type) => {
  TYPE_PAGE_TITLE.textContent = `${capitaliseWord(type)} (Type)`;
};

//populates the type page pokemon table 
const fillTypePagePokemon = (type) => {
  //reset table
  TYPE_PAGE_POKEMON_TABLE.textContent = '';
  TYPE_PAGE_POKEMON_TABLE.insertAdjacentElement(
    'beforeend',
    TYPE_PAGE_POKEMON_TABLE_HEADER
  );
  //set heading
  TYPE_PAGE_POKEMON_HEADING.textContent = `All ${capitaliseWord(
    type
  )} type Pokemon`;
  //create array of this type pokemon
  let thisTypePokemon = [];
  for (let i = 0; i < fullPokemonUsefulArray.length; i++) {
    for (let j = 0; j < typePageData.pokemon.length; j++) {
      if (
        fullPokemonUsefulArray[`${i}`].name ===
        typePageData.pokemon[`${j}`].pokemon.name
      ) {
        thisTypePokemon.push(fullPokemonUsefulArray[`${i}`]);
        break;
      } else {
        continue;
      }
    }
  }
  //define information blocks
  let pokemonRows = [];
  let pokemonImages = [];
  let pokemonIDs = [];
  let pokemonNames = [];
  let pokemonName = [];
  let pokemonTypes = [];
  for (k = 0; k < thisTypePokemon.length; k++) {
    //create rows
    pokemonRows[k] = document.createElement('tr');
    pokemonRows[k].classList.add('type-page-pokemon-row');
    TYPE_PAGE_POKEMON_TABLE.insertAdjacentElement('beforeend', pokemonRows[k]);
    //create images
    pokemonImages[k] = document.createElement('td');
    pokemonImages[k].classList.add(
      'type-page-pokemon-square',
      'type-page-pokemon-sprite',
      `pokemon-id-${thisTypePokemon[k].id}`
    );
    pokemonImages[k].style.backgroundImage =
      'url(' + thisTypePokemon[`${k}`].image + ')';
    pokemonRows[k].insertAdjacentElement('beforeEnd', pokemonImages[k]);
    //create IDs
    pokemonIDs[k] = document.createElement('td');
    pokemonIDs[k].classList.add('type-page-pokemon-square');
    pokemonIDs[k].textContent = `#${formatPokemonID(thisTypePokemon[k].id)}`;
    pokemonRows[k].insertAdjacentElement('beforeEnd', pokemonIDs[k]);
    //create names
    pokemonNames[k] = document.createElement('td');
    pokemonNames[k].classList.add('type-page-pokemon-wide');
    pokemonName[k] = document.createElement('a');
    pokemonName[k].classList.add(
      'card-text',
      'card-name',
      `pokemon-id-${thisTypePokemon[k].id}`
    );
    pokemonName[k].textContent = capitaliseWord(thisTypePokemon[`${k}`].name);
    pokemonNames[k].insertAdjacentElement('beforeEnd', pokemonName[k]);
    pokemonRows[k].insertAdjacentElement('beforeEnd', pokemonNames[k]);
    //create types
    pokemonTypes[k] = document.createElement('td');
    pokemonTypes[k].classList.add('type-page-pokemon-wide');
    let pokemonType = [];
    for (let m = 0; m < Object.keys(thisTypePokemon[`${k}`].type).length; m++) {
      let type = thisTypePokemon[`${k}`].type[`${m}`].type.name;
      pokemonType[m] = document.createElement('a');
      pokemonType[m].classList.add(
        'pokedex-data-type',
        'type-page-type',
        'type',
        `${type}`
      );
      pokemonType[m].textContent = capitaliseWord(type);
      pokemonType[m].style.backgroundColor = typeColourReturn(type);
      pokemonType[m].style.borderColor = secondaryTypeColourReturn(type);
      pokemonTypes[k].insertAdjacentElement('beforeEnd', pokemonType[m]);
    }
    pokemonRows[k].insertAdjacentElement('beforeEnd', pokemonTypes[k]);
    //create stats
    let pokemonStats = [];
    for (n = 0; n < 6; n++) {
      pokemonStats[n] = document.createElement('td');
      pokemonStats[n].classList.add('type-page-pokemon-square');
      pokemonStats[n].textContent =
        thisTypePokemon[`${k}`].stats[`${n}`]['base_stat'];
      pokemonRows[k].insertAdjacentElement('beforeEnd', pokemonStats[n]);
    }
  }
};

//populates the type page moves table
const fillTypePageMoves = (type) => {
  //reset table
  TYPE_PAGE_MOVES_TABLE.textContent = '';
  TYPE_PAGE_MOVES_TABLE.insertAdjacentElement(
    'beforeend',
    TYPE_PAGE_MOVES_TABLE_HEADER
  );
  //set heading
  TYPE_PAGE_MOVES_HEADING.textContent = `All ${capitaliseWord(
    type
  )} type Moves`;
  //create this type moves data
  let thisTypeMoves = [];
  for (let i = 0; i < allMoveData.length; i++) {
    if (allMoveData[i].type.name === type) {
      thisTypeMoves.push(allMoveData[i]);
    }
  }
  console.log(thisTypeMoves);
  //define information blocks
  let moveRows = [];
  let moveNames = [];
  let moveName = [];
  let moveTypes = [];
  let moveType = [];
  let moveCategories = [];
  let movePowers = [];
  let moveAccuracies = [];
  let movePPs = [];
  let moveEffects = [];
  for (let j = 0; j < thisTypeMoves.length; j++) {
    //create rows
    moveRows[j] = document.createElement('tr');
    moveRows[j].classList.add('type-page-moves-row');
    TYPE_PAGE_MOVES_TABLE.insertAdjacentElement('beforeend', moveRows[j]);
    //create names
    moveNames[j] = document.createElement('td');
    moveNames[j].classList.add('type-page-moves-name');
    moveName[j] = document.createElement('a');
    moveName[j].classList.add(
      'card-text',
      'card-name',
      'move',
      `pokemon-move-${thisTypeMoves[j].id}`
    );
    moveName[j].textContent = capitaliseWord(
      thisTypeMoves[`${j}`].names['7'].name
    );
    moveNames[j].insertAdjacentElement('beforeEnd', moveName[j]);
    moveRows[j].insertAdjacentElement('beforeEnd', moveNames[j]);
    //create types
    moveTypes[j] = document.createElement('td');
    moveTypes[j].classList.add('type-page-moves-small');
    let type = thisTypeMoves[`${j}`].type.name;
    moveType[j] = document.createElement('a');
    moveType[j].classList.add(
      'pokedex-data-type',
      'type-page-type',
      'type',
      `${type}`
    );
    moveType[j].textContent = capitaliseWord(type);
    moveType[j].style.backgroundColor = typeColourReturn(type);
    moveType[j].style.borderColor = secondaryTypeColourReturn(type);
    moveTypes[j].insertAdjacentElement('beforeEnd', moveType[j]);
    moveRows[j].insertAdjacentElement('beforeEnd', moveTypes[j]);
    //create categories
    moveCategories[j] = document.createElement('td');
    moveCategories[j].classList.add('type-page-moves-small');
    if (thisTypeMoves[`${j}`]['damage_class']) {
      moveCategories[j].textContent = capitaliseWord(
        thisTypeMoves[`${j}`]['damage_class'].name
      );
    } else {
      moveCategories[j].textContent = '-';
    }
    moveRows[j].insertAdjacentElement('beforeEnd', moveCategories[j]);
    //create powers
    movePowers[j] = document.createElement('td');
    movePowers[j].classList.add('type-page-moves-small');
    if (thisTypeMoves[`${j}`].power) {
      movePowers[j].textContent = thisTypeMoves[`${j}`].power;
    } else {
      movePowers[j].textContent = '-';
    }
    moveRows[j].insertAdjacentElement('beforeEnd', movePowers[j]);
    //create accuracies
    moveAccuracies[j] = document.createElement('td');
    moveAccuracies[j].classList.add('type-page-moves-small');
    if (thisTypeMoves[`${j}`].accuracy) {
      moveAccuracies[j].textContent = thisTypeMoves[`${j}`].accuracy;
    } else {
      moveAccuracies[j].textContent = '-';
    }
    moveRows[j].insertAdjacentElement('beforeEnd', moveAccuracies[j]);
    //create PPs
    movePPs[j] = document.createElement('td');
    movePPs[j].classList.add('type-page-moves-small');
    if (thisTypeMoves[`${j}`].pp) {
      movePPs[j].textContent = thisTypeMoves[`${j}`].pp;
    } else {
      movePPs[j].textContent = '-';
    }
    moveRows[j].insertAdjacentElement('beforeEnd', movePPs[j]);
    //create effects
    moveEffects[j] = document.createElement('td');
    moveEffects[j].classList.add('type-page-moves-effect');
    let moveEffectEdited;
    if (thisTypeMoves[`${j}`]['effect_entries'].length === 0) {
      moveEffectEdited = '-';
    } else {
      let moveEffect =
        thisTypeMoves[`${j}`]['effect_entries'][0]['short_effect'];
      moveEffectEdited = moveEffect.replace(
        '$effect_chance',
        `${thisTypeMoves[`${j}`]['effect_chance']}`
      );
    }
    moveEffects[j].textContent = moveEffectEdited;
    moveRows[j].insertAdjacentElement('beforeEnd', moveEffects[j]);
  }
};
