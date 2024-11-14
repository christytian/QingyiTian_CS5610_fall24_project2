import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaHome, FaBook } from 'react-icons/fa';

const Rules = () => {
  return (
    <div>
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
            <div className="difficulty-buttons">
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

      <div className="rules-container">
        <h2 className="rules-title">How to Play Minesweeper</h2>
        <div className="rules-content">
          <section className="rules-section">
            <h3>Objective</h3>
            <p>Find all the safe squares without clicking on any mines!</p>
          </section>

          <section className="rules-section">
            <h3>How to Play</h3>
            <ul>
              <li>Left click to reveal a cell</li>
              <li>Right click to flag a suspected mine</li>
              <li>Numbers show how many mines are adjacent</li>
              <li>Use logic to determine mine locations</li>
              <li>Reveal all safe cells to win!</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>Difficulty Levels</h3>
            <ul>
              <li>Easy: 8x8 grid with 10 mines</li>
              <li>Medium: 16x16 grid with 40 mines</li>
              <li>Hard: 30x16 grid with 99 mines</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Rules;