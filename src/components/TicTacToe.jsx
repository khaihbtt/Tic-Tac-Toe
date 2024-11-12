import React, { useState, useEffect } from 'react';
import Board from './board';
import GameOver from './gameOver';
import Reset from './Reset';
import GameState from './GameState';

const PLAYER_X = "X"; // Người chơi
const PLAYER_O = "O"; // Máy (AI)

const winningCombinations = [
  // Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  // Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  // Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

// Hàm kiểm tra thắng thua
function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const [tileValue1, tileValue2, tileValue3] = combo.map(index => tiles[index]);
    if (tileValue1 && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
      setStrikeClass(strikeClass);
      setGameState(tileValue1 === PLAYER_X ? GameState.playerXWin : GameState.playerOWin);
      return;
    }
  }

  const allTilesFilled = tiles.every(tile => tile !== null);
  if (allTilesFilled) {
    setGameState(GameState.draw);
  }
}

// Hàm AI đơn giản cho máy chơi
function aiMove(tiles) {
  const emptyIndices = tiles.reduce((acc, tile, index) => {
    if (tile === null) acc.push(index);
    return acc;
  }, []);

  // Chọn ngẫu nhiên một ô trống
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  return randomIndex;
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X); // Người chơi X bắt đầu
  const [strikeClass, setStrikeClass] = useState(null);
  const [gameState, setGameState] = useState(GameState.inProgress);

  // Hàm xử lý người chơi và máy
  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress || tiles[index] !== null || playerTurn !== PLAYER_X) return;

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    setPlayerTurn(PLAYER_O); // Đến lượt máy chơi
  };

  // Hàm cho máy chơi
  const handleAiMove = () => {
    if (gameState === GameState.inProgress && playerTurn === PLAYER_O) {
      const move = aiMove(tiles);
      const newTiles = [...tiles];
      newTiles[move] = PLAYER_O;
      setTiles(newTiles);
      setPlayerTurn(PLAYER_X); // Đến lượt người chơi
    }
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
    if (playerTurn === PLAYER_O) {
      handleAiMove(); // Máy chơi ngay sau khi người chơi đánh
    }
  }, [tiles, playerTurn]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board tiles={tiles} onTileClick={handleTileClick} playerTurn={playerTurn} strikeClass={strikeClass} />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
