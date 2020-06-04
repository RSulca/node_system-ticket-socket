const fs = require('fs')

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = require('../data/data.json')
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.resetCount()
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.recordFile();
        return `Ticket ${this.last}`;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return {
                err: true,
                message: 'Not tickets'
            }
        }
        let numberTicket = this.tickets[0].number;
        this.tickets.shift();
        let ticket = new Ticket(numberTicket, desktop);
        this.last4.unshift(ticket);
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }
        console.log(this.last4);
        this.recordFile();
        return {
            number: numberTicket,
            desktop
        }
    }


    currentTicket() {
        return `Ticket ${this.last}`;
    }

    resetCount() {
        this.recordFile()
        this.tickets = [];
        this.last4 = [];
        console.log('Reset the system');
    }

    recordFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}