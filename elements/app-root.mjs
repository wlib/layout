import { DefineElement, html } from "./DefineElement.mjs"

import state from "../state.mjs"
import Grid from "../grid.mjs"
import Items from "../items.mjs"
import { Item } from "../item.mjs"

import "./virtual-display/display-grid.mjs"
import "./resizer-bar.mjs"
import "./main-menu/main-menu.mjs"

export default DefineElement("app-root")(html`
<div id="virtual-display">
  <display-grid></display-grid>
</div>
<resizer-bar></resizer-bar>
<main-menu></main-menu>

<style>
  :host {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    --virtual-display-width: auto;
    display: grid;
    grid-template-columns: var(--virtual-display-width) 5px 1fr;
    grid-template-areas: "virtual-display resizer-bar main-menu";
  }

  #virtual-display {
    grid-area: virtual-display;
    box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow-x: scroll;
  }

  resizer-bar {
    grid-area: resizer-bar;
  }

  main-menu {
    grid-area: main-menu;
  }
</style>
`)({
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
    state.grid.setArea([1, 1], [1, 1], state.items[0])
    state.grid.setArea([1, 2], [1, 3], state.items[1])
    state.grid.setArea([2, 1], [2, 3], state.items[2])
    state.grid.setArea([3, 2], [3, 2], state.items[3])
    state.grid.setArea([3, 3], [3, 3], state.items[4])
    state.grid.setArea([4, 2], [4, 2], state.items[5])

    this.shadowRoot.querySelector("display-grid")._update()
  }
})
