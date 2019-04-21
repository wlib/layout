const state = {
  items: {
    header: { tag: "header", content: "Header",        color: `hsl(0, 75%, 70%)`   },
    nav:    { tag: "nav",    content: "Navigation",    color: `hsl(60, 75%, 70%)`  },
    hero:   { tag: "div",    content: "Hero",          color: `hsl(120, 75%, 70%)` },
    main:   { tag: "main",   content: "Main content",  color: `hsl(180, 75%, 70%)` },
    aside:  { tag: "aside",  content: "Aside content", color: `hsl(240, 75%, 70%)` },
    footer: { tag: "footer", content: "Footer",        color: `hsl(300, 75%, 70%)` }
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
  rightClickTarget: undefined
}

const changeGridSize = rowOrColumn => {
  const [_, rowi, columni] = state.rightClickTarget.id.match(/(\d+)\|(\d+)/)
  if (rowOrColumn == "row") {
    state.grid.rows[rowi] = prompt(state.grid.rows[rowi])
  } else if (rowOrColumn == "column") {
    state.grid.columns[columni] = prompt(state.grid.columns[columni])
  }
  renderDrawGrid()
}

oncontextmenu = e => {
  e.preventDefault()
  const { target, pageX, pageY } = e
  const menu = document.querySelector("#menu")
  menu.style.display = "block"
  menu.style.left = pageX
  menu.style.top = pageY
  state.rightClickTarget = target
}

onclick = e => {
  if (e.which != 3) {
    document.querySelector("#menu").style.display = "none"
  }
}

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
