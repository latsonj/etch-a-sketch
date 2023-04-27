//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorInput = document.querySelector("#color-picker");
const eraser = document.querySelector(".eraser");

//Create grid of 16x16 block of square divs
let gridBlockXY = 16;
function createGrid() {
  let i = 1;
  gridContainer.setAttribute("style", "background-color: white;");
  const gridContainerPixelWidth = gridContainer.clientWidth; //clientWidth includes padding, excludes margin & border  
  do {
    let gridDiv = document.createElement("div");
    gridContainer.appendChild(gridDiv);
    gridDiv.style.minWidth = `${gridContainerPixelWidth/gridBlockXY}px`;
    gridDiv.style.minHeight = `${gridContainerPixelWidth/gridBlockXY}px`;
    gridDiv.classList.add("grid-div");
    i++;
  } while (i <= gridBlockXY * gridBlockXY);
}

//Add color when mouse hovers
let penColor = "#00FF7F";

function drawOnGrid(event) {
  event.target.style.backgroundColor = penColor;
}

//Add EventListeners to all squares via. loop
function makeGridDrawable() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", drawOnGrid);
  }
}

//Function for color changing
function changePenColor() {
  penColor = colorInput.value;
}

function erase() {
  penColor = "#FFFFFF";
}

//Function for button resize
function resizeGrid() {
  gridBlockXY = Math.floor(prompt("Enter a number between 1 - 100 to set easel size:"));

    if (gridBlockXY > 0 && gridBlockXY < 101) {
      gridContainer.querySelectorAll('*').forEach(gridDiv => gridDiv.remove()); //Googled how to remove all children elements
      createGrid();
      alert(`Size set to ${gridBlockXY} x ${gridBlockXY}`);
      makeGridDrawable();
    } else {
      alert(`Unable to resize`);
    }
}

createGrid();
makeGridDrawable();

//EventListeners
resizeButton.addEventListener("click", resizeGrid);
colorInput.addEventListener("input", changePenColor);
eraser.addEventListener("click", erase);