"use strict";

let colors = ["#73A857, #FB6964", "#472E32", "#27AE60", "#BDBB99", "#77B1A9",
              "#16A085", "#F39C12", "#9B59B6", "#342224"]
let quotes = [];
$(document).ready(onReady);

function onReady() {
  $("#new-quote").on("click", onNewQuote);
  $.getJSON("data/quotes.json", loadQuotes);
}

function onNewQuote() {
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
  let twitterLink = $("#twitter-link");
  let href = generateUrl(randomQuote.quote, randomQuote.author);
  twitterLink.attr("href", href);
}

function getRandomQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function generateUrl(quote, author) {
  let href = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw";
  let hashtags = "&hashtags=quotes";
  let end = "&tw_p=tweetbutton";
  let words = quote.split(" ");
  let space = "%20";
  href += hashtags + '&text="';
  for (let word of words) {
    href += word + " ";
  }
  href +='"';
  href += space + author
  href += end;
    return href;
}

function loadQuotes(data) {
  for (let quote of data.quotes) {
    quotes.push(quote);
  }
  changeColor();
  changeQuote();
}
