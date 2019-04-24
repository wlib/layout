import { blankItem } from "./item.mjs"

export default class Grid {
  constructor(columnWidths = ["1fr", "1fr"], rowHeights = ["1fr", "1fr"]) {
    this.columnWidths = columnWidths
    this.rowHeights = rowHeights
    
    const blankGrid = rows => columns =>
      [...Array(rows)]
        .map(_ => [...Array(columns)]
        .map(_ => blankItem))

    this.areas = blankGrid(rowHeights.length)(columnWidths.length)
  }

  // Take a top left cell coordinate + bottom right cell coordinate
  // and then fill every cell in that rectangle (inclusive)
  setArea([startRow, startColumn], [endRow, endColumn], item) {
    return this.areas.map((row, rowi) =>
      row.map((column, columni) =>
        // Test if this cell is within the rectangle
        startRow    <= rowi+1    && rowi+1    <= endRow    &&
        startColumn <= columni+1 && columni+1 <= endColumn
            // Replace the cell or keep it
          ? this.areas[rowi][columni] = item
          : this.areas[rowi][columni]))
  }

  getRow(n) {
    return this.grid.areas[n-1]
  }

  getColumn(n) {
    return this.grid.areas.map(row => row[n-1])
  }


  getRowHeight(n) {
    return this.grid.rowHeights[n-1]
  }

  setRowHeight(n, height) {
    return this.grid.rowHeights[n-1] = height
  }


  getColumnWidth(n) {
    return this.grid.columnWidths[n-1]
  }

  setColumnWidth(n, width) {
    return this.grid.columnWidths[n-1] = width
  }
}
