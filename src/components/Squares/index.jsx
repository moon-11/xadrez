/* eslint-disable react/prop-types */

import black_bishop_png from "../../assets/images/pieces/black_bishop.png";
import black_king_png from "../../assets/images/pieces/black_king.png";
import black_knight_png from "../../assets/images/pieces/black_knight.png";
import black_pawn_png from "../../assets/images/pieces/black_pawn.png";
import black_queen_png from "../../assets/images/pieces/black_queen.png";
import black_rook_png from "../../assets/images/pieces/black_rook.png";
import white_bishop_png from "../../assets/images/pieces/white_bishop.png";
import white_king_png from "../../assets/images/pieces/white_king.png";
import white_knight_png from "../../assets/images/pieces/white_knight.png";
import white_pawn_png from "../../assets/images/pieces/white_pawn.png";
import white_queen_png from "../../assets/images/pieces/white_queen.png";
import white_rook_png from "../../assets/images/pieces/white_rook.png";

export function Square({ color, piece, onClick }) {
  let SquareColor = "black";
  let cursor = "default";

  if (typeof color === "object") {
    SquareColor = color[1];
    cursor = "pointer";
  } else {
    switch (color) {
      case "escura":
        SquareColor = "#569691";
        break;
      case "clara":
        SquareColor = "#EEEED2";
        break;
      case "ativa":
        SquareColor = "rgba(151, 128, 204, 0.774)";
        cursor = "pointer";
        break;
      case "newSquare":
        SquareColor = "rgb(180, 184, 0)";
        cursor = "pointer";
        break;
      default:
        console.error("unexpected square color value");
    }
  }

  const estilo = {
    backgroundColor: SquareColor,
    width: "60px",
    height: "60px",
    border: "0px solid black",
    cursor: cursor,
  };

  const imageToPiece = (piece) => {
    const blackPieces = {
      pawn: black_pawn_png,
      rook: black_rook_png,
      knight: black_knight_png,
      bishop: black_bishop_png,
      queen: black_queen_png,
      king: black_king_png,
    };

    const whitePieces = {
      pawn: white_pawn_png,
      rook: white_rook_png,
      knight: white_knight_png,
      bishop: white_bishop_png,
      queen: white_queen_png,
      king: white_king_png,
    };

    if (piece !== undefined) {
      const [color, type] = piece.split("_");
      return color === "white" ? whitePieces[type] : blackPieces[type];
    }
  };

  const pieceImage = imageToPiece(piece);

  if (color[0] === "possible_moviment_square") {
    if (piece !== undefined && piece !== 0) {
      return (
        <div style={estilo} className="Square" onClick={onClick}>
          <img src={pieceImage} alt={piece} />
        </div>
      );
    } else if (piece === undefined) {
      return (
        <div style={estilo} className="Square" onClick={onClick}>
          <div className="PossibleMoviments"></div>
        </div>
      );
    }
  } else if (piece !== undefined && piece !== 0) {
    return (
      <div style={estilo} className="Square" onClick={onClick}>
        <div className="containerImg">
          <img src={pieceImage} alt={piece} />
        </div>
      </div>
    );
  } else {
    return <div style={estilo} className="Square" onClick={onClick}></div>;
  }
}


