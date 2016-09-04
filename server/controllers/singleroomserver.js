//  _______________________________________
// / I am a simple server with support for \
// \ only one room!                        /
//  ---------------------------------------
//        \   ^__^
//         \  (oo)\_______
//            (__)\       )\/\
//                ||----w |
//                ||     ||
var Player = require('../models/player.js');
var RoomController = require('../roomcontroller.js');
var randomWords = require('random-words');
// Simple server for socket.io on 'connection' events
// Server will:
// 1.) Create a new RoomController
// 2.) Create a new Room and a new Game through RoomController
// 3.) Return a new Handler for incoming socket connections

// Returned Handler will:
// 1.) Create a new Player for each incoming connection
// 2.) Add Player to Room

// To Use:
// Invoke exported function with server's socket io
// this will create a new handler that can be used in io.on('connection')

// Takes an optional firstGameSolution for testing purposes
module.exports = function (io, firstGameSolution) {
  // Create RoomController to manage Room and Game
  var controller = RoomController.create(io);
  // Configure RoomController to use a random word for each new Game
  controller.setWordGenerator(function () {
    return randomWords(1)[0];
  });
  // Initialize RoomController to restart games after a 30 second delay
  controller.setRestartDelay(30000);
  // initialize with provided word for testing
  controller.newGame(firstGameSolution);
  // Return our connection handler
  return function onConnectionHandler (socket) {
    // Treat each new connection as a new Player
    var player = Player.create(socket);
    // Server has only one room so add all Players
    controller.join(player);
  };
}
