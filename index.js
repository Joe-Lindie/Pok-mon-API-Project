const form = $('form');
const input = $('input');


/*
o------------------o
| Helper Functions |
o------------------o
*/

function $(selector, element = document) {
  return element.querySelector(selector);
}

function createElement({
  tag,
  className,
  parent,
  parentSelector,
  text = "",
  id,
}) {
  const parentEl = parent || $(parentSelector);
  const newElement = document.createElement(tag);

  if (text) newElement.innerText = text;
  if (className) newElement.classList.add(className);
  if (id) newElement.id = id;
  if (parentEl) parentEl.append(newElement);

  return newElement;
}

