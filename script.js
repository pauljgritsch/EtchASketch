const randomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`
}


function createSquare(size) {
  const square = document.createElement('div')
  square.classList.add("square")
  square.style.width = `${size}px`
  square.style.height = `${size}px`

  return square
}

function drawGrid(gridSize) {
  for (let i = 0; i < gridSize**2; i++) {
    grid.appendChild(createSquare(grid.clientWidth / gridSize))
  }
  addShading()
}

function resetGrid() {
  const squares = document.querySelectorAll(".square")
  squares.forEach(square => {
    square.style.backgroundColor = "white"
    square.style.filter = "brightness(100%)"
    square.setAttribute("brightness", 100)
  })
}

function deleteGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild)
  }
}

function darkenSquare(square) {
  let brightness = Number(square.getAttribute("brightness"))
  if (brightness > 0) {
    brightness -= 10
    square.setAttribute("brightness", brightness)
    square.style.filter = `brightness(${brightness}%)`
  }
}

const rgbRegex = /(\d{1,3}), (\d{1,3}), (\d{1,3})/

function addShading() {
  const squares = document.querySelectorAll(".square")
  squares.forEach(square => {
    square.addEventListener("mouseover", () => {
      if (color == "rainbow") {
        if (!square.style.backgroundColor.includes("rgb")) {
          square.style.backgroundColor = randomColor();
          square.setAttribute("brightness", 100)
          square.style.filter = "brightness(100%)"
          square.setAttribute("rainbow", true)
        }
        else {
          darkenSquare(square)
        }
      }
      else if (color == "erase") {
        square.style.backgroundColor = "white";
        square.style.filter = 'brightness(100%)'
      }
      else {
        square.style.backgroundColor = color;
        square.style.filter = 'brightness(100%)';
      }
    })
  })
}

const grid = document.querySelector("#grid");
const resetBtn = document.querySelector("#reset");
const rainbowBtn = document.querySelector("#rainbow");
const colorSelection = document.querySelector("#colorSelector");
const eraserBtn = document.querySelector("#eraser");
const sizeBtn = document.querySelector("#gridSize")
let color = "black";
let mouseDown = false;

resetBtn.addEventListener("click", resetGrid);
rainbowBtn.addEventListener("click", () => color = 'rainbow');
colorSelection.addEventListener("change", () => color = colorSelection.value);
eraserBtn.addEventListener("click", () => color = "erase");
sizeBtn.addEventListener("change", () => {
  deleteGrid()
  drawGrid(sizeBtn.value)
})


drawGrid(10)

