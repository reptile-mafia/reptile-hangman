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
  describe("getId", function () {
    it("should return the player's Id", function () {
      var player = Player.create();
      expect(player.getId()).to.be.a('string');
    });
  });
});
