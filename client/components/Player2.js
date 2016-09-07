import React from 'react';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Gallows from './Gallows.js';
import Outcome from './Outcome.js';
import Players from './Players';
import Alphabets from './Alphabets.js';
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
    return (
      <section id="player2" className="row">
        <h1>Player 2</h1>

        <div className="col-xs-3 col-sm-2" id="gallows-col" >
          <Gallows remainingGuesses={this.state.remainingGuesses} />
        </div>

        <div className="col-xs-9 col-sm-8" id="board-col">

          <div>
            <div id="guessed-row">
              <GuessedLetters guessedLetters={this.props.guessedLettersUpper} />
              <RemainingGuess remainingGuesses={this.state.remainingGuesses} />
            </div>
            <div id="theword-row">
              <Word word={this.state.word} />
            </div>
            <div id="alphabet-row">
            </div>
          </div>

        </div>
      </section>
    );
  }
}
