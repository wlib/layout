import { DefineElement, html } from "./DefineElement.mjs"

export default DefineElement("resizer-bar")(html`
<style>
  :host {
    cursor: ew-resize;
  }
</style>
`)({
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
