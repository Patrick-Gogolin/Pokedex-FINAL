BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let loadedPokemon = [];
let amountPokemons = 21;

async function init() {
    showSpinner();
    try {
        await loadPokemon();
        hideSpinner();
        renderPokemonCard();
        renderLoadMoreButton();
    } catch (error) {
        console.error('Error initializing data:', error);
        hideSpinner();
    }
}

async function loadPokemon() {
    try {
        for (let i = 1; i < amountPokemons; i++) {
            let url = BASE_URL + i;
            let response = await fetch(url);
            let pokemons = await response.json();
            loadedPokemon.push(pokemons)
        }
        console.log(loadedPokemon);
        renderPokemonCard()
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderPokemonCard() {  // Hier weitermachen 
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < loadedPokemon.length; i++) {
        const pokemon = loadedPokemon[i];
        const name = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1); // kovertiert den ersten Buchstaben zu Groß
        const height = pokemon['height'] / 10;
        const weight = pokemon['weight'] / 10;
        content.innerHTML += generatePokemonCardHtml(i, name, pokemon, height, weight);

        getPokemonAbilities(i, pokemon);
        getPokemonTypes(i, pokemon);
    }
}

function renderLoadMoreButton() {
    document.getElementById('load-more-button').innerHTML += /*html*/`
        <button onclick="loadMorePokemon()"><img src="img/pokeball.png" alt="Pokeball"></button>;`
}

async function loadMorePokemon() {
    showSpinner();
    try {
        loadedPokemon.length = 0;
        amountPokemons += 20;
        await loadPokemon();
        hideSpinner();
    } catch (error) {
        console.error('Error initializing data:', error);
        hideSpinner();
    }
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
    let overlayer = document.getElementById('overlayer');
    let preventScroll = document.getElementById('no-scroll');
    overlayer.classList.remove('d-none');
    preventScroll.classList.add('no-scroll');

}

function closeDialog() {
    let overlayer = document.getElementById('overlayer');
    overlayer.classList.add('d-none');

}

function playSound(soundPath) {
        const audio = new Audio(soundPath);
        audio.play();
}


































