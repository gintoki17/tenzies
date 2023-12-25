import React, { useEffect, useState } from "react";
import "./styles.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Stopwatch from "./Stopwatch";
import Scoreboard from "./Scoreborad";
export default function App() {
  const [dices, setDices] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [timer, setTimer] = React.useState(0 * 60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [currentScore, setCurrentScore] = useState(0 * 60);
  const [highScore, setHighScore] = useState(10 * 60);

  React.useEffect(() => {
    const allHeld = dices.every((die) => die.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
      const currentScoreInSeconds = timer;
      setCurrentScore(currentScoreInSeconds);

      const storedHighScore = highScore;
      if (
        storedHighScore === null ||
        currentScoreInSeconds < parseFloat(storedHighScore)
      ) {
        setHighScore(currentScoreInSeconds);
        localStorage.setItem("high-score", currentScoreInSeconds);
      }
      clearInterval(localStorage.getItem("interval-id"));
    }
  }, [dices, timer]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(generateNewDie());
    }
    return randomNumbers;
  }

  function rollDice() {
    if (!tenzies) {
      setDices((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      localStorage.setItem("timer-value", timer);
      setTenzies(false);
      setDices(allNewDice);
      setTimer(0 * 60);
    }
  }

  function handleClick(id) {
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  function stopWatch() {
    if (!timerOn) {
      let interval = setInterval(() => {
        setTimer((prevState) => {
          return prevState + 1;
        });
      }, 30);
      localStorage.setItem("interval-id", interval);
    }
    setTimerOn((prevState) => !prevState);
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
  }

  function resetScore() {
    localStorage.clear();
  }

  const diceElements = dices.map((dice) => (
    <Die
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      handleClick={() => handleClick(dice.id)}
    />
  ));

  return (
    <div className="container">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      <div className="footer">
        <Stopwatch
          formatTime={formatTime}
          timer={timer}
          stopWatch={stopWatch}
          timerOn={timerOn}
        />
        <Scoreboard
          formatTime={formatTime}
          resetScore={resetScore}
          highScore={highScore}
          currentScore={currentScore}
        />
      </div>
    </div>
  );
}
