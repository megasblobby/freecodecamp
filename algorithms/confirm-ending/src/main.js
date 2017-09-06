"use strict";
// jshint esversion:6

function confirmEnding(str, target) {
  let strCharacters = str.split("");
  let targetCharacters = target.split("");
  let indexStart = str.length - target.length;
  let subStringCharacters = str.substr(indexStart, target.lenght);

  for (var i = 0; i < subStringCharacters.length; i++) {

    if (subStringCharacters[i] !== targetCharacters[i]) {
      return false;
    }
  }
  return true;
}

console.log(confirmEnding("Bastian", "n"));
