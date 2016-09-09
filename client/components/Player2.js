import React from 'react';
import firebase from 'firebase';
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
      displayWord: [],
    };
    this.fbGame = firebase.database().ref(`/games/${this.props.roomId}/players/${this.props.playerId}`);
  }

  componentWillMount() {
    var _this = this;
    this.fbGame.on('value', (gameData) => {
      console.log('player 2 data', gameData.val());
      _this.setState({
        word: gameData.child('word').val(),
        displayWord: gameData.child('displayWord').val(),
        guessedLetters: gameData.child('guessedLetters').val() || [],
        remainingGuesses: gameData.child('remainingGuesses').val(),
      });
    });
  }

  render() {
  // PLAYER 2 READY
    const guessedLettersUpper = this.state.guessedLetters.map(letter => letter.toUpperCase());

    return (
      <section id="player2" className="row">
        <div className="col-sm-8">
          <div className="panel panel-default board-col">
            <h1>Player 2</h1>
            <div id="guessed-row">
              <GuessedLetters guessedLetters={guessedLettersUpper} />
              <RemainingGuess remainingGuesses={this.state.remainingGuesses} />
            </div>
            <div id="theword-row">
              <Word word={this.state.word} />
            </div>
          </div>
        </div>
        <div className="col-sm-4 gallows-col">
          <Gallows remainingGuesses={this.state.remainingGuesses} />
        </div>
      </section>
    );
  }
}
