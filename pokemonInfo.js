import { textToSpeach } from "./utils.js";
import { PokemonContainer } from "./const.js";

export function renderPokemonImage(img_url, abilities) {
    console.log(abilities);
    let imgDiv = document.getElementById(PokemonContainer);
    let imageElem = document.createElement("img");
    let abilityList = document.createElement("ul");

    abilityList.id = "ability_list";

    imageElem.id = "pokemon_image";
    imageElem.src = img_url;
    imgDiv.append(imageElem);

    abilities.forEach(element => {
        let ability = document.createElement("li");

        ability.innerText = element.move.name;
        ability.addEventListener("click", (event) => {
            textToSpeach(event.target.innerText);
        });
        abilityList.append(ability);
    });

    let attackHeader = document.createElement("h3");

    attackHeader.id = "attack_header";
    attackHeader.innerText = "Attacker"
    imgDiv.append(attackHeader);
    imgDiv.append(abilityList);
}
