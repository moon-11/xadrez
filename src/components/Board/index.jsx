import { useEffect, useState } from "react";
import _ from "underscore";
import { create_fen, fen_analyzer as putPiecesOnBoard } from "../Fen/index.jsx";
import Game from "../Game/index.jsx";
import { MainMovePiece } from "../MovePieces/index.jsx";
import { Square } from "../Squares/index.jsx";
import "../style.css";

const game = new Game();

function Board() {
  const [positions, setPositions] = useState([[], [], [], [], [], [], [], []]);
  const [currentFen, setCurrentFen] = useState(game.currentFen);
  const [activeSquare, setActiveSquare] = useState([undefined, undefined]);
  const [lastSquare, setLastSquare] = useState([undefined, undefined]);
  const [newSquare, setNewSquare] = useState([undefined, undefined]);
  const [possibleMovements, setPossibleMovements] = useState([]);

  useEffect(() => {
    setPositions(putPiecesOnBoard(currentFen));
  }, [currentFen]);

  function createSquares(numberLine) {
    let line = positions[numberLine];

    for (let i = 0; i < 8; i++) {
      line[i] = line[i] === undefined ? undefined : line[i];
    }

    function setSquareColor(color, piece, numberLine, index) {
      const isActive = piece !== undefined && _.isEqual(activeSquare, [numberLine, index]);
      const isNewSquare = piece !== undefined && _.isEqual(newSquare, [numberLine, index]);
      const isLastSquare = piece === undefined && _.isEqual(lastSquare, [numberLine, index]);

      if (isActive || isLastSquare || isNewSquare) {
        for (let i = 0; i < possibleMovements.length; i++) {
          if (numberLine === possibleMovements[i][0] && index === possibleMovements[i][1]) {
            return ["possible_moviment_square", "rgb(126, 0, 184)"];
          }
        }

        return "ativa";
      } else {
        for (let i = 0; i < possibleMovements.length; i++) {
          if (numberLine === possibleMovements[i][0] && index === possibleMovements[i][1]) {
            return ["possible_moviment_square", color];
          }
        }
        return color;
      }
    }

    return line.map((piece, index) => {
      let color = "";

      if (numberLine % 2 === 0) {
        color = index % 2 === 0 ? "clara" : "escura";
        color = setSquareColor(color, piece, numberLine, index);
      } else {
        color = index % 2 !== 0 ? "clara" : "escura";
        color = setSquareColor(color, piece, numberLine, index);
      }

      return (
        <Square
          key={index}
          color={color}
          piece={piece}
          onClick={() => handleClick(piece, numberLine, index)}
        />
      );
    });
  }

  function handleClick(piece, numberLine, index) {
    const [newActiveSquare, newLastSquare, newSquare, newPositions, newPossibleMovements] = MainMovePiece(
      piece,
      numberLine,
      index,
      positions,
      currentFen
    );
    const newFEN = create_fen(newPositions);

    setPositions(newPositions);
    setCurrentFen(newFEN);
    setActiveSquare(newActiveSquare);
    setNewSquare(newSquare);
    setLastSquare(newLastSquare);
    setPossibleMovements(newPossibleMovements);
  }

  const content = Array(8)
    .fill(undefined)
    .map((_, index) => (
      <div className="line" key={index}>
        {createSquares(index)}
      </div>
    ));

  return <div className="board">{content}</div>;
}

export default Board;
