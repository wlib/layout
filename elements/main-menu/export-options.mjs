import { DefineElement, html } from "../DefineElement.mjs"

import exportLayout from "../../export.mjs"

export default DefineElement("export-options")(html`
<button>Export...</button>

<style>
  :host {
    display: grid;
  }
</style>
`)({
  connectedCallback() {
    this.shadowRoot.querySelector("button").addEventListener("click", exportLayout)
  }
})
