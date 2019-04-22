import state from "./state.mjs"
import exportLayout from "./export.mjs"
import renderDrawGrid from "./drawGrid.mjs"

// Menu

document.querySelector("#menu #export").addEventListener("click", exportLayout)  

// Resizer

document.querySelector("#resizer")
  .addEventListener("mousedown", e => state.isResizing = true)

addEventListener("mousemove", ({ pageX }) => {
  if (state.isResizing) {
    document.documentElement.style.setProperty("--display-body-width", pageX + "px")
  }
})

addEventListener("mouseup", e => state.isResizing = false)

// Initalize

renderDrawGrid()
