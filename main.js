//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorInput = document.querySelector("#color-picker");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");

//Create grid of 16x16 block of square divs
let gridBlockWidth = 16;
function createGrid() {
  let i = 1;
  gridContainer.setAttribute("style", "background-color: linen;");
  const gridContainerPixelWidth = gridContainer.clientWidth; //clientWidth includes padding, excludes margin & border  
  do {
    let gridDiv = document.createElement("div");
    gridContainer.appendChild(gridDiv);
    gridDiv.style.minWidth = `${gridContainerPixelWidth/gridBlockWidth}px`;
    gridDiv.style.minHeight = `${gridContainerPixelWidth/gridBlockWidth}px`;
    gridDiv.classList.add("grid-div");
    i++;
  } while (i <= gridBlockWidth * gridBlockWidth);
}

//Add color when mouse hovers
let penColor = "#00FF7F";

function setDefaultPenFunctionality(event) {
  event.target.style.backgroundColor = penColor;
}

//Add EventListeners to all squares via. loop
function applyDefaultFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setDefaultPenFunctionality);
    items.removeEventListener("mouseover", setRainbowPen);
  }
}

//Functions for color changing
function changePenColor() {
  penColor = colorInput.value;
  applyDefaultFunctionality();
}

function erase() {
  penColor = "#FAF0E6";
  applyDefaultFunctionality();
}

function setRainbowPen(){
  penColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}

function applyRainbowPenFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setRainbowPen);
  }
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
applyDefaultFunctionality();

//EventListeners
resizeButton.addEventListener("click", resizeGrid);
colorInput.addEventListener("input", changePenColor);
eraser.addEventListener("click", erase);
rainbow.addEventListener("click", applyRainbowPenFunctionality);