class Cell {
  constructor(rowIndex, columnIndex, isAvailable, piece, onCellClicked) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.isAvailable = isAvailable;
    this.onCellClicked = onCellClicked;
    this.piece = piece;
    this.createHtmlElement();
  }
  isEmpty() {
    if (this.piece) {
      return false;
    }
    return true;
  }

  getPieceColor() {
    return this.piece.color;
  }

  onClick() {
    if (this.piece) {
      this.isSelected = !this.isSelected;
      this.updateSelected();
    }
    if (this.onCellClicked) {
      this.onCellClicked(this);
    }
  }

  createHtmlElement() {
    this.htmlElement = document.createElement("td");
    this.htmlElement.setAttribute(
      `id`,
      `${this.rowIndex}_${this.columnIndex}`
    );
    if (this.piece) {
      this.htmlElement.appendChild(this.piece.htmlElement);
    }
    this.htmlElement.onclick = () => this.onClick();
    return this.htmlElement;
  }

  updateSelected() {
    if (this.isSelected) {
      this.htmlElement.style.backgroundColor = COLORS.SELECTED;
    } else {
      this.htmlElement.style.backgroundColor = COLORS.NOT_AVAILABLE;
    }
  }

  updateAvailable() {
    if (this.isAvailable) {
      //If cell available for move change background color to green
      this.htmlElement.style.backgroundColor = COLORS.AVAILABLE;
    } else {
      this.htmlElement.style.backgroundColor = COLORS.NOT_AVAILABLE;
    }
  }

  isCellAvailableForMove(rowIndex, columnIndex, board) {
    const cell = board.getCell(rowIndex, columnIndex);
    if (cell.isEmpty()) {
      return true;
    }
    return false;
  }

  isOtherPlayerCell(rowIndex, columnIndex, board) {
    const cell = board.getCell(rowIndex, columnIndex);
    if (cell.getPieceColor() !== this.getPieceColor()) {
      return true;
    }
    return false;
  }
}