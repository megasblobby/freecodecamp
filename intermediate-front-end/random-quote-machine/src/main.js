"use strict";

let colors = ["#73A857, #FB6964", "#472E32", "#27AE60", "#BDBB99", "#77B1A9",
              "#16A085", "#F39C12", "#9B59B6", "#342224"]

$(document).ready(setCallback);

function setCallback() {
  $("#new-quote").on("click", onClick);
}

function onClick() {
  console.log("New quote");
  changeColor();
}

function changeColor() {
  let randomColor = getRandomColor();
  $(".background-color").css("background-color", randomColor);
  $(".color").css("color", randomColor);
}

function getRandomColor() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
