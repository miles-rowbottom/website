let nameURLData;

const fetchNameURLData = () => {
  let fetchedNameURLData;
  let dataURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=893';
  const selectedNameURLData = fetch(dataURL)
    .then((response) => response.json())
    .then((data) => {
      fetchedNameURLData = data;
      setNameURLData(fetchedNameURLData);
    });
};

const setNameURLData = (data) => {
  nameURLData = data.results;
  console.log(nameURLData);
};

let pokemonData = [];

const fetchPokemonData = () => {
  pokemonData = [];
  let fetchedPokemonData = [];
  for (let i = 0; i < searchValues.length; i++) {
    let dataURL = `https://pokeapi.co/api/v2/pokemon/${searchValues[i]}`;
    const selectedpokemonData = fetch(dataURL)
      .then((response) => response.json())
      .then((data) => {
        fetchedPokemonData[i] = data;
        pokemonData[i] = fetchedPokemonData[i];
      });
  }
};

let speciesData = [];

const fetchSpeciesData = () => {
    speciesData = [];
    let fetchedSpeciesData = [];
    for (let i = 0; i < searchValues.length; i++) {
      let dataURL = `https://pokeapi.co/api/v2/pokemon-species/${searchValues[i]}`;
      const selectedspeciesData = fetch(dataURL)
        .then((response) => response.json())
        .then((data) => {
          fetchedSpeciesData[i] = data;
          speciesData[i] = fetchedSpeciesData[i];
        });
    }
  };