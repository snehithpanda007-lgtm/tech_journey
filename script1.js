// const grandparent = document.getElementById('grandparent-id');
// const parent = Array.from(document.getElementsByClassName('parent'));

// changeColor(grandparent,'black');
// parent.forEach((p) => changeColor(p, 'gray'));

// function changeColor(element, color) {
//   element.style.backgroundColor = color;
// }
const grandparent = document.querySelector('.grandparent');
const parent = document.querySelectorAll('.parent');
const parentOne = parent[0];
const children = parentOne.children;

changeColor(grandparent,'#333');
parent.forEach((p) => changeColor(p, 'gray'));
changeColor(children[0], 'lightgray');

function changeColor(element, color) {
  element.style.backgroundColor = color;
}