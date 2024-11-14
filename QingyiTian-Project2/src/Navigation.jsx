import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaHome, FaBook } from 'react-icons/fa';

const Navigation = () => {
  return (
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
  );
};

export default Navigation;