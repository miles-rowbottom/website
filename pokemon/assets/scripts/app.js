let searchValues = [];

let selectedGame;

let baseEXPValues = [];
let baseHappinessValues = [];
let captureRateValues = [];
let baseHPValues = [];
let baseAttackValues = [];
let baseDefenseValues = [];
let baseSpecialAttackValues = [];
let baseSpecialDefenseValues = [];
let baseSpeedValues = [];
let baseTotalValues = [];

const initiateSearchLoad = async () => {
  setSelectedGame();
  convertSearchEntries();
  fetchPokemonData();
  fetchSpeciesData();
  await resolveDelay(1500);
  console.log(pokemonData);
  console.log(speciesData);
  populateNames();
  populateSprites();
  populateTypes();
  populateAbilities();
  populateHiddenAbility();
  populateEggGroups();
  populateGenderRate();
  populateBaseEXP();
  populateBaseHappiness();
  populateCaptureRate();
  populateStat(BASE_HP, baseHPValues, 0);
  populateStat(BASE_ATTACK, baseAttackValues, 1);
  populateStat(BASE_DEFENSE, baseDefenseValues, 2);
  populateStat(BASE_SPECIAL_ATTACK, baseSpecialAttackValues, 3);
  populateStat(BASE_SPECIAL_DEFENSE, baseSpecialDefenseValues, 4);
  populateStat(BASE_SPEED, baseSpeedValues, 5);
  populateTotalStats();
  populateEffortValue();
  populateMoves();
};

const setSelectedGame = () => {
  if (RED_BLUE_RADIO.checked) {
    selectedGame = 'red-blue';
  } else if (YELLOW_RADIO.checked) {
    selectedGame = 'yellow';
  } else if (GOLD_SILVER_RADIO.checked) {
    selectedGame = 'gold-silver';
  } else if (CRYSTAL_RADIO.checked) {
    selectedGame = 'crystal';
  } else if (RUBY_SAPPHIRE_RADIO.checked) {
    selectedGame = 'ruby-sapphire';
  } else if (EMERALD_RADIO.checked) {
    selectedGame = 'emerald';
  } else if (FIRERED_LEAFGREEN_RADIO.checked) {
    selectedGame = 'firered-leafgreen';
  } else if (DIAMOND_PEARL_RADIO.checked) {
    selectedGame = 'diamond-pearl';
  } else if (PLATINUM_RADIO.checked) {
    selectedGame = 'platinum';
  } else if (HEARTGOLD_SOULSILVER_RADIO.checked) {
    selectedGame = 'heartgold-soulsilver';
  } else if (COLOSSEUM_RADIO.checked) {
    selectedGame = 'colosseum';
  } else if (BLACK_WHITE_RADIO.checked) {
    selectedGame = 'black-white';
  } else if (XD_RADIO.checked) {
    selectedGame = 'xd';
  } else if (FIRERED_LEAFGREEN_RADIO.checked) {
    selectedGame = 'firered-leafgreen';
  } else if (BLACK_2_WHITE_2_RADIO.checked) {
    selectedGame = 'black-2-white-2';
  } else if (X_Y_RADIO.checked) {
    selectedGame = 'x-y';
  } else if (OMEGA_RUBY_ALPHA_SAPPHIRE_RADIO.checked) {
    selectedGame = 'omega-ruby-alpha-sapphire';
  } else if (SUN_MOON_RADIO.checked) {
    selectedGame = 'sun-moon';
  } else if (ULTRA_SUN_ULTRA_MOON_RADIO.checked) {
    selectedGame = 'ultra-sun-ultra-moon';
  } else {
    selectedGame = 'red-blue';
  }
};

const convertSearchEntries = () => {
  searchValues = [];
  for (let i = 0; i < 6; i++) {
    if (SEARCH_INPUTS[i].value === '') {
      continue;
    } else if (SEARCH_INPUTS[i].value >= 1 && SEARCH_INPUTS[i].value <= 893) {
      searchValues.push(SEARCH_INPUTS[i].value);
    } else {
      for (j = 0; j < 893; j++) {
        if (SEARCH_INPUTS[i].value.toLowerCase() !== nameURLData[`${j}`].name) {
          continue;
        } else {
          searchValues.push(`${j + 1}`);
          break;
        }
      }
    }
  }
};

const populateNames = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(POKEMON_NAMES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    let name = pokemonData[i].name.toUpperCase();
    POKEMON_NAMES[i].textContent = name;
    POKEMON_NAMES[i].style.color = '#3a537d';
    POKEMON_NAMES[i].style.fontWeight = 'bold';
  }
};

const populateSprites = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(POKEMON_SPRITES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    let spriteURL =
      pokemonData[i].sprites.versions['generation-viii'].icons['front_default'];
    let spriteBox = document.createElement('span');
    spriteBox.classList.add('sprite-box');
    spriteBox.style.backgroundImage = `url(${spriteURL})`;
    POKEMON_SPRITES[i].insertAdjacentElement('beforeend', spriteBox);
  }
};

const populateTypes = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(POKEMON_TYPES[i]);
  }
  for (i = 0; i < pokemonData.length; i++) {
    POKEMON_TYPES[i].textContent = '';
    let type1 = pokemonData[i].types['0'].type.name;
    let pokemonTypeList = document.createElement('ul');
    let pokemonType1 = document.createElement('li');
    pokemonType1.textContent = type1.toUpperCase();
    pokemonTypeList.insertAdjacentElement('beforeend', pokemonType1);
    if (pokemonData[i].types.length === 2) {
      let type2 = pokemonData[i].types['1'].type.name;
      let pokemonType2 = document.createElement('li');
      pokemonType2.textContent = type2.toUpperCase();
      pokemonTypeList.insertAdjacentElement('beforeend', pokemonType2);
    }
    POKEMON_TYPES[i].insertAdjacentElement('beforeend', pokemonTypeList);
  }
};

const populateAbilities = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(ABILITIES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    ABILITIES[i].textContent = '';
    let ability1 = formatAbility(pokemonData[i].abilities['0'].ability.name);
    let abilityList = document.createElement('ul');
    let abilityElement1 = document.createElement('li');
    abilityElement1.textContent = ability1;
    abilityList.insertAdjacentElement('beforeend', abilityElement1);
    if (pokemonData[i].abilities.length === 3) {
      let ability2 = formatAbility(pokemonData[i].abilities['1'].ability.name);
      let abilityElement2 = document.createElement('li');
      abilityElement2.textContent = ability2;
      abilityList.insertAdjacentElement('beforeend', abilityElement2);
    }
    ABILITIES[i].insertAdjacentElement('beforeend', abilityList);
  }
};

const populateHiddenAbility = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(HIDDEN_ABILITIES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    let indexValue;
    if (pokemonData[i].abilities.length === 2) {
      indexValue = 1;
    } else {
      indexValue = 2;
    }
    let hiddenAbility = formatAbility(
      pokemonData[i].abilities[`${indexValue}`].ability.name
    );
    HIDDEN_ABILITIES[i].textContent = hiddenAbility;
  }
};

const populateEggGroups = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(EGG_GROUPS[i]);
  }
  for (i = 0; i < speciesData.length; i++) {
    EGG_GROUPS[i].textContent = '';
    let group1 = convertEggGroup(speciesData[i]['egg_groups']['0'].name);
    let eggGroupList = document.createElement('ul');
    let eggGroup1 = document.createElement('li');
    eggGroup1.textContent = group1;
    eggGroupList.insertAdjacentElement('beforeend', eggGroup1);
    if (speciesData[i]['egg_groups'].length === 2) {
      let group2 = convertEggGroup(speciesData[i]['egg_groups']['1'].name);
      let eggGroup2 = document.createElement('li');
      eggGroup2.textContent = group2;
      eggGroupList.insertAdjacentElement('beforeend', eggGroup2);
    }
    EGG_GROUPS[i].insertAdjacentElement('beforeend', eggGroupList);
  }
};

const populateGenderRate = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(GENDER_RATES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    let genderRate = speciesData[i]['gender_rate'];
    if (genderRate === -1) {
      GENDER_RATES[i].textContent = 'Genderless';
    } else {
      let femalePercentage = (genderRate / 8) * 100;
      let malePercentage = ((8 - genderRate) / 8) * 100;
      GENDER_RATES[
        i
      ].textContent = `${malePercentage}% male, ${femalePercentage}% female`;
    }
  }
};

const populateBaseEXP = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(BASE_EXP[i]);
  }
  for (i = 0; i < pokemonData.length; i++) {
    let baseEXP = pokemonData[i]['base_experience'];
    baseEXPValues[i] = baseEXP;
    BASE_EXP[i].textContent = baseEXP;
  }
  let maxBaseEXP = Math.max.apply(Math, baseEXPValues);
  for (i = 0; i < speciesData.length; i++) {
    if (BASE_EXP[i].textContent == maxBaseEXP) {
      BASE_EXP[i].style.fontWeight = 'bold';
      BASE_EXP[i].style.backgroundColor = '#b4c7e6';
    }
  }
};

const populateBaseHappiness = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(BASE_HAPPINESS[i]);
  }
  for (i = 0; i < speciesData.length; i++) {
    let baseHappiness = speciesData[i]['base_happiness'];
    baseHappinessValues[i] = baseHappiness;
    BASE_HAPPINESS[i].textContent = baseHappiness;
  }
  let maxBaseHappiness = Math.max.apply(Math, baseHappinessValues);
  for (i = 0; i < speciesData.length; i++) {
    if (BASE_HAPPINESS[i].textContent == maxBaseHappiness) {
      BASE_HAPPINESS[i].style.fontWeight = 'bold';
      BASE_HAPPINESS[i].style.backgroundColor = '#b4c7e6';
    }
  }
};

const populateCaptureRate = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(CAPTURE_RATES[i]);
  }
  for (i = 0; i < speciesData.length; i++) {
    let captureRate = speciesData[i]['capture_rate'];
    captureRateValues[i] = captureRate;
    CAPTURE_RATES[i].textContent = captureRate;
  }
  let maxCaptureRate = Math.max.apply(Math, captureRateValues);
  for (i = 0; i < speciesData.length; i++) {
    if (CAPTURE_RATES[i].textContent == maxCaptureRate) {
      CAPTURE_RATES[i].style.fontWeight = 'bold';
      CAPTURE_RATES[i].style.backgroundColor = '#b4c7e6';
    }
  }
};

const populateStat = (elementArray, valueArray, statIndex) => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(elementArray[i]);
  }
  for (i = 0; i < pokemonData.length; i++) {
    let stat = pokemonData[i].stats[`${statIndex}`]['base_stat'];
    valueArray[i] = stat;
    elementArray[i].textContent = stat;
  }
  let maxStat = Math.max.apply(Math, valueArray);
  for (i = 0; i < pokemonData.length; i++) {
    if (elementArray[i].textContent == maxStat) {
      elementArray[i].style.fontWeight = 'bold';
      elementArray[i].style.backgroundColor = '#b4c7e6';
    }
  }
};

const populateTotalStats = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(BASE_TOTAL[i]);
  }
  for (i = 0; i < pokemonData.length; i++) {
    let totalStat =
      baseHPValues[i] +
      baseAttackValues[i] +
      baseDefenseValues[i] +
      baseSpecialAttackValues[i] +
      baseSpecialDefenseValues[i] +
      baseSpeedValues[i];
    baseTotalValues[i] = totalStat;
    BASE_TOTAL[i].textContent = totalStat;
  }
  let maxTotal = Math.max.apply(Math, baseTotalValues);
  for (i = 0; i < pokemonData.length; i++) {
    if (BASE_TOTAL[i].textContent == maxTotal) {
      BASE_TOTAL[i].style.fontWeight = 'bold';
      BASE_TOTAL[i].style.backgroundColor = '#b4c7e6';
    }
  }
};

const populateEffortValue = () => {
  for (i = 0; i < 6; i++) {
    resetCellStyling(EFFORT_VALUES[i]);
  }
  for (let i = 0; i < pokemonData.length; i++) {
    let effortValues = [];
    for (let j = 0; j < 6; j++) {
      if (pokemonData[i].stats[`${j}`].effort === 0) {
        continue;
      } else {
        effortValues.push(j, pokemonData[i].stats[`${j}`].effort);
      }
    }
    let effortValuesText = '';
    effortValuesText = effortValues[1] + ' ' + convertEVYield(effortValues[0]);
    if (effortValues.length > 2) {
      effortValuesText +=
        ', ' + effortValues[3] + ' ' + convertEVYield(effortValues[2]);
      if (effortValues.length > 4) {
        effortValuesText +=
          ', ' + effortValues[5] + ' ' + convertEVYield(effortValues[4]);
      }
    }
    EFFORT_VALUES[i].textContent = effortValuesText;
  }
};

const populateMoves = () => {
  resetMoveRows();
  populateLevelUpMoves();
  populateOtherMoves('machine', 'Machine Moves');
  populateOtherMoves('egg', 'Egg Moves');
  populateOtherMoves('tutor', 'Tutor Moves');
};

let levelsArray = [];

const populateLevelUpMoves = () => {
  createSectionRow('Level-Up Moves');
  levelsArray = [];
  allMoveArray = [];
  for (let i = 0; i < pokemonData.length; i++) {
    let moveArray = [];
    for (let moveNo = 0; moveNo < pokemonData[i].moves.length; moveNo++) {
      for (
        let version = 0;
        version <
        pokemonData[i].moves[`${moveNo}`]['version_group_details'].length;
        version++
      ) {
        if (
          pokemonData[i].moves[`${moveNo}`]['version_group_details'][
            `${version}`
          ]['version_group'].name === `${selectedGame}`
        ) {
          moveArray.push([
            pokemonData[i].moves[`${moveNo}`].move.name,
            pokemonData[i].moves[`${moveNo}`]['version_group_details'][
              `${version}`
            ],
          ]);
        }
      }
    }
    // populateLevelUpRows(moveArray, i);
    let levelUpMoveArray = [];
    for (let j = 0; j < moveArray.length; j++) {
      if (moveArray[j][1]['move_learn_method'].name === 'level-up') {
        levelUpMoveArray.push(moveArray[j]);
      }
    }
    levelUpMoveArray = levelUpMoveArray.sort((a, b) =>
      a[1]['level_learned_at'] > b[1]['level_learned_at'] ? 1 : -1
    );
    for (let k = 0; k < levelUpMoveArray.length; k++) {
      levelsArray.push(levelUpMoveArray[k][1]['level_learned_at']);
    }
    console.log(levelUpMoveArray);
    allMoveArray.push(levelUpMoveArray);
  }
  levelsArray = sortAndRemoveDuplicates(levelsArray);
  console.log(levelsArray);
  console.log(allMoveArray);
  fillLevelUpMoves(levelsArray, allMoveArray);
};

const fillLevelUpMoves = (levelsArray, allMoveArray) => {
  let rowNumber = 0;
  for (let i = 1; i <= 100; i++) {
    if (levelsArray.includes(i)) {
      rowNumber++;
      let moveRow = document.createElement('tr');
      moveRow.classList.add('result-row', `move-level-${i}`, 'move-row');
      if (rowNumber % 2) {
        moveRow.classList.add('white-row');
      } else {
        moveRow.classList.add('grey-row');
      }
      let moveLevelBox = document.createElement('td');
      moveLevelBox.classList.add('left-cell');
      moveLevelBox.textContent = `Level ${i}`;
      moveRow.insertAdjacentElement('beforeend', moveLevelBox);
      for (let j = 0; j < allMoveArray.length; j++) {
        let emptyLevelBox = false;
        for (let k = 0; k < allMoveArray[j].length; k++) {
          if (allMoveArray[j][k][1]['level_learned_at'] === i) {
            if (moveRow.lastChild.classList.contains(`level-${i}-cell-${j}`)) {
              moveRow.lastChild.textContent +=
                ', ' + formatMove(allMoveArray[j][k][0]);
            } else {
              let moveBox = document.createElement('td');
              moveBox.classList.add('column-cell', `level-${i}-cell-${j}`);
              moveBox.textContent = formatMove(allMoveArray[j][k][0]);
              moveRow.insertAdjacentElement('beforeend', moveBox);
              emptyLevelBox = true;
            }
          }
        }
        if (emptyLevelBox === false) {
          let moveBox = document.createElement('td');
          moveBox.classList.add('column-cell');
          moveRow.insertAdjacentElement('beforeend', moveBox);
        }
      }
      ENTIRE_TABLE.insertAdjacentElement('beforeend', moveRow);
    } else {
      continue;
    }
  }
};

let otherMovesArray = [];

const populateOtherMoves = (dataString, labelString) => {
  createSectionRow(labelString);
  otherMovesArray = [];
  for (let i = 0; i < pokemonData.length; i++) {
    let moveArray = [];
    for (let moveNo = 0; moveNo < pokemonData[i].moves.length; moveNo++) {
      for (
        let version = 0;
        version <
        pokemonData[i].moves[`${moveNo}`]['version_group_details'].length;
        version++
      ) {
        if (
          pokemonData[i].moves[`${moveNo}`]['version_group_details'][
            `${version}`
          ]['version_group'].name === `${selectedGame}` &&
          pokemonData[i].moves[`${moveNo}`]['version_group_details'][
            `${version}`
          ]['move_learn_method'].name === `${dataString}`
        ) {
          moveArray.push(pokemonData[i].moves[`${moveNo}`].move.name);
        }
      }
    }
    for (let j = 0; j < moveArray.length; j++) {
      otherMovesArray.push(moveArray[j]);
    }
  }
  otherMovesArray = sortAndRemoveDuplicates(otherMovesArray);
  fillOtherMoves(dataString);
};

const fillOtherMoves = (dataString) => {
  let rowNumber = 0;
  let rows = [];
  let rowLabelCells = [];
  let rowResultCells = [];
  for (let move = 0; move < otherMovesArray.length; move++) {
    rowNumber++;
    rows[move] = document.createElement('tr');
    rows[move].classList.add('result-row', "move-row");
    rows[move].id = `other-move-${otherMovesArray[move]}`;
    if (rowNumber % 2) {
      rows[move].classList.add('white-row');
    } else {
      rows[move].classList.add('grey-row');
    }
    rowLabelCells[move] = document.createElement('td');
    rowLabelCells[move].classList.add('left-cell');
    rowLabelCells[move].textContent = formatMove(otherMovesArray[move]);
    rows[move].insertAdjacentElement('beforeend', rowLabelCells[move]);
    for (let i = 0; i < pokemonData.length; i++) {
      rowResultCells[i] = document.createElement('td');
      rowResultCells[i].classList.add('column-cell');
      for (let j = 0; j < pokemonData[i].moves.length; j++) {
        for (
          let k = 0;
          k < pokemonData[i].moves[`${j}`]['version_group_details'].length;
          k++
        ) {
          if (
            pokemonData[i].moves[`${j}`]['version_group_details'][`${k}`][
              'version_group'
            ].name === `${selectedGame}` &&
            pokemonData[i].moves[`${j}`]['version_group_details'][`${k}`][
              'move_learn_method'
            ].name === `${dataString}` &&
            pokemonData[i].moves[`${j}`].move.name ===
              rows[move].id.substring(11)
          ) {
            rowResultCells[i].textContent = `${String.fromCharCode(10003)}`;
            rowResultCells[i].style.backgroundColor = '#b4c7e6';
            rowResultCells[i].style.fontWeight = 'bold';
          }
        }
      }
      rows[move].insertAdjacentElement('beforeend', rowResultCells[i]);
    }
    ENTIRE_TABLE.insertAdjacentElement('beforeend', rows[move]);
  }
};

//fetches broadest overview data, used for fetching specified pokemon data
window.scroll(0, 0);
fetchNameURLData();
