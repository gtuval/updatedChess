class Piece {
    constructor(name, color) {
      this.name = name;
      this.color = color;
      this.createHtmlElement();
    }
  
    createHtmlElement() {
      this.htmlElement = document.createElement("img");
      this.htmlElement.setAttribute("id", `${this.name}_${this.color}`);
      this.htmlElement.src = `images/${this.color}_${this.name}.png`;
      return this.htmlElement;
    }
  
    checkOptions = (cell, moves) => {
      if (cell.isEmpty()) {
        moves.push(cell);
        return false;
      } else if (cell.getPieceColor() !== this.color) {
        moves.push(cell);
        return true;
      }
      return true;
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
          upDirection = this.checkOptions(cell, moves);
        }
        // check right
        if (!rightDirection && rightColumnIndex < ROW_SIZE) {
          const cell = board.getCell(rowIndex, rightColumnIndex);
          rightDirection = this.checkOptions(cell, moves);
        }
        //check Down
        if (!downDirection && downRowIndex < ROW_SIZE) {
          const cell = board.getCell(downRowIndex, columnIndex);
          downDirection = this.checkOptions(cell, moves);
        }
        // check Left
        if (!leftDirection && leftColumnIndex >= 0) {
          const cell = board.getCell(rowIndex, leftColumnIndex);
          leftDirection = this.checkOptions(cell, moves);
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
          upLeftDirection = this.checkOptions(cell, moves);
        }
        // check up right
        if (!upRightDirection && upRowIndex >= 0 && rightColumnIndex <= 7) {
          const cell = board.getCell(upRowIndex, rightColumnIndex);
          upRightDirection = this.checkOptions(cell, moves);
        }
        // check down right
        if (!downRightDirection && downRowIndex <= 7 && rightColumnIndex <= 7) {
          const cell = board.getCell(downRowIndex, rightColumnIndex);
          downRightDirection = this.checkOptions(cell, moves);
        }
        //check down left
        if (!downLeftDirection && downRowIndex <= 7 && leftColumnIndex >= 0) {
          const cell = board.getCell(downRowIndex, leftColumnIndex);
          downLeftDirection = this.checkOptions(cell, moves);
        }
      }
      return moves;
    }
  
    getMoves(rowIndex, columnIndex, board) {
      throw Error("BASE PIECE GET MOVES");
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
      const diag = this.getDiagonalMoves(rowIndex, columnIndex, board, ROW_SIZE);
      const strg = this.getStraightMoves(rowIndex, columnIndex, board, ROW_SIZE);
      console.log({ diag, strg });
      return diag.concat(strg);
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
    getMoves(rowIndex, columnIndex, board) {
      const moves = [];
      let cell = board.getCell(rowIndex, columnIndex);
      if (cell.piece.color == FIRST_PLAYER_COLOR) {
        if (rowIndex + 1 <= 7) {
          cell = board.getCell(rowIndex + 1, columnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          }
          if (rowIndex == 1) {
            cell = board.getCell(rowIndex + 2, columnIndex);
            if (cell.isEmpty()) {
              moves.push(cell);
            }
          }
          if (columnIndex + 1 <= 7) {
            cell = board.getCell(rowIndex + 1, columnIndex + 1);
            if (!cell.isEmpty()) {
              if (cell.isOtherPlayerCell(rowIndex, columnIndex, board)) {
                moves.push(cell);
              }
            }
          }
          if (columnIndex - 1 >= 0) {
            cell = board.getCell(rowIndex + 1, columnIndex - 1);
            if (!cell.isEmpty()) {
              if (cell.isOtherPlayerCell(rowIndex, columnIndex, board)) {
                moves.push(cell);
              }
            }
          }
        }
      } else {
        if (rowIndex - 1 >= 0) {
          cell = board.getCell(rowIndex - 1, columnIndex);
          if (cell.isEmpty()) {
            moves.push(cell);
          }
          if (rowIndex == 6) {
            cell = board.getCell(rowIndex - 2, columnIndex);
            if (cell.isEmpty()) {
              moves.push(cell);
            }
          }
          if (columnIndex + 1 <= 7) {
            cell = board.getCell(rowIndex - 1, columnIndex + 1);
            if (!cell.isEmpty()) {
              if (cell.isOtherPlayerCell(rowIndex, columnIndex, board)) {
                moves.push(cell);
              }
            }
          }
          if (columnIndex - 1 >= 0) {
            cell = board.getCell(rowIndex - 1, columnIndex - 1);
            if (!cell.isEmpty()) {
              if (cell.isOtherPlayerCell(rowIndex, columnIndex, board)) {
                moves.push(cell);
              }
            }
          }
        }
      }
      console.log({ moves });
      return moves;
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