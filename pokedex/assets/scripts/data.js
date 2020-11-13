let fullPokemonUsefulArray; //super important, used often

let typeData;

let allMoveData;

//fetches the type data
const fetchTypeData = () => {
  let promisesTypesArray = [];
  for (let i = 1; i <= 18; i++) {
    let placeholderObject = {};
    const url = `https://pokeapi.co/api/v2/type/${i}/`;
    placeholderObject = fetch(url)
      .then((response) => response.json())
      .then((data) => {
        promisesTypesArray.push(data['damage_relations']);
      });
  }
  typeData = promisesTypesArray;
  console.log(typeData);
};

//Fetches pokemon data for pokedex
const fetchPokemon = (startNumber, endNumber) => {
  let promisesArray = [];
  for (let i = startNumber; i <= endNumber; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promisesArray.push(fetch(url).then((response) => response.json()));
  }
  Promise.all(promisesArray).then((pokemonArray) => {
    convertData(pokemonArray);
  });
};

//converts fetched data for use on pokedex
let pokemonUsefulArray;
let filterCount = 0;

const convertData = (array) => {
  pokemonUsefulArray = array.map((data) => ({
    name: data.name,
    id: data.id,
    image:
      data.sprites.versions['generation-vii']['ultra-sun-ultra-moon'][
        'front_default'
      ],
    // type: data.types.map(type => type.type.name).join(", "),
    type: data.types,
    stats: data.stats,
  }));
  if (filterCount === 0) {
    fullPokemonUsefulArray = pokemonUsefulArray;
    filterCount++;
  }
  displayData(pokemonUsefulArray);
  console.log(pokemonUsefulArray);
};

//Fetches pokemon main data

let fetchedData;

const createPokemonData = (pokemonID) => {
  let selectedPokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
  const selectedPokemonData = fetch(selectedPokemonURL)
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
      initiatePokemonPageFill(fetchedData);
    });
};

//fetches and sets specific species data
let fetchedSpeciesData;

const createSpeciesData = (pokemonID) => {
  let speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;
  const selectedSpeciesData = fetch(speciesURL)
    .then((response) => response.json())
    .then((data) => {
      fetchedSpeciesData = data;
      setSpeciesData(fetchedSpeciesData);
    });
};

const setSpeciesData = (data) => {
  speciesData = data;
  createEvolutionChainData();
};

//fetches and sets the evolution chain data for specific pokemon
let fetchedEvolutionChainData;

const createEvolutionChainData = () => {
  let evolutionChainURL = speciesData['evolution_chain'].url;
  const selectedEvolutionChainData = fetch(evolutionChainURL)
    .then((response) => response.json())
    .then((data) => {
      fetchedEvolutionChainData = data;
      setEvolutionChainData(fetchedEvolutionChainData);
    });
};

const setEvolutionChainData = (data) => {
  evolutionChainData = data;
};

//fetches and sets type page data for certain type
let fetchedTypePageData;

const createTypePageData = (ID) => {
  let typePageDataURL = `https://pokeapi.co/api/v2/type/${ID + 1}/`;
  const selectedTypePageData = fetch(typePageDataURL)
    .then((response) => response.json())
    .then((data) => {
      fetchedTypePageData = data;
      setTypePageData(fetchedTypePageData);
    });
};

const setTypePageData = (data) => {
  typePageData = data;
};

//fetches and sets all move data
let fetchedAllMoveData = [];
let fetchedAllMoveCount = 0;

const createAllMoveData = () => {
  if (fetchedAllMoveCount !== 0) {
    return;
  }
  for (let i = 1; i <= 796; i++) {
    let moveDataURL = `https://pokeapi.co/api/v2/move/${i}`;
    const selectedMoveData = fetch(moveDataURL)
      .then((response) => response.json())
      .then((data) => {
        fetchedAllMoveData.push(data);
      });
  }
  fetchedAllMoveCount++;
  setAllMoveData(fetchedAllMoveData);
};

const setAllMoveData = (data) => {
  allMoveData = data;
};
