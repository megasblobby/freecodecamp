"use strict";
// jshint esversion:6

function repeatStringNumTimes(str, num) {
  if (num <= 0) {
    return "";
  }
  let result = "";
  for (var i = 0; i < num; i++) {
    result += str;
  }

  return result;
}

console.log(repeatStringNumTimes("abc", 3));
