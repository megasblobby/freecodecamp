/*https://en.wikipedia.org/w/api.php?action=opensearch&format=xmlfm&search=api&namespace=0&limit=10*/
const REQUEST_DONE = 4;
const RESPONSE_READY = 200;

let isSearchBarExpandend = false;

window.onload = function() {
  makeRequest().then(response => displayResponse(response));

  document.getElementById('magnifying-glass').onclick = animateSearchBar;
  /*document.getElementById('cross-right-to-left').onclick = collapseSearchBar;
  document.getElementById('cross-left-to-right').onclick = collapseSearchBar;*/
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

function enlargeMagnifyingGlass() {
  let magnifyingGlass = document.getElementById('magnifying-glass');
  let handle = document.getElementById('handle');

  let magnifyingGlassKeyFrames = new KeyframeEffect(
    magnifyingGlass, [
      { width: '30px'},
      { width: '230px'}],
      {duration: 500, fill: 'forwards' })
  let disappearHandleKeyFrames = new KeyframeEffect(
    handle, [
    { height: '15px', left: '0px' },
    { height: '0px', left: '-2px' }],
    {duration: 200, fill: 'forwards' });

  let magnifyingGlassAnimation = new Animation(magnifyingGlassKeyFrames,
      document.timeline);
  let disappearAnimation = new Animation(disappearHandleKeyFrames,
    document.timeline);

    magnifyingGlassAnimation.onfinish = appearCross;

    disappearAnimation.onfinish = function() {
      magnifyingGlassAnimation.play();
      isMagnifyingGlassExpanded = true;
    };

    if (isSearchBarExpandend === false) {
      disappearAnimation.play();
    }
}

function appearCross() {
  let crossLeftToRight = document.getElementById('cross-left-to-right');
  let crossRightToLeft = document.getElementById('cross-right-to-left');

  let appearCrossLeftToRightKeyFrames = new KeyframeEffect(
    crossLeftToRight, [
    {height: '0px', top: '20px', right: '-240px'},
    {height: '15px', top: '15px', right: '-230px'}],
    {duration: 300, fill: 'forwards' });
  let appearCrossRightToLeftKeyFrames = new KeyframeEffect(
    crossRightToLeft, [
    {height: '0px', top: '-5px', right: '-235px'},
    {height: '15px', top: '15px', right: '-223px'}],
    {duration: 300, fill: 'forwards' });

  let appearCrossLeftToRightAnimation = new Animation(
    appearCrossLeftToRightKeyFrames, document.timeline);
  let appearCrossRightToLeftAnimation = new Animation(
    appearCrossRightToLeftKeyFrames, document.timeline);

  appearCrossLeftToRightAnimation.play();
  appearCrossRightToLeftAnimation.play();
}

function animateSearchBar() {
  let magnifyingGlass = document.getElementById('magnifying-glass');
  let handle = document.getElementById('handle');
  let crossLeftToRight = document.getElementById('cross-left-to-right');
  let crossRightToLeft = document.getElementById('cross-right-to-left');

  if(isSearchBarExpandend === false) {
    handle.animate([
      { height: '15px', left: '0px' },
      { height: '0px', left: '-2px' }],
      { duration: 200, fill: 'both' }).onfinish = () => {

    magnifyingGlass.animate([
      { width: '20px'},
      { width: '230px'}],
      { duration: 500, fill: 'both' }).onfinish = () => {
    crossLeftToRight.animate([
      { height: '0px', top: '20px', right: '-240px'},
      { height: '15px', top: '15px', right: '-230px'}],
      { duration: 300, fill: 'both' });
    crossRightToLeft.animate([
      { height: '0px', top: '-5px', right: '-235px'},
      { height: '15px', top: '15px', right: '-223px'}],
      { duration: 300, fill: 'both' });
      }
    }
    isSearchBarExpandend = true;
  }
  else {
    crossLeftToRight.animate([
      { height: '15px', top: '15px', right: '-230px'},
      { height: '0px', top: '20px', right: '-240px'}],
      { duration: 300, fill: 'both' });
    crossRightToLeft.animate([
      { height: '15px', top: '15px', right: '-223px'},
      { height: '0px', top: '-5px', right: '-235px'}],
      { duration: 300, fill: 'both' }).onfinish = () => {
      magnifyingGlass.animate([
        { width: '230px'},
        { width: '20px'}],
        { duration: 500, fill: 'both' }).onfinish = () => {

          handle.animate([
            { height: '0px', left: '-2px' },
            { height: '15px', left: '-0px' }],
            { duration: 200, fill: 'both' });
          }
          isSearchBarExpandend = false;
    }
  }
}
