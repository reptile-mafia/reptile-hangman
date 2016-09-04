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
  this.timeout(50000);
  var api;
  var server;
  var apis;

  beforeEach('Start Server', function (done) {
    server = http.createServer();
    var io = server_io(server);
    // Each connection will start a new game with word 'monday'
    io.on('connection', singleRoomServer(io, function () {
      return 'flood'; // Word will be flood for every game
    }) );
    server.listen(port, function () {
      done();
    });
  });

  afterEach(function (done) {
    console.log('spin server DOWN')
    server.close(function () {
      done();
    });
  });

  beforeEach('Start Client', function () {
    api = new ServerAPI(port);
    api.connect();
  });

  // afterEach('Disconnect Client', function () {
  //   api.disconnect();
  // });

  beforeEach(function () {
    var count = 10;
    apis = [];
    for (var i = 0; i < 6; i++) {
      var a = new ServerAPI(port);
      apis.push(a);
      a.connect();
      // a.connect(function () {
      //   count -= 1;
      //   if (count === 0) {
      //     done();
      //   }
      // });
    }
  });

  // afterEach('Disconnect Client', function () {
  //   for (var i = 0; i < 6; i++) {
  //     var a = new ServerAPI(port);
  //   }
  // });

  xit('should fire callback registered via onStartGame on connection', function (done) {
    // callback will receive object { word: [ ..array of nulls or strings ] }
    api.onStartGame(function (res) {
      expect(res).to.be.defined;
      expect(res.word).to.be.defined;
      expect(res.word).to.deep.equal([null, null, null, null, null]);
      done();
    });
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

});
