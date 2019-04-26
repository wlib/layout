export const blankItem = {
  isBlank: true,
  id: ".",
  tag: undefined
}

const rand = (min = 0, max = 1) =>
  crypto.getRandomValues(new Uint8Array(1))[0]/256 * (max - min + 1) + min

export const Item = (id, tag) => ({
  isBlank: false,
  id,
  tag,
  color: `hsl(${rand(0, 360)}, ${rand(70, 100)}%, ${rand(60, 85)}%)`
})
