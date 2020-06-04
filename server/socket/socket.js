const { io } = require('../server')
const { TicketControl } = require('../classes/ticketControl')

const tc = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, call) => {
        let numberTicket = tc.nextTicket();
        console.log(numberTicket);
        call(numberTicket);
    })
    client.emit('currentState', {
        current: tc.currentTicket(),
        last4: tc.last4
    })
    client.on('attendTicket', (data, call) => {
        if (!data.desktop) {
            call({
                err: true,
                message: ticket
            })
        }
        let ticket = tc.attendTicket(data.desktop);
        call(ticket)
        
        client.broadcast.emit('refresh', {
            data: tc.last4
        })
    })

})

