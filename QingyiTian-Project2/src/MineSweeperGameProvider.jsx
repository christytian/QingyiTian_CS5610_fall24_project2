import { createContext, useContext, useState, useEffect } from "react";

export const MineSweeperContext = createContext();

const DIFFICULTIES = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 30, cols: 16, mines: 99 }
};

export function MineSweeperGameProvider({ children }) {
  // Load saved state from localStorage if available
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem('minesweeperState');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading saved state:', error);
      return null;
    }
  };

  // Initialize state with saved data or defaults
  const [gameBoardState, setGameBoardState] = useState(() => {
    return loadSavedState() || {
      board: [],
      revealed: {},
      mineLocations: {},
      flagged: {},
      difficulty: 'easy',
      isFirstMove: true,
      flagCount: 0
    };
  });

  const [gameOverState, setGameOverState] = useState({
    isOver: false,
    won: false
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('minesweeperState', JSON.stringify(gameBoardState));
  }, [gameBoardState]);

  const placeMines = (firstRow, firstCol, difficulty) => {
    const config = DIFFICULTIES[difficulty];
    const mineLocations = {};
    let minesPlaced = 0;

    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows);
      const col = Math.floor(Math.random() * config.cols);
      const key = `${row}-${col}`;
      
      // Ensure first click and surrounding cells are safe
      const isSafeZone = Math.abs(row - firstRow) <= 1 && Math.abs(col - firstCol) <= 1;
      
      if (!mineLocations[key] && !isSafeZone) {
        mineLocations[key] = true;
        minesPlaced++;
      }
    }
    return mineLocations;
  };

  const initializeBoard = (difficulty) => {
    const config = DIFFICULTIES[difficulty];
    setGameBoardState({
      board: Array(config.rows).fill().map(() => Array(config.cols).fill(0)),
      revealed: {},
      mineLocations: {},
      flagged: {},
      difficulty,
      isFirstMove: true,
      flagCount: 0
    });
    setGameOverState({ isOver: false, won: false });
  };

  const revealCell = (row, col) => {
    if (gameOverState.isOver || gameBoardState.revealed[`${row}-${col}`] || 
        gameBoardState.flagged[`${row}-${col}`]) return;

    let newState = { ...gameBoardState };
    const key = `${row}-${col}`;

    // Handle first move - ensure it's safe
    if (gameBoardState.isFirstMove) {
      const mineLocations = placeMines(row, col, gameBoardState.difficulty);
      const board = calculateBoard(mineLocations, gameBoardState.difficulty);
      newState = {
        ...newState,
        board,
        mineLocations,
        isFirstMove: false
      };
    }

    // Reveal cells (with auto-clear for empty cells)
    const newRevealed = autoRevealCells(row, col, newState);
    newState = { ...newState, revealed: newRevealed };

    // Check win/lose conditions
    if (newState.mineLocations[key]) {
      setGameOverState({ isOver: true, won: false });
    } else if (checkWinCondition(newRevealed, newState)) {
      setGameOverState({ isOver: true, won: true });
    }

    setGameBoardState(newState);
  };

  const toggleFlag = (row, col, event) => {
    event.preventDefault(); // Prevent context menu
    
    if (gameOverState.isOver || gameBoardState.revealed[`${row}-${col}`]) return;

    const key = `${row}-${col}`;
    const newFlagged = { ...gameBoardState.flagged };
    newFlagged[key] = !newFlagged[key];

    setGameBoardState({
      ...gameBoardState,
      flagged: newFlagged,
      flagCount: gameBoardState.flagCount + (newFlagged[key] ? 1 : -1)
    });
  };

  const autoRevealCells = (row, col, state) => {
    const config = DIFFICULTIES[state.difficulty];
    const newRevealed = { ...state.revealed };
    const key = `${row}-${col}`;

    // Base cases: already revealed, out of bounds, or flagged
    if (newRevealed[key] || row < 0 || row >= config.rows || 
        col < 0 || col >= config.cols) {
      return newRevealed;
    }

    // Reveal current cell
    newRevealed[key] = true;

    // If cell is empty (no adjacent mines), reveal neighbors
    if (state.board[row][col] === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          autoRevealCells(row + i, col + j, {
            ...state,
            revealed: newRevealed
          });
        }
      }
    }

    return newRevealed;
  };

  const calculateBoard = (mineLocations, difficulty) => {
    const config = DIFFICULTIES[difficulty];
    return Array(config.rows).fill().map((_, row) =>
      Array(config.cols).fill().map((_, col) => {
        if (mineLocations[`${row}-${col}`]) return -1;
        return countAdjacentMines(row, col, mineLocations, config);
      })
    );
  };

  const countAdjacentMines = (row, col, mineLocations, config) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < config.rows &&
            newCol >= 0 && newCol < config.cols &&
            mineLocations[`${newRow}-${newCol}`]) {
          count++;
        }
      }
    }
    return count;
  };

  const checkWinCondition = (revealed, state) => {
    const config = DIFFICULTIES[state.difficulty];
    const totalCells = config.rows * config.cols;
    const revealedCount = Object.values(revealed).filter(Boolean).length;
    const mineCount = Object.keys(state.mineLocations).length;
    return revealedCount === totalCells - mineCount;
  };

  const contextValue = {
    gameBoardState,
    gameOverState,
    revealCell,
    initializeBoard,
    toggleFlag
  };

  return (
    <MineSweeperContext.Provider value={contextValue}>
      {children}
    </MineSweeperContext.Provider>
  );
}

export const useMinesweeper = () => {
  const context = useContext(MineSweeperContext);
  if (!context) {
    throw new Error("useMinesweeper must be used within MinesweeperGameProvider");
  }
  return context;
};