// scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
  effect: "fade",
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const cardPokemon = document.querySelectorAll(".js-open-details-pokemon");
const btnCloseModal = document.querySelector(".js-close-modal-details-pokemon");
const countPokemons = document.getElementById("js-count-pokemons");

cardPokemon.forEach((card) => {
  card.addEventListener("click", openDetailsPokemon);
});

if (btnCloseModal) {
  btnCloseModal.addEventListener("click", closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector(".js-open-select-custom");

btnDropdownSelect.addEventListener("click", () => {
  btnDropdownSelect.parentElement.classList.toggle("active");
});

const areaPokemons = document.getElementById("js-list-pokemons");

function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}

function listinungPokemons(urlApi) {
  axios({
    method: "GET",
    url: urlApi,
  }).then((response) => {
    const countPokemons = document.getElementById("js-count-pokemons");
    const { results, next, count } = response.data;

    countPokemons.innerText = count;

    results.forEach(pokemon =>{
      let urlApiDetails = pokemon.url;

      console.log(urlApiDetails);
    })
  });
}

listinungPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
