"use strict";
// jshint esversion:6

function ascendingOreder(a, b) {
  if (a < b) {
    return -1;
  }
  else if (a > b) {
    return 1;
  }
  else {
    return 0;
  }
}

function getIndexToIns(arr, num) {
  let sortedArray = arr.slice().sort(ascendingOreder);

  let index = 0;

  if (num <= sortedArray[0]) {
    return index;
  }

  else {
    for (var i = 1; i < sortedArray.length; i++) {
      if (num >= sortedArray[i - 1] && num <= sortedArray[i]) {
        index = i;
        return index;
      }
    }
  }

  index = sortedArray.length;
  return index;
}

console.log(getIndexToIns([5, 3, 20, 3], 5));
