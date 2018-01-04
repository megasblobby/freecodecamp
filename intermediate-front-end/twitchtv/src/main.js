"use strict"

const REQUEST_DONE = 4;
const RESPONSE_READY = 200;
const CLIENT_ID = 'q83ev6ap7bo9pea30lg0gdkhem0ekt';
const BASE_URL = 'https://api.twitch.tv/helix/';
const USERS = 'users?';
const STREAMS = 'streams?';
const OFFLINE = 'offline';
const NO_ID = '';

let usersLogin = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

let users = new Map();
let streams = new Map();
let flags = {onlineAreVisible : true, offlineAreVisible : true};
let categories = {};

window.onload = () => {
  let elements = document.getElementsByClassName('category');
  for (var index = 0; index < elements.length; index++) {
    elements[index].onclick = setFlags;
    //elements[index].onmouseover = animateCategories;
    //elements[index].onmouseout = animateCategories;
    categories[`${elements[index].id}`] = false;
  }

  categories[`all-category`] = true;

  getUsersInfo(usersLogin).then(response => {
    let usersData = JSON.parse(response);
    let data = usersData.data;
    data.forEach((userData) => {
      users.set(userData.id, userData);
      // Remove id property because is already used as key
      delete users.get(userData.id)['id'];
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
        // Remove user_id property because is already used as key
        delete streams.get(streamData.user_id)['user_id'];
      });
      displayResults(users, streams, flags);
    });
  });
}

function setFlags(event) {
  let target = getTarget(event.target);

  if (target.id === 'all-category') {
    flags.onlineAreVisible = true;
    flags.offlineAreVisible = true;
  }
  if (target.id === 'online-category') {
    flags.onlineAreVisible = true;
    flags.offlineAreVisible = false;
  }
  if (target.id === 'offline-category') {
    flags.onlineAreVisible = false;
    flags.offlineAreVisible = true;
  }

  displayResults(users, streams, flags);
}

function getTarget(eventTarget) {
  let target = document.getElementById(eventTarget.id);
  if (eventTarget.id === NO_ID) {
    target = eventTarget.parentElement;
  }

  return target;
}

function animateCategories(event) {
  let target = getTarget(event.target);

  if (categories[target.id] === false) {
    target.animate([
      { width: '18px', left: '54px'},
      { width: '72px', left: '0px'}],
      { duration: 200, fill: 'both' }).onfinish = () => {
          categories[target.id] = !categories[target.id];
      };
  }
  else {
    target.animate([
      { width: '72px', left: '0px'},
      { width: '18px', left: '54px'}],
      { duration: 200, fill: 'both' }).onfinish = () => {
          categories[target.id] = !categories[target.id];
      };
  }
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

function displayResults(users, streams, flags) {
  clear();
  let online = document.getElementById('online');
  let offline = document.getElementById('offline');
  let usersIDs = Array.from(streams.keys());

  for (let id of usersIDs) {
    let target = null;
    let user = users.get(id);
    let stream = streams.get(id);

    let streamContainer = getStreamContainer();
    let link = getLink(user.login, user.display_name);
    let profileImage = getProfileImage(user.profile_image_url);
    let title = null;

    if (stream === OFFLINE && flags.offlineAreVisible) {
      title = getTitle(OFFLINE);
      target = offline;
      streamContainer.appendChild(profileImage);
      streamContainer.appendChild(link);
      streamContainer.appendChild(title);

          target.appendChild(streamContainer);
    } else if(stream !== OFFLINE && flags.onlineAreVisible){
      title = getTitle(stream.title);
      target = online;
      streamContainer.appendChild(profileImage);
      streamContainer.appendChild(link);
      streamContainer.appendChild(title);

          target.appendChild(streamContainer);
    }

  }
}

function clear() {
  let online = document.getElementById('online');
  let offline = document.getElementById('offline');

  let children = online.childNodes;
  while(children.length > 0) {
    online.removeChild(children[0]);
  }
  children = offline.childNodes;
  while(children.length > 0) {
    offline.removeChild(children[0]);
  }
}

function getStreamContainer() {
  let streamContainer = document.createElement('div');
  streamContainer.setAttribute('class', 'container');

  return streamContainer;
}

function getLink(login, displayName) {
  let link = document.createElement('a');
  link.innerHTML = displayName;
  link.href = `https://www.twitch.tv/${login}`;

  return link;
}

function getProfileImage(url, displayName) {
  let profileImage = document.createElement('img');
  profileImage.src = url;
  profileImage.alt = `${displayName}'s profile image`;

  profileImage.setAttribute('class', 'profile-image');

  return profileImage;
}

function getTitle(title) {
  let streamTitle = document.createElement('span');
  streamTitle.innerHTML = title;
  streamTitle.setAttribute('class', 'title');

  return streamTitle;
}
