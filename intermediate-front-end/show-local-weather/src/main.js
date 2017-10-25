"use strict"

const GET = "GET";
const IS_ASYNCRONOUS_REQUEST = true;
const REQUEST_DONE = 4;
const RESPONSE_READY = 200;
const REQUEST_METHOD = "GET";
const FCC_WEATHER_API = "https://fcc-weather-api.glitch.me/api/current?";
const CELSIUS = 'C';
const FAHRENHEIT = 'F';

const backgrounds = {cold : '#646464', temperate: '#0fa0c8', hot: '#dc6600'};

let coords;
let unitMeasure = CELSIUS;
let celsiusTemperature = 0;
let fahrenheitTemperature = 0;
let temperature = 0;

window.onload = function() {
  if ("geolocation" in navigator) {
    const geoLocation = navigator.geolocation;

    geoLocation.getCurrentPosition(getPosition, handleErrors);
  }

  else {
    document.getElementById('location').innerHTML =
    "Geolocation is not supported by your browser";
  }

  document.getElementById('unit-measure').onclick = changeUniteMeasure;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  document.getElementById('location').innerHTML =
  `Your location coords are: latitude ${Math.round(latitude)}°, longitude ${Math.round(longitude)}°`;
}

function getPosition(position) {
  coords = position.coords;
  makeRequest(coords).then(response => {displayResponse(JSON.parse(response))});
}

function displayResponse(response) {
  if (response === null || typeof response === 'undefined') {
    console.log("ERROR");
  }

  if ("name" in response && "sys" in response) {
    if (document.getElementById('location') !== null) {
        document.getElementById('location').innerHTML =
        `${response.name}, ${response.sys.country}`;
    }
    else {
      console.log(`Element 'location' is null!`);
    }
  }
  if ("main" in response) {
    if (document.getElementById('temperature') !== null || document.getElementById('unit-measure') !== null) {
        celsiusTemperature = Number.parseFloat(response.main.temp);
        fahrenheitTemperature = getFahrenheitTemperature(celsiusTemperature);
        temperature = celsiusTemperature;
        document.getElementById('temperature').innerHTML = temperature.toFixed(1);
        document.getElementById('degree').innerHTML = "°";
        document.getElementById('unit-measure').innerHTML = unitMeasure;
        setBackground(celsiusTemperature);
    }
    else {
      console.log(`Element 'temperature' is null!`);
    }
  }
  if ("weather" in response) {
    if (document.getElementById('wheater-text-description') !== null || document.getElementById('wheater-graphical-description') !== null) {
        document.getElementById('wheater-text-description').innerHTML =    `${response.weather[0].main}`;
        document.getElementById('wheater-graphical-description').setAttribute(
          'style', `background-image: url(${response.weather[0].icon})`);
    }
    else {
      console.log(`Element 'location' is null!`);
    }
  }

}

function handleErrors(error) {
  document.getElementById('location').innerHTML =
  `ERROR: ${error}`;
}

function makeRequest(coords) {
  coords = validate(coords);
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    let url =
     `${FCC_WEATHER_API}lat=${coords.latitude}&lon=${coords.longitude}`;
    request.open(REQUEST_METHOD, url, IS_ASYNCRONOUS_REQUEST);
    request.onload = () => {
          if (request.readyState === REQUEST_DONE && request.status === RESPONSE_READY) {
              resolve(request.response);
          } else {
              reject(request.statusText);
          }
      };
    request.onerror = () => reject(request.statusText);
    request.send();
  });
}

function validate(coords) {
  let errorMessage = "";
  if (coords === null || typeof coords === "undefined") {
    throw errorMessage = "Coords can't be null or undefined";
  }
  if ("latitude" in coords && "longitude" in coords) {
    if (typeof coords.latitude !== "number") {
      let errorMessage = `Latitude must be a number: ${coords.latitude}`;
      throw errorMessage;
    }
    if (typeof coords.longitude !== "number") {
      let errorMessage = `Longitude must be a number: ${coords.longitude}`;
      throw errorMessage;
    }
  }

  return coords;
}

function getFahrenheitTemperature(celsius) {
  return  Number.parseFloat(celsius * 9.5 + 32);
}

function changeUniteMeasure() {
  if (unitMeasure === CELSIUS) {
    unitMeasure = FAHRENHEIT;
    temperature = fahrenheitTemperature;
  }
  else if (unitMeasure === FAHRENHEIT) {
    unitMeasure = CELSIUS;
    temperature = celsiusTemperature;
  }

  document.getElementById('temperature').innerHTML = temperature.toFixed(1);
  document.getElementById('unit-measure').innerHTML = unitMeasure;
}

function setBackground(celsiusTemperature) {
  let backgroundColor = document.body.style.backgroundColor;
  if (celsiusTemperature < 10) {
    $("body").animate({backgroundColor : backgrounds['cold']}, "slow");
  }
  else if (celsiusTemperature >= 10 && celsiusTemperature <= 21){
    $("body").animate({backgroundColor : backgrounds['temperate']}, "slow");
  }
  else {
    $("body").animate({backgroundColor : backgrounds['hot']}, "medium");
  }
}
