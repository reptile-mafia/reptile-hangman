import React from 'react';
import firebase from 'firebase';
import Outcome from './Outcome.js';
import Players from './Players';
import Player1 from './Player1';
import Player2 from './Player2';


export default class Room extends React.Component {

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
      roomName: '',
    };
    this.playerId = '';
    this.outcome = {
      win: true,
      player: '',
    };
  }

  componentWillMount() {
    var fbGame = firebase.database().ref(`/games/${this.props.roomId}`);

    var _this = this;
    fbGame.on('value', (gameData) => {
      console.log('game data:', gameData.val());
      _this.setState({
        word: gameData.child('/players/0/word').val(),
        displayWord: gameData.child('/players/0/displayWord').val(),
        roomName: gameData.child('name').val(),
        totalPlayers: gameData.child('totalPlayers').val(),
        guessedLetters: gameData.child('/players/0/guessedLetters').val() || [],
        remainingGuesses: gameData.child('players/0/remainingGuesses').val(),
        isDone: gameData.child('isDone').val(),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.word.join('') === this.state.displayWord.join('')) {
      alert('You\'re a Winner!!!');
      return;
    }
    if (this.state.remainingGuesses === 0) {
      alert('You Lost');
      return;
    }
  }

  playAgain() {
    const currentUserId = firebase.auth().currentUser.uid;
    this.props.serverAPI.playAgain(currentUserId, this.props.roomId)
    .then((data) => {
      console.log('After playAgain: ', data);
    });
  }

  makeGuess(letter) {
    let correct = false;
    if (this.state.remainingGuesses > 0) {
      correct = this.props.serverAPI.makeGuess(letter, this.state.word, this.state.displayWord, this.props.roomId);
    }
  }

  selectGameMode() {
    const guessedLettersUpper = this.state.guessedLetters !== null ? this.state.guessedLetters.map(letter => letter.toUpperCase()) : [];

    console.log('total players', this.state.totalPlayers);
    if (this.state.totalPlayers === 1) {
      return (
        <div className="row">

          <div className="col-sm-12">
            <Player1
              word={this.state.displayWord}
              guessedLetters={guessedLettersUpper}
              remainingGuesses={this.state.remainingGuesses}
              serverAPI={this.props.serverAPI}
              coolDown={this.state.coolDown}
              username={this.props.username}
              makeGuess={e => this.makeGuess(e)}
            />
          </div>

          <div className="col-xs-12 col-sm-2" id="player-col">
            <Players players={this.state.players} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">

          <div className="col-sm-6">
            <Player1
              word={this.state.word}
              guessedLetters={guessedLettersUpper}
              remainingGuesses={this.state.remainingGuesses}
              serverAPI={this.props.serverAPI}
              coolDown={this.state.coolDown}
              makeGuess={e => this.makeGuess(e)}
            />
          </div>

          <div className="col-sm-6">
            <Player2
              word={this.state.word}
              guessedLetters={guessedLettersUpper}
              remainingGuesses={this.state.remainingGuesses}
            />
          </div>

          <div className="col-xs-12 col-sm-2" id="player-col">
            <Players players={this.state.players} />
          </div>
        </div>
      );
    }
  }
/*
        <Outcome
          show={this.state.isDone}
          outcome={this.outcome}
          timeUntilNextGame={this.state.timeUntilNextGame}
        />
*/

  render() {
    console.log('RENDER ROOM', this.state);
    return (
      <div className="room">
        <button id="play-again" onClick={e => this.playAgain(e)}>Play Again</button>
        <h2>{this.state.roomName}</h2>
        <div className="container-fluid">
          { this.selectGameMode() }
        </div>
      </div>

    );
  }

}
