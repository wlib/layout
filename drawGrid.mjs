import state from "./state.mjs"

export default () => {
  document.querySelector("#display-body").innerHTML =
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
`#display-body {
  display: grid;
  grid-template-columns: ${state.grid.columns.join(" ")};
  grid-template-rows:
    ${state.grid.rows.join("\n    ")}
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