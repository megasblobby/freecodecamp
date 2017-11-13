/*https://en.wikipedia.org/w/api.php?action=opensearch&format=xmlfm&search=api&namespace=0&limit=10*/
const REQUEST_DONE = 4;
const RESPONSE_READY = 200;

window.onload = function() {
  makeRequest().then(response => displayResponse(response));
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
    let answerClass = document.createAttribute('class');
    answerClass.value = 'answer';
    answer.setAttributeNode(answerClass);

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
