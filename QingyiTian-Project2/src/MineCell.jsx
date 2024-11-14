import React from 'react';
import { FaBomb, FaFlag } from 'react-icons/fa';

const MineCell = ({ row, col, value, isRevealed, isFlagged, onLeftClick, onRightClick, revealDelay }) => {
  const handleClick = (e) => {
    if (e.type === 'contextmenu' || e.shiftKey) {
      e.preventDefault();
      onRightClick(row, col, e);
      return;
    }
    onLeftClick(row, col);
  };

  const getCellContent = () => {
    // Check for flag first
    if (isFlagged) {
      return (
        <div className="mine-content">
          <FaFlag 
            size={20} 
            style={{ 
              color: '#dc2626',
              width: '20px',
              height: '20px',
              display: 'block'
            }} 
          />
        </div>
      );
    }

    // Then check if cell is revealed
    if (!isRevealed) {
      return null;
    }

    // If it's a mine
    if (value === -1) {
      return (
        <div className="mine-content">
          <FaBomb 
            size={20} 
            style={{ 
              color: '#000000',
              width: '20px',
              height: '20px',
              display: 'block'
            }} 
          />
        </div>
      );
    }

    // If it's a number
    if (value > 0) {
      return <span className={`number-${value}`}>{value}</span>;
    }

    // If it's empty (value === 0)
    return null;
  };

  const getCellClassName = () => {
    const baseClass = 'cell';
    const classes = [baseClass];

    if (isFlagged) {
      classes.push('flagged');
    } else if (!isRevealed) {
      classes.push('unselected');
    } else if (value === -1) {
      classes.push('mine');
    } else {
      classes.push('safe');
      if (value > 0) {
        classes.push(`number-${value}`);
      }
    }

    // Add reveal delay for animation if provided
    if (revealDelay !== undefined) {
      classes.push(`reveal-delay-${revealDelay}`);
    }

    return classes.join(' ');
  };

  return (
    <button
      className={getCellClassName()}
      onClick={handleClick}
      onContextMenu={handleClick}
      disabled={isRevealed && !isFlagged}
      style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        margin: '2px',
        border: 'none',
        borderRadius: '4px',
        cursor: isRevealed && !isFlagged ? 'default' : 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {getCellContent()}
    </button>
  );
};

export default MineCell;