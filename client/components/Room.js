import React from 'react';
import firebase from 'firebase';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Gallows from './Gallows.js';
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

    // setup socket & initialize
    this.props.serverAPI.connect();
    this.props.serverAPI.onEnterRoom(res => {
      console.log('Enter Room', res);
      this.playerId = res.playerId;
      const playerList = res.players.slice();
      // playerList.push(res.playerId);
      this.setState({
        players: playerList,
        word: res.gameState.word,
        guessedLetters: res.gameState.guessedLetters,
        remainingGuesses: res.gameState.remainingGuesses,
        isDone: res.gameState.isDone,
      });
    });

    // Update players
    this.props.serverAPI.onPlayerEnterRoom(res => {
      console.log('Player enter room', res, this.state);
      const playerList = this.state.players;
      console.log('playerlist: ', playerList);
      playerList.push(res.playerId);
      this.setState({
        players: playerList,
      });
    });

    this.props.serverAPI.onPlayerLeaveRoom(res => {
      console.log('Player Leave room', res);
      const playerList = this.state.players;
      if (playerList.indexOf(res.playerId) > 0) {
        playerList.splice(playerList.indexOf(res.playerId), 1);
      }
      this.setState({
        players: playerList,
      });
    });

    // Game related events
    this.props.serverAPI.onStartGame(res => {
      console.log('Start game', res.gameState);
      this.setGameState(res.gameState);
    });

    this.props.serverAPI.onIncorrectGuess(res => {
      console.log('Incorrect Guess', res);
      if (res.playerId === this.playerId) {
        this.setGameState(res.gameState, res.coolDown);
      } else {
        this.setGameState(res.gameState);
      }
    });

    this.props.serverAPI.onCorrectGuess(res => {
      console.log('Correct Guess', res, res.playerId, this.playerId);
      if (res.playerId === this.playerId) {
        this.setGameState(res.gameState, res.coolDown);
      } else {
        this.setGameState(res.gameState);
      }
    });

    this.props.serverAPI.onWin(res => {
      console.log('win!', res);
      this.outcome.win = true;
      this.outcome.player = res.playerId;
      this.setEndGameState(res.gameState, res.timeUntilNextGame);
    });

    this.props.serverAPI.onLose(res => {
      console.log('lose!', res);
      this.outcome.win = false;
      this.outcome.player = res.playerId;
      this.setEndGameState(res.gameState, res.timeUntilNextGame);
    });
  }

  componentWillMount() {
    var fbGame = firebase.database().ref(`/games/${this.props.roomId}`);

    // player1 = /games/ + this.props.roomId + /players/ + auth().currentUser.uid;
    // player2 = whatever is left

    var _this = this;
    fbGame.on('value', (gameData) => {
      console.log('game data:', gameData.val());
      _this.setState({
        word: gameData.child('/players/0/word').val().split(''),
        roomName: gameData.child('name').val(),
        totalPlayers: gameData.child('totalPlayers').val(),
        guessedLetters: gameData.child('/players/0/guessedLetters').val() || [],
        remainingGuesses: gameData.child('players/0/remainingGuesses').val(),
        isDone: gameData.child('isDone').val(),
      });
    });
  }

  setGameState(gameState, coolDown) {
    if (coolDown > 0) {
      console.log('updating with coolDown', gameState);
      this.setState({
        word: gameState.word, // keep state immutable
        guessedLetters: gameState.guessedLetters,
        remainingGuesses: gameState.remainingGuesses,
        isDone: gameState.isDone,
        coolDown: coolDown,
      });
    } else {
      console.log('updating without coolDown', gameState);
      this.setState({
        word: gameState.word, // keep state immutable
        guessedLetters: gameState.guessedLetters,
        remainingGuesses: gameState.remainingGuesses,
        isDone: gameState.isDone,
      });
    }
  }

  setEndGameState(gameState, timeUntilNextGame){
    // console.log("setting game state END: ", gameState, timeUntilNextGame)
    this.setState({
      word: gameState.word, // keep state immutable
      guessedLetters: gameState.guessedLetters,
      remainingGuesses: gameState.remainingGuesses,
      isDone: gameState.isDone,
      timeUntilNextGame: timeUntilNextGame,
    });
  }

  playAgain() {
    const currentUserId = firebase.auth().currentUser.uid;
    this.props.serverAPI.playAgain(currentUserId, this.props.roomId)
    .then((data) => {
      console.log('After playAgain: ', data);
    });
  }

  selectGameMode() {
    const guessedLettersUpper = this.state.guessedLetters !== null ? this.state.guessedLetters.map(letter => letter.toUpperCase()) : [];

    console.log('total players', this.state.totalPlayers);
    if (this.state.totalPlayers === 1) {
      return (
        <div className="row">

          <div className="col-sm-12">
            <Player1
              word={this.state.word}
              guessedLetters={guessedLettersUpper}
              remainingGuesses={this.state.remainingGuesses}
              serverAPI={this.props.serverAPI}
              coolDown={this.state.coolDown}
              username={this.props.username}
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
