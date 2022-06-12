//Grabbed elements needed from DOM
const form = $("form")
const pokémonName = $("#name")
const submit = $("#submit")
const pokemonName = $("#poke_name")

/*
o------------------o
| Helper Functions |
o------------------o
*/

function $(selector, element = document) {
  return element.querySelector(selector)
}

function createElement({
  tag,
  className,
  parent,
  parentSelector,
  text = "",
  src,
  alt,
  id,
}) {
  const parentEl = parent || $(parentSelector)
  const newElement = document.createElement(tag)

  if (text) newElement.innerText = text
  if (className) newElement.classList.add(className)
  if (id) newElement.id = id
  if (parentEl) parentEl.append(newElement)
  if (src) newElement.src = src
  if (alt) newElement.alt = alt

  return newElement
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  //USER CAN ENTER NAME IN ANY CASE LETTER
  const name = pokémonName.value.toLowerCase()

  //FETCH API AND CONVERT TO JSON
  function getPokémons(name, id) {
    return fetch(
      `https://pokeapi.co/api/v2/${id ? "characteristics" : "pokemon"}/${
        id || name
      }`
    ).then((response) => response.json())

    // const characteristics = fetch(
    //   `https://pokeapi.co/api/v2/characteristic/%7Bid%7D/`
    // ).then((response) => response.json())
    // return { mainData, characteristics }
  }

  //POKÉMON NAME
  getPokémons(name)
    .then((attribute) => {
      console.log(attribute)
      // //POKÉMON NAME
      // const name = document.createElement("h2")
      // name.innerHTML = attribute.name

      // poke_name.append(name)

      // //POKÉMON IMAGE
      // const image = document.createElement("img")
      // image.src = attribute.sprites.front_shiny
      // image.alt = "Pokémon Character"

      // poke_img.append(image)
      const parentDiv = createElement({
        tag: "div",
        className: "card__container",
        parentSelector: "body",
      })
      /* const cardChildren = {
          pokemonName: 
  
}*/
      createElement({
        tag: "p",
        className: "pokemon-name",
        parent: parentDiv,
        text: attribute.name,
      })

      createElement({
        tag: "p",
        className: "hp",
        parent: parentDiv,
        text: "hp " + attribute.stats[0].base_stat,
      })

      createElement({
        tag: "p",
        className: "element-type",
        parent: parentDiv,
        text: attribute.types[0].type.name,
      })

      createElement({
        tag: "p",
        className: "abilities-type",
        parent: parentDiv,
        text: attribute.abilities[0].ability.name,
      })

      createElement({
        tag: "p",
        className: "weakness",
        parent: parentDiv,
        text: attribute.abilities[0].ability.name,
      })

      createElement({
        tag: "p",
        className: "description",
        parent: parentDiv,
        text: attribute.descriptions[0].description,
      })

      createElement({
        tag: "img",
        className: "poke-image",
        parent: parentDiv,
        alt: "Pokémon Character",
        src: attribute.sprites.front_shiny,
      })
    })

    .catch(
      (error) => (pokemonName.innerHTML = "This pokemon does not exist. Sorry!")
    )
})

/* function createPokemonElements(pokemonObj) {
  textSections: [{name: 'name'}, hp, type, 
  img:,
  
  
}
*/
