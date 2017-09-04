"use strict";

function reverseString(str) {
  let charArray = str.split("");
  charArray.reverse();
  str = charArray.join("");
  return str;
}

console.log(reverseString("hello"));
