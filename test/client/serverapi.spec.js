var chai = require('chai');
var expect = chai.expect;
var server = require('http').createServer();
var server_io = require('socket.io')(server);
var game = require('../../server/models/hangmangame.js');
var controller = require('../../server/controllers/hangmancontroller.js');
import ServerAPI from '../../client/models/ServerAPI.js';

var port = process.env.PORT || 4001;


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
    // client = io.connect('http://127.0.0.1:4000');
  });

  afterEach('Disconnect Client', function () {
    // client.disconnect();
  });

  it('should create a new game on connection', function (done) {
    expect(false).to.equal(true);
  });

});
