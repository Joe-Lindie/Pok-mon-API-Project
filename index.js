//Grabbed elements needed from DOM
const form = $("form");
const pokémonName = $("#name");
const submit = $("#submit");
const pokemonName = $(".card_list");

/*
o------------------o
| Helper Functions |
o------------------o
*/

function $(selector, element = document) {
  return element.querySelector(selector);
}

function createElement(elementObj) {
  const {
    tag,
    className,
    parent,
    parentSelector,
    text = "",
    src,
    alt,
    id,
  } = elementObj;
  const parentEl = parent || $(parentSelector);
  const newElement = document.createElement(tag);

  if (text) newElement.innerText = text;
  if (className) newElement.classList.add(className);
  if (id) newElement.id = id;
  if (parentEl) parentEl.append(newElement);
  if (src) newElement.src = src;
  if (alt) newElement.alt = alt;

  return newElement;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const typeColourMap = {
    psychic: "#AB5F79",
    fire: "#D2765E",
    water: "#70BFE3",
    bug: "#A1CC86",
    normal: "#C9BEB5",
    poison: "#9A67AA",
    electric: "#F2D330",
    ground: "#C99477",
    fairy: "#F0B6BC",
    grass: "#9CC061",
    fighting: "#D2AE86",
    rock: "#9A8B6B",
    ghost: "#81345B",
    dragon: "#CEC7BD",
    ice: "#4D98B7",
  };

  //USER CAN ENTER NAME IN ANY CASE LETTER
  const name = pokémonName.value.toLowerCase();

  // NEW CARD CONTAINER
  const cardContainer = createElement({
    tag: "div",
    className: "card__container",
    parentSelector: ".card_list",
  });

  //POKÉMON NAME
  getPokemonData(name)
    .then((attribute) => {
      const hp = "hp " + attribute.stats[0].base_stat;
      const type = attribute.types[0].type.name;
      const sprite = attribute.sprites.front_shiny;

      cardContainer.style.backgroundColor = typeColourMap[type];

      const containerHpElement = createElement({
        tag: "div",
        className: "container-hp-element",
        parent: cardContainer,
      });

      createElement({
        tag: "p",
        className: "hp",
        parent: containerHpElement,
        text: hp,
      });

      createElement({
        tag: "p",
        className: "element-type",
        parent: containerHpElement,
        text: type,
      });

      createElement({
        tag: "p",
        className: "pokemon-name",
        parent: cardContainer,
        text: name,
      });

      createElement({
        tag: "img",
        className: "poke-image",
        parent: cardContainer,
        alt: "Pokémon Character",
        src: sprite,
      });

      return attribute;
    })
    .then((attribute) => getPokemonDescription(attribute.species.url))
    .then((descriptionData) =>
      createElement({
        tag: "p",
        className: "description",
        parent: cardContainer,
        text: descriptionData.genera[0].genus,
      })
    )

    .catch((error) => {
      pokemonName.innerHTML = "This pokemon does not exist. Sorry!";
      console.error(error);
    });
});

function createPokemonElements({ textElements, imgSrc, parent }) {
  for (let section of textElements) {
    createElement({
      tag: "p",
      parent: parent,
      className: section.className,
      text: section.text,
    });
  }

  // PokeImg
  createElement({
    tag: "img",
    className: "poke-image",
    parent: parentDiv,
    alt: "Pokémon Character",
    src: imgSrc,
  });
}

//FETCH API AND CONVERT TO JSON
function getPokemonData(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
    response.json()
  );
}

function getPokemonDescription(url) {
  return fetch(url).then((response) => response.json());
}
