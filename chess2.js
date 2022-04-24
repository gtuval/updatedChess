const PIECES = {
    ROOK: "ROOK",
    KNIGHT: "KNIGHT",
    BISHOP: "BISHOP",
    QUEEN: "QUEEN",
    KING: "KING",
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
      this.name = name;
      this.color = color;
  
      this.createHtmlElement();
    }
  
    createHtmlElement() {
      console.log(`${this.name}_${this.color}`);
      this.htmlElement = document.createElement("img");
      this.htmlElement.setAttribute("id", `${this.name}_${this.color}`);
      this.htmlElement.src = `images/${this.color}_${this.name}.png`;
    }
  
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
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (!upDirection && cell.getPieceColor() !== this.color) {
            upDirection = true;
            moves.push(cell);
          }
        }
        // check right
        if (!rightDirection && rightColumnIndex < ROW_SIZE) {
          const cell = board.getCell(rowIndex, rightColumnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (!rightDirection && cell.getPieceColor() !== this.color) {
            rightDirection = true;
            moves.push(cell);
          }
        }
        //check Down
        if (!downDirection && downRowIndex < ROW_SIZE) {
          const cell = board.getCell(downRowIndex, columnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (!downDirection && cell.getPieceColor() !== this.color) {
            downDirection = true;
            moves.push(cell);
          }
        }
        // check Left
        if (!leftDirection && leftColumnIndex >= 0) {
          const cell = board.getCell(rowIndex, leftColumnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (!leftDirection && cell.getPieceColor() !== this.color) {
            leftDirection = true;
            moves.push(cell);
          }
        }
      }
      return moves;
    };
  }
  
  class Rook extends Piece {
    constructor() {}
  
    getMoves = (rowIndex, columnIndex, board) => {
      this.getStraightMoves(rowIndex, columnIndex, board, ROW_SIZE);
    };
  }
  
  class Cell {
    constructor(
      rowIndex,
      columnIndex,
      isAvailable,
      chessPieceName,
      onCellClicked
    ) {
      this.rowIndex = rowIndex;
      this.columnIndex = columnIndex;
      this.isAvailable = isAvailable;
      this.chessPieceName = chessPieceName;
      this.onCellClicked = onCellClicked;
  
      if (this.chessPieceName) {
        const color = this.getRowColor(this.rowIndex);
        this.piece = new Piece(this.chessPieceName, color);
      }
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
  
    getRowColor = (rowIndex) => {
      if (FIRST_PLAYER_COLOR_ROWS.includes(rowIndex)) {
        return FIRST_PLAYER_COLOR;
      }
      return SECOND_PLAYER_COLOR;
    };
  
    onClick() {
      this.isSelected = !this.isSelected;
      this.updateSelected();
      if (this.onCellClicked) {
        this.onCellClicked(this);
      }
    }
  
    createHtmlElement() {
      this.htmlElement = document.createElement("td");
      if (this.chessPieceName) {
        this.htmlElement.setAttribute(
          `id`,
          `${this.rowIndex}_${this.columnIndex}`
        );
        this.htmlElement.appendChild(this.piece.htmlElement);
        this.htmlElement.onclick = this.onClick;
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
  
    isCellAvailableForMove(rowIndex, columnIndex) {
      const cell = board.getCell(rowIndex, columnIndex);
      if (cell.isEmpty()) {
        return true;
      }
      return false;
    }
  
    isOtherPlayerCell(rowIndex, columnIndex) {
      const cell = board.getCell(rowIndex, columnIndex);
      if (cell.getPieceColor() !== this.getPieceColor()) {
        return true;
      }
      return false;
    }
  
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
  
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (
            !upLeftDirection &&
            cell.getPieceColor() !== this.getPieceColor()
          ) {
            upLeftDirection = true;
            moves.push(cell);
          }
        }
        // check up right
        if (!upRightDirection && upRowIndex >= 0 && rightColumnIndex <= 7) {
          const cell = board.getCell(upRowIndex, rightColumnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (
            !upRightDirection &&
            cell.getPieceColor() !== this.getPieceColor()
          ) {
            upRightDirection = true;
            moves.push(cell);
          }
        }
        // check down right
        if (!downRightDirection && downRowIndex <= 7 && rightColumnIndex <= 7) {
          const cell = board.getCell(downRowIndex, rightColumnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (
            !downRightDirection &&
            cell.getPieceColor() !== this.getPieceColor()
          ) {
            downRightDirection = true;
            moves.push(cell);
          }
        }
        //check down left
        if (!downLeftDirection && downRowIndex <= 7 && rightColumnIndex >= 0) {
          const cell = board.getCell(downRowIndex, leftColumnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          } else if (
            !downLeftDirection &&
            cell.getPieceColor() !== this.getPieceColor()
          ) {
            downLeftDirection = true;
            moves.push(cell);
          }
        }
      }
      return moves;
    }
  }
  
  class Board {
    board = [];
    selectedCell = undefined;
  
    constructor() {}
  
    getCell = (rowIndex, columnIndex) => {
      return this.board[rowIndex][columnIndex];
    };
  
    getChessPieceName = (rowIndex, columnIndex) => {
      if (PAWN_INITIAL_ROWS.includes(rowIndex)) {
        return PIECES.PAWN;
      } else if (PIECES_INITIAL_ROWS.includes(rowIndex)) {
        //Return chess tool according to column index
        return PIECES_ORDER[columnIndex];
      }
    };
  
    onCellClicked = (cell) => {
      if (this.selectedCell) {
        if (this.selectedCell !== cell) {
          this.selectedCell.isSelected = false;
          this.selectedCell.updateSelected();
        }
      }
      this.selectedCell = cell;
      if (this.selectedCell.getMoves2) {
        const moves = this.selectedCell.getMoves2(
          this.selectedCell.rowIndex,
          this.selectedCell.columnIndex,
          this
        );
        console.log({ moves });
      }
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
          const pieceName =
            rowIndex === 5 && columnIndex === 6
              ? PIECES.BISHOP
              : this.getChessPieceName(rowIndex, columnIndex);
          const cell = new Cell(
            rowIndex,
            columnIndex,
            false,
            pieceName,
            this.onCellClicked
          );
          boardRowArray.push(cell);
          htmlTr.appendChild(cell.htmlElement);
        }
        this.board.push(boardRowArray);
        console.log({ boardRowArray });
        table.appendChild(htmlTr);
      }
    }
  }
  
  startGame = () => {
    const board = new Board();
    board.createBoard();

