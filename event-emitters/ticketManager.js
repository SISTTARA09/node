const EventEmitter = require("events");

class TicketManager extends EventEmitter {
	constructor(supply) {
		super();
		this.supply = supply;
	}
	buy(email, price) {
		if (this.supply > 0) {
			this.supply--;
			this.emit("buy", email, price, Date.now());
			return;
		} else {
			this.emit("error", new Error("there are no more tickets!"));
		}
	}
}

module.exports = TicketManager;
