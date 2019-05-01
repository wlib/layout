import { DefineElement, html } from "../DefineElement.mjs"

import state from "../../state.mjs"
import GridCell from "./grid-cell.mjs"

export default DefineElement("display-grid")(html``)({
  connectedCallback() {
    this.style.setProperty("display", "grid")
  },

  _update() {
    this.shadowRoot.innerHTML = ""
    state.grid.areas.map((row, rowi) =>
      row.map((item, columni) => {
        const cell = new GridCell()
        cell.setAttribute("row", rowi + 1)
        cell.setAttribute("column", columni + 1)
        cell.item = item
        this.shadowRoot.appendChild(cell)
      })
    )
    this.style.setProperty("grid-template-columns", state.grid.columnWidths.join(" "))
    this.style.setProperty("grid-template-rows", state.grid.rowHeights.join(" "))
  }
})
