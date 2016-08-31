var chai = require('chai');
var expect = chai.expect;
var Player = require('../../server/models/player.js');


describe("Player", function () {
  describe("create", function () {
    it("should create a new player", function () {
      var player = Player.create();
      expect(player).to.be.defined;
      expect(player).to.be.an('object');
    });
  });
});
