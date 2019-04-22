export default {
  items: {
    header: { tag: "header", content: "Header",        color: `hsl(0, 80%, 75%)`   },
    nav:    { tag: "nav",    content: "Navigation",    color: `hsl(60, 80%, 75%)`  },
    hero:   { tag: "div",    content: "Hero",          color: `hsl(120, 80%, 75%)` },
    main:   { tag: "main",   content: "Main content",  color: `hsl(180, 80%, 75%)` },
    aside:  { tag: "aside",  content: "Aside content", color: `hsl(240, 80%, 75%)` },
    footer: { tag: "footer", content: "Footer",        color: `hsl(300, 80%, 75%)` }
  },
  grid: {
    columns: [
      "1fr", "6fr", "2fr"
    ],
    rows: [
      "1fr",
      "80vh",
      "minmax(150vh, max-content)",
      "1fr"
    ],
    areas: [
      ["header", "nav",    "nav"  ],
      ["hero",   "hero",   "hero" ],
      [".",      "main",   "aside"],
      [".",      "footer", "."    ]
    ]
  },
  isResizing: false
}
