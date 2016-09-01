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
      if (game.guessLetter(letter)) {
        if (onCorrectGuessCallback !== null) {
          onCorrectGuessCallback(player, letter);
        }
        return true;
      } else {
        if (onIncorrectGuessCallback !== null) {
          onIncorrectGuessCallback(player, letter);
        }
        return false;
      }
    },
    onCorrectGuess: function (callback) {
      onCorrectGuessCallback = callback;
    },
    onIncorrectGuess: function (callback) {
      onIncorrectGuessCallback = callback;
    },
    getCooldownByPlayerId: function (playerId) {
      if (playerId in cooldowns) {
        return cooldowns[playerId];
      }
      return null;
    }
  };
  return room;
}

module.exports = Room;
