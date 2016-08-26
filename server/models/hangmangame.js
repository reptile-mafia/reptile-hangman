var HangmanGame = {};

HangmanGame.create = function( solution ) {
  solution = solution.toLowerCase().split('');
  var word = Array(solution.length).fill(null);
  var guessedLetters = [];
  var remainingGuesses = 6;

  var game = {
    getWord: function() {
      return solution.map(function(letter) {
        return guessedLetters.indexOf(letter) === -1 ? null : letter;
       });
    },
    // guessLetter returns true if letter is a correct guess, false otherwise
    guessLetter: function(letter) {
      letter = letter.toLowerCase();
      // If letter has not been guessed before then add it to guessedLetters
      if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
      }
      // If letter is not in solution then reduce remaining guesses by one
      if (solution.indexOf(letter) === -1) {
        remainingGuesses--;
        return false;
      }
      return true;
    },
    getGuessedLetters: function() {
      return guessedLetters.slice();
    },
    isWon: function() {
      return game.getWord().indexOf(null) === -1;
    },
    isLoss: function() {
      return remainingGuesses <= 0;
    }
  }

  return game;
};





module.exports = HangmanGame;
