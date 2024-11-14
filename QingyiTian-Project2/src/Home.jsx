import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Home = () => {
  return (
    <div>
      <Navigation />
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
    </div>
  );
};

export default Home;