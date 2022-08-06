import { renderPokemonImage } from "./pokemonInfo.js";

import {
    textToSpeach,
    clearElement,
    clearElementWithId
} from "./utils.js";

import { 
    App,
    SearchResultList,
    SearchInput,
    PokemonContainer
} from "./const.js";

export function renderSearchResults(arr) {
    let appDiv = document.getElementById(App);
    let resultList = document.getElementById(SearchResultList);

    arr.forEach(element => {
        let resultItem = document.createElement("li");
        let pokemonName = document.createElement("p");
        let speakerIcon = document.createElement("button");

        speakerIcon.id = "listen";
        speakerIcon.innerText= "Lyssna";

        pokemonName.innerText = element.name;
        resultItem.innerText = element.name;
        resultItem.append(speakerIcon);

        resultList.append(resultItem);

        /** Click listener for search result list item. */
        resultItem.addEventListener("click", (event) => {
            let searchInput = document.getElementById(SearchInput);

            if (event.target.id === "listen") {
                textToSpeach(element.name);
            } else {
                searchInput.value = element.name;
                /** Get and display image and detailed data for selected pokemon. */
                fetch(new Request(`https://pokeapi.co/api/v2/pokemon/${element.name}`)).then(res => {
                    return res.json();
                }).then(data => {
                    clearElementWithId(PokemonContainer);
                    renderPokemonImage(data.sprites.front_default, data.moves);
                    clearElement(resultList);
                });
            }
        });
    });

    appDiv.append(resultList);
}
