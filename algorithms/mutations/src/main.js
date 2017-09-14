"use strict";
// jshint esversion:6

function mutation(arr) {
  let firstWordChars = arr[0].toLowerCase().split("");
  let secondWordChars = arr[1].toLowerCase().split("");

  for (var i = 0; i < secondWordChars.length; i++) {
    let index = firstWordChars.indexOf(secondWordChars[i]);

    if (index === -1) {
      return false;
    }
  }
  return true;
}

console.log(mutation(["hello", "hey"]));
