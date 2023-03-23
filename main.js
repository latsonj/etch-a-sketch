//Assigning names to selected elements from HTML
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");

//EventListeners
resizeButton.addEventListener("click", resizeGrid);

//Create grid of 16x16 block of square divs
let gridBlockXY = 16;
function createGrid() {
  let i = 1;
  do {
    const gridContainerSetWidth = gridContainer.clientWidth;
    let gridDiv = document.createElement("div");
    gridContainer.appendChild(gridDiv);
    gridDiv.setAttribute("style", "background-color: white;");
    gridDiv.style.minWidth = `${gridContainerSetWidth/gridBlockXY}px`;
    gridDiv.style.minHeight = `${gridContainerSetWidth/gridBlockXY}px`;
    gridDiv.classList.add("grid-div");
    i++;
  } while (i <= gridBlockXY * gridBlockXY);
}

//Function for button resize
function resizeGrid() {
  gridBlockXY = prompt("Enter a number between 1 - 32 to set easel size:");

    if (gridBlockXY > 0 && gridBlockXY < 33 && gridBlockXY!== null) {
      gridContainer.querySelectorAll('*').forEach(divNode => divNode.remove());
      createGrid();
      alert(`Size set to ${gridBlockXY} x ${gridBlockXY}`);
    } else {
      alert(`Unable to resize`);
    }
}

createGrid();