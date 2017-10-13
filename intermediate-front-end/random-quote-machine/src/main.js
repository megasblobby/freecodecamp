"use strict";

let colors = ["#73A857, #FB6964", "#472E32", "#27AE60", "#BDBB99", "#77B1A9",
              "#16A085", "#F39C12", "#9B59B6", "#342224"]
let quotes = [];
$(document).ready(onReady);

function onReady() {
  $("#new-quote").on("click", onNewQuote);
  $.getJSON("data/quotes.json", loadQuotes);
  $(".button").hover(
    function() { $(this).animate({'opacity':'0.7'}, 100); },
    function() { $(this).animate({'opacity':'1'}, 100); } );
}

function onNewQuote() {
  changeColor();
  changeQuote();
}

function changeColor() {
  let randomColor = getRandomColor();
  $(".background-color").animate({backgroundColor : randomColor}, "slow");

  $("#quote").fadeOut();
  $(".color").css("color", randomColor);
  $("#quote").fadeIn("slow");
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
  let twitterUrl = generateTwitterUrl(randomQuote.quote, randomQuote.author);
  twitterLink.attr("href", twitterUrl);

  let tumblrLink = $("#tumblr-link");
  let tumblrUrl = generateTumblrUrl(randomQuote.quote, randomQuote.author);
  tumblrLink.attr("href", tumblrUrl);
}

function getRandomQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function generateTwitterUrl(quote, author) {
  let href = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw";
  let hashtags = "&hashtags=quotes";
  let words = quote.split(" ");
  let space = "%20";
  href += hashtags + '&text="';
  for (let word of words) {
    href += word + space;
  }
  href +='"';
  href += space + author

  let end = "&tw_p=tweetbutton";
  href += end;

  return href;
}

function generateTumblrUrl(quote, author) {
  let href = "https://www.tumblr.com/widgets/share/tool?posttype=quote";
  let tags = "&tags=quotes";
  href += tags;
  let words = quote.split(" ");
  let space = "%20";
  let caption = "&caption= " + author;
  href += caption;

  let content = "&content=";
  for (let word of words) {
    content += word + space;
  }
  href += content;

  let end = "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
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

function highlight() {
  /*let color =  $(".button").css("background-color");
  let rgbString = color.slice(4, color.length - 1);
  let firstComma = rgbString.indexOf(",");
  let secondComma = rgbString.lastIndexOf(",");

  let red = parseInt(rgbString.slice(0, firstComma), 10);
  let green = parseInt(rgbString.slice(firstComma + 1, secondComma), 10);
  let blue = parseInt(rgbString.slice(secondComma, rgbString.length), 10);
  let alpha = 0.5;
  $(".button").css("background-color", `rgba(${red}, ${green}, ${blue}, ${alpha})`);*/

  $(this).animate({'opacity':'0.7'}, 100);
}
