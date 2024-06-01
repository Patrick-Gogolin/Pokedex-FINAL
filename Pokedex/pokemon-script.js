BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let loadedPokemon = [];
let amountPokemons = 550;

async function init() {
    showSpinner();
    try {
        await loadPokemon();
        hideSpinner();
        renderLoadMoreButton();
    } catch (error) {
        console.error('Error initializing data:', error);
        hideSpinner();
    }
}

async function loadPokemon() {
    try {
        for (let i = 520; i < amountPokemons; i++) {
            let url = BASE_URL + i;
            let response = await fetch(url);
            let pokemons = await response.json();
            loadedPokemon.push(pokemons);
        }
        renderPokemonCard();
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderPokemonCard() { 
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < loadedPokemon.length; i++) {
        const pokemon = loadedPokemon[i];
        const name = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
        const height = pokemon['height'] / 10;
        const weight = pokemon['weight'] / 10;
        content.innerHTML += generatePokemonCardHtml(i, name, pokemon, height, weight);

        getPokemonAbilities(i, pokemon);
        getPokemonTypes(i, pokemon);
    }
}

function renderLoadMoreButton() {
    document.getElementById('load-more-button').innerHTML = generateLoadMoreButtonHtml();
}

async function loadMorePokemon() {
    showLoadMoreSpinner();
    try {
        loadedPokemon.length = 0;
        amountPokemons += 20;
        await loadPokemon();
        renderLoadMoreButton();
    } catch (error) {
        console.error('Error initializing data:', error);
        hideSpinner();
    }
}

function showLoadMoreSpinner() { 
    document.getElementById('load-more-button').innerHTML = generateLoadMoreSpinnerHtml();
}

function getPokemonAbilities(i, pokemon){
    for (let y = 0; y < pokemon['abilities'].length; y++) {
        const ability = pokemon['abilities'][y]['ability']['name'];
        document.getElementById(`abilities-${i}`).innerHTML += generateAbilityHtml(ability);
    }
}

function getPokemonTypes(i, pokemon) {
    for (let x = 0; x < pokemon['types'].length; x++) {
        const type = pokemon['types'][x]['type']['name'];
        const firstType = pokemon['types'][0]['type']['name'];
        const typeClassName = `bg-${type}`;
        document.getElementById(`types-${i}`).innerHTML += generateTypeHtml(typeClassName, type);
        document.getElementById(`card${i}`).classList.add(`type-${firstType}`);
        document.getElementById(`play-sound-button${i}`).classList.add(`type-${firstType}`);
    }
}

function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

function openDialog(i) {
    renderSingleCard(i);
    let overlayer = document.getElementById('overlayer');
    let preventScroll = document.getElementById('no-scroll');
    overlayer.classList.remove('d-none');
    preventScroll.classList.add('no-scroll');
}

function renderSingleCard(i) {
    const pokemon = loadedPokemon[i];
    const firstType = pokemon['types'][0]['type']['name'];
    const name = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    contentSingleCard = document.getElementById('single-card-container');
    contentMobileSwitchButtons = document.getElementById('mobile-switch-image-container');

    renderSingleCardContentBasedOnIndex(i, pokemon, firstType, name);
    renderChangeImageButtonsForMobile(i);
    
    getTypesForSingleCard(i, pokemon);
    getStatsForSingleCard(i, pokemon);
}

function renderSingleCardContentBasedOnIndex(i, pokemon, firstType, name) {
    if (i === 0) {
        contentSingleCard.innerHTML = renderSingleCardHtmlFirstImage(i, pokemon, firstType, name);
    } else if (i === loadedPokemon.length - 1) {
        contentSingleCard.innerHTML = renderSingleCardHtmlLastImage(i, pokemon, firstType, name);
    } else {
        contentSingleCard.innerHTML = renderSingleCardHtmlEnabledButton(i, pokemon, firstType, name);
    }
}

function renderChangeImageButtonsForMobile(i) {
    if (i === 0) {
        contentMobileSwitchButtons.innerHTML = renderMobileSwitchButtonHtmlFirstImage(i);
    } else if (i === loadedPokemon.length - 1) {
        contentMobileSwitchButtons.innerHTML = renderMobileSwitchButtonHtmlLastImage(i);
    } else {
        contentMobileSwitchButtons.innerHTML = renderMobileSwitchButtonHtmlEnabledButton(i);
    }
}

function getTypesForSingleCard(i, array) {
    for (let x = 0; x <  array['types'].length; x++) {
        const type = array['types'][x]['type']['name'];
        const typeContainer = document.getElementById(`types${i}`);
        typeContainer.innerHTML += generateSingleCardType(type);
    }
}

function getStatsForSingleCard(i, array) {
    for (let x = 0; x < array['stats'].length; x++) {
        const statContainer = document.getElementById(`stats-${i}`);
        const stat = array['stats'][x]['base_stat'];
        const statName = array['stats'][x]['stat']['name'];
        statContainer.innerHTML += generateStatsHtml(statName, stat);
    }
}

function showMoves(i){
    let statMoveHeadline = document.getElementById('stat-moves-headline');
    let statContainer = document.getElementById(`stats-${i}`);
    statContainer.innerHTML = '';
    statMoveHeadline.innerHTML = 'Moves:';
    for (let x = 0; x < 4; x++) {
        const move = loadedPokemon[i]['moves'][x]['move']['name'];
        statContainer.innerHTML += generateMovesHtml(move);
    }
}

function showStats(i){
    let statMoveHeadline = document.getElementById('stat-moves-headline');
    let statContainer = document.getElementById(`stats-${i}`);
    statContainer.innerHTML = '';
    statMoveHeadline.innerHTML = 'Stats:';
      for (let x = 0; x < loadedPokemon[i]['stats'].length; x++) {
        const stat = loadedPokemon[i]['stats'][x]['base_stat'];
        const statName = loadedPokemon[i]['stats'][x]['stat']['name'];
        statContainer.innerHTML += generateStatsHtml(statName, stat);
    }
}

function closeDialog() {
    let enableScroll = document.getElementById('no-scroll');
    let overlayer = document.getElementById('overlayer');
    overlayer.classList.add('d-none');
    enableScroll.classList.remove('no-scroll');
}

function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.play();
}

function nextImage(i) {
    if(i === loadedPokemon.length -2){
        let image = (i + 1);
        renderSingleCard(image);
    }
    else {
        let image = (i + 1);
        renderSingleCard(image);
    }
}

function previousImage(i) {
    if (i === 1) {
        let image = (i - 1);
        renderSingleCard(image);
    } else {
        let image = (i - 1);
        renderSingleCard(image);
    }
}

function filterNames() {
    let search = document.getElementById('search-input-field').value.toLowerCase().trim();
    let content = document.getElementById('content'); 
    content.innerHTML = '';

    conditionsForResultOfSearchInput(search, content);
}

function conditionsForResultOfSearchInput(search, content) {
    if (search.length >= 3) { 
        searchPokemon(search, content);

    } else if (search === '') {
        renderPokemonCard();
        renderLoadMoreButton();
    }
}

function searchPokemon(search, content) {
    let found = false;
    for (let i = 0; i < loadedPokemon.length; i++) {
        let pokemonName = loadedPokemon[i]['name'];

        if (pokemonName.includes(search)) {
            found = true;
            renderFilteredPokemon(i, content)
        }
    }
    if (!found) {
        content.innerHTML = generateContentNotFoundHtml();
    }
}

function renderFilteredPokemon(i, content) {
    const pokemon = loadedPokemon[i];
    const name = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    const height = pokemon['height'] / 10;
    const weight = pokemon['weight'] / 10;
    content.innerHTML += generatePokemonCardHtml(i, name, pokemon, height, weight);
    getPokemonAbilities(i, pokemon);
    getPokemonTypes(i, pokemon);
}




































