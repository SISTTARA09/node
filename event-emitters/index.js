const { log } = require("console");

const DatabaseService = require("./databaseService");

const EmailService = require("./emailService");

const TicketManager = require("./ticketManager");

const ticketManager = new TicketManager(3);
const databaseService = new DatabaseService();
const emailService = new EmailService();

ticketManager.on("buy", (email, price, timestamp) => {
	emailService.send(email);
	databaseService.save(email, price, timestamp);
	console.log(ticketManager.supply);
});

ticketManager.on("error", (error) => {
	console.log(`unfortunatly, ${error.message}`);
});

// ticketManager.buy("gmail.com", 50);
// ticketManager.buy("gmail.com", 20);
// ticketManager.buy("gmail.com", 30);


const onBuy = () => {
	log("I will Be Remevod Soon!");
};

ticketManager.on("buy", onBuy);

ticketManager.off('buy', onBuy)
log(`number of listerers ${ticketManager.listenerCount("buy")}`);

ticketManager.removeAllListeners('buy')
log(`number of listerers ${ticketManager.listenerCount("buy")}`);