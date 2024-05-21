function generatePokemonCardHtml(i, name, pokemon, height, weight) {
    return /*html*/`
    <div class="card" id="card${i}" onclick="openDialog(${i})">
            <div class="name-and-id-container">
                <h1>${name}</h1>
                <p class="font-size"> <b>#${pokemon['id']}</b></p>
            </div>
            <div class="pokemon-image-container">
                <img class="pokemon-image" src="${pokemon['sprites']['other']['official-artwork']['front_default']}" alt="${pokemon['name']}">
                <div class="types" id="types-${i}">
                </div>
            </div>
            <div class="abilities" id="abilities-${i}">
                <h3>Abilities:</h3>
            </div>
            <div class="height-and-weight-container">
                <p>Height: ${height} m</p>
                <p>Weight: ${weight} kg</p>
                <button class="sound-button" id="play-sound-button${i}" onclick="playSound('${pokemon['cries']['legacy']}')"><img src="img/klang.png" alt="PokemonLogo"></button>

            </div>
        </div>`;
}

function generateAbilityHtml(ability) {
    return /*html*/`
    <div>
        <p>${ability}</p>
    </div>`;
}

function generateTypeHtml(typeClassName, type) {
    return /*html*/`
    <div class="${typeClassName} type-padding">
     ${type}
    </div>`;
}