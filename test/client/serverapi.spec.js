var chai = require('chai');
var expect = chai.expect;
var http = require('http');
var server_io = require('socket.io');
var game = require('../../server/models/hangmangame.js');
// var controller = require('../../server/controllers/hangmancontroller.js');
// Refactored to use our singleRoomServer
var singleRoomServer = require('../../server/controllers/singleroomserver.js');
import ServerAPI from '../../client/models/ServerAPI.js';

var port = process.env.PORT || 4001;

describe('ServerAPI', function () {
  this.timeout(2000);
  var api;
  var server;
  var apis;
  var restartDelay = 50; // set low restartDelay so tests are fast
  beforeEach('Start Server', function (done) {
    server = http.createServer();
    var io = server_io(server);
    // Each connection will start a new game with word 'monday'
    io.on('connection', singleRoomServer(io, function () {
      return 'flood'; // Word will be flood for every game
    }, restartDelay));
    server.listen(port, function () {
      done();
    });
  });

  afterEach(function (done) {
    server.close(function () {
      done();
    });
  });

  beforeEach('Start Client', function () {
    api = new ServerAPI(port);
    api.connect();
  });

  afterEach('Disconnect Client', function () {
    api.disconnect();
  });

  beforeEach(function () {
    var count = 10;
    apis = [];
    for (var i = 0; i < 6; i++) {
      var a = new ServerAPI(port);
      apis.push(a);
      a.connect();
    }
  });

  afterEach('Disconnect Client', function () {
    for (var i = 0; i < 6; i++) {
      var a = new ServerAPI(port);
    }
  });

  it('should fire callback registered via onEnterRoom on connection', function (done) {
    // callback will receive object { word: [ ..array of nulls or strings ] }
    api.onEnterRoom(function (res) {
      expect(res).to.be.defined;
      expect(res.gameState).to.be.defined;
      expect(res.gameState.word).to.deep.equal([null, null, null, null, null]);

      done();
    });
  });

  it('should fire callback registered via onCorrectGuess when a correct guess is made', function (done) {
    api.onCorrectGuess(function (res) {
      expect(res).to.be.defined;
      expect(res.gameState.guessedLetters).to.deep.equal(['o']);
      expect(res.gameState.word).to.deep.equal([null, null, 'o', 'o', null]);
      done();
    });

    api.makeGuess('o');
  });

  it('should fire callback registered via onIncorrectGuess when an incorrect guess is made', function (done) {
    api.onIncorrectGuess(function (res) {
      expect(res).to.be.defined;
        expect(res.gameState.guessedLetters).to.deep.equal(['z']);
      done();
    });

    api.makeGuess('z');
  });

  it('should fire callback registered via onWin when a game is won', function (done) {
    api.onWin(function () {
      expect(true);
      done();
    });

    apis[0].makeGuess('f');
    apis[1].makeGuess('l');
    apis[2].makeGuess('o');
    apis[3].makeGuess('d');
  });

  it('should fire callback registered via onLose when a game is lost', function (done) {
    api.onLose(function () {
      expect(true);
      done();
    });

    apis[0].makeGuess('z');
    apis[1].makeGuess('y');
    apis[2].makeGuess('n');
    apis[3].makeGuess('q');
    apis[4].makeGuess('p');
    apis[5].makeGuess('x');
  });

  it('should fire callback registered via onStartGame on when a new Game is created', function (done) {
    var t1 = Date.now(); // Check that restart time is being honored
    api.onStartGame(function (res) {
      expect(res).to.be.defined;
      expect(res.gameState.word).to.be.defined;
      expect(res.gameState.word).to.deep.equal([null, null, null, null, null]);
      var t2 = Date.now();
      expect(t2 - t1).to.be.above(restartDelay);
      done();
    });
    // Win game in order to trigger a startGame event
    apis[0].makeGuess('f');
    apis[1].makeGuess('l');
    apis[2].makeGuess('o');
    apis[3].makeGuess('d');
  });

  it("should report other players when enterRoom is triggered", function (done) {
    var apiNew = new ServerAPI(port);
    apiNew.connect();
    apiNew.onEnterRoom(function (res) {
      var players = res.players;
      for (var i = 0; i < players.length; i++) {
        expect(players[i].getId).to.be.defined;
      }
      done();
    });
  });

});
