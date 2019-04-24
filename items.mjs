export default class Items extends Array {
  constructor(items = []) {
    super()
    items.map(this.addItem.bind(this))
  }

  addItem(item) {
    if (this.find(({ id }) => id == item.id)) {
      throw Error(`Item id "${item.id}" already in use`)
    } else {
      this.push(item)
    }
  }
}
