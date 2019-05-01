import { DefineElement, html } from "../DefineElement.mjs"

export default DefineElement("grid-cell")(html`
<style>
  :host {
    border-style: solid;
    border-width: thin;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows:
      1fr 1fr 1fr;
  }

  div {
    grid-row: 2;
    grid-column: 2;
    justify-self: center;
    align-self: center;
  }
</style>
`)({
  get item() {
    return this._item
  },

  set item(item) {
    if (item.isBlank) {
      const div = document.createElement("div")
      div.textContent = "[Blank]"
      this.shadowRoot.appendChild(div)
    } else {
      const div = document.createElement("div")
      div.textContent = item.id
      this.shadowRoot.appendChild(div)
      this.style.setProperty("background-color", item.color)
    }
    return this._item = item
  }
})
