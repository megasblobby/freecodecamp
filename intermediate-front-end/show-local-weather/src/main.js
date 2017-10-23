"use strict"

const GET = "GET";
const IS_ASYNCRONOUS_REQUEST = true;
const REQUEST_DONE = 4;
const RESPONSE_READY = 200;
const REQUEST_METHOD = "GET";
const FCC_WEATHER_API = "https://fcc-weather-api.glitch.me/api/current?";
let coords;
let unitMeasure = 'C';

window.onload = function() {
  if ("geolocation" in navigator) {
    const geoLocation = navigator.geolocation;

    geoLocation.getCurrentPosition(getPosition, handleErrors);
  }

  else {
    document.getElementById('location').innerHTML =
    "Geolocation is not supported by your browser";
  }
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
        let temperature = Number.parseFloat(response.main.temp);
        document.getElementById('temperature').innerHTML = `${temperature.toFixed(1)}`;
        document.getElementById('degree').innerHTML = "°";
        document.getElementById('unit-measure').innerHTML = `${unitMeasure}`;
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
