const TYPE_PAGE = document.getElementById("type-page");

const TYPE_PAGE_RETURN_TO_POKEDEX = document.getElementById("type-page-return-to-pokedex");

const TYPE_PAGE_TITLE = document.getElementById("type-page-title");

const TYPE_PAGE_POKEMON_HEADING = document.getElementById("type-page-pokemon-heading");
const TYPE_PAGE_POKEMON_TABLE = document.getElementById("type-page-pokemon-table");
const TYPE_PAGE_POKEMON_TABLE_HEADER = document.getElementById("type-page-pokemon-table-header");

const TYPE_PAGE_MOVES_HEADING = document.getElementById("type-page-moves-heading");
const TYPE_PAGE_MOVES_TABLE = document.getElementById("type-page-moves-table");
const TYPE_PAGE_MOVES_TABLE_HEADER = document.getElementById("type-page-moves-table-header");

TYPE_PAGE_RETURN_TO_POKEDEX.addEventListener('click', () => {
  TYPE_PAGE.style.display = 'none';
  POKEDEX.style.display = 'block';
})