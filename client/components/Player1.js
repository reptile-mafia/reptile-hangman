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
  }

  render() {
    return (
      <section id="player1">
        <h1>Player 1</h1> 

        <div className="col-xs-3 col-sm-2" id="gallows-col" >
          <Gallows remainingGuesses={this.state.remainingGuesses} />
        </div>

        <div id="board-col" className="col-xs-9 col-sm-8">

          <div>
            <div id="guessed-row">
              <GuessedLetters guessedLetters={this.props.guessedLettersUpper} />
              <RemainingGuess remainingGuesses={this.state.remainingGuesses} />
            </div>
            <div id="theword-row">
              <Word word={this.state.word} />
            </div>
            <div id="alphabet-row">
              <Alphabets
                guessedLetters={this.props.guessedLettersUpper}
                coolDown={this.props.coolDown}
                serverAPI={this.props.serverAPI}
              />
            </div>
          </div>

        </div>
      </section>
    );
  }
}
