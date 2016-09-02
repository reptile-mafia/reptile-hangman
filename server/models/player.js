var uuid = require('node-uuid');

var Player = {};

Player.create = function (socket) {
  var id = uuid.v4();
  var player = {
    getId: function () {
      return id;
    },
    getSocket: function () {
        return socket;
    }
  };
  return player;
};

module.exports = Player;
