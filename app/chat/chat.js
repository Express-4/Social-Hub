const init = (app) => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
      // socket.on('chat message', function(msg){
        // io.emit('chat message', msg);
      // });
      console.log('a user connected');
    });

    return Promise.resolve(server);
};

module.exports = {
    init,
};
