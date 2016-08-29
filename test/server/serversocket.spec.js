var chai = require('chai');
var expect = chai.expect;
var io = require('socket.io-client');
var server = require('http').createServer();
var server_io = require('socket.io')(server);
var game = require('../../server/models/hangmangame.js');
var controller = require('../../server/controllers/hangmancontroller.js');

var port = process.env.PORT || 4000;

describe('HangmangGameServer', function () {
  this.timeout(2000);
  var client;

  before('Start Server', function (done) {
    // Each connection will start a new game with word 'monday'
    server_io.on('connection', function (socket) {
      controller(socket, game.create('monday'));
    });
    server.listen(port, function () {
      done();
    });
  });

  beforeEach('Start Client', function () {
    client = io.connect('http://127.0.0.1:4000');
  });

  afterEach('Disconnect Client', function () {
    client.disconnect();
  });

  it('should create a new game on connection', function (done) {
    client.on('startGame', function (data) {
      expect(data).to.have.property('word');
      expect(data.word).to.be.an('array');
      expect(data.word).to.deep.equal([null, null, null, null, null, null]);
      done();
    });
  });

  it('should emit incorrectGuess and send remainingGuesses and guessedLetters on incorrect guess', function (done) {
    client.on('incorrectGuess', function (data) {
      expect(data).to.have.property('remainingGuesses');
      expect(data.remainingGuesses).to.be.equal(5);
      expect(data).to.have.property('guessedLetters');
      expect(data.guessedLetters).to.deep.equal(['z']);
      done();
    });
    client.emit('guessLetter', { letter: 'z' });
  });

  it('should emit correctGuess and send remainingGuesses and guessedLetters on correct guess', function (done) {
    client.on('correctGuess', function (data) {
      expect(data).to.have.property('remainingGuesses');
      expect(data.remainingGuesses).to.be.equal(5);
      expect(data).to.have.property('guessedLetters');
      expect(data.guessedLetters).to.deep.equal(['z', 'm']);
      done();
    });
    client.emit('guessLetter', { letter: 'z' });
    client.emit('guessLetter', { letter: 'm' });
  });

  it('should emit win event on a victory', function (done) {
    client.on('win', function (data) {
      expect(true);
      done();
    })
    client.emit('guessLetter', { letter: 'm' });
    client.emit('guessLetter', { letter: 'o' });
    client.emit('guessLetter', { letter: 'n' });
    client.emit('guessLetter', { letter: 'd' });
    client.emit('guessLetter', { letter: 'a' });
    client.emit('guessLetter', { letter: 'y' });
  });


  it('should emit loss event on a loss', function (done) {
    client.on('loss', function (data) {
      expect(true);
      done();
    })
    client.emit('guessLetter', { letter: 'q' });
    client.emit('guessLetter', { letter: 'w' });
    client.emit('guessLetter', { letter: 'e' });
    client.emit('guessLetter', { letter: 'r' });
    client.emit('guessLetter', { letter: 't' });
    client.emit('guessLetter', { letter: 'z' });
  });

});
