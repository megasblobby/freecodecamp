"use strict";
// jshint esversion:6

function titleCase(str) {
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    let characters = words[i].split("");
    for (let j = 0; j < characters.length; j++) {
      if (j === 0) {
        characters[j] = characters[j].toUpperCase();
      }
      else {
        characters[j] = characters[j].toLowerCase();
      }
      words[i] = characters.join("");
    }
  }
  return words.join(" ");
}

console.log(titleCase("I'm a little tea pot"));
