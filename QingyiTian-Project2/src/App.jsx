import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MinesweeperGameProvider } from './MineSweeperGameProvider';
import Game from './MineSweeperGame';
import Rules from './Rules';
import { FaGamepad, FaHome, FaBoo, FaBomb, FaFlag } from 'react-icons/fa';
import './App.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to Minesweeper</h1>
    <p className="home-subtitle">
      Challenge yourself with the classic game of logic and luck!
    </p>
    <div className="home-buttons">
      <Link to="/game/easy" className="difficulty-btn easy">
        Play Easy
      </Link>
      <Link to="/game/medium" className="difficulty-btn medium">
        Play Medium
      </Link>
      <Link to="/game/hard" className="difficulty-btn hard">
        Play Hard
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <MinesweeperGameProvider>
        <div className="app-container">
          <nav className="nav-container">
            <div className="nav-content">
              <Link to="/" className="nav-brand">
                <FaGamepad />
                Minesweeper
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  <FaHome />
                  Home
                </Link>
                <Link to="/rules" className="nav-link">
                  <FaBook />
                  Rules
                </Link>
                <div className="difficulty-links">
                  <Link to="/game/easy" className="difficulty-btn easy">
                    Easy
                  </Link>
                  <Link to="/game/medium" className="difficulty-btn medium">
                    Medium
                  </Link>
                  <Link to="/game/hard" className="difficulty-btn hard">
                    Hard
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/game/:difficulty" element={<Game />} />
            </Routes>
          </main>
        </div>
      </MinesweeperGameProvider>
    </Router>
  );
};

export default App;