module.exports = function (io, game) {

  io.on('guessLetter', function (data) {
    if (game.guessLetter(data.letter)) {
      if (game.isWon()) {
        io.emit('win');
      } else {
        io.emit('correctGuess', game.getState());
      }
    } else {
      if (game.isLoss()) {
        io.emit('loss', {
          showSolution: game.displaySolution()
        });
      } else {
        io.emit('incorrectGuess', game.getState());
      }
    }
  });

  io.emit('startGame', game.getState() );

}
