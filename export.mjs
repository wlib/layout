import state from "./state.mjs"

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

export default () => {
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