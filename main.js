const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const colorInput = document.querySelector("#color-picker");
const eraserButton = document.querySelector(".eraser");
const randomButton = document.querySelector(".random");
const clearButton = document.querySelector(".clear");
const grayscaleButton = document.querySelector(".grayscale");

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

//Started pen color
let penColor = "#00FF7F";

function setDefaultPenFunctionality(event) {
  event.target.style.backgroundColor = penColor; //Set penColor -> event.backgroundColor
}

//Actually makes line 32-34 work by feeding all event listeners to all squares with a loop
function applyBaselineFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setDefaultPenFunctionality); //Applies penColor -> event.backgroundColor to all squares inside div
    items.removeEventListener("mouseover", setRandomPen); //Removes randomPen Color, sets input/erase as penColor, penColor fires event
    items.removeEventListener("mouseover", setGrayscalePen); //Removes grayscale behavior;
  }
}

//Sets penColor as input, removes randomPen & grayscale
function changePenColor() {
  penColor = colorInput.value; //Set penColor -> input color selector
  applyBaselineFunctionality();
}

//Sets penColor as white, removes randomPen & grayscale
function erase() {
  penColor = "#FFFFFF";
  applyBaselineFunctionality();
}

//Sets penColor as random, every new mouseover fires random function for each rgb value
function setRandomPen(){
  penColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}

//Makes randomPen the default, 
function applyRandomPenFunctionality() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setDefaultPenFunctionality); //Grayscale removes default, needs this function for normal default pen color behavior
    items.addEventListener("mouseover", setRandomPen); //penColor = randomPen
    items.removeEventListener("mouseover", setGrayscalePen); //Removes grayscale behavior
  }
}

function clearGrid() {
  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.style.backgroundColor = "white";
  }
}

//Manipulates alpha value and substrings, lots of replacing of strings and checking for substrings based on conditionals
function setGrayscalePen(event) {
  let alpha = event.target.style.backgroundColor.substring(14, 17);
  let alphaIncrement = event.target.style.backgroundColor.substring(16, 17);

  if (event.target.style.backgroundColor.includes("(0, 0, 0)" || "#FFFFFF")) { //To prevent line 88 behavior (line 96 browser removes "a" from "rgba")
    return;

  } else if (!event.target.style.backgroundColor.includes("rgba")) { //Initialize value
    event.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";

  } else if (event.target.style.backgroundColor.includes("rgba")){ //Where the magic happens, increments the decimal alpha value

    if (alpha < 0.9) {
      event.target.style.backgroundColor = event.target.style.backgroundColor.replace(alphaIncrement, ++alphaIncrement);

    } else if (alpha >= 0.9) {
      event.target.style.backgroundColor = event.target.style.backgroundColor.replace(alpha, 1.0); //Makes background color show as rgb(0, 0, 0) ^ line 85
    }
  }
}

//Removes randomPen/input/erase, removes penColor from firing event
function applyGrayscalePenFunctionality() {
  penColor = "";

  let gridDivArray = Array.from(document.querySelectorAll(".grid-div"));
  for (let items of gridDivArray) {
    items.addEventListener("mouseover", setGrayscalePen);
    items.removeEventListener("mouseover", setRandomPen);
    items.removeEventListener("mouseover", setDefaultPenFunctionality);
  }
}

function resizeGrid() {
  gridBlockWidth = Math.floor(prompt("Enter a number between 1 - 100 to set easel size:"));

    if (gridBlockWidth > 0 && gridBlockWidth < 101) {
      gridContainer.querySelectorAll('*').forEach(gridDiv => gridDiv.remove()); //Googled how to remove all children elements
      createGrid();
      alert(`Size set to ${gridBlockWidth} x ${gridBlockWidth}`);
      
        if (penColor.includes("rgb")) {
          applyBaselineFunctionality(); //Make grid able to be drawn on since this function deletes all squares and creates new ones
          applyRandomPenFunctionality(); //Only random meets condition
          
        } else if (penColor === "") {
          applyGrayscalePenFunctionality(); //Only grayscale meets condition
        
        } else {
          applyBaselineFunctionality(); //Everything else other that random and grayscale
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