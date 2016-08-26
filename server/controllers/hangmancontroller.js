module.exports = function (io, game) {
  // io.on('event', function () {
  //
  // });

  io.on('guessLetter', function (data) {
    if (game.guessLetter(data.letter)) {
      io.emit('correctGuess', {
        remainingGuesses: game.getRemainingGuesses(),
        guessedLetters: game.getGuessedLetters()
      });
    } else {
      io.emit('incorrectGuess', {
        remainingGuesses: game.getRemainingGuesses(),
        guessedLetters: game.getGuessedLetters()
      });
    }
  });

  io.emit('startGame', { word: game.getWord() });

}
