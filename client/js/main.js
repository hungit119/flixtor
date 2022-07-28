const suggestions = document.getElementById("suggestions");
const searchInput = document.getElementById("search-input");
const inputSearch = document.getElementById("search");
const recommended = document.getElementById("recommended");
fetch("http://localhost:4000")
  .then((res) => res.json())
  .then((res) => {
    let html = res.result.map(
      (film) => `<div class="col-2 film">
    <img
      class="img-film"
      src=${film.img}
      alt="poster"
    />
    <div class="info-content">
      <div class="title-info">${film.title}</div>
      <div class="des-info">
        <div class="right-info">
          <span class="meta">${film.meta}</span> .
          <span class="time">${film.time} min</span>
        </div>
        <div class="left-info">${film.type}</div>
      </div>
    </div>
    <div class="quantity">${film.quantity}</div>
    <div class="tooltip-film">
      <div class="header-tooltip">${film.title}</div>
      <div class="meta-tooltip">
        <span class="year-tootip">${film.meta}</span>
        <span class="time-tooltip">${film.time} min</span>
        <span class="quan-tooltip">${film.quantity}</span>
      </div>
      <div class="content-tooltip">
        <div class="des-tooltip">
          ${film.description}
        </div>
        <div class="status-tooltip">
          <div class="country-tooltip">Country : ${film.country}</div>
          <div class="genre-tooltip">Genre : ${film.genre}</div>
        </div>
      </div>
      <div class="action-tooltip">
        <button class="btn-watch-tooltip">
          <i class="fa fa-play"></i> Watch now
        </button>
        <div class="btn-like-tooltip">
          <i class="fa fa-heart"></i>
        </div>
      </div>
    </div>
  </div>`
    );
    recommended.innerHTML = html.join(" ");
  })
  .catch((err) => {
    throw err;
  });

function inputChange(inputValue) {
  fetch(`http://localhost:4000/api/search?q=${inputValue}&limit=5`)
    .then((res) => res.json())
    .then((res) => {
      if (res.result.length > 0) {
        suggestions.classList.add("active-suggestions");
        let html = res.result.map(
          (film) => `<a href="#" class="item-suggestion">
        <div class="poster-suggestion">
          <img
            src=${film.img}
            alt="poster"
            class="img-poster-suggestion"
          />
        </div>
        <div class="info-suggestion">
          <div class="title-info-suggestion">${film.title}</div>
          <div class="meta-info-suggestion">
            <span class="meta-year">${film.meta}</span> <span>&#8226</span>
            <span class="time-infor-suggestion">${film.time}</span> min
          </div>
        </div>
      </a>`
        );
        html.push(`<a href="#" class="more">
        View all result <i class="fa fa-angle-right"></i>
      </a>`);
        console.log(html);
        suggestions.innerHTML = html.join(" ");
      } else suggestions.classList.remove("active-suggestions");
    })
    .catch((error) => {
      throw error;
    });
}
searchInput.addEventListener("submit", (e) => {
  if (suggestions.classList.contains("active-suggestions")) {
    console.log("Hello");
  } else {
    e.preventDefault();
    inputSearch.focus();
  }
});
