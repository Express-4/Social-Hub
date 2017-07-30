const init = (app) => {
    console.log('chat init');
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    });

//     io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });


    return Promise.resolve(server);
};

module.exports = {
    init,
};
