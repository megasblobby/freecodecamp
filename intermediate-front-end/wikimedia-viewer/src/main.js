/*https://en.wikipedia.org/w/api.php?action=opensearch&format=xmlfm&search=api&namespace=0&limit=10*/
const REQUEST_DONE = 4;
const RESPONSE_READY = 200;

let isSearchBarExpandend = false;
let isPlaying = false;

window.onload = function() {
  makeRequest().then(response => displayResponse(response));

  document.getElementById('magnifying-glass').onclick = animateSearchBar;
  document.getElementById('cross-left-to-right').onclick = animateSearchBar;
  document.getElementById('cross-right-to-left').onclick = animateSearchBar;
  document.getElementById('collapse').style.visibility = 'hidden';
}

function makeRequest() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.responeType = "document";
    request.overrideMimeType('text/xml');

    let url =
     `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=xml&search=cobra&namespace=0&limit=10`;
    request.open('GET', url, true);
    //request.setRequestHeader("Origin", "https://www.yourpage.com");
    request.onload = () => {
          if (request.readyState === REQUEST_DONE && request.status === RESPONSE_READY) {
              resolve(request.responseXML);
          } else {
              reject(request.statusText);
          }
      };
    request.onerror = () => reject(request.statusText);
    request.send();
  });
}

function displayResponse(response) {
  console.log(response);
  let items = response.getElementsByTagName('Item');
  let answers = document.getElementById('answers');
  for (let item of items) {
    let answer = document.createElement('div');
    answer.setAttribute('class', 'answer');

    let title = document.createElement('h1');
    title.innerHTML = item.getElementsByTagName('Text')[0].innerHTML;

    let description = document.createElement('p');
    description.innerHTML = item.getElementsByTagName('Description')[0].innerHTML;

    let url = item.getElementsByTagName('Url')[0].innerHTML;
    let link = document.createElement('a');
    link.href = url;

    answer.appendChild(title);
    answer.appendChild(description);
    link.appendChild(answer);

    answers.appendChild(link);
  }

  console.log(items);
}

function animateSearchBar(event) {
  if (isPlaying) {
    return;
  }
  let magnifyingGlass = document.getElementById('magnifying-glass');
  let handle = document.getElementById('handle');
  let crossLeftToRight = document.getElementById('cross-left-to-right');
  let crossRightToLeft = document.getElementById('cross-right-to-left');

  if(isSearchBarExpandend === false && event.target.id === 'magnifying-glass') {
    isPlaying = true;
    handle.animate([
      { height: '15px', left: '0px' },
      { height: '0px', left: '-2px' }],
      { duration: 200, fill: 'both' }).onfinish = () => {
    magnifyingGlass.animate([
      { width: '20px'},
      { width: '230px'}],
      { duration: 500, fill: 'both' }).onfinish = () => {
    document.getElementById('collapse').style.visibility = 'visible';
    crossLeftToRight.animate([
      { height: '0px', top: '20px', left: '20px'},
      { height: '15px', top: '2px', left: '10px'}],
      { duration: 300, fill: 'both' });
    crossRightToLeft.animate([
      { height: '0px', top: '0px', left: '20px'},
      { height: '15px', top: '2px', left: '10px'}],
      { duration: 300, fill: 'both' }).onfinish = () => {
        isSearchBarExpandend = true;
        isPlaying = false;
      };
      }
    }
  }
  else if (isSearchBarExpandend === true &&
           event.target.id === 'cross-left-to-right' ||
           event.target.id === 'cross-right-to-left'){
    isPlaying = true;
    crossLeftToRight.animate([
      { height: '15px', top: '2px', left: '10px'},
      { height: '0px', top: '20px', left: '20px'}],
      { duration: 300, fill: 'both' });
    crossRightToLeft.animate([
      { height: '15px', top: '2px', left: '10px'},
      { height: '0px', top: '0px', left: '20px'}],
      { duration: 300, fill: 'both' }).onfinish = () => {
    document.getElementById('collapse').style.visibility = 'hidden';
    magnifyingGlass.animate([
      { width: '230px'},
      { width: '20px'}],
      { duration: 500, fill: 'both' }).onfinish = () => {
    handle.animate([
       { height: '0px', left: '-2px' },
       { height: '15px', left: '-0px' }],
       { duration: 200, fill: 'both' }).onfinish = () => {
         isSearchBarExpandend = false;
         isPlaying = false;
       };
       }
     }
   }
}
