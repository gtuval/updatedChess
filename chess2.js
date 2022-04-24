const PIECES = {
  ROOK: "ROOK",
  KNIGHT: "KNIGHT",
  BISHOP: "BISHOP",
  KING: "KING",
  QUEEN: "QUEEN",
  PAWN: "PAWN",
};

const COLORS = {
  NOT_AVAILABLE: "",
  AVAILABLE: "#def2c4",
  SELECTED: "#ffe4ab",
  WHITE: "white",
  BLACK: "black",
};

const ROW_SIZE = 8;
const PIECES_ORDER = [
  PIECES.ROOK,
  PIECES.KNIGHT,
  PIECES.BISHOP,
  PIECES.QUEEN,
  PIECES.KING,
  PIECES.BISHOP,
  PIECES.KNIGHT,
  PIECES.ROOK,
];

const PAWN_INITIAL_ROWS = [1, 6];
const PIECES_INITIAL_ROWS = [0, 1, 6, 7];
const FIRST_PLAYER_COLOR_ROWS = [0, 1];
const FIRST_PLAYER_COLOR = COLORS.WHITE;
const SECOND_PLAYER_COLOR =
  FIRST_PLAYER_COLOR === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK;

class Piece {
  constructor(name, color) {
    console.log({ name, color });
    this.name = name;
    this.color = color;

    this.createHtmlElement();
  }

  createHtmlElement() {
    this.htmlElement = document.createElement("img");
    this.htmlElement.setAttribute("id", `${this.name}_${this.color}`);
    this.htmlElement.src = `images/${this.color}_${this.name}.png`;
  }

  checkOptions = (cell, moves, direction) => {
    if (cell.isEmpty()) {
      moves.push(cell);
    } else if (!direction && cell.getPieceColor() !== this.color) {
      direction = true;
      moves.push(cell);
    }
  };

  getStraightMoves = (rowIndex, columnIndex, board, maxMoves) => {
    const moves = [];
    let upDirection = false;
    let downDirection = false;
    let leftDirection = false;
    let rightDirection = false;

    for (let index = 1; index <= maxMoves; index++) {
      const upRowIndex = rowIndex - index;
      const downRowIndex = rowIndex + index;
      const leftColumnIndex = columnIndex - index;
      const rightColumnIndex = columnIndex + index;

      //check Up
      if (!upDirection && upRowIndex >= 0) {
        const cell = board.getCell(upRowIndex, columnIndex);
        this.checkOptions(cell, moves, upDirection);
      }
      // check right
      if (!rightDirection && rightColumnIndex < ROW_SIZE) {
        const cell = board.getCell(rowIndex, rightColumnIndex);
        this.checkOptions(cell, moves, rightDirection);
      }
      //check Down
      if (!downDirection && downRowIndex < ROW_SIZE) {
        const cell = board.getCell(downRowIndex, columnIndex);
        this.checkOptions(cell, moves, downDirection);
      }
      // check Left
      if (!leftDirection && leftColumnIndex >= 0) {
        const cell = board.getCell(rowIndex, leftColumnIndex);
        this.checkOptions(cell, moves, leftDirection);
      }
    }
    return moves;
  };
  getDiagonalMoves(rowIndex, columnIndex, board, maxMoves) {
    const moves = [];
    let upLeftDirection = false;
    let downLeftDirection = false;
    let upRightDirection = false;
    let downRightDirection = false;

    for (let index = 1; index < maxMoves; index++) {
      const upRowIndex = rowIndex - index;
      const downRowIndex = rowIndex + index;
      const leftColumnIndex = columnIndex - index;
      const rightColumnIndex = columnIndex + index;
      //check up Left
      if (!upLeftDirection && upRowIndex >= 0 && leftColumnIndex >= 0) {
        const cell = board.getCell(upRowIndex, leftColumnIndex);
        this.checkOptions(cell, moves, upLeftDirection);
      }
      // check up right
      if (!upRightDirection && upRowIndex >= 0 && rightColumnIndex <= 7) {
        const cell = board.getCell(upRowIndex, rightColumnIndex);
        this.checkOptions(cell, moves, upRightDirection);
      }
      // check down right
      if (!downRightDirection && downRowIndex <= 7 && rightColumnIndex <= 7) {
        const cell = board.getCell(downRowIndex, rightColumnIndex);
        this.checkOptions(cell, moves, downRightDirection);
      }
      //check down left
      if (!downLeftDirection && downRowIndex <= 7 && rightColumnIndex >= 0) {
        const cell = board.getCell(downRowIndex, leftColumnIndex);
        this.checkOptions(cell, moves, downLeftDirection);
      }
    }
    return moves;
  }

  getMoves(rowIndex, columnIndex, board) {
    const knight = new Knight();
    knight.getMoves(rowIndex, columnIndex, board);
  }
}

class Rook extends Piece {
  constructor(color) {
    super(PIECES.ROOK, color);
  }

  getMoves = (rowIndex, columnIndex, board) => {
    return this.getStraightMoves(rowIndex, columnIndex, board, ROW_SIZE);
  };
}

class Bishop extends Piece {
  constructor(color) {
    super(PIECES.BISHOP, color);
  }

  getMoves = (rowIndex, columnIndex, board) => {
    return this.getDiagonalMoves(rowIndex, columnIndex, board, ROW_SIZE);
  };
}

class Queen extends Piece {
  constructor(color) {
    super(PIECES.QUEEN, color);
  }

  getMoves = (rowIndex, columnIndex, board) => {
    return this.getDiagonalMoves(rowIndex, columnIndex, board, ROW_SIZE).concat(
      this.getStraightMoves(rowIndex, columnIndex, board, ROW_SIZE)
    );
  };
}

class King extends Piece {
  constructor(color) {
    super(PIECES.KING, color);
  }

  getMoves = (rowIndex, columnIndex, board) => {
    return this.getDiagonalMoves(rowIndex, columnIndex, board, 2).concat(
      this.getStraightMoves(rowIndex, columnIndex, board, 2)
    );
  };
}

class Pawn extends Piece {
  constructor(color) {
    super(PIECES.PAWN, color);
  }

  createHtmlElement() {
    this.htmlElement = document.createElement("img");
    this.htmlElement.setAttribute("id", `${this.name}_${this.color}`);
    this.htmlElement.src = `images/${this.color}_${this.name}.png`;
  }
  getMoves(rowIndex, columnIndex, board) {
    const moves = [];
    let cell = board.getCell(rowIndex, columnIndex);
    if (cell.piece.color == FIRST_PLAYER_COLOR) {
      if (rowIndex + 1 <= 7) {
        cell = board.getCell(rowIndex + 1, columnIndex);
        if (cell.isEmpty()) {
          moves.push(cell);
        }
        if (columnIndex + 1 <= 7) {
          cell = board.getCell(rowIndex + 1, columnIndex + 1);
          if (cell.piece.color !== this.color) {
            moves.push(cell);
          }
        }
        if (columnIndex - 1 >= 0) {
          cell = board.getCell(rowIndex + 1, columnIndex + -1);
          if (cell.piece.color !== this.color) {
            moves.push(cell);
          }
        }
      }
    }
    else {
      if (rowIndex - 1 >= 0) {
        cell = board.getCell(rowIndex - 1, columnIndex);
        if (cell.isEmpty()) {
          moves.push(cell);
        }
        if (columnIndex + 1 <= 7) {
          cell = board.getCell(rowIndex - 1, columnIndex + 1);
          if (cell.getPieceColor() !== this.color) {
            moves.push(cell);
          }
        }
        if (columnIndex - 1 >= 0) {
          cell = board.getCell(rowIndex - 1, columnIndex + -1);
          if (cell.getPieceColor() !== this.color) {
            moves.push(cell);
          }
        }
      }
    }
  }
}


class Knight extends Piece {
  constructor(color) {
    super(PIECES.KNIGHT, color);
  }

  inBoard(rowIndex, columnIndex) {
    if (
      rowIndex >= 0 &&
      rowIndex <= 7 &&
      columnIndex >= 0 &&
      columnIndex <= 7
    ) {
      return true;
    }
    return false;
  }
  getMoves(rowIndex, columnIndex, board) {
    const row2 = rowIndex + 2;
    const row_2 = rowIndex - 2;
    const row1 = rowIndex + 1;
    const row_1 = rowIndex - 1;
    const col1 = columnIndex + 1;
    const col_1 = columnIndex - 1;
    const col2 = columnIndex + 2;
    const col_2 = columnIndex - 2;
    const moves = [];
    let cell = board.getCell(rowIndex, columnIndex);
    if (this.inBoard(row_2, col1)) {
      cell = board.getCell(row_2, col1);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }

    if (this.inBoard(row_2, col_1)) {
      cell = board.getCell(row_2, col_1);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row_1, col2)) {
      cell = board.getCell(row_1, col2);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row_1, col_2)) {
      cell = board.getCell(row_1, col_2);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row2, col1)) {
      cell = board.getCell(row2, col1);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row2, col_1)) {
      cell = board.getCell(row2, col_1);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row1, col2)) {
      cell = board.getCell(row1, col2);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    if (this.inBoard(row1, col_2)) {
      cell = board.getCell(row1, col_2);
      if (cell.isEmpty()) {
        moves.push(cell);
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
      }
    }
    return moves;
  }
}

class Cell {
  constructor(rowIndex, columnIndex, isAvailable, piece, onCellClicked) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.isAvailable = isAvailable;
    this.piece = piece;
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
    console.log(this);
    return this.piece.color;
  }

  onClick() {
    this.isSelected = !this.isSelected;
    this.updateSelected();
    if (this.onCellClicked) {
      this.onCellClicked(this);
    }
  }

  createHtmlElement() {
    this.htmlElement = document.createElement("td");
    if (this.piece) {
      this.htmlElement.setAttribute(
        `id`,
        `${this.rowIndex}_${this.columnIndex}`
      );
      this.htmlElement.appendChild(this.piece.htmlElement);
      this.htmlElement.onclick = () => this.onClick();
    }
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

class Board {
  board = [];
  selectedCell = undefined;

  constructor() {}

  getCell = (rowIndex, columnIndex) => {
    return this.board[rowIndex][columnIndex];
  };

  onCellClicked = (cell) => {
    if (this.selectedCell) {
      if (this.selectedCell !== cell) {
        this.selectedCell.isSelected = false;
        this.selectedCell.updateSelected();
      }
    }
    this.selectedCell = cell;
    const moves = this.selectedCell.piece.getMoves(
      this.selectedCell.rowIndex,
      this.selectedCell.columnIndex,
      this
    );
    console.log({ moves });
  };

  createBoard() {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    document.body.appendChild(table);

    for (let rowIndex = 0; rowIndex < ROW_SIZE; rowIndex++) {
      let htmlTr = document.createElement("tr");
      const boardRowArray = [];
      for (let columnIndex = 0; columnIndex < ROW_SIZE; columnIndex++) {
        const pieceFactory = PieceFactory();
        const piece = pieceFactory.createPiece(rowIndex, columnIndex);
        const cell = new Cell(
          rowIndex,
          columnIndex,
          false,
          piece,
          this.onCellClicked
        );
        boardRowArray.push(cell);
        htmlTr.appendChild(cell.htmlElement);
      }
      this.board.push(boardRowArray);
      console.log({ boardRowArray });
      tbody.appendChild(htmlTr);
    }
  }
}

const PieceFactory = () => {
  getChessPieceName = (rowIndex, columnIndex) => {
    if (PAWN_INITIAL_ROWS.includes(rowIndex)) {
      return PIECES.PAWN;
    } else if (PIECES_INITIAL_ROWS.includes(rowIndex)) {
      //Return chess tool according to column index
      return PIECES_ORDER[columnIndex];
    }
  };

  getRowColor = (rowIndex) => {
    if (FIRST_PLAYER_COLOR_ROWS.includes(rowIndex)) {
      return FIRST_PLAYER_COLOR;
    }
    return SECOND_PLAYER_COLOR;
  };

  createPiece = (rowIndex, columnIndex) => {
    const pieceName = this.getChessPieceName(rowIndex, columnIndex);
    if (!pieceName) {
      return undefined;
    }
    const color = this.getRowColor(rowIndex);
    switch (pieceName.toUpperCase()) {
      case PIECES.BISHOP:
        return new Piece(PIECES.BISHOP, color);
      case PIECES.KING:
        return new King(color);
      case PIECES.KNIGHT:
        return new Knight(color);
      case PIECES.PAWN:
        return new Pawn(color);
      case PIECES.QUEEN:
        return new Queen(color);
      case PIECES.ROOK:
        return new Rook(color);
      default:
        return undefined;
    }
  };

  return {
    createPiece,
  };
};

startGame = () => {
  const board = new Board();
  board.createBoard();
};