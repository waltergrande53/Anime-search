let btn = document.getElementById('btn_search');
let bar = document.getElementById('search_bar');
let top_data = document.querySelector(".top_Data")
let top_Title = document.querySelector(".top_title")
const api = "https://api.jikan.moe/v3/search/anime";
btn.addEventListener('click', setQuery)

function setQuery() {
  top_Title.style.display = "none"

  getResults(bar.value);

}

function getResults(q) {
  fetch(`${api}?q=${q}`)

    .then(anime => {
      return anime.json();
    }).then((getData) => {


      var content = document.querySelector(".content");

      var box = content.lastElementChild;
      while (box) {
        content.removeChild(box);
        box = content.lastElementChild;
      }

      for (var a = 0; a < getData.results.length; a++) {
        if (getData.results[a].rated == "Rx") {
          box.style.display = "none"

        }

        let box = document.createElement("div");
        box.setAttribute("class", "box");
        let content = document.querySelector(".content");

        content.appendChild(box);

        box.innerHTML = `<div class="title">Title:${getData.results[a].title},Rated(${getData.results[a].rated})</div>
                <div class="type">Type:-${getData.results[a].type}</div>
                <div class="poster"><img src="${getData.results[a].image_url}"></img></div>
                <div class="moreinfo"> <a class ="information"
                href=${getData.results[a]. url}>information</a></div> </button>`;
      }

    })

}

function topAnime() {
  fetch(`https://api.jikan.moe/v3/top/anime`)
    .then((topData) => {
      //console.log(animeData)
      return topData.json();
    })
    .then((getData) => {

      for (var i = 0; i < getData.top.length; i++) {
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        let content = document.querySelector(".content");
        box.style.background='darkgreen'
        content.appendChild(box);
        box.innerHTML = `<div class="title">Title:${getData.top[i].title}<br/>Rank#${getData.top[i].rank}</div>
                        <div class="type">Type:-${getData.top[i].type}</div>
                        <div class="poster"><img src="${getData.top[i].image_url}"></img></div>
                        <div class="moreinfo"> <a class ="information"
                        href=${getData.top[i].url}>information</a></div> </button>`;
        
      }

    })
}
