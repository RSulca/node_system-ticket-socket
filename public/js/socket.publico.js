var socket = io();

let t1 = $('#lblTicket1');
let e1 = $('#lblEscritorio1');
let t2 = $('#lblTicket2');
let e2 = $('#lblEscritorio2');
let t3 = $('#lblTicket3');
let e3 = $('#lblEscritorio3');
let t4 = $('#lblTicket4');
let e4 = $('#lblEscritorio4');

let value = [[t1, e1], [t2, e2], [t3, e3], [t4, e4]];

socket.on('currentState', function (data) {
    // console.log(data);
    refresh(data.last4);
    // console.log(value);
})

socket.on('refresh', function(resp){
    // console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');;
    audio.play();
    refresh(resp.data);
})

function refresh(data) {
    for (const item in data) {
        value[item][0].text('Ticket: ' + data[item].number);
        value[item][1].text('Desktop: ' + data[item].desktop);
    }
}