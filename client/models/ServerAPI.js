import firebase from 'firebase';
import randomWord from 'random-words';

export default class ServerAPI {

  constructor() {
    this.fbGames = firebase.database().ref('games');
    this.currentGame = null;
  }

  createGame(playerId, newGameObj) {
    const newWord = randomWord().toUpperCase();
    const displayArray = newWord.split('').map(() => '_');
    const totalPlayerAmount = newGameObj.type === 'singlePlayer' ? 1 : 2;
    this.newGame = this.fbGames.push();
    const gameObj = {
      id: playerId,
      word: newWord.split(''),
      tries: 0,
      remainingGuesses: 6,
      guessedLetters: [],
      displayWord: displayArray,
    };

    this.newGame.child('players/' + playerId).set(gameObj);
    return this.newGame.update({
      name: newGameObj.name,
      active: true,
      totalPlayers: totalPlayerAmount,
      isDone: false,
    });
  }

  playAgain(playerId, currentGameId) {
    const newWord = randomWord().toUpperCase();
    const displayArray = newWord.split('').map(() => '_');
    this.currentGame = firebase.database().ref(`/games/${currentGameId}`);
    return this.currentGame.child(`players/${playerId}`).update({
      word: newWord.split(''),
      tries: 0,
      remainingGuesses: 6,
      guessedLetters: [],
      displayWord: displayArray,
    })
    .then(() => this.currentGame.update({
      isDone: false,
    }));
  }

  endGame(currentGameId) {
    this.currentGame = firebase.database().ref(`/games/${currentGameId}`);
    return this.currentGame.set(null);
  }

  makeGuess(guess, word, displayWord, currentGameId) {
    let correct = false;
    const currentUserId = firebase.auth().currentUser.uid;
    word.forEach((letter, index) => {
      if (guess === letter) {
        correct = true;
        displayWord[index] = letter;
      }
    });

    const currentPlayer = firebase.database().ref(`/games/${currentGameId}/players/${currentUserId}`);

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

  // endGame(currentGameId) {
  //   this.currentGame = firebase.database().ref(`/games/${currentGameId}`);
  //   return this.currentGame.update({
  //     isDone: true,
  //   });
  // }
}
