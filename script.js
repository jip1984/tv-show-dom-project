//You can edit ALL of the code here
<<<<<<< Updated upstream
=======
let root = document.getElementById('root');
const searchBar = document.getElementById('search');
const showSearh = document.getElementById('select-show');
const showEpisode = document.getElementById('select-episode');
const count = document.getElementById('count');
const ul = document.createElement('ul');
let li;
let allEpisodes;
let shows;
// variables

>>>>>>> Stashed changes
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
