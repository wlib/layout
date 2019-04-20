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
}
`

+

state.items
      .map((item, i) =>
`#${item.id} {
  grid-area: ${item.id};
  background-color: ${`hsl(${i * 360 / state.items.length}, ${65}%, ${70}%)`};
}`)
      .join("\n\n")
}

const updateGridSizes = e => {
  const [_, rowOrColumn, i] = e.target.id.match(/(row|column)-(\d+)/)
  const newValue = e.target.value
  rowOrColumn == "row" ? state.grid.rows[i] = newValue
                       : state.grid.columns[i] = newValue
  if (e.key == "Enter") {
    renderDrawGrid()
  }
}

const renderDrawGrid = () => {
  document.querySelector("#body").innerHTML =
  state.grid.rows
    .map((row, rowi) =>
      state.grid.columns
        .map((column, columni) =>
rowi == 0 && columni == 0 ?
`
<div style="display: grid;grid-template-rows: 1fr 1fr 1fr;border-style: solid;border-width: thin;">
  <input size="3" style="justify-self: center;text-align:center;width: min-content;" id="column-${columni}" value="${column}">
  <input size="3" style="align-self: center;text-align:center;width: min-content;" id="row-${rowi}" value="${row}">
</div>
`
: rowi == 0 ?
`
<div style="text-align: center;border-style: solid;border-width: thin;">
  <input size="3" style="text-align:center;width: min-content;" id="column-${columni}" value="${column}">
</div>
`
: columni == 0 ?
`
<div style="display: grid;align-content: center;border-style: solid;border-width: thin;">
  <input size="3" style="text-align:center;width: min-content;" id="row-${rowi}" value="${row}">
</div>
`
:
`
<div style="border-style: solid;border-width: thin;"></div>
`)
        .join("\n")
    )
    .join("\n")

  document.querySelectorAll("input").forEach(span => span.addEventListener("keypress", updateGridSizes))

  document.querySelector("style").innerHTML =
`#body {
  display: grid;
  grid-template-columns: ${state.grid.columns.join(" ")};
  grid-template-rows:
    ${state.grid.rows.join("\n    ")}
    ;
}
`
}

renderDrawGrid()
