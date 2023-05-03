//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorInput = document.querySelector("#color-picker");
const eraserButton = document.querySelector(".eraser");
const randomButton = document.querySelector(".random");
const clearButton = document.querySelector(".clear");
const grayscaleButton = document.querySelector(".grayscale");

let alphaIncrement = 1;
const increments = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

//Create grid of 16x16 block of square divs
let gridBlockWidth = 16;
function createGrid() {
  let i = 1;
  gridContainer.setAttribute("style", "background-color: white;");
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
  event.target.style.backgroundColor = penColor; //Set penColor -> event.backgroundColor
}

//Add EventListeners to all squares via. loop
function applyBaselineFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setDefaultPenFunctionality); //Applies penColor -> event.backgroundColor to all squares inside div
    items.removeEventListener("mouseover", setRandomPen); //Removes randomPen Color, sets input/erase as penColor, penColor fires event
  }
}

//Sets penColor as input, removes randomPen
function changePenColor() {
  penColor = colorInput.value; //Set penColor -> input color selector
  applyBaselineFunctionality();
  console.log(penColor);
}

function erase() {
  penColor = "#FFFFFF";
  applyBaselineFunctionality();
  console.log(penColor);
    let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));  
    for (let items of gridDivArray) {
    items.removeEventListener("mouseover", setGrayscalePen);
  }
}

function setRandomPen(){
  penColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
  console.log(penColor);
}

function applyRandomPenFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setRandomPen);
    items.removeEventListener("mouseover", setGrayscalePen);
    items.addEventListener("mouseover", setDefaultPenFunctionality);
  }
}

function clearGrid() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.style.backgroundColor = "white";
  }
}

function setGrayscalePen(event) {
  if (!event.target.style.backgroundColor.includes("rgba")){
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.1)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.2)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.2)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.3)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.3)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.4)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.4)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.5)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.6)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.6)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.7)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.8)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.8)`) {
    event.target.style.backgroundColor = `rgba(0, 0, 0, 0.9)`;
  } else if (event.target.style.backgroundColor === `rgba(0, 0, 0, 0.9)`) {
    penColor = "rgba(0, 0, 0, 1)"; //Why does this line work with defer? If I remove this line the black turns back to white
  }
}

function applyGrayscalePenFunctionality() {
  penColor = "";
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setGrayscalePen);
    items.removeEventListener("mouseover", setRandomPen);
    items.removeEventListener("mouseover", setDefaultPenFunctionality);
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
        } else if (penColor === "") {
          applyGrayscalePenFunctionality();
        } else {
          applyBaselineFunctionality();
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
clearButton.addEventListener("click", clearGrid);
grayscaleButton.addEventListener("click", applyGrayscalePenFunctionality);