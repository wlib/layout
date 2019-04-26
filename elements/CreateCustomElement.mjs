export default (name, base = HTMLElement) => (properties, attributeChangeHandlers = {}) => {
  const template = document.querySelector(`template.${name}`)

  window.customElements.define(name, class extends base {
    static get observedAttributes() {
      return Object.keys(attributeChangeHandlers)
    }

    constructor() {
      // Inherit from the base element
      super()
      // Create this.shadowRoot
      this.attachShadow({ mode: "open" })

      // Deeply clone the template and fill the shadow DOM root
      if (template) {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }

      // Object.assign(this, properties) will not work with getters and setters
      Object.defineProperties(this, Object.keys(properties).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(properties, key);
        return descriptors;
      }, {}));
    }

    connectedCallback() {
      const callback = properties.connectedCallback || function(){}
      callback.bind(this)()
    }

    disconnectedCallback() {
      const callback = properties.disconnectedCallback || function(){}
      callback.bind(this)()
    }

    adoptedCallback() {
      const callback = properties.adoptedCallback || function(){}
      callback.bind(this)()
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
      if (attributeChangeHandlers.hasOwnProperty(attribute)) {
        attributeChangeHandlers[attribute](oldValue, newValue)
      }
    }
  })

  return window.customElements.get(name)
}
