import React, { useState } from "react";
import clsx from "clsx";
import Confetti from "react-confetti";
import "./Styles.css";
import languages from "./Languages.js";
import getFarewellText from "./Farewell.js";
import words from "./Words.js";
import GameTimer from "./GameTimer";

function AssemblyEndgame() {
  // Ensure `words` array is not empty; fallback to "DEFAULT".
  const [currentWord, setCurrentWord] = useState(
    (words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "DEFAULT").toUpperCase()
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [farewellMessage, setFarewellMessage] = useState("");

  // Count wrong guesses only for valid letters not in the word.
  const countWrongGuess = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  // Check if all letters in the word are guessed.
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // Define maximum wrong guesses and game-over conditions.
  const maxWrongGuesses = languages.length - 1;
  const isGameLost = countWrongGuess >= maxWrongGuesses;
  const isGameOver = isGameLost || isGameWon;

  // Add a guessed letter and update farewell message if necessary.
  const addGuessedLetter = (letter) => {
    const upperLetter = letter.toUpperCase(); // Ensure case-insensitive comparison.
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(upperLetter) ? prevLetters : [...prevLetters, upperLetter]
    );

    if (!currentWord.includes(upperLetter)) {
      const currentLanguageIndex = countWrongGuess + 1; // +1 for the current wrong guess.
      if (currentLanguageIndex < languages.length) {
        setFarewellMessage(getFarewellText(languages[currentLanguageIndex].name));
      }
    } else {
      setFarewellMessage(""); // Reset message for correct guesses.
    }
  };

  // Start a new game with a random word and reset states.
  const handleNewGame = () => {
    setCurrentWord(
      (words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "DEFAULT").toUpperCase()
    );
    setGuessedLetters([]);
    setFarewellMessage("");
  };

  // Render language elements.
  const renderLanguageElements = () =>
    languages.map((lang, index) => {
      const isLanguageLost = countWrongGuess > index;
      return (
        <span
          key={lang.name}
          style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
          className={clsx({ lost: isLanguageLost })}
        >
          {lang.name}
        </span>
      );
    });

  // Render the word's letters.
  const renderLetterElements = () =>
    currentWord.split("").map((letter, index) => {
      const isGuessed = guessedLetters.includes(letter);
      const shouldReveal = isGuessed || isGameLost;
      return (
        <span
          className={clsx("word", {
            correct: shouldReveal,
            hidden: !shouldReveal,
            revealed: isGameLost && !isGuessed,
          })}
          key={index}
        >
          {shouldReveal ? letter : "_"}
        </span>
      );
    });

  // Render alphabet buttons dynamically based on guessed state.
  const renderAlphabetButtons = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    return alphabet.map((letter) => {
      const isGuessed = guessedLetters.includes(letter);
      const isCorrect = currentWord.includes(letter);
      const isWrong = isGuessed && !isCorrect;

      const buttonClass = clsx({
        "alphabet-buttons": true,
        correct: isGuessed && isCorrect,
        wrong: isWrong,
        disabled: isGuessed,
      });

      return (
        <button
          className={buttonClass}
          key={letter}
          disabled={isGuessed || isGameOver}
          onClick={() => addGuessedLetter(letter)}
        >
          {letter}
        </button>
      );
    });
  };

  return (
    <main className="body-container">
      <header className="head-container">
        <h1 className="heading">Assembly: Endgame</h1>
        <p>
          Guess the word in under {maxWrongGuesses} attempts to keep the
          programming world safe from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className="status-message">
        {isGameWon && (
          <div className="win-container">
            <p className="won">You Won! Well done 🎉</p>
          </div>
        )}
        {isGameLost && (
          <div className="lose-container">
            <p className="lost">You Lost! Better Start Learning Assembly 📚</p>
          </div>
        )}
       {!isGameOver && (
  <>
    {farewellMessage && <p className="farewell">{farewellMessage}</p>}
    {!farewellMessage && <p className="guessing">Keep guessing</p>}
  </>
)}

      </section>
      <section className="languages">{renderLanguageElements()}</section>
      <section className="word-place">{renderLetterElements()}</section>
      <section className="alphabet-container">{renderAlphabetButtons()}</section>
      <section>
        {isGameWon && <Confetti recycle={false} numberOfPieces={3000} />}
      </section>
      <GameTimer isGameOver={isGameOver} onReset={handleNewGame} />
    </main>
  );
}

export default AssemblyEndgame;
