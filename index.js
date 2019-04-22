const state = {
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

const exportLayout = () => {
  const finalHTML =
    Object.entries(state.items)
      .map(([id, { tag, content }]) => `<${tag} id="${id}">${content}</${tag}>`)
      .join("\n")
  const finalCSS =
`body {
  display: grid;
  grid-template-columns: ${state.grid.columns.join(" ")};
  grid-template-rows:
    ${state.grid.rows.join("\n    ")}
    ;
  grid-template-areas:
    ${format(state.grid.areas)
      .map(row => '"' + row.join(" ") + '"')
      .join("\n    ")}
    ;
}

`
+
Object.keys(state.items).map(id =>
`#${id} {
  grid-area: ${id};
}`).join("\n\n")

  const exportBody = open().document.body
  exportBody.innerHTML = "<pre></pre>"
  exportBody.querySelector("pre").innerText =
`<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>My Awesome CSS Grid Layout</title>

<style>
${finalCSS}
</style>

</head>

<body>
${finalHTML.replace(/^/gm, "  ")}
</body>

</html>`
}

const setDisplayBodyWidth = width =>
  document.documentElement.style.setProperty("--display-body-width", width + "px")

const resizer = document.querySelector("#resizer")

resizer.addEventListener("mousedown", e => state.isResizing = true)

addEventListener("mousemove", ({ pageX }) => {
  if (state.isResizing) {
    setDisplayBodyWidth(pageX)
  }
})

addEventListener("mouseup", e => state.isResizing = false)

const format = areas => {
  const longest = []
  for (let i in areas[0]) {
    longest.push(areas.map(row => row[i].length).sort((a, b) => b-a)[0])
  }
  return areas.map(row => row.map((area, i) => {
    const trailingSpaces = Array(longest[i] - area.length).fill(" ").join("")
    return area + trailingSpaces
  }))
}

const renderDrawGrid = () => {
  document.querySelector("#body").innerHTML =
  state.grid.rows.map((row, rowi) =>
    state.grid.columns.map((column, columni) => {
      const area = state.grid.areas[rowi][columni]
      if (area == ".") {
        return `<div id="${rowi}|${columni}"> <div>[Blank]</div> </div>`
      }
      return `<div id="${rowi}|${columni}" style="background-color: ${state.items[area].color};"> <div>${area}</div> </div>`
    }).join("\n")
  ).join("\n")

  document.querySelector("style").innerHTML =
`#body {
  display: grid;
  grid-template-columns: ${state.grid.columns.join(" ")};
  grid-template-rows:
    ${state.grid.rows.join("\n    ")}
    ;
}

#body > div {
  border-style: solid;
  border-width: thin;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows:
    1fr
    1fr
    1fr
    ;
}

#body > div > div {
  grid-row: 2;
  grid-column: 2;
  justify-self: center;
  align-self: center;
}`
}

renderDrawGrid()
