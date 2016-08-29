var chai = require('chai');
var expect = chai.expect;
var server = require('http').createServer();
var server_io = require('socket.io')(server);
var game = require('../../server/models/hangmangame.js');
var controller = require('../../server/controllers/hangmancontroller.js');
import ServerAPI from '../../client/models/ServerAPI.js';

var port = process.env.PORT || 4001;


describe('ServerAPI', function () {
  this.timeout(2000);
  var api;

  before('Start Server', function (done) {
    // Each connection will start a new game with word 'monday'
    server_io.on('connection', function (socket) {
      controller(socket, game.create('flood'));
    });
    server.listen(port, function () {
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

  it('should fire callback registered via onStartGame on connection', function (done) {
    // callback will receive object { word: [ ..array of nulls or strings ] }
    api.onStartGame(function (res) {
      expect(res).to.be.defined;
      expect(res.word).to.be.defined;
      expect(res.word).to.deep.equal([null, null, null, null, null]);
      done();
    });
  });

  it('should fire callback registered via onCorrectGuess when a correct guess is made', function (done) {
    api.onCorrectGuess(function (res) {
      expect(res).to.be.defined;
      expect(res.guessedLetters).to.deep.equal(['o']);
      expect(res.word).to.deep.equal([null, null, 'o', 'o', null]);
      done();
    });

    api.makeGuess('o');
  });

  it('should fire callback registered via onIncorrectGuess when an incorrect guess is made', function (done) {
    api.onIncorrectGuess(function (res) {
      expect(res).to.be.defined;
      expect(res.guessedLetters).to.deep.equal(['z']);
      done();
    });

    api.makeGuess('z');
  });

  it('should fire callback registered via onWin when a game is won', function (done) {
    api.onWin(function () {
      expect(true);
      done();
    });

    api.makeGuess('f');
    api.makeGuess('l');
    api.makeGuess('o');
    api.makeGuess('d');
  });

  it('should fire callback registered via onLose when a game is lost', function (done) {
    api.onLose(function () {
      expect(true);
      done();
    });

    api.makeGuess('z');
    api.makeGuess('y');
    api.makeGuess('n');
    api.makeGuess('q');
    api.makeGuess('p');
    api.makeGuess('x');
  });

});
