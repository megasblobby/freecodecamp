"use strict";
// jshint esversion:6

function slasher(arr, howMany) {
  arr.splice(0, howMany);
  return arr;
}

console.log(slasher([1, 2, 3], 2));
