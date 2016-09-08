import io from 'socket.io-client';
import firebase from 'firebase';
import randomWord from 'random-words';

export default class ServerAPI {

  // creates a socket.io-client connection
  constructor(port) {
    this.port = port;
    this.client = null;
    this.fbGames = firebase.database().ref('games');
    this.currentGame = null;
  }

  disconnect() {
    this.client.disconnect();
  }

  connect() {
    console.log('Connecting...');
    this.client = io.connect(`http://localhost:${this.port}`);
  }

  createGame(playerId, newGameObj) {
    const newWord = randomWord();
    const totalPlayerAmount = newGameObj.type === 'singlePlayer' ? 1 : 2;
    this.newGame = this.fbGames.push();
    return this.newGame.set({
      name: newGameObj.name,
      active: true,
      players: [
        {
          id: playerId,
          word: newWord,
          tries: 0,
          remainingGuesses: 6,
          guessedLetters: [],
        },
      ],
      totalPlayers: totalPlayerAmount,
      isDone: false,
    });
  }

  playAgainAgain(playerId, currentGameId) {
    const newWord = randomWord();
    this.currentGame = firebase.database().ref('/games/' + currentGameId);
    return this.currentGame.update({
      players: [
        {
          id: playerId,
          word: newWord,
          tries: 0,
          remainingGuesses: 6,
          guessedLetters: [],
        },
      ],
      isDone: false,
    });
  }

  // Registers a callback to be invoked when game begins
  // callback will receive object { word: [ ..array of nulls or strings ] }
  onStartGame(callback) {
    this.client.on('startGame', callback);
  }

  // Sends a letter to the server that represents a guess
  makeGuess(letter) {
    // console.log("client make guess", letter)
    this.client.emit('guessLetter', { letter: letter });
  }

  // Sends a letter to the server that represents a guess
  playAgain() {
    console.log('client play again');
    this.client.emit('playAgain');
  }

  // Registers a callback to be invoked on an incorrect guess
  // callback will receive object { guessedLetters: [..strings], remainingGuesses: number }
  onIncorrectGuess(callback) {
    this.client.on('incorrectGuess', callback);
  }

  // Registers a callback to be invoked on a correct guess
  // callback will receive object { guessedLetters: [..strings], remainingGuesses: number }
  onCorrectGuess(callback) {
    this.client.on('correctGuess', callback);
  }

  // Registers a callback to be invoked when a game is won
  onWin(callback) {
    this.client.on('win', callback);
  }

  // Registers a callback to be invoked when a game is lost
  onLose(callback) {
    this.client.on('loss', callback);
  }

  onPlayerLeaveRoom(callback) {
    this.client.on('playerLeaveRoom', callback);
  }

  onPlayerEnterRoom(callback) {
    this.client.on('playerEnterRoom', callback);
  }

  onEnterRoom(callback) {
    this.client.on('enterRoom', callback);
  }

}
