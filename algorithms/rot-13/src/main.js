"use strict";
// jshint esversion:6

function rot13(str) { // LBH QVQ VG!
  let translatedMessage = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i).match(/[A-Z]/)) {
      let charCode = str.charCodeAt(i);
      if (charCode < 78) {
          charCode += 13;
      }

      else {
        charCode -= 13;
      }
      translatedMessage += String.fromCharCode(charCode);
    }
    else {
      translatedMessage += str.charAt(i);
    }
  }
  return translatedMessage;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
