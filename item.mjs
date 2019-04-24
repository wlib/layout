export const blankItem = {
  isBlank: true,
  id: ".",
  tag: undefined
}

export const Item = (id, tag) => ({
  isBlank: false,
  id,
  tag,
  color: `hsl(${Math.random() * 360}, 85%, 75%)`
})
