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
                <button class="sound-button" id="play-sound-button${i}" onclick="playSound('${pokemon['cries']['latest']}')"><img src="img/klang.png" alt="PokemonLogo"></button>

            </div>
        </div>`;
}

function generateLoadMoreButtonHtml() {
    return /*html*/` 
        <button onclick="loadMorePokemon()"><img src="img/pokeball.png" alt="Pokeball">
        </button>`;
}

function generateLoadMoreSpinnerHtml() {
    return /*html*/` 
    <div id="loading-spinner" class="spinner-render-more-pokemon">
            <img src="img/pokeball.png" alt="Pokeball" class="spinner-image">
        </div>;`
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

function renderSingleCardHtmlFirstImage(i, pokemon, firstType, name) {
    return /*html*/`
     <button id="previous-button" class= "previous-image-button-disabled" onclick="previousImage(${i})"disabled><span class="button-arrow"><b><</b></span></button>
    <div class="single-card type-${firstType}" id="card-${i}">
        <div class="name-and-id-container">
            <h1>${name}</h1>
            <p class="font-size"> <b>#${pokemon['id']}</b></p>
        </div>
        <div class="pokemon-image-container">
            <img class="pokemon-image" src="${pokemon['sprites']['other']['showdown']['front_default']}" alt="${pokemon['name']}">
            <div class="types" id="types${i}">
            </div>
        </div>
        <div class="stats-and-move-button-container">
            <button onclick="showStats(${i})" class="bg-${firstType}">Stats</button>
            <button onclick="showMoves(${i})" class="bg-${firstType}">Moves</button>
        </div>
        <div class="stats">
                <h3 id="stat-moves-headline">Stats:</h3>
                <div class="moves" id="stats-${i}">
                </div>
        </div>
    </div>
    <button id="next-button" class="next-image-button"  onclick="nextImage(${i})"><span class="button-arrow"><b>></b></span></button>`;
}

function renderSingleCardHtmlLastImage(i, pokemon, firstType, name) {
    return /*html*/`
     <button id="previous-button" class= "previous-image-button" onclick="previousImage(${i})"><span class="button-arrow"><b><</b></span></button>
    <div class="single-card type-${firstType}" id="card-${i}">
        <div class="name-and-id-container">
            <h1>${name}</h1>
            <p class="font-size"> <b>#${pokemon['id']}</b></p>
        </div>
        <div class="pokemon-image-container">
            <img class="pokemon-image" src="${pokemon['sprites']['other']['showdown']['front_default']}" alt="${pokemon['name']}">
            <div class="types" id="types${i}">
            </div>
        </div>
        <div class="stats-and-move-button-container">
            <button onclick="showStats(${i})" class="bg-${firstType}">Stats</button>
            <button onclick="showMoves(${i})" class="bg-${firstType}">Moves</button>
        </div>
        <div class="stats">
                <h3 id="stat-moves-headline">Stats:</h3>
                <div class="moves" id="stats-${i}">
                </div>
        </div>
    </div>
    <button id="next-button" class="next-image-button-disabled"  onclick="nextImage(${i})"disabled><span class="button-arrow"><b>></b></span></button>`;
}

function renderSingleCardHtmlEnabledButton(i, pokemon, firstType, name) {
    return /*html*/`
     <button id="previous-button" class= "previous-image-button" onclick="previousImage(${i})"><span class="button-arrow"><b><</b></span></button>
    <div class="single-card type-${firstType}" id="card-${i}">
        <div class="name-and-id-container">
            <h1>${name}</h1>
            <p class="font-size"> <b>#${pokemon['id']}</b></p>
        </div>
        <div class="pokemon-image-container">
            <img class="pokemon-image" src="${pokemon['sprites']['other']['showdown']['front_default']}" alt="${pokemon['name']}">
            <div class="types" id="types${i}">
            </div>
        </div>
        <div class="stats-and-move-button-container">
            <button onclick="showStats(${i})" class="bg-${firstType}">Stats</button>
            <button onclick="showMoves(${i})" class="bg-${firstType}">Moves</button>
        </div>
        <div class="stats">
                <h3 id="stat-moves-headline">Stats:</h3>
                <div class="moves" id="stats-${i}">
                </div>
        </div>
    </div>
    <button id="next-button" class="next-image-button"  onclick="nextImage(${i})"><span class="button-arrow"><b>></b></span></button>`;
    
}

function renderMobileSwitchButtonHtmlFirstImage(i) {
    return /*html*/`
    <button id="previous-button-mobile" class= "previous-image-button-disabled" onclick="previousImage(${i})"disabled><span class="button-arrow"><b><</b></span></button>
    <button id="next-button-mobile" class="next-image-button"  onclick="nextImage(${i})"><span class="button-arrow"><b>></b></span></button>`;

}

function renderMobileSwitchButtonHtmlLastImage(i) {
    return /*html*/`
    <button id="previous-button-mobile" class= "previous-image-button" onclick="previousImage(${i})"><span class="button-arrow"><b><</b></span></button>
    <button id="next-button-mobile" class="next-image-button-disabled"  onclick="nextImage(${i})" disabled><span class="button-arrow"><b>></b></span></button>`;
}

function renderMobileSwitchButtonHtmlEnabledButton(i) {
    return /*html*/`
    <button id="previous-button-mobile" class= "previous-image-button" onclick="previousImage(${i})"><span class="button-arrow"><b><</b></span></button>
    <button id="next-button-mobile" class="next-image-button"  onclick="nextImage(${i})"><span class="button-arrow"><b>></b></span></button>`;
}

function generateSingleCardType(type) {
    return /*html*/`
        <p class="bg-${type} type-padding">${type}</p>`;
}

function generateStatsHtml(statName, stat) {
    return /*html*/`
    <label for="file"><b>${statName}:</b> <b>${stat}</b></label>
    <progress id="file" value="${stat}" max="275"></progress>`;
}

function generateMovesHtml(move) {
    return /*html*/` 
        <p>${move}</p>`;
}

function generateContentNotFoundHtml() {
    return /*html*/`
     <div class="pokemon-not-found-container">
                <p>Leider kein Pokémon gefunden. Lade mehr Pokemon und versuche deine Suche erneut oder übrprüfe deine Sucheingabe</p>
            </div>`;
}
