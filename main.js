//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorInput = document.querySelector("#color-picker");
const eraserButton = document.querySelector(".eraser");
const randomButton = document.querySelector(".random");

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
function applyBaselineFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setDefaultPenFunctionality);
    items.removeEventListener("mouseover", setRandomPen);
  }
}

//Functions for color changing
function changePenColor() {
  penColor = colorInput.value;
  applyBaselineFunctionality();
}

function erase() {
  penColor = "#FAF0E6";
  applyBaselineFunctionality();
}

function setRandomPen(){
  penColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}

function applyRandomPenFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setRandomPen);
  }
}

//Function for button resize
function resizeGrid() {
  gridBlockWidth = Math.floor(prompt("Enter a number between 1 - 100 to set easel size:"));

    if (gridBlockWidth > 0 && gridBlockWidth < 101) {
      gridContainer.querySelectorAll('*').forEach(gridDiv => gridDiv.remove()); //Googled how to remove all children elements
      createGrid();
      alert(`Size set to ${gridBlockWidth} x ${gridBlockWidth}`);
        if (penColor.includes("rgb")) {
          applyBaselineFunctionality();
          applyRandomPenFunctionality();
        }
    } else {
      alert(`Unable to resize`);
    }
}

createGrid();
applyBaselineFunctionality();

//EventListeners
resizeButton.addEventListener("click", resizeGrid);
colorInput.addEventListener("input", changePenColor);
eraserButton.addEventListener("click", erase);
randomButton.addEventListener("click", applyRandomPenFunctionality);