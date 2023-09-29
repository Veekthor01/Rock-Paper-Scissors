import React, { useState, useEffect } from "react";
import styles from './Game.module.css';

const CHOICES = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

const choiceStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 40,
};
const emojiStyles = {
  fontSize: 64,
  marginRight: 20,
};
const nameStyles = {
  margin: 0,
  fontSize: 24,
  color: "#ffff",
};
const resultStyles = {
  marginTop: 40,
  fontSize: 48,
  color: "#ffff",
};

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [codeyChoice, setCodeyChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    // Load scores from local storage on component mount
    const storedPlayerScore = localStorage.getItem('playerScore');
    const storedComputerScore = localStorage.getItem('computerScore');
    if (storedPlayerScore !== null) {
      setPlayerScore(Number(storedPlayerScore));
    }
  
    if (storedComputerScore !== null) {
      setComputerScore(Number(storedComputerScore));
    }
  }, []);
  
  function handlePlayerChoice(choice) {
    const codeyChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayerChoice(choice);
    setCodeyChoice(codeyChoice);
    if (choice.name === codeyChoice.name) {
      setResult("Tie!");
    } else if (
      (choice.name === "rock" && codeyChoice.name === "scissors") ||
      (choice.name === "paper" && codeyChoice.name === "rock") ||
      (choice.name === "scissors" && codeyChoice.name === "paper")
    ) {
      setResult("You win!");
      setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
      localStorage.setItem('playerScore', playerScore + 1);
    } else {
      setResult("You lose!");
      setComputerScore(prevComputerScore => prevComputerScore + 1);
      localStorage.setItem('computerScore', computerScore + 1);
    }
  }

  function clearScores() {
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
    setPlayerScore(0);
    setComputerScore(0);
  }

  function resetGame() {
    setPlayerChoice(null);
    setCodeyChoice(null);
    setResult(null);
  }

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: 48, marginTop: 0 }}>Rock Paper Scissors</h1>
      <div className={styles.choices}>
        {CHOICES.map((choice) => (
          <button className={styles.button}
            key={choice.name}
            onClick={() => handlePlayerChoice(choice)}
            aria-label={choice.name}
          >
            {choice.emoji}
          </button>
        ))}
      </div>
      {playerChoice && codeyChoice && (
        <div className={styles.results}>
          <div style={choiceStyles}>
            <span style={emojiStyles}>{playerChoice.emoji}</span>
            <p style={nameStyles}>You chose {playerChoice.name}</p>
          </div>
          <div style={choiceStyles}>
            <span style={emojiStyles}>{codeyChoice.emoji}</span>
            <p style={nameStyles}>The computer chose {codeyChoice.name}</p>
          </div>
          <h2 style={resultStyles}>{result}</h2>
          <button className={styles.button} onClick={resetGame}>Play again</button>
        </div>
      )}
      <div className={styles.scores}>
  <div className={styles.scoreBox}>
    Your Score <span className={styles.score} style={{ marginLeft: 5 }}>{playerScore}</span>
  </div>
  <div className={styles.scoreBox}>
  <span className={styles.score}style={{ marginRight: 5 }}>{computerScore}</span> Computer Score 
  </div>
</div>
<button className={`${styles.clearbutton} ${styles.clearButtonBelow}`} onClick={clearScores}>Clear Scores</button>
<p className={styles.author}>Created by Veekthor</p>
    </div>
  );
}

export default Game;
