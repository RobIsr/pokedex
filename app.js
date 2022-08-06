import { search, clearElement, clearValue } from "./utils.js";
import { renderSearchResults } from "./search.js";
import {
    SearchInput,
    SearchBox,
    SearchResultList,
    ClearButton,
    PokemonContainer
} from "./const.js";

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
    let searchBox = document.getElementById(SearchBox);
    let searchInput = document.getElementById(SearchInput);
    let clearBtn = document.getElementById(ClearButton);
    let searchResultList = document.getElementById(SearchResultList);

    searchBox.addEventListener("input", (event) => {
        searchResultList.innerHTML = "";
        if (event.target.value != "") {

            let searchResult = search(allPokemons, event.target.value);
            renderSearchResults(searchResult);
        }
    });

    clearBtn.addEventListener("click", () => {
        let pokemonContainer = document.getElementById(PokemonContainer);

        clearElement(pokemonContainer);
        clearValue(searchInput);
        clearElement(searchResultList);
    });
}

getPokemon();
