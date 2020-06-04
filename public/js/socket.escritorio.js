var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desktop is necessary')
}

var desktop = params.get('escritorio');
$('h1').text('Escritorio ' + desktop);

$('button').on('click', function () {
    socket.emit('attendTicket',{
        desktop: desktop
    }, function(resp){
        if(resp.err){
            alert(resp.message);
            $('small').text(resp.message)
        }
        console.log(resp);
        $('small').text(resp.number)
    })

})



