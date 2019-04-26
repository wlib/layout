import CreateCustomElement from "./CreateCustomElement.mjs"

import state from "../state.mjs"
import Grid from "../grid.mjs"
import Items from "../items.mjs"
import { Item } from "../item.mjs"

import "./virtual-display/display-grid.mjs"
import "./resizer-bar.mjs"
import "./main-menu/main-menu.mjs"

export default CreateCustomElement("app-root")({
  connectedCallback() {
    state.grid = new Grid(["1fr", "6fr", "2fr"], [
      "1fr",
      "80vh",
      "minmax(150vh, max-content)",
      "1fr"
    ])

    state.items = new Items(
      Item("header", "header"),
      Item("nav", "nav"),  
      Item("hero", "div"),  
      Item("main", "main"), 
      Item("aside", "aside"),
      Item("footer", "footer")
    )

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

    this.shadowRoot.querySelector("display-grid")._update()
  }
})
