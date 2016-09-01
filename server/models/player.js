var uuid = require('node-uuid');

var Player = {};

Player.create = function () {
  var id = uuid.v4();
  var player = {
    getId: function () {
      return id;
    }
  };

  return player;
};

module.exports = Player;
