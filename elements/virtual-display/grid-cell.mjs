import CreateCustomElement from "../CreateCustomElement.mjs"

export default CreateCustomElement("grid-cell")({
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
