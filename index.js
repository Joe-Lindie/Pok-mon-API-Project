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
  id,
}) {
  const parentEl = parent || $(parentSelector)
  const newElement = document.createElement(tag)

  if (text) newElement.innerText = text
  if (className) newElement.classList.add(className)
  if (id) newElement.id = id
  if (parentEl) parentEl.append(newElement)

  return newElement
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  //USER CAN ENTER NAME IN ANY CASE LETTER
  const name = pokémonName.value.toLowerCase()

  //FETCH API AND CONVERT TO JSON
  function getPokémons(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
      response.json()
    )
  }

  //POKÉMON NAME
  getPokémons(name)
    .then((attribute) => {
      //POKÉMON NAME
      const name = document.createElement("h2")
      name.innerHTML = attribute.name

      poke_name.append(name)

      //POKÉMON IMAGE
      const image = document.createElement("img")
      image.src = attribute.sprites.front_shiny
      image.alt = "Pokémon Character"

      poke_img.append(image)
    })

    .catch(
      (error) => (pokemonName.innerHTML = "This pokemon does not exist. Sorry!")
    )
})
