"use strict";
// jshint esversion:6

function shouldBeFiltered(element) {
  let boolean = new Boolean(element);

  return boolean == true;
}

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  let filteredArr = arr.filter(shouldBeFiltered);
  return filteredArr;
}

console.log(bouncer([7, "ate", "", false, 9]));
