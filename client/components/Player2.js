import React from 'react';
import Gallows from './Gallows.js';
import GuessedLetters from './GuessedLetters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';

export default class Player2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: [], // keep state immutable
      guessedLetters: [],
      remainingGuesses: 6,
      isDone: false,
      players: [],
      coolDown: 0,
      timeUntilNextGame: 0,
    };
  }

  render() {
    const guessedLettersUpper = this.props.guessedLetters.map(letter => letter.toUpperCase());
    return (
      <section id="player2" className="row">
        <h1>Player 2</h1>

        <div className="col-xs-3 col-sm-2" id="gallows-col">
          <Gallows remainingGuesses={this.props.remainingGuesses} />
        </div>

        <div className="col-xs-9 col-sm-8" id="board-col">
          <div id="guessed-row">
            <GuessedLetters guessedLetters={guessedLettersUpper} />
            <RemainingGuess remainingGuesses={this.props.remainingGuesses} />
          </div>

          <div id="theword-row">
            <Word word={this.props.word} />
          </div>
        </div>
      </section>
    );
  }
}
