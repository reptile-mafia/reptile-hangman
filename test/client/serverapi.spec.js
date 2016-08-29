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

});
