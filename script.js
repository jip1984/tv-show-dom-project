//You can edit ALL of the code here
const serchBar = document.getElementById('search');
const selectBar = document.getElementById('select');

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function makeOneEpisode(ep) {
  const li = document.createElement('li');
  const h2 = document.createElement('h2');
  // const h3 = document.createElement('h3');
  const img = document.createElement('img');
  const p = document.createElement('p');
  //const selectBar = document.getElementById('select');
  h2.innerText = ep.name + ` S${pad(ep.season, 2)} E${pad(ep.number, 2)}`;
  img.src = `${ep.image.medium}`;
  p.innerHTML = ep.summary;
  li.appendChild(h2);
  li.appendChild(img);
  li.appendChild(p);
 
  return li;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const ul = document.createElement('ul');
  episodeList.forEach(function (ep) { ul.appendChild(makeOneEpisode(ep)) })
  rootElem.appendChild(ul);
}

let episodes = getAllEpisodes.name;
console.log(episodes);

window.onload = setup;
