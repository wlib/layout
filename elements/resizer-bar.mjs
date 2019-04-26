import CreateCustomElement from "./CreateCustomElement.mjs"

export default CreateCustomElement("resizer-bar")({
  connectedCallback() {
    this._isResizing = false

    this.addEventListener("mousedown", e => this._isResizing = true)

    window.addEventListener("mousemove", ({ pageX }) => {
      if (this._isResizing) {
        document.documentElement.style.setProperty("--virtual-display-width", pageX + "px")
      }
    })

    window.addEventListener("mouseup", e => this._isResizing = false)
  }
})
