const state = {
  mode: "Draw Grid", // Draw Grid | Fill Grid | Modify Grid | Modify Item | Final View
  items: [
    { id: "header", tag: "header", content: "Header" },
    { id: "nav", tag: "nav", content: "Navigation" },
    { id: "hero", tag: "div", content: "Hero" },
    { id: "main", tag: "main", content: "Main content" },
    { id: "aside", tag: "aside", content: "Aside content" },
    { id: "footer", tag: "footer", content: "Footer" }
  ],
  grid: {
    columns: [
      "10%", "1fr", "10%"
    ],
    rows: [
      "1fr",
      "80vh",
      "auto",
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

const renderFillGrid = () => {
  document.querySelector("#body").innerHTML =
    state.items
      .map(item => `<${item.tag} id="${item.id}">${item.content}</${item.tag}>`)
      .join("\n")

  document.querySelector("style").innerHTML =
`#body {
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
}` + state.items.map((item, i) =>
`#${item.id} {
  grid-area: ${item.id};
  background-color: ${`hsl(${i * 360 / state.items.length}, ${65}%, ${70}%)`};
}`).join("\n\n")
}

const renderDrawGrid = () => {
  document.querySelector("#body").innerHTML =
  state.grid.rows.map((row, rowi) =>
    state.grid.columns.map((column, columni) =>
      `<div id="${rowi}|${columni}">${rowi}|${columni}</div>`
    ).join("\n")
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
}`
}

renderDrawGrid()
