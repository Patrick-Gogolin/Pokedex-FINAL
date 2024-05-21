let pokemonBatch;
let currentBatch = [];
let currentPokemons = [];

async function init() {
  await getPokemons();
}

async function getPokemons() {
  let url = 'https://pokeapi.co/api/v2/pokemon';
  let response = await fetch(url);
  let responseAsJson = await response.json();
  pokemonBatch = responseAsJson.results;
  getPokemonURL();
}

async function getPokemonURL() {
  for (let i = 0; i < pokemonBatch.length; i++) {
    const batch = pokemonBatch[i];
    const pokemonURL = batch.url;
    await getPokemonObjects(pokemonURL);
  }
  console.log('Die ersten 20 Pokemons: ', currentPokemons);
  renderPokemons();
}

async function getPokemonObjects(pokemonURL) {
  let response = await fetch(pokemonURL);
  let pokemonObject = await response.json();
  currentPokemons.push(pokemonObject);
}

function renderPokemons() {
  const pokemonGallery = document.getElementById('pokemon_gallery');
  pokemonGallery.innerHTML = ''; 
  for (let i = 0; i < currentPokemons.length; i++) {
    const onePokemon = currentPokemons[i];
    const pokemonTypes = onePokemon.types;
    console.log('pokemonTypes: ', pokemonTypes);
    pokemonGallery.innerHTML += generatePokemonGalleryHTML(i, onePokemon);
  }
}

function generatePokemonGalleryHTML(i, onePokemon) {
  return /* html */ `
        <div class="pokemon-card">
            <div class="pokemon_title">
                <span class="pokemon-name">${onePokemon.name}</span>
                <span class="pokemon-id"># ${onePokemon.id}</span>
            </div>
            <div id="pokemon_type${i}">
            </div>
        </div>
    `;
}
