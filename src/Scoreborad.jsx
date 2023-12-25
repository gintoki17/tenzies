import React from "react";

export default function Scoreboard({
  formatTime,
  resetScore,
  highScore,
  currentScore,
}) {
  return (
    <div className="scoreboard-container">
      <h3>Scoreboard</h3>
      <div className="scoreboard">
        <h3>High Score: {formatTime(highScore)}</h3>
        <h3>Current Score:{formatTime(currentScore)}</h3>
        <button onClick={resetScore}>Reset</button>
      </div>
    </div>
  );
}
