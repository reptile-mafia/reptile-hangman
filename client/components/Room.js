import React from 'react';
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
    this.serverAPI = new ServerAPI(4000);
    this.serverAPI.connect();
    this.serverAPI.onEnterRoom(res => {
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
    this.serverAPI.onPlayerEnterRoom(res => {
      console.log('Player enter room', res, this.state);
      const playerList = this.state.players;
      console.log('playerlist: ', playerList);
      playerList.push(res.playerId);
      this.setState({
        players: playerList,
      });
    });

    this.serverAPI.onPlayerLeaveRoom(res => {
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
    this.serverAPI.onStartGame(res => {
      console.log('Start game', res.gameState);
      this.setGameState(res.gameState);
    });

    this.serverAPI.onIncorrectGuess(res => {
      console.log('Incorrect Guess', res);
      if (res.playerId === this.playerId) {
        this.setGameState(res.gameState, res.coolDown);
      } else {
        this.setGameState(res.gameState);
      }
    });

    this.serverAPI.onCorrectGuess(res => {
      console.log('Correct Guess', res, res.playerId, this.playerId);
      if (res.playerId === this.playerId) {
        this.setGameState(res.gameState, res.coolDown);
      } else {
        this.setGameState(res.gameState);
      }
    });

    this.serverAPI.onWin(res => {
      console.log('win!', res);
      this.outcome.win = true;
      this.outcome.player = res.playerId;
      this.setEndGameState(res.gameState, res.timeUntilNextGame);
    });

    this.serverAPI.onLose(res => {
      console.log('lose!', res);
      this.outcome.win = false;
      this.outcome.player = res.playerId;
      this.setEndGameState(res.gameState, res.timeUntilNextGame);
    });
  }

  componentWillMount() {
    var fb_game = firebase.database().ref('/games/' + this.props.roomId);

    var _this = this;
    fb_game.on('value', (data) => {
      let gameData = data.val();
      console.log('game data:', gameData.name);

      _this.setState({
        roomName: gameData.name,
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

  render() {
    console.log('RENDER ROOM', this.state);
    const guessedLettersUpper = this.state.guessedLetters.map(letter => letter.toUpperCase());
    return (
      <div className="room">
        <Outcome
          show={this.state.isDone}
          outcome={this.outcome}
          timeUntilNextGame={this.state.timeUntilNextGame}
        />
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container navcon">
            <h1 className="game-title">HANGMAN: {this.state.roomName}</h1>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">

            <div className="col-sm-6">
              <Player1
                word={this.state.word}
                guessedLetters={guessedLettersUpper}
                remainingGuesses={this.state.remainingGuesses}
                serverAPI={this.serverAPI}
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
        </div>
      </div>

    );
  }

}
