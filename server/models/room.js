var Game = require('./hangmangame.js');
var uuid = require('node-uuid');

var Room = {};

Room.create = function () {
  var id = uuid.v4();
  var playersById = {};
  var cooldownDuration = 3000;
  var cooldowns = {}; // stores cooldowns by player id
  var game = null; // current game
  var onCorrectGuessCallback = null;
  var onIncorrectGuessCallback = null;
  var onCooldownCallback = null;

  var room = {
    getId: function () {
      return id;
    },
    getPlayers: function () {
      return Object.keys(playersById).map(id => playersById[id]);
    },
    join: function (player) {
      playersById[player.getId()] = player;
      cooldowns[player.getId()] = 0;
    },
    getGame: function () {
      return game;
    },
    newGame: function (solution) {
      game = Game.create(solution);
    },
    guessLetter: function (player, letter) {
      // Invoke onCooldownCallback if cooldown hasn't expired
      if (cooldowns[player.getId()] > Date.now()) {
        if (onCooldownCallback !== null) {
          onCooldownCallback(player, cooldowns[player.getId()]);
        }
        return;
      }
      // Return early if letter has already been guessed
      if (game.hasBeenGuessed(letter)) {
        return;
      }
      cooldowns[player.getId()] = Date.now() + cooldownDuration;
      if (game.guessLetter(letter)) {
        if (onCorrectGuessCallback !== null) {
          onCorrectGuessCallback(player, letter);
        }
      } else {
        if (onIncorrectGuessCallback !== null) {
          onIncorrectGuessCallback(player, letter);
        }
      }
    },
    onCorrectGuess: function (callback) {
      onCorrectGuessCallback = callback;
    },
    onIncorrectGuess: function (callback) {
      onIncorrectGuessCallback = callback;
    },
    getCooldownByPlayerId: function (playerId) {
      return cooldowns[playerId];
    },
    onCooldown: function (callback) {
      onCooldownCallback = callback;
    }
  };
  return room;
}

module.exports = Room;
