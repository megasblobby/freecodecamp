"use strict";
// jshint esversion:6

function truncateString(str, num) {
  if (str.length > num) {
    let dots = [".", ".", "."];
    let result = [];
    let characters = str.split("");

    for (let i = 0; i < num; i++) {
      result.push(characters[i]);
      if (num > 3) {
        if (result.length + dots.length == num) {
          break;
        }
      }
    }
    result = result.concat(dots);
    return result.join("");
  }

  return str;
}

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 11));
