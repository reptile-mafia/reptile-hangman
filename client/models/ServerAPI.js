import firebase from 'firebase';
import randomWord from 'random-words';

export default class ServerAPI {

  constructor() {
    this.fbGames = firebase.database().ref('games');
    this.currentGame = null;
  }

  createGame(playerId, newGameObj) {
    const newWord = randomWord().toUpperCase();
    const totalPlayerAmount = newGameObj.type === 'singlePlayer' ? 1 : 2;
    this.newGame = this.fbGames.push();
    return this.newGame.set({
      name: newGameObj.name,
      active: true,
      players: [
        {
          id: playerId,
          word: newWord.split(''),
          tries: 0,
          remainingGuesses: 6,
          guessedLetters: [],
        },
      ],
      totalPlayers: totalPlayerAmount,
      isDone: false,
    });
  }

  playAgain(playerId, currentGameId) {
    const newWord = randomWord().toUpperCase();
    const displayArray = newWord.split('').map(() => '_');
    this.currentGame = firebase.database().ref(`/games/${currentGameId}`);
    return this.currentGame.update({
      players: [
        {
          id: playerId,
          word: newWord.split(''),
          tries: 0,
          remainingGuesses: 6,
          guessedLetters: [],
          displayWord: displayArray,
        },
      ],
      isDone: false,
    });
  }

  makeGuess(guess, word, displayWord, currentGameId) {
    let correct = false;
    word.forEach((letter, index) => {
      if (guess === letter) {
        correct = true;
        displayWord[index] = letter;
      }
    });

    const currentPlayer = firebase.database().ref(`/games/${currentGameId}/players/0`);

    currentPlayer.once('value', (playerData) => {
      let letters = [];
      if (playerData.child('guessedLetters').exists()) {
        letters = playerData.child('guessedLetters').val();
      }

      letters.push(guess);
      const remaining = playerData.child('remainingGuesses').val();

      currentPlayer.update({
        tries: playerData.child('tries').val() + 1,
        remainingGuesses: correct ? remaining : remaining - 1,
        guessedLetters: letters,
        displayWord,
      });
    });
    return correct;
  }
}
