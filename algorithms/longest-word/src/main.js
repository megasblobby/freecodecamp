"use strict";

function findLongestWord(str) {
  let words = str.split(" ");

  let maxLength = words[0].length;
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }

  return maxLength;
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));
