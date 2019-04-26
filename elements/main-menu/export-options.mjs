import CreateCustomElement from "../CreateCustomElement.mjs"
import exportLayout from "../../export.mjs"

export default CreateCustomElement("export-options")({
  connectedCallback() {
    this.shadowRoot.querySelector("button").addEventListener("click", exportLayout)
  }
})
