// Automatically join the room on connection
var Room = require('../models/room.js');

var RoomController = {};

RoomController.create = function (io) {
  var room = Room.create();

  // Configure Room Events
  room.onCorrectGuess(function (player, letter, cooldown) {
    io.in(room.getId()).emit('correctGuess', {
      playerId: player.getId(),
      coolDown: cooldown,
      gamestate: room.getGame().getState(),
    });
  });

  var controller = {
    newGame: function (solution) {
      room.newGame(solution)
    },
    getRoom: function () {
      return room;
    },
    join: function (player) {
      room.join(player);
      var socket = player.getSocket();
      socket.join(room.getId());
      // Configure Events
      socket.on('disconnect', function () {
          // Leave our Room model
          room.leave(socket.id);
          // Broadcast a playerLeaveRoom event to other sockets
          io.in(room.getId()).emit('playerLeaveRoom', { playerId: player.getId() });
      });

      socket.on('guessLetter', function (data) {
        room.guessLetter(player, data.letter);
      });

      // Send initial Events
      socket.emit('enterRoom', {
        players: room.getPlayers()
      });
      socket.broadcast.to(room.getId())
        .emit('playerEnterRoom', { playerId: player.getId() });
    }
  }



  return controller;
}

module.exports = RoomController;
