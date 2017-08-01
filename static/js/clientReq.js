console.log('tuka');
$('#addButton').click(function(){
    var username = $('h3').text();
    console.log(username + 1);
//     $.ajax({
//         url: '/profile/search/' + username,
//         method: 'GET',
//         contentType: 'application/json',
//         data: JSON.stringify({username: username}),
//         success: function(res){
//             $('.container.body-content').html(res);

//             console.log(res);
//         }
// });

    return false;
});