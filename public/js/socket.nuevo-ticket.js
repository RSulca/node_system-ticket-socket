var socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('currentState', function(data) {
    label.text(data.current)
})

$('button').on('click', function () {
    socket.emit('nextTicket', null, function (resp) {
        label.text(resp)
    })
    var audio = new Audio('audio/give-ticket.mp3');
    audio.play();
})