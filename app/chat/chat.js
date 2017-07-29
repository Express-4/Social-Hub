var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.listen(http);

io.sockets.on('connection', function(socket){
    socket.emit('message', {'message': 'hello world'});
});