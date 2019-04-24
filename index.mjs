import state from "./state.mjs"
window.state = state // For debugging/people's curiosity sake only, not required
import Grid from "./grid.mjs"
import Items from "./items.mjs"
import { Item } from "./item.mjs"
import exportLayout from "./export.mjs"
import renderDrawGrid from "./drawGrid.mjs"


// Selection

document.querySelector("#display-body").addEventListener("click", ({ target }) => {
  const element = target.getAttribute("data-row") ? target
                                                   : target.parentElement
  const rowi = element.getAttribute("data-row")-1
  const columni = element.getAttribute("data-column")-1
  const item = state.grid.areas[rowi][columni]
  state.selectedItem = {
    element,
    id: item.id,
    item,
    width: state.grid.columnWidths[columni],
    height: state.grid.rowHeights[rowi],
    rowi,
    columni
  }
  document.documentElement.style.setProperty("--selected-item-tools-display", "block")
  document.querySelector(`#menu #setItem > input[name="id"]`).value = item.id
  document.querySelector(`#menu #setItem > input[name="tag"]`).value = item.tag || "[Blank]"
})

// Menu

document.querySelector("#menu #export").addEventListener("click", exportLayout)

document.querySelector("#menu #setItem > button").addEventListener("click", () => {
  const id = document.querySelector(`#menu #setItem > input[name="id"]`).value
  const tag = document.querySelector(`#menu #setItem > input[name="tag"]`).value || "div"
  state.setItem(state.selectedItem.id, id, tag)
  renderDrawGrid()
})

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

state.grid = new Grid(["1fr", "6fr", "2fr"], [
  "1fr",
  "80vh",
  "minmax(150vh, max-content)",
  "1fr"
])

state.items = new Items([
  Item("header", "header"),
  Item("nav", "nav"),  
  Item("hero", "div"),  
  Item("main", "main"), 
  Item("aside", "aside"),
  Item("footer", "footer")
])

// ["header", "nav",    "nav"  ]
// ["hero",   "hero",   "hero" ]
// [".",      "main",   "aside"]
// [".",      "footer", "."    ]
state.grid.setArea([1,1], [1,1], state.items[0])
state.grid.setArea([1,2], [1,3], state.items[1])
state.grid.setArea([2,1], [2,3], state.items[2])
state.grid.setArea([3,2], [3,2], state.items[3])
state.grid.setArea([3,3], [3,3], state.items[4])
state.grid.setArea([4,2], [4,2], state.items[5])

renderDrawGrid()
