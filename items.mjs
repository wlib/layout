export default class Items extends Array {
  constructor(...args) {
    super(...args)
  }

  addItem(item) {
    if (this.find(({ id }) => id == item.id)) {
      throw Error(`Item id "${item.id}" already in use`)
    } else {
      this.push(item)
    }
  }
}
