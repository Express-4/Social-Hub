$(function () {
        var socket = io();
        console.log(socket);
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          console.log($('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });