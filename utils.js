"use strict";

// Converts text to speach.
export function textToSpeach(text) {
    let utter = new SpeechSynthesisUtterance();

    utter.lang = "en-US";
    utter.text = text;
    window.speechSynthesis.speak(utter);
}

// Filters provided array for the provided string.
export function search(arr, search_string) {
    let searchResults = arr.results.filter(elem => elem.name.toLowerCase().includes(search_string.toLowerCase()));
    
    if (searchResults.length > 5) {
        searchResults = searchResults.slice(0, 5);
    }
    return searchResults;
}

export function clearElementWithId(id) {
    let element = document.getElementById(id);

    element.innerHTML = "";
}

export function clearElement(elem) {
    elem.innerHTML = "";
}

export function clearValue(elem) {
    elem.value = "";
}