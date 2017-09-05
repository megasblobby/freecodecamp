"use strict";
// jshint esversion:6

function largestOfFour(arr) {
  let largestNumbers = new Array();

  for (let numbers of arr) {
    let maxNumber = numbers[0];
    for (let number of numbers) {
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
    largestNumbers.push(maxNumber);
  }
  return largestNumbers;
}

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));
