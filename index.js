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

  //USER CAN ENTER NAME IN ANY CASE LETTER
  const name = pokémonName.value.toLowerCase();

  // NEW CARD CONTAINER
  const cardContainer = createElement({
    tag: "div",
    className: "card__container",
    parentSelector: ".card_list",
  });

  //FETCH API AND CONVERT TO JSON
  function getPokemonData(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
      response.json()
    );
  }

  function getPokemonDescription(id) {
    return fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`).then(
      (response) => response.json()
    );
  }

  //POKÉMON NAME
  getPokemonData(name)
    .then((attribute) => {
      const containerHpElement = createElement({
        tag: "div",
        className: "container-hp-element",
        parent: cardContainer,
      });

      createElement({
        tag: "p",
        className: "hp",
        parent: containerHpElement,
        text: "hp " + attribute.stats[0].base_stat,
      });

      createElement({
        tag: "p",
        className: "element-type",
        parent: containerHpElement,
        text: attribute.types[0].type.name,
      });
      createElement({
        tag: "p",
        className: "pokemon-name",
        parent: cardContainer,
        text: attribute.name,
      });

      createElement({
        tag: "img",
        className: "poke-image",
        parent: cardContainer,
        alt: "Pokémon Character",
        src: attribute.sprites.front_shiny,
      });

      return attribute;
    })
    .then((attribute) => getPokemonDescription(attribute.id))
    //
    .then((descriptionData) =>
      createElement({
        tag: "p",
        className: "description",
        parent: cardContainer,
        text: descriptionData.descriptions[0].description,
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

// //USER CAN ENTER NAME IN ANY CASE LETTER
// const name = pokémonName.value.toLowerCase();

// // NEW CARD CONTAINER
// const cardContainer = createElement({
//   tag: "div",
//   className: "card__container",
//   parentSelector: ".card_list",
// });

// //POKÉMON NAME
// getPokemonData("pikachu")
//   .then((attribute) => {
//     const containerHpElement = createElement({
//       tag: "div",
//       className: "container-hp-element",
//       parent: cardContainer,
//     });

//     createElement({
//       tag: "p",
//       className: "hp",
//       parent: containerHpElement,
//       text: "hp " + attribute.stats[0].base_stat,
//     });

//     createElement({
//       tag: "p",
//       className: "element-type",
//       parent: containerHpElement,
//       text: attribute.types[0].type.name,
//     });
//     createElement({
//       tag: "p",
//       className: "pokemon-name",
//       parent: cardContainer,
//       text: attribute.name,
//     });

//     createElement({
//       tag: "img",
//       className: "poke-image",
//       parent: cardContainer,
//       alt: "Pokémon Character",
//       src: attribute.sprites.front_shiny,
//     });

//     return attribute;
//   })
//   .then((attribute) => getPokemonDescription(attribute.id))
//   .then((descriptionData) =>
//     createElement({
//       tag: "p",
//       className: "description",
//       parent: cardContainer,
//       text: descriptionData.descriptions[0].description,
//     })
//   )

//   .catch((error) => {
//     pokemonName.innerHTML = "This pokemon does not exist. Sorry!";
//     console.error(error);
//   });
