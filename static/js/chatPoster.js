$(function () {
        var socket = io();
        console.log(socket);
        $('form').submit(function(){
          var userName = $('#name').text();
          var input = userName + ': ' + $('#m').val();
          socket.emit('chat message', input);
          console.log($('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });