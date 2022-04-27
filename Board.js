class Board {
  board = [];
  selectedCell = undefined;

  constructor() { }

  isFirstPlayerTurn = () => {
    if (countSteps % 2 == 0) {
      return true;
    }
    return false;
  }

  isSecondPlayerTurn = () => {
    if (countSteps % 2 != 0) {
      return true;
    }
    return false;
  }

  isAbleToMove = (cell) => {
    if (this.isFirstPlayerTurn() && cell.piece.color == FIRST_PLAYER_COLOR ||
      this.isSecondPlayerTurn() && cell.piece.color == SECOND_PLAYER_COLOR) {
      return true;
    }
    cell.isAvailable = false;
    cell.updateAvailable();
    alert("not your turn");
    return false;
  }

  getCell = (rowIndex, columnIndex) => {
    return this.board[rowIndex][columnIndex];
  };
  movePiece = (cell) => {
    if (!cell.isEmpty()) {
      if (cell.isOtherPlayerCell) {
        if (cell.piece.name == PIECES.KING) {
          if (confirm("CheckMate, do you want to restart?") == true) {
            location.reload();
          }
          else {
            window.close();
          }
        }
        cell.htmlElement.removeChild(cell.piece.htmlElement);
        cell.piece = undefined;
      }
    }
    const selectedImg = this.selectedCell.piece.htmlElement;
    cell.isAVAILABLE = false;
    cell.piece = Object.assign(this.selectedCell.piece);
    cell.htmlElement.appendChild(selectedImg);
    this.selectedCell.piece = undefined;
    countSteps++;
    if (this.kingIsCheck(cell.piece.getMoves(cell.rowIndex, cell.columnIndex, this))) {
      alert("CHECK");
    }
  };

  kingIsCheck = (moves) => {
    for (let index = 0; index < moves.length; index++) {
      if (!moves[index].isEmpty()) {
        if (moves[index].piece.name == PIECES.KING) {
          return true;
        }
      }
    }
    return false;
  }
  onCellClicked = (cell) => {
    if (!cell.isAvailable) {
      if (this.isAbleToMove(cell)) {
        if (this.selectedCell) {
          //if its not first time
          if (this.selectedCell !== cell) {
            //if cell change
            this.selectedCell.isSelected = false;
            this.selectedCell.updateSelected();
            this.selectedCell = cell;
            console.log(this.selectedCell.piece);
            if (this.selectedCell.piece) {
              const moves = this.selectedCell.piece.getMoves(
                this.selectedCell.rowIndex,
                this.selectedCell.columnIndex,
                this
              );
              this.updateToUnAvailible(relatArray);
              this.colorAllCells(relatArray);
              this.updateToAvailible(moves);
              this.colorAllCells(moves);
              relatArray = [...moves]
            }
            else {
              this.updateToUnAvailible(relatArray);
              this.selectedCell = undefined;
            }
          } else if (this.selectedCell === cell) {
            // if cell cancled
            if (!this.selectedCell.isSelected) {
              this.updateToUnAvailible(relatArray);
              this.selectedCell = undefined;
            }
          }
        } else if (!cell.isEmpty()) {
          // if its first time
          this.selectedCell = cell;
          const moves = this.selectedCell.piece.getMoves(
            this.selectedCell.rowIndex,
            this.selectedCell.columnIndex,
            this
          );
          this.selectedCell.isSelected = true;
          this.selectedCell.updateSelected();
          this.updateToAvailible(moves);
          relatArray = [...moves];
        }
      }
    } else {
      this.movePiece(cell);
      this.updateToUnAvailible(relatArray);
      this.selectedCell.isSelected = false;
      this.selectedCell.updateSelected();
      this.selectedCell = undefined;
    }
    this.colorAllCells(relatArray);
  }

  updateToAvailible(moves) {
    for (let index = 0; index < moves.length; index++) {
      moves[index].isAvailable = true;
    }
  };

  updateToUnAvailible(moves) {
    for (let index = 0; index < moves.length; index++) {
      moves[index].isAvailable = false;
    }
  };

  colorAllCells(moves) {
    for (let index = 0; index < moves.length; index++) {
      moves[index].updateAvailable();
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
      tbody.appendChild(htmlTr);
    }
  }
}