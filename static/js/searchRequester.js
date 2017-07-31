$('form').submit(function(){
    console.log($('#searchField').val());
    var username = $('#searchField').val();
    console.log('/search/' + username);
    $.ajax({
        url: '/profile/search/' + username,
        method: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({username: username}),
        success: function(res){
            $('.container.body-content').html(res);

            console.log(res);
        }
});

    $('#searchField').val('')
    return false;
});