const pokemonList = document.getElementById('pokemonList')
const content = document.getElementById('content')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.number}" onclick="loadHtmlDetailsPokemon(${pokemon.number})" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// --- A PARTIR DAQUI SÃO SCRIPTS PARA DETALHAMENTO DO POKEMON --- //

    function loadHtmlDetailsPokemon(id) {
        class Pokemon {
            number;
            name;
            type;
            types = [];
            photo;
            moves = [];
        }
        getPokemonById(id).then(data => {
            const pokemon = new Pokemon()
            pokemon.number = data.id
            pokemon.name = data.name
        
            const types = data.types.map((typeSlot) => typeSlot.type.name)
            const [type] = types
        
            pokemon.types = types
            pokemon.type = type
        
            pokemon.photo = data.sprites.other.dream_world.front_default
            pokemon.moves = data.moves.map((moveSlot) => moveSlot.move.name)
        
            return pokemon}
        ).then(pokemon => {
            const newHtml = 
    `
    <ol id="pokemonList" class="pokemonsDet">
        <div class="pokeball">
            <a href="index.html"><button class="voltar">Voltar</button></a>
            <img  src="/assets/pokeball.png" alt="">
        </div>
        <!-- Details here -->

        <ol id="pageDetailsPokemon">
            <li class="pokemonDetails ${pokemon.type}">
                <div class="top">
                    <span class="nameDetails">${pokemon.name}</span>
                    <span class="numberDetails">#${pokemon.number}</span>
                </div>
                <div class="detailDetails">
                    <ol class="typesDetails">
                        ${pokemon.types.map((type) => `<li class="typeDetails ${type}">${type}</li>`).join('')}
                    </ol>
                    <div class="img_pokemon"><img src="${pokemon.photo}" alt="${pokemon.name}"></div>
                </div>
            </li>    
        </ol>
        <ol id="${pokemon.type}" class="detailsMoves">
            <li >
                <p>Moves</p>
                ${pokemon.moves.map((move) => `<li class="moves">${move}</li>`).join('')}
            </li>
        </ol>
    </ol>
    `
    content.innerHTML = newHtml
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    function removerElemento() {
        // Primeiro, encontrar o elemento pai (content)
        const content = document.getElementById('content');
      
        // Encontrar o elemento filho que queremos remover
        const titulo = document.getElementById('titulo');
              // Removemos o elemento filho do seu elemento pai
        content.removeChild(titulo);
      }
      removerElemento()

        })
        .catch(error => {
            console.error('Erro:', error);  // Caso haja algum erro
        }); 
    }