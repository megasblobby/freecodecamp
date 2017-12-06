"use strict"

const REQUEST_DONE = 4;
const RESPONSE_READY = 200;
const CLIENT_ID = 'q83ev6ap7bo9pea30lg0gdkhem0ekt';
const BASE_URL = 'https://api.twitch.tv/helix/';
const USERS = 'users?'
const STREAMS = 'streams?'
const OFFLINE = 'offline'

let usersLogin = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

let users = new Map();
let streams = new Map();

window.onload = () => {
  getUsersInfo(usersLogin).then(response => {
    let usersData = JSON.parse(response);
    let data = usersData.data;
    data.forEach((userData) => {
      users.set(userData.id, userData);
    });

    let keys = Array.from(users.keys());
    keys.forEach((key) => {
      streams.set(key, OFFLINE);
    });
    getStreamsInfo(keys).then(response => {
      let streamsData = JSON.parse(response);
      let data = streamsData.data;
      data.forEach((streamData) => {
        streams.set(streamData.user_id, streamData);
      });

      console.log(users);
      console.log(streams);
    });
  });
}

function getUsersInfo(usersLogin) {
  let url =`${BASE_URL}${USERS}login=${usersLogin.shift()}`;

  usersLogin.forEach((login) => {
    url += `&login=${login}`
  });

    return makeRequest(url);
}


function getStreamsInfo(usersID) {
  let url =`${BASE_URL}${STREAMS}user_id=${usersID.shift()}`;

  usersID.forEach((id) => {
    url += `&user_id=${id}`
  });

  return makeRequest(url);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.setRequestHeader('Client-ID', CLIENT_ID);
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
