//You can edit ALL of the code here
const searchBar = document.getElementById('search');
const count = document.getElementById('count');
const ul = document.createElement('ul');
let allEpisodes;


function setup() {
  allEpisodes = getAllEpisodes();
  // allEpisodes.forEach(el => {
  //   // console.log("el.name-", el.name);
  //   // console.log("el-", el);
  //   // console.log("allEpisodes-", allEpisodes);
  // });
  makePageForEpisodes(allEpisodes);
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
    console.log(selectedEpisode);
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
  ul.innerHTML = "";
  episodeList.forEach(function (ep) { ul.appendChild(makeOneEpisode(ep)) })
  rootElem.appendChild(ul);
}



window.onload = setup;
