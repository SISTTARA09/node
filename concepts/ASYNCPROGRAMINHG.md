<h3>Asynchronous Programing</h3>

<i>
Asynchronous code means that things can happen independently of the main program flow</i>

<h4>Event Emitter</h4>

<pre>
Meaning Of Emitted
the corresponding callback be called.
</pre>

<h5>1-Emitting Events</h5>

<i>
there's two common ways to create an event emitter in nodejs.
the first is to use an event emitter object directly
the scond is to create an object that extends the event emitter object
</i>

<i>
 If the events you want to emit are independent of your business objects or are a result of actions from many business objects, you would instead create an independent event emitter object that’s referenced by your objects.
</i>

<i>
If the events you want to emit are an effect of an object’s actions, you would likely extend from the event emitter object to have access to its functions for convenience.
</i>

<h6>first</h6>

Let’s begin by creating a standalone, event-emitting object.

```sh
# make drictory
mkdir event-emitters

# then open it

cd event-emitters

# create the file

touch firstEventEmitter.js

```

```js
// we emit events via the EventEmitter class

const { EventEmitter } = require("events");

// With the class imported, we can use it to create a new object instance from it:

const firstEmitter = new EventEmitter();

// Let’s emit an event

firstEmitter.emit("My first event", ...args); //emit("name of event") is used to fire events

// args are allow us to send data to our listeners
```

NOTE:
While we don’t capture it in this example, the emit() function returns true if there are listeners for the event. If there are no listeners for an event, it returns false.

```sh
node firstEventEmitter.js
```

you will see no output in the terminal. That’s because we do not log any messages in firstEventEmitter.js and there’s nothing that listens to the event that was sent. The event is emitted, but nothing acts on these events.

<h6>Second</h6>

<i>Let’s work toward seeing a more complete example of publishing, listening to, and acting upon events. We’ll do this by creating a ticket manager example application. The ticket manager will expose a function to buy tickets. When a ticket is bought, an event will be sent with details of the purchaser.</i>

let's begin with creating our ticket manager

```js
["ticketManager.js"];
const EventEmitter = require("events");

class TichetManager extends EventEmitter {
	// 'supply' number of tickets that we will work with
	constructor(supply) {
		super();
		// This is a number detailing the initial supply of tickets we can sell.
		this.supply = supply;
		///
	}
}
```

Now, let’s add a buy() method that will be called when a ticket is purchased. This method will decrease the supply by one and emit an event with the purchase data.

```js
["ticketManager.js"];
const EventEmitter = require("events");

class TichetManager extends EventEmitter {
	constructor(supply) {
		super();
		this.supply = supply;
	}
	// accept two arguments
	buy(email, price) {
		///
		this.supply--;
		// 'email, price' we will get them when we will call the buy method
		this.emit("buy", email, price, Date.now());
		///
	}
}
```

We’ve finished our setup for the event emitter TicketManager. Now that we’ve put things in place to push events, we can move on to reading and processing those events. To do that, we will create event listeners in the next step.

<h5>Listening for Events</h5>

<i>Node.js allows us to add a listener for an event with the on() function of an event emitter object.</i>

SYNTAX:

```js
'eventEmitter'.on('event_name', 'callback_function') {
    'action'
}
```

NOTE:
Node.js aliases the on() method with addListener(). They perform the same task. In this tutorial, we will continue to use on().

EXAMPLE:

```js
["firstListener.js"];
// import the TicketManager Class
const TicketManager = require("./ticketManager");
///

const ticketManager = new TicketManager(10); // create a new child manager

ticketManager.on("buy", () => {
	console.log("someone bought a ticket!");
});

ticketManager.buy("test@email.com", 20);
```

OUTPUT:

```sh
node
Someone bought a ticket!
Someone bought a ticket!
```

Another Way (using once)

<i>
 when the event is emitted and received by a listener that uses once(), Node.js automatically removes the listener and then executes the code in the callback function.
</i>

```js
["firstListener.js"];

ticketManager.once("buy", () => {
	console.log("This is only called once");
});

ticketManager.buy("test2@email.com", 20);
```

<h5>3- Capturing Event Data</h5>

<i>

We’ll begin by creating some new Node.js modules: an email service and a database service.
They’ll be used to simulate sending an email and saving to a database respectively.
We’ll then tie them all together with our main Node.js script—index.js.</i>

<h6>Creating emailService</h6>

```js
["emailService.js"];

class EmailService {
	send(email) {
		console.log("an email will be send to " + email);
	}
}
module.exports = EmailService;
```

<h6>Creating datbaseService</h6>

```js
["databaseService.js"];

class DatabaseService {
	save(email, price, timestamp) {
		console.log(
			`Running qurety: INSERT INTO orders VALUES 
			(email, price, created) VALUES (${email}, ${price}, ${timestamp}) `
		);
	}
}

module.exports = DatabaseService;
```

<h6>generate the operation in the index</h6>

```js
["index.js"];

const TicketManager = require("./ticketManager");
const DatabaseService = require("./databaseService");
const EmailService = require("./emailService");

const ticketManager = new TicketManager(3);
const databaseService = new DatabaseService();
const emailService = new EmailService();

ticketManager.once('buy' (email, price, timestamp) => {
	emailService.send(email)
databaseService.save(email,price, timestamp)
})

```

OUTPUT:

```sh
mail sending to gmail.com! # from emailService
Running qurety: INSERT INTO orders VALUES (email, price, created) VALUES (gmail.
com, 20, 1698677327097) #from databaseService

```

<h5>Error Handling!</h5>

<i>in Case that we have, no more tickets to sell.
we will show an error to the customer.</i>

```js
["ticketManager.js"];

const EventEmitter = require("events");

class TicketManager extends EventEmitter {
	constructor(supply) {
		super();
		this.supply = supply;
	}
	buy(email, price) {
		// if there are tickets sell them
		if (this.supply > 0) {
			this.supply--;
			this.emit("buy", email, price, Date.now());
			return;
		}
		///
		// if there is no more tickets throw an error
		else {
			this.emit("error", new Error("there are no more tickets!"));
		}
		///
	}
}

module.exports = TicketManager;
```

```js
["index.js"];
// listenning on an error
ticketManager.on("error", (error) => {
	console.log(`unfortunatly, ${error.message}`);
});
```

<h5>managing event listeners</h5>

<h6>lenght of listeners</h6>

```js
["index.js"];

log(`number of listeners ${ticketManager.listenerCount("buy")}`);
log(`number of listeners ${ticketManager.listenerCount("error")}`);
```

OUTPUT:

```sh
number of listeners 1
```

<h6>to remove a listener</h6>

```js
["index.js"];

const onBuy = () => {
	log("Temporary!!");
};

ticketManager.on("buy", onBuy);

ticketManager.off("buy", onBuy); // this will remove the onBuy Listener.
```

<h6>To remove all The listeners</h6>

```js
["index.js"];
// this will remove all the listeners
ticketManager.removeAllListeners("buy");
///
```

<h4>Asynchronous programming</h4>

<h5>Promises</h5>

```js
let x = 0;
const myPromise = new Promise((res, rej) => {
	if (x > 0) {
		res("I'm Positive :)");
	} else rej(new Error("I'm Negative!!"));
}).then(
	(resp) => console.log(resp),
	(err) => console.log(err.message)
);
```

<h5>Async/await</h5>

```js

```

<h5>callback</h5>

```js
function first(no, nt, cb) {
	return cb(no, nt);
}

function add(o, s) {
	return o + s;
}
function min(o, s) {
	return o - s;
}

log(first(1, 2, add));
```

<h5>setTimeout</h5>

```js
function myTime() {
	const mySetTime = setTimeout(() => {
		log("Hello!");
	}, 1000);
	// myClear(mySetTime); // f u run will not execut
}

function myClear(set) {
	return clearTimeout(set); // to clear the time
}
myTime();
```

<h5>setInterval</h5>

```js
function myTime() {
	const mySetTime = setInterval(() => {
		log("Hello!");
	}, 1000);
	// myClear(mySetTime); // f u run will not execut
}

function myClear(set) {
	return clearInterval(set); // to clear the interval
}
myTime();
```

<h5>setImmidiate</h5>

<i>
The setImmediate function delays the execution of a function to be called after the current event loops finish all their execution. It’s very similar to calling setTimeout with 0 ms delay.</i>

<h5>process.nextTick()</h5>
<i>Every time the event loop takes a full trip, we call it a tick. When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation before the next event loop tick starts.</i>

<h4>Event Loop</h4>

<pre>The Event Loop is one of the most critical aspects of Node.js. Why is this so important? Because it explains how Node.js can be asynchronous and have non-blocking I/O, it explains the “killer feature” of Node.js, which made it this successful.</pre>

<h5>Event Loop Shema</h5>

<img src="./imgs/eventLoop.png" >

<h5>Execution Shema</h5>

<img src="./imgs/processShema.png" >

```js
const fs = require("fs");
const { log } = require("console");

setTimeout(() => {
	log("setTimeout 1");
	process.nextTick(() => log("proprocess.nextTick 2"));
}, 0);

process.nextTick(() => log("process.nextTick 1"));

Promise.resolve().then(() => log("Promise 1"));

fs.readFile(__filename, () => log("file Name I/O 1"));

setImmediate(() => log("setImmediate 1"));
```

OUTPUT:

```sh
process.nextTick 1
Promise 1
setTimeout 1
proprocess.nextTick 2
setImmediate 1
file Name I/O 1
#
# setImmediate goes first because the file takes time to be ready
#
```

<h6>libuv</h6>

<i>libuv as webAPI, is a place that, when any function needs time goes to it until it complete then it will go to its queue</i>

<h6>call stack<h6>

<i>call stack is the place where the function are gone to execute,
we can say that it is the priciple of running our code</i>

<h6>Memory heap</h6>

<i>In Node.js, the memory heap refers to the region of a computer's memory where Node.js manages memory for objects and data structures used by JavaScript code. When you create objects, arrays, or other data structures in your Node.js application, they are allocated memory in the heap.</i>
