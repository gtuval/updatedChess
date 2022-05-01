const PIECES = {
  ROOK: "ROOK",
  KNIGHT: "KNIGHT",
  BISHOP: "BISHOP",
  QUEEN: "QUEEN",
  KING: "KING",
  PAWN: "PAWN",
};
let countSteps = 0;
const COLORS = {
  NOT_AVAILABLE: "",
  AVAILABLE: "#def2c4",
  SELECTED: "#ffe4ab",
  WHITE: "white",
  BLACK: "black",
};
let relatArray = [];
const ROW_SIZE = 8;
const PIECES_ORDER = [
  PIECES.ROOK,
  PIECES.KNIGHT,
  PIECES.BISHOP,
  PIECES.KING,
  PIECES.QUEEN,
  PIECES.BISHOP,
  PIECES.KNIGHT,
  PIECES.ROOK,
];
let whiteRookCountSteps=0;
let BlackRookCountSteps=0;
let WhiteKingCountSteps=0;
let BlackKingCountSteps=0;
const PAWN_INITIAL_ROWS = [1, 6];
const PIECES_INITIAL_ROWS = [0, 1, 6, 7];
const FIRST_PLAYER_COLOR_ROWS = [0, 1];
const FIRST_PLAYER_COLOR = COLORS.WHITE;
const SECOND_PLAYER_COLOR =
  FIRST_PLAYER_COLOR === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK;
const STEPS = {
  WHITE: FIRST_PLAYER_COLOR === COLORS.WHITE ? 1 : -1,
  BLACK: FIRST_PLAYER_COLOR === COLORS.BLACK ? 1 : -1,
};

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
        return new Bishop(color);
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