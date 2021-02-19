//You can edit ALL of the code here
const searchBar = document.getElementById('search');
const select = document.getElementById('select');
const option = document.getElementById('option');
const count = document.getElementById('count')
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
// function displaySelect() {
 
//   let selectBar = document.getElementById('select');

//   allEpisodes.forEach(elem => {
//   let option = document.getElementById('option');
//   option.innerText = `S${pad(elem.season, 2)}E${pad(elem.number,2)} - ${elem.name}`;
//   selectBar.appendChild(option);
  
//   })
// }
// displaySelect();






// level 200
  searchBar.addEventListener('input', () => {
    const term = searchBar.value.trim().toLowerCase();
    const filterEpisodes = allEpisodes.filter(episode => {
        if(episode.name.toLowerCase().includes(term)){
            return true;
        } else if(episode.summary.toLowerCase().includes(term)){
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
