//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");

//Create grid of 16x16 block of square divs
let gridBlockXY = 16;
function createGrid() {
  let i = 1;
  do {
    gridContainer.setAttribute("style", "background-color: white;")
    const gridContainerSetWidth = gridContainer.clientWidth; //clientWidth includes padding, excludes margin & border
    let gridDiv = document.createElement("div");
    gridContainer.appendChild(gridDiv);
    gridDiv.style.minWidth = `${gridContainerSetWidth/gridBlockXY}px`;
    gridDiv.style.minHeight = `${gridContainerSetWidth/gridBlockXY}px`;
    gridDiv.classList.add("grid-div");
    i++;
  } while (i <= gridBlockXY * gridBlockXY);
}
createGrid();

//EventListeners
resizeButton.addEventListener("click", resizeGrid);

//Declaring variables
let gridDivAll = document.querySelectorAll(".grid-div");
let gridDivAllArr = Array.from(gridDivAll);

//Add class when mouse hovers(CSS has black for BG color)
function changeColor(event) {
  event.target.classList.add("black-pen");
}

//Add EventListeners to all squares via. loop
function makeGridDrawable() {
  for (let item of gridDivAllArr) {
    item.addEventListener("mouseover", changeColor);
  }
}
makeGridDrawable();

//Function for button resize
function resizeGrid() {
  gridBlockXY = Math.floor(prompt("Enter a number between 1 - 32 to set easel size:"));

    if (gridBlockXY > 0 && gridBlockXY < 33 && gridBlockXY !== null) {
      gridContainer.querySelectorAll('*').forEach(divNode => divNode.remove()); //Googled how to remove all children elements
      createGrid();
      alert(`Size set to ${gridBlockXY} x ${gridBlockXY}`);
      makeGridDrawable();
    } else {
      alert(`Unable to resize`);
    }
}