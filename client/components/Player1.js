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
import CoolDown from './CoolDown';


export default class Player1 extends React.Component {
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

    console.log('server api', this.props.serverAPI);

    console.log('word', this.state.word);
  }

  render() {
    const guessedLettersUpper = this.props.guessedLetters.map(letter => letter.toUpperCase());
    return (
      <section id="player1" className="row">
        <h1>Player 1</h1>


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
          <div id="alphabet-row">
            <Alphabets
              guessedLetters={guessedLettersUpper}
              coolDown={this.props.coolDown}
              serverAPI={this.props.serverAPI}
            />
          </div>
        </div>
      </section>
    );
  }
}
