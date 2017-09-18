"use strict";
// jshint esversion:6

let target;

function shouldBeFiltered(element) {
  return element !== target;
}

function destroyer(arr) {
  let args = Array.prototype.slice.call(arguments);
  let filteredArr = args[0];
  let targets = args.slice(1);
  for (var i = 0; i < targets.length; i++) {
    target = targets[i];
    filteredArr = filteredArr.filter(shouldBeFiltered);
  }

  return filteredArr;
}


console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
