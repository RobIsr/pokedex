import { renderPokemonImage, clearImage } from "./pokemonInfo.js";

function renderSearchResults(arr) {
    console.log(arr);
    let appDiv = document.getElementById("app");
    let resultList = document.getElementById("search_result_list");

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
            let searchInput = document.getElementById("search");

            if (event.target.id === "listen") {
                // Convert name text to speach.
                let utter = new SpeechSynthesisUtterance();

                utter.text = element.name;
                window.speechSynthesis.speak(utter);
            } else {
                searchInput.value = element.name;
                /** Get and display image and detailed data for selected pokemon. */
                fetch(new Request(`https://pokeapi.co/api/v2/pokemon/${element.name}`)).then(res => {
                    return res.json();
                }).then(data => {
                    console.log(data);
                    clearImage();
                    renderPokemonImage(data.sprites.front_default, data.abilities);
                    resultList.innerHTML = "";
                });
            }
        });
    });

    appDiv.append(resultList);
}

export function search(pokemon_arr, search_string) {
    let searchResults = pokemon_arr.results.filter(elem => elem.name.toLowerCase().includes(search_string.toLowerCase()));
    
    if (searchResults.length > 5) {
        searchResults = searchResults.slice(0, 5);
    }

    renderSearchResults(searchResults);
}
