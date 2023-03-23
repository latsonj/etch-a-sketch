const gridContainer = document.querySelector(".grid-container");
let gridBlockXY = 16;

//Create grid of 16x16 block of square divs
let i = 1;
do {
  const gridContainerSetWidth = gridContainer.clientWidth;
  let gridDiv = document.createElement("div");
  gridContainer.appendChild(gridDiv);
  gridDiv.setAttribute("style", "background-color: white;");
  gridDiv.style.minWidth = `${gridContainerSetWidth/gridBlockXY}px`;
  i++;
} while (i <= gridBlockXY * gridBlockXY);
