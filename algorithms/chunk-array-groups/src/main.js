"use strict";
// jshint esversion:6

function chunkArrayInGroups(arr, size) {
  let arrays = [];

  while (arr.length > 0)
  {
    let currentArray = [];
    for (let i = 0; i < size; i++) {
      currentArray.push(arr.shift());
      if (arr.length == 0) {
        break;
      }
    }
    arrays.push(currentArray);
  }
  return arrays;
}

console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4));
