var chai = require('chai');
var expect = chai.expect;


var HangmanGame = require('../models/hangmangame.js');

describe('HangmanGame', function() {
  it('should have a create method', function() {
    expect(HangmanGame.create).to.exist;
  });

  it('should create an unsolved word from solution', function() {
    var solution = 'monday';
    var game = HangmanGame.create(solution);

    expect(game).to.have.property('getWord');
    expect(game.getWord()).to.have.length(6);
    expect(game.getWord()).to.deep.equal([null,null,null,null,null,null]);
  });

  it('should keep track of guessed letters', function() {
    var solution = 'monday';
    var game = HangmanGame.create(solution);

    expect(game).to.have.property('guessLetter');
    expect(game).to.have.property('getGuessedLetters');
    expect(game.getGuessedLetters()).to.deep.equal([]);
    expect(game.guessLetter('m')).to.equal(true);
    expect(game.guessLetter('z')).to.equal(false);
    expect(game.getGuessedLetters()).to.deep.equal(['m', 'z']);
    expect(game.guessLetter('z')).to.equal(false);
    expect(game.getGuessedLetters()).to.deep.equal(['m', 'z']);

  });

  it('should add correctly guessed letters to word', function() {
    var solution = 'flood';
    var game = HangmanGame.create(solution);
    game.guessLetter('o');
    expect(game.getWord()).to.deep.equal([null, null, 'o', 'o', null]);
    game.guessLetter('z');
    expect(game.getWord()).to.deep.equal([null, null, 'o', 'o', null]);
    game.guessLetter('f');
    expect(game.getWord()).to.deep.equal(['f', null, 'o', 'o', null]);
  });

  it('should know when a game is won', function() {
    var solution = 'an';
    var game = HangmanGame.create(solution);
    expect(game).to.have.property('isWon');
    expect(game.isWon()).to.equal(false);
    game.guessLetter('a');
    expect(game.isWon()).to.equal(false);
    game.guessLetter('n');
    expect(game.isWon()).to.equal(true);
  });

  it('should know when a game is lost', function() {
    var solution = 'an';
    var game = HangmanGame.create(solution);
    expect(game).to.have.property('isLoss');
    game.guessLetter('a');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('b');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('c');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('d');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('e');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('f');
    expect(game.isLoss()).to.equal(false);
    game.guessLetter('g');
    expect(game.isLoss()).to.equal(true);
  });


});
