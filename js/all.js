"use strict";var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),btnCloseModal=document.querySelector(".js-close-modal-details-pokemon"),countPokemons=document.getElementById("js-count-pokemons");cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),btnCloseModal&&btnCloseModal.addEventListener("click",closeDetailsPokemon);var btnDropdownSelect=document.querySelector(".js-open-select-custom");btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")});var areaPokemons=document.getElementById("js-list-pokemons");function firstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function createCardPokemon(e,t,n,o){var a=document.createElement("button");a.classList="card-pokemon js-open-details-pokemon ".concat(t),areaPokemons.appendChild(a);var c=document.createElement("div");c.classList="image",a.appendChild(c);var i=document.createElement("img");i.className="thumb-img",i.setAttribute("src",o),c.appendChild(i);c=document.createElement("div");c.classList="info",a.appendChild(c);i=document.createElement("div");i.classList="text",c.appendChild(i);a=document.createElement("span");a.textContent=(e<10?"#00":e<100?"#0":"#").concat(e),i.appendChild(a);a=document.createElement("h3");a.textContent=firstLetter(n),i.appendChild(a);a=document.createElement("div");a.classList="icon",c.appendChild(a);c=document.createElement("img");c.setAttribute("src","img/icon-types/".concat(t,".svg")),a.appendChild(c)}function listiningPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),n=e.data,e=n.results,n=(n.next,n.count);t.innerText=n,e.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,n=t.name,o=t.id,e=t.sprites,t=t.types,t={nome:n,code:o,image:e.other.dream_world.front_default,type:t[0].type.name};createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}listiningPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");var areaTypes=document.getElementById("js-type-area"),areaTypesMobile=document.querySelector(".dropdown-select");console.log(areaTypesMobile),axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o;t<18&&(o=document.createElement("li"),areaTypes.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),o.appendChild(n),(t=document.createElement("div")).classList="icon",n.appendChild(t),(o=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),t.appendChild(o),(t=document.createElement("span")).textContent=firstLetter(e.name),n.appendChild(t),o=document.createElement("li"),areaTypesMobile.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),o.appendChild(n),(t=document.createElement("div")).classList="icon",n.appendChild(t),(o=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),t.appendChild(o),(o=document.createElement("span")).textContent=firstLetter(e.name),n.appendChild(o))})});var btnLoadMore=document.getElementById("js-btn-load-more"),countPagination=10;function showMorePokemon(){listiningPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9}btnLoadMore.addEventListener("click",showMorePokemon);