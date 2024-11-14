import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMinesweeper } from './MineSweeperGameProvider';
import MineCell from './MineCell';
import Navigation from './Navigation';

export default function MineSweeperGame() {
    const { difficulty } = useParams();
    const navigate = useNavigate();
    const { gameBoardState, gameOverState, revealCell, initializeBoard, toggleFlag } = useMinesweeper();
    const { board, revealed, flagged } = gameBoardState;
  
    useEffect(() => {
      if (difficulty) {
        initializeBoard(difficulty);
      }
    }, [difficulty]);
  
    const handleReset = () => {
      initializeBoard(difficulty);
    };
  
    const handlePlayAgain = () => {
      initializeBoard(difficulty);
    };
  
    const returnHome = () => {
      navigate('/');
    };
  
    const renderBoard = () => {
      let rowComponents = [];
      
      for (let i = 0; i < board.length; i++) {
        const singleRowComponent = [];
        for (let j = 0; j < board[i].length; j++) {
          const key = `${i}-${j}`;
          singleRowComponent.push(
            <MineCell
              key={key}
              row={i}
              col={j}
              value={board[i][j]}
              isRevealed={revealed[key]}
              isFlagged={flagged[key]}
              onLeftClick={revealCell}
              onRightClick={toggleFlag}
            />
          );
        }
        rowComponents.push(
          <div key={i} className="board-row">
            {singleRowComponent}
          </div>
        );
      }
      
      return rowComponents;
    };
  
    return (
      <div>
        <Navigation />
        <div className="game-container">
          <div className="game-header">
            <h2 className="game-title">
              Minesweeper - {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
            </h2>
            <div className="game-controls">
              <button
                className="reset-button"
                onClick={handleReset}
              >
                Reset Game
              </button>
            </div>
          </div>
  
          {gameOverState.isOver && (
            <div className={`game-status ${gameOverState.won ? 'status-win' : 'status-lose'}`}>
              <div className="game-over-message">
                Game over! You {gameOverState.won ? "won!" : "lost!"}
              </div>
              <div className="game-over-buttons">
                <button 
                  className="play-again-button"
                  onClick={handlePlayAgain}
                >
                  Play Again
                </button>
                <button 
                  className="return-home-button"
                  onClick={returnHome}
                >
                  Return Home
                </button>
              </div>
            </div>
          )}
  
          <div className="game-board" onContextMenu={(e) => e.preventDefault()}>
            {renderBoard()}
          </div>
        </div>
      </div>
    );
}