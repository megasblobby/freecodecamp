"use strict";

function factorialize(num) {
  if (num == 0) {
    return 1;
  }

  let max = num;
  for (let i = 1; i < max; i++) {
    num *= i;
  }
  return num;
}

factorialize(5);
