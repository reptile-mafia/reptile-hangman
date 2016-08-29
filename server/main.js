var path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var game = require('./models/hangmangame.js');
var controller = require('./controllers/hangmancontroller.js');

app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

io.on('connection', function (socket) {
  controller(io, game.create('monday'));
  // socket.emit('start', { word: [null, null, null] });
});

// If not in test environment start server
if (process.env.NODE_ENV !== 'test') {
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on localhost:" + port);
}
// Export server for use in tests
module.exports = server;
