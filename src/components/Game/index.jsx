export default function createGame() {
  let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq";
  let piecePositions = [[], [], [], [], [], [], [], []];

  return {
    get currentFen() {
      return fen;
    },

    set currentFen(newCurrentFen) {
      fen = newCurrentFen;
    },

    get piecePositions() {
      return piecePositions;
    },

    set piecePositions(newPositions) {
      piecePositions = newPositions;
    }
  };
}

