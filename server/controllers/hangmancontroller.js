module.exports = function (io, game) {

  io.on('guessLetter', function (data) {
    if (game.guessLetter(data.letter)) {
      if (game.isWon()) {
        io.emit('win');
      } else {
        io.emit('correctGuess', {
          remainingGuesses: game.getRemainingGuesses(),
          guessedLetters: game.getGuessedLetters(),
          word: game.getWord()
        });
      }
    } else {
      if (game.isLoss()) {
        io.emit('loss', {
          showSolution: game.displaySolution()
        });
      } else {
        io.emit('incorrectGuess', {
          remainingGuesses: game.getRemainingGuesses(),
          guessedLetters: game.getGuessedLetters()
        });
      }
    }
  });

  io.emit('startGame', { word: game.getWord() });

}
