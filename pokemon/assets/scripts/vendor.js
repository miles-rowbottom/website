const SEARCH_BUTTON = document.getElementById('search-button');

const RED_BLUE_RADIO = document.getElementById('red-blue-radio');
const YELLOW_RADIO = document.getElementById('yellow-radio');
const GOLD_SILVER_RADIO = document.getElementById('gold-silver-radio');
const CRYSTAL_RADIO = document.getElementById('crystal-radio');
const RUBY_SAPPHIRE_RADIO = document.getElementById('ruby-sapphire-radio');
const EMERALD_RADIO = document.getElementById('emerald-radio');
const FIRERED_LEAFGREEN_RADIO = document.getElementById(
  'firered-leafgreen-radio'
);
const DIAMOND_PEARL_RADIO = document.getElementById('diamond-pearl-radio');
const PLATINUM_RADIO = document.getElementById('platinum-radio');
const HEARTGOLD_SOULSILVER_RADIO = document.getElementById(
  'heartgold-soulsilver-radio'
);
const BLACK_WHITE_RADIO = document.getElementById('black-white-radio');
const COLOSSEUM_RADIO = document.getElementById('colosseum-radio');
const XD_RADIO = document.getElementById('xd-radio');
const BLACK_2_WHITE_2_RADIO = document.getElementById('black-2-white-2-radio');
const X_Y_RADIO = document.getElementById('x-y-radio');
const OMEGA_RUBY_ALPHA_SAPPHIRE_RADIO = document.getElementById(
  'omega-ruby-alpha-sapphire-radio'
);
const SUN_MOON_RADIO = document.getElementById('sun-moon-radio');
const ULTRA_SUN_ULTRA_MOON_RADIO = document.getElementById(
  'ultra-sun-ultra-moon-radio'
);

const ENTIRE_TABLE = document.getElementById('entire-table');

let SEARCH_INPUTS = [];
let POKEMON_NAMES = [];
let POKEMON_SPRITES = [];
let POKEMON_TYPES = [];
let ABILITIES = [];
let HIDDEN_ABILITIES = [];
let EGG_GROUPS = [];
let GENDER_RATES = [];
let BASE_EXP = [];
let BASE_HAPPINESS = [];
let CAPTURE_RATES = [];
let BASE_HP = [];
let BASE_ATTACK = [];
let BASE_DEFENSE = [];
let BASE_SPECIAL_ATTACK = [];
let BASE_SPECIAL_DEFENSE = [];
let BASE_SPEED = [];
let BASE_TOTAL = [];
let EFFORT_VALUES = [];

for (i = 0; i < 6; i++) {
  SEARCH_INPUTS[i] = document.getElementById(`search-input-${i}`);
  POKEMON_NAMES[i] = document.getElementById(`name-cell-${i}`);
  POKEMON_SPRITES[i] = document.getElementById(`sprite-cell-${i}`);
  POKEMON_TYPES[i] = document.getElementById(`type-cell-${i}`);
  ABILITIES[i] = document.getElementById(`ability-cell-${i}`);
  HIDDEN_ABILITIES[i] = document.getElementById(`hidden-ability-cell-${i}`);
  EGG_GROUPS[i] = document.getElementById(`egg-group-cell-${i}`);
  GENDER_RATES[i] = document.getElementById(`gender-rate-cell-${i}`);
  BASE_EXP[i] = document.getElementById(`base-exp-cell-${i}`);
  BASE_HAPPINESS[i] = document.getElementById(`base-happiness-cell-${i}`);
  CAPTURE_RATES[i] = document.getElementById(`capture-rate-cell-${i}`);
  BASE_HP[i] = document.getElementById(`base-HP-cell-${i}`);
  BASE_ATTACK[i] = document.getElementById(`base-attack-cell-${i}`);
  BASE_DEFENSE[i] = document.getElementById(`base-defense-cell-${i}`);
  BASE_SPECIAL_ATTACK[i] = document.getElementById(
    `base-special-attack-cell-${i}`
  );
  BASE_SPECIAL_DEFENSE[i] = document.getElementById(
    `base-special-defense-cell-${i}`
  );
  BASE_SPEED[i] = document.getElementById(`base-speed-cell-${i}`);
  BASE_TOTAL[i] = document.getElementById(`base-total-cell-${i}`);
  EFFORT_VALUES[i] = document.getElementById(`effort-value-cell-${i}`);
}

//capitalises only the first letter of the entered string
const capitaliseWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const resetCellStyling = (cell) => {
  cell.textContent = '';
  cell.style.background = 'none';
  cell.style.fontWeight = 'normal';
};

const resetMoveRows = () => {
  document.querySelectorAll('.move-row').forEach((e) => e.remove());
};

const createSectionRow = (string) => {
  let sectionRow = document.createElement('tr');
  sectionRow.classList.add('section-row', 'move-row');
  let sectionCell = document.createElement('td');
  sectionCell.classList.add('section-row-cell');
  sectionCell.textContent = string;
  sectionRow.insertAdjacentElement('beforeend', sectionCell);
  ENTIRE_TABLE.insertAdjacentElement('beforeend', sectionRow);
};

//codes a delay to allow a fetch to be completed
function resolveDelay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'search-button') {
    initiateSearchLoad();
  }
});
