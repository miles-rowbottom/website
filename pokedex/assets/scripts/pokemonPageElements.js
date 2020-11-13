//page of elements necessary to correctly load individual pokemon page

const POKEMON_PAGE = document.getElementById('pokemon-page');

const POKEMON_PAGE_PREVIOUS_POKEMON = document.getElementById(
  'previous-pokemon'
);
const POKEMON_PAGE_NEXT_POKEMON = document.getElementById('next-pokemon');
const POKEMON_PAGE_RETURN_TO_POKEDEX = document.getElementById(
  'return-to-pokedex'
);

const POKEMON_HEADER = document.getElementById('pokemon-header');
const POKEMON_DESCRIPTION = document.getElementById('pokemon-description');
const POKEMON_DESCRIPTION_NAME = document.getElementById("pokemon-description-name");
const POKEMON_DESCRIPTION_GENERATION = document.getElementById("pokemon-description-generation");
const POKEMON_DESCRIPTION_TYPES = document.getElementById("pokemon-description-types");

let POKEMON_STATS = [];
let POKEMON_MIN_STATS = [];
let POKEMON_MAX_STATS = [];
let POKEMON_STAT_BARS = [];
for (let i = 0; i <= 5; i++) {
  POKEMON_STATS[i] = document.getElementById(`base-stat-${i}`);
  POKEMON_MIN_STATS[i] = document.getElementById(`base-stat-${i}-min`);
  POKEMON_MAX_STATS[i] = document.getElementById(`base-stat-${i}-max`);
  POKEMON_STAT_BARS[i] = document.getElementById(`base-stat-${i}-bar`);
}
let BASE_STAT_TOTAL = document.getElementById('base-stat-total');

const POKEDEX_DATA_NATIONAL_NUMBER = document.getElementById(
  'pokedex-data-national-number'
);
const POKEDEX_DATA_TYPE_1 = document.getElementById('pokedex-data-type-1');
const POKEDEX_DATA_TYPE_2 = document.getElementById('pokedex-data-type-2');
const POKEDEX_DATA_SPECIES = document.getElementById('pokedex-data-species');
const POKEDEX_DATA_HEIGHT = document.getElementById('pokedex-data-height');
const POKEDEX_DATA_WEIGHT = document.getElementById('pokedex-data-weight');
const POKEDEX_DATA_ABILITIES = document.getElementById('pokedex-data-abilties');

const TRAINING_EV_YIELD = document.getElementById('training-EV-yield');
const TRAINING_CATCH_RATE = document.getElementById('training-catch-rate');
const TRAINING_BASE_FRIENDSHIP = document.getElementById(
  'training-base-friendship'
);
const TRAINING_BASE_EXPERIENCE = document.getElementById(
  'training-base-experience'
);
const TRAINING_GROWTH_RATE = document.getElementById('training-growth-rate');

const BREEDING_EGG_GROUPS = document.getElementById('breeding-egg-groups');
const BREEDING_GENDER = document.getElementById('breeding-gender');
const BREEDING_EGG_CYCLES = document.getElementById('breeding-egg-cycles');

const TYPE_DEFENSES_INTRO = document.getElementById('type-defenses-intro');
let TYPE_DEFENSES = [];
let TYPE_DEFENSES_VALUE = [];
for (let i = 0; i <= 17; i++) {
  TYPE_DEFENSES[i] = document.getElementById(`type-defenses-${i}`);
  TYPE_DEFENSES_VALUE[i] = document.getElementById(`type-defenses-value-${i}`);
}

const EVOLUTION_CHAIN = document.getElementById('evolution-chain');
const EVOLUTION_CHAIN_STATEMENT = document.getElementById(
  'evolution-chain-statement'
);
const EVOLUTION_CHART_BOX = document.getElementById('evolution-chart-box');
const EVOLUTION_CHART = document.getElementById("evolution-chart");
const EVOLUTION_CHART_1 = document.getElementById("evolution-chart-1");
const EVOLUTION_CHART_2 = document.getElementById("evolution-chart-2");
const EVOLUTION_CHART_3 = document.getElementById("evolution-chart-3");