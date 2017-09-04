"use strict";

function palindrome(str) {
  let lowerCaseStr = str.toLowerCase();
  let normalOrderChars = lowerCaseStr.match(/[A-Za-z0-9]/g);
  let reversedOrderChars = normalOrderChars.slice(0, normalOrderChars.length);
  reversedOrderChars.reverse();

  for (let i = 0; i < normalOrderChars.length; i++) {
    if (normalOrderChars[i]!== reversedOrderChars[i]) {
      return false;
    }
  }

  return true;
}

console.log(palindrome("C4n3"));
