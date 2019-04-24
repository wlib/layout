import state from "./state.mjs"

const format = areas => {
  const longest = []
  for (let i in areas[0]) {
    longest.push(areas.map(row => row[i].id.length).sort((a, b) => b-a)[0])
  }
  return areas.map(row => row.map(({ id }, i) => {
    const trailingSpaces = Array(longest[i] - id.length).fill(" ").join("")
    return id + trailingSpaces
  }))
}

export default () => {
  const finalHTML =
    state.items
      .map(({ id, tag }) => `<${tag} id="${id}"></${tag}>`)
      .join("\n")
  const finalCSS =
`body {
  display: grid;
  grid-template-columns: ${state.grid.columnWidths.join(" ")};
  grid-template-rows:
    ${state.grid.rowHeights.join("\n    ")}
    ;
  grid-template-areas:
    ${format(state.grid.areas)
      .map(row => '"' + row.join(" ") + '"')
      .join("\n    ")}
    ;
}

`
+
state.items.map(({ id }) =>
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