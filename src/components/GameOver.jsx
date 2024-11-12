import GameState from "./GameState";

function GameOver({gameState}) {
    switch (gameState) {
        case GameState.inProgress:
            return<></>;
        case GameState.playerOWin:
            return <div className="game-over"> O win</div>;
        case GameState.playerXWin:
            return <div className="game-over"> X win</div>;
        case GameState.draw:
            return <div className="game-over"> Draw</div>;
        default: 
            return<></>;
    }
}

export default GameOver;