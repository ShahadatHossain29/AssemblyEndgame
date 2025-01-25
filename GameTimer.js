import React, { useState, useEffect } from "react";

const GameTimer = ({ isGameOver, onReset }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (!isGameOver) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isGameOver]);

  const handleNewGame = () => {
    setElapsedTime(0);
    onReset();
  };

  return (
    <section>
      {isGameOver ? (
        <button className="newBtn" onClick={handleNewGame}>
          New Game
        </button>
      ) : (
        <div className="timer">Elapsed Time: {elapsedTime} seconds</div>
      )}
    </section>
  );
};

export default GameTimer;
