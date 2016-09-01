var chai = require('chai');
var expect = chai.expect;
var Room = require('../../server/models/room.js');
var Player = require('../../server/models/player.js');
var Room = require('../../server/models/room.js');

describe("Room", function () {
  describe("create", function () {
    it('should create a new Room', function () {
      var room = Room.create();
      expect(room).to.be.defined;
      expect(room).to.be.an('object');
    });
  });

  describe("getId", function () {
    it("should return the Room's Id", function () {
      var room = Room.create();
      expect(room.getId()).to.be.a('string');
    });
  });

  describe("getPlayers", function () {
    it("should return a list of Players in the room", function () {
      var room = Room.create();
      expect(room.getPlayers()).to.deep.equal([]);
    });
  });

  describe("join", function () {
    it("should add a Player to the Room", function () {
      var room = Room.create();
      var player = Player.create();
      room.join(player);
      expect(room.getPlayers()).to.deep.equal([player]);
    });
  });

  describe("getGame", function () {
    it("should return null if no game has started", function () {
      var room = Room.create();
      expect(room.getGame).to.be.a('function');
      expect(room.getGame()).to.equal(null);
    });
  });

  describe("newGame", function () {
    it("should start a new Game`", function () {
      var room = Room.create();
      room.newGame('monday');
      expect(room.newGame).to.be.a('function');
      expect(room.getGame()).to.be.an('object');
      expect(room.getGame().getWord()).to.deep.equal([null, null, null, null, null, null]);
    });
  });

  describe("guessLetter", function () {
    var room;
    var player;
    beforeEach(function () {
      room = Room.create();
      player = Player.create();
      room.join(player);
      room.newGame('food');
    });

    it("should allow a player to guess a letter", function () {
      expect(room.guessLetter(player, 'o')).to.equal(true); // a Player guesses a letter
      expect(room.getGame().getWord()).to.deep.equal([null, 'o', 'o', null]);
    });

    it("should fire onCorrectGuess callback with player and letter on a good guess", function (done) {
      room.onCorrectGuess(function (guessingPlayer, guessedLetter) {
        expect(guessingPlayer).to.equal(player);
        expect(guessedLetter).to.equal('f');
        done();
      });
      room.guessLetter(player, 'f');
    });

    it("should fire onIncorrectGuess callback with player and letter on an incorrect guess", function (done) {
      room.onIncorrectGuess(function (guessingPlayer, guessedLetter) {
        expect(guessingPlayer).to.equal(player);
        expect(guessedLetter).to.equal('x');
        done();
      });
      room.guessLetter(player, 'x');
    });

    xit("should set cooldown timestamp for a player on guess", function () {
      room.guessLetter(player, 'f');
      room.getCooldownByPlayerId(player.getId());
    });
    // it("should fire onInCooldown callback when player guesses before cooldown has expired", function () {
    //   room.onCool
    // });
  });

  describe("getCooldownByPlayerId", function () {
    var room;
    var player;
    beforeEach(function () {
      room = Room.create();
      player = Player.create();
      room.join(player);
      room.newGame('food');
    });
    it("cooldown should be a timestamp before now if player has not guessed", function () {
      var cooldown = room.getCooldownByPlayerId(player.getId());
      expect(cooldown).to.be.a('number');
      expect(cooldown).to.be.below(Date.now());
    });
  });

});
