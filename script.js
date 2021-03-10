//You can edit ALL of the code here
let root = document.getElementById('root');
const searchBar = document.getElementById('search');
const showSearh = document.getElementById('select-show');
const showEpisode = document.getElementById('select-episode');
//Get the button:
let mybutton = document.getElementById("myBtn");
const count = document.getElementById('count');
const ul = document.createElement('ul');
let li;
let allEpisodes;
let shows;

function setup() {
  let root = document.getElementById('root');
  shows = getAllShows();
  makePageForShows();
  showSelect();
  createDropdown();
  homeBtn();
};



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// showOption.addEventListener('change', () => {
//   makePageForShows();

// });



//this populates the shows select box and gives them a clickable link
function showSelect() {
  const showSearch = document.getElementById('select-show');
  let showOption = document.getElementById('show-option');
  let allShows = getAllShows();
  allShows.forEach(show => {
    let option = document.createElement('option');
    option.innerHTML = `${show.name}`;
    showSearch.appendChild(option);
    option.value = show.id;
  });

  showSearch.addEventListener('change', function (e) {
    let showId = e.target.value;
    if (showId === '') {
      setup();
    } else {
      reset();

      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          allEpisodes = data;
          makePageForEpisodes(allEpisodes);
          createDropdown(allEpisodes);
        })
        .catch(error => {
          // console.log(error);
        })
    }
  })
}

//makes zero based display
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

//make the logo clickable to return home
function homeBtn() {
  let btn = document.querySelector('.home-btn');
  btn.addEventListener('click', () => {
    setup();
    const showSearch = document.getElementById('select-show');
    const select = document.getElementById('select-episode');

    showSearch.value = '';
    select.value = '';

  });
}

//episodeSelect(allEpisodes) ; 
//level 300
function createDropdown(episodes) {
  // allEpisodes = episodes;
  // console.log(allEpisodes);
  reset();
  if (allEpisodes && allEpisodes.length) {
    allEpisodes.forEach((episode) => {
      let option = document.createElement('option');
      option.innerHTML = `S${pad(episode.season, 2)}E${pad(episode.number, 2)} - ${episode.name}`;
      select.appendChild(option);
      option.value = episode.id;

    });
  }

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


searchBar.addEventListener('input', () => {
  const term = searchBar.value.trim().toLowerCase();
  const filterShows = allShows.filter(episode => {
    if (shows.name.toLowerCase().includes(term)) {
      return true;
    } else if (shows.summary.toLowerCase().includes(term)) {
      return true;
    } else {
      return false;
    }
  });

  makePageForShows(filterShows);

  count.innerText = `Displaying ${filterShows.length}/${allShows.length} shows`;

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
  const rating = document.createElement('p');
  const status = document.createElement('p');
  const genre = document.createElement('p');
  const runtime = document.createElement('p');
  h2.innerText = shows.name;
  img.src = shows.image?.medium;
  p.innerHTML = shows.summary;
  rating.innerHTML = `The Average user rating is: <span class="rating">${shows.rating.average}</span>`;
  status.innerHTML = `Show status: ${shows.status}`;
  genre.innerHTML = `Genre: ${shows.genres}`;
  runtime.innerHTML = `Released: ${shows.premiered}`;
  li.value = shows.id;
  h2.value = shows.id;
  li.appendChild(h2);
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(rating);
  li.appendChild(status);
  li.appendChild(genre);
  li.appendChild(runtime);
  h2.addEventListener('click', function (e) {
    let showId = e.target.value;
    console.log(showId);
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
        createDropdown(allEpisodes);
      })
      .catch(error => {
        // console.log(error);
      })
  });

  return li;
}

//a function that makes a page for the shows
function makePageForShows() {
  let root = document.getElementById('root');
  let showAll = getAllShows();
  // let shows = getAllShows();
  ul.innerHTML = '';
  showAll.forEach(show => { ul.appendChild(displayShows(show)) })
  root.appendChild(ul);
}

function reset() {
  const select = document.getElementById('select-episode');
  select.innerHTML = '';
}




//create modal for click on show card
// function createModal(show) {
//   const div = document.getElementById('modal');
//   const h2 = document.createElement('h2');
//   const p = document.createElement('p');
//   h2.innerText = show.name;
//   p.innerText = show.summary;
//   div.appendChild(h2);
//   div.appendChild(p);
// }

// btn to scroll back to the top


window.onload = setup;


