
import Board from "../../components/Board/index";

export default function Home() {
  const buttonDiv = (
    <div className="btn_reset">
      <a href="/" className="btn">
        <span className="text">RESET</span>
        <span className="flip-front">RESET ?</span>
        <span className="flip-back">RESET !</span>
      </a>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="container_checkMate">
          <div className="checkMate">
            <h1>Xeque Mate</h1>
            {buttonDiv}
          </div>
        </div>
        <Board />
        {buttonDiv}
      </div>
    </div>
  );
}

