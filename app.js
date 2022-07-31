import { search } from "./search.js";

let allPokemons = [];

async function getPokemon() {
    await fetch(new Request("https://pokeapi.co/api/v2/pokemon?limit=1154")).then(res => {
        return res.json();
    }).then(data => {
        allPokemons = data;
        initSearchBox();
    });
}

function initSearchBox() {
    let searchBox = document.getElementById("search_box");
    let searchInput = document.getElementById("search");
    let clearBtn = document.getElementById("clear_btn");
    let searchResultList = document.getElementById("search_result_list");

    searchBox.addEventListener("input", (event) => {
        searchResultList.innerHTML = "";
        if (event.target.value != "") {
            search(allPokemons, event.target.value);
        }
    });

    clearBtn.addEventListener("click", () => {
        let pokemonContainer = document.getElementById("pokemon_container");

        pokemonContainer.innerHTML = "";
        searchInput.value = "";
        searchResultList.innerHTML = "";
    });
}

getPokemon();
