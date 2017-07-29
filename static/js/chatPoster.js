
        var socket = io.connect();
        console.log(socket)

        $('form').submit(function(){
          console.log($('#m').val());
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });

        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });

        $('#messages').append($('<li>').text('Chater joined'));


console.log('Poster');