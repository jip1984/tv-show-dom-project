//You can edit ALL of the code here
let root = document.getElementById('root');
const searchBar = document.getElementById('search');
const showSearh = document.getElementById('select-show');
const count = document.getElementById('count');
const ul = document.createElement('ul');
let allEpisodes;
let shows;





function setup() {
  let root = document.getElementById('root');
  shows = getAllShows();
  makePageForShows(shows);
  episodeSelect();


}




//this populates the episodes select box and gives them a clickable link
function episodeSelect() {
  const showSearch = document.getElementById('select-show');
  let allShows = getAllShows();
  allShows.forEach(show => {
    let option = document.createElement('option');
    option.innerHTML = `${show.name}`;
    showSearch.appendChild(option);
    option.value = show.id;
  });

  showSearch.addEventListener('change', function (e) {
    let showId = e.target.value;
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let allEpisodes = data;
        makePageForEpisodes(allEpisodes);
      })
      .catch(error => {
        console.log(error);
      })
  })
}


function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}


//level 300
function createDropdown(allEpisodes) {
  allEpisodes = getAllEpisodes();
  const select = document.getElementById('select');
  allEpisodes.forEach((episode) => {
    let option = document.createElement('option');
    option.innerHTML = `S${episode.season}E${episode.number} - ${episode.name}`;
    select.appendChild(option);
    option.value = episode.id;

  });
  select.addEventListener("change", (e) => {
    let id = e.target.value;
    let selectedEpisode = allEpisodes;
    if (id !== "") {
      selectedEpisode = allEpisodes.filter(ep => {
        return ('' + ep.id) === id;
      });

    }
    // console.log(selectedEpisode);
    makePageForEpisodes(selectedEpisode);
  });
}
createDropdown();


// level 200
searchBar.addEventListener('input', () => {
  const term = searchBar.value.trim().toLowerCase();
  const filterEpisodes = allEpisodes.filter(episode => {
    if (episode.name.toLowerCase().includes(term)) {
      return true;
    } else if (episode.summary.toLowerCase().includes(term)) {
      return true;
    } else {
      return false;
    }
  });

  makePageForEpisodes(filterEpisodes);

  count.innerText = `Displaying ${filterEpisodes.length}/${allEpisodes.length} episodes`;

});

//level 100
function makeOneEpisode(ep) {
  const li = document.createElement('li');
  const h2 = document.createElement('h2');
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
  ul.innerHTML = "";
  episodeList.forEach(function (ep) { ul.appendChild(makeOneEpisode(ep)) })
  rootElem.appendChild(ul);
}

//this is to dispaly the shows when the user first loads the page up
function displayShows(shows) {
  // let showDiv = document.getElementById('root')
  const li = document.createElement('li');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  h2.innerText = shows.name;
  img.src = `${shows.image}`;
  li.appendChild(h2);
  li.appendChild(img);

  return li;
}

//a function that makes a page for the shows
function makePageForShows(shows) {
  let root = document.getElementById('root');
  let showAll = getAllShows();
  // let shows = getAllShows();
  ul.innerHTML = '';
  showAll.forEach(show => { ul.appendChild(displayShows(show)) })
  root.appendChild(ul);
}







window.onload = setup;


