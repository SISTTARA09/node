const TicketManager = require("./ticketManager");

const ticketManager = new TicketManager(10);

// ticketManager.on("buy", () => {
// 	console.log("someone bought a ticket!");
// });

ticketManager.once("buy", () => {
	console.log("this is only called once");
});
ticketManager.buy("test@email.com", 20);
// ticketManager.buy("test@email.com", 20);
// ticketManager.buy("test@email.com", 20);
