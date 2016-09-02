var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var io = require('socket.io-client');
var server = require('http').createServer();
var server_io = require('socket.io')(server);
var Room = require('../../server/models/room.js');
var Player = require('../../server/models/player.js');
var RoomController = require('../../server/controllers/roomcontroller.js');

var port = process.env.PORT || 4002;

describe('RoomController Basic Features', function () {
  var controller;
  var player;

  beforeEach(function () {
    controller = RoomController.create();
    var pretendSocket = { join: function() {} };
    player = Player.create(pretendSocket);
  });

  describe("create", function () {
    it("should create a new RoomController object", function () {
      var controller = RoomController.create();
      expect(controller).to.be.an('object');
    });
  });
  describe("getRoom", function () {
    it("should return the Room associated with this controller", function () {
      expect(controller.getRoom()).to.be.an('object');
    });
  });
  describe("newGame", function () {
    it("should create a new Game with given solution", function () {
      var solution = 'a';
      controller.newGame(solution);
      expect(controller.getRoom().getGame().getWord()).to.deep.equal([null]);
    });
  });
  // Need to refactor tests to use mock socket or something similar
  xdescribe("join", function () {
    it("should call Room.join with Player for associated room", function () {
      var room = controller.getRoom();
      sinon.spy(room, 'join');
      controller.join(player);
      expect(room.join.calledOnce).to.equal(true);
      expect(room.join.getCall(0).args[0]).to.equal(player);
      room.join.restore();
    });
    it("should add Player socket to channel with Room's Id", function () {
      var socket = player.getSocket();
      var room = controller.getRoom();
      sinon.spy(socket, 'join');
      controller.join(player);
      expect(socket.join.calledOnce).to.equal(true);
      expect(socket.join.getCall(0).args[0]).to.equal(room.getId());
    });
  });
});

describe("RoomController Client/Server Interaction", function () {
  this.timeout(2000);

  var controller;
  var url = 'http://127.0.0.1:' + port;
  var client;

  before('Start Server', function (done) {
    controller = RoomController.create(server_io);
    server_io.on('connection', function (socket) {
      // Create a new player for each connection
      var player = Player.create(socket);
      controller.join(player);
    });
    server.listen(port, function () {
      done();
    });
  });

  describe("join", function () {

    beforeEach('Start Client', function () {
      client = io.connect(url);
    });

    afterEach('Disconnect Client', function () {
      client.disconnect();
    });

    it("should broadcast playerEnterRoom event to all other clients", function (done) {
      client.on('playerEnterRoom', function (data) {
        expect(data.playerId).to.be.a('string');
        done();
      });
      var client2 = io.connect(url);
      client2.disconnect();
    });

    it("should emit enterRoom event to connecting client", function (done) {
      client.on('enterRoom', function (data) {
        expect(data.players).to.be.an('array');
        expect(data.players.length).to.equal(1);
        done();
      });
    });
  });

  describe("disconnect", function () {
    var client1;
    var client2;

    beforeEach('Start Client', function (done) {
      // Make sure both clients are connected before test
      var count = 2;
      var doBoth = function () {
        count -= 1;
        if (count === 0) {
          done();
        }
      };
      client1 = io.connect(url);
      client2 = io.connect(url);
      client1.on('connect', doBoth);
      client2.on('connect', doBoth);
    });

    afterEach('Disconnect Client', function () {
      client1.disconnect();
    });

    it("should emit playerLeaveRoom to other clients on disconnect", function (done) {
      client1.on('playerLeaveRoom', function (data) {
        expect(data.playerId).to.be.a('string');
        done();
      });
      client2.disconnect();
    });
  });



  describe("guessLetter", function () {
    var client1;
    var client2;

    beforeEach('Start Client and Reset Game', function (done) {
      // Reset game on server
      controller.newGame('food');
      // Make sure both clients are connected before test
      var count = 2;
      var doBoth = function () {
        count -= 1;
        if (count === 0) {
          done();
        }
      };
      client1 = io.connect(url);
      client2 = io.connect(url);
      client1.on('connect', doBoth);
      client2.on('connect', doBoth);
    });

    afterEach('Disconnect Client', function () {
      client1.disconnect();
      client2.disconnect();
    });

    it('should emit gamestate, cooldown and playerId on correct guess', function (done) {
      var counter = 2;
      var test = function (data) {
        expect(data.playerId).to.be.a('string');
        expect(data.coolDown).to.be.above(Date.now());
        expect(data.gamestate.word).to.deep.equal([null, 'o', 'o', null]);
        expect(data.gamestate.guessedLetters).to.deep.equal(['o']);
        expect(data.gamestate.remainingGuesses).to.equal(6);
        counter -= 1;
        if (counter === 0) {
          done();
        }
      };
      client1.on('correctGuess', test);
      client2.on('correctGuess', test);
      client2.emit('guessLetter', { letter: 'o' });
    });

    it('should emit gamestate, cooldown and playerId on incorrect guess', function (done) {
      var counter = 2;
      var test = function (data) {
        expect(data.playerId).to.be.a('string');
        expect(data.coolDown).to.be.above(Date.now());
        expect(data.gamestate.word).to.deep.equal([null, null, null, null]);
        expect(data.gamestate.guessedLetters).to.deep.equal(['z']);
        expect(data.gamestate.remainingGuesses).to.equal(5);
        counter -= 1;
        if (counter === 0) {
          done();
        }
      };
      client1.on('incorrectGuess', test);
      client2.on('incorrectGuess', test);
      client2.emit('guessLetter', { letter: 'z' });
    });

  });
});
