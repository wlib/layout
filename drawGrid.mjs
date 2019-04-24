import state from "./state.mjs"

export default () => {
  document.querySelector("#display-body").innerHTML =
    state.grid.areas.map((row, rowi) =>
      row.map((item, columni) =>
        item.isBlank
          ? `<div data-row="${rowi+1}" data-column="${columni+1}"> <div>[Blank]</div> </div>`
          : `<div data-row="${rowi+1}" data-column="${columni+1}" style="background-color: ${item.color};"> <div>${item.id}</div> </div>`
      ).join("\n")
    ).join("\n")

  document.querySelector("style").innerHTML =
`#display-body {
  display: grid;
  grid-template-columns: ${state.grid.columnWidths.join(" ")};
  grid-template-rows:
    ${state.grid.rowHeights.join("\n    ")}
    ;
}

#display-body > div {
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

#display-body > div > div {
  grid-row: 2;
  grid-column: 2;
  justify-self: center;
  align-self: center;
}`
}