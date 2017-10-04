"use strict";

let colors = ["#73A857, #FB6964", "#472E32", "#27AE60", "#BDBB99", "#77B1A9",
              "#16A085", "#F39C12", "#9B59B6", "#342224"]
let quotes = [];
$(document).ready(onReady);

function onReady() {
  $("#new-quote").on("click", onClick);
  $.getJSON("data/quotes.json", loadQuotes);
}


function onClick() {
  changeColor();
  changeQuote();
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

function changeQuote() {
  let randomQuote = getRandomQuote();
  $("#quote").html(randomQuote.quote);
  $("#author").html(`- ${randomQuote.author}`);
}

function getRandomQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}


function loadQuotes(data) {
  for (let quote of data.quotes) {
    quotes.push(quote);
  }
  changeColor();
  changeQuote();
}
