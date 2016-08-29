import io from 'socket.io-client';

export default class ServerAPI {

  // creates a socket.io-client connection
  constructor(port) {

  }

  disconnect() {

  }

  connect() {
    
  }

  // Registers a callback to be invoked when game begins
  // callback will receive object { word: [ ..array of nulls or strings ] }
  onStartGame(callback) {

  }

  // Sends a letter to the server that represents a guess
  makeGuess() {

  }

  // Registers a callback to be invoked on an incorrect guess
  // callback will receive object { guessedLetters: [..strings], remainingGuesses: number }
  onIncorrectGuess(callback) {

  }


  // Registers a callback to be invoked on a correct guess
  // callback will receive object { guessedLetters: [..strings], remainingGuesses: number }
  onCorrectGuess(callback) {

  }

  // Registers a callback to be invoked when a game is won
  onWin(callback) {

  }

  // Registers a callback to be invoked when a game is lost
  onLose(callback) {

  }

}
