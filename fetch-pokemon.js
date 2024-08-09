const BASE_URL = 'https://pokeapi.co/api/v2/';

// Busca un Pokémon 
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Función para mostrar la tarjeta del Pokémon en el DOM
const displayPokemonCard = (pokemon) => {
    const cardContainer = document.getElementById('pokemon-card');
    

    // Limpiar contenido anterior
    cardContainer.innerHTML = '';

    // Crear contenido de la tarjeta
    const card = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <h2>${pokemon.name.toUpperCase()}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Height: ${pokemon.height} </p>
            <p>Weight: ${pokemon.weight} </p>
            <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
    `;
    cardContainer.innerHTML = card;
}

// Click en "Get"
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        if (pokemon) {
            localStorage.setItem('currentPokeId', pokemon.id);
            displayPokemonCard(pokemon);
        } else {
            console.error('No se encontró el Pokémon.');
        }
    });

// Carga el DOM
document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    if (pokemon) {
        displayPokemonCard(pokemon);
    }
});

// Click en el botón "Previous"
document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId - 1);
        const pokemon = await fetchPokemon(newId);
        if (pokemon) {
            localStorage.setItem('currentPokeId', pokemon.id);
            displayPokemonCard(pokemon);
        }
    });

// Click en el botón "Next"
document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        if (pokemon) {
            localStorage.setItem('currentPokeId', pokemon.id);
            displayPokemonCard(pokemon);
        }
    });

