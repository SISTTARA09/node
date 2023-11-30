## Command line Apps

### Command Line Apps

#### process.argv

```js
// print process.argv
process.argv.forEach((val, index) => {
	console.log(`${index}: ${val}`);
});
console.log(process.argv);
```

```sh
$ node ./cmd/index.js two three # two, three are passed
0: C:\Program Files\nodejs\node.exe # path of node
1: C:\Users\dell\learning\nodejs\cmd\index.js # __filename
2: two # ...args
3: three
[ # list of args
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\dell\\learning\\nodejs\\cmd\\index.js',
  'two',
  'three'
]
```

#### commander

<i>
commander.js is a package from {npm},
is used to build CLIs
</i>

### Environment variables

#### process.env

<i>
The process.env property returns an object containing the user environment.
</i>

```js
const { env } = require("node:process");

// assigning

env.foo = "foo";

log(env.foo); // prints => foo

// delete

delete env.foo;

log(env.foo); // undefined
```

NOTES:

<pre>
- Assigning a property on process.env will implicitly convert the value to a string.
- On Windows operating systems, environment variables are case-insensitive.
</pre>

#### dotenv package

<i>
dotenv is a zero-dependency module that loads environment variables from a .env file into process.env</i>

##### install

```sh
npm i dotenv
```

##### defining variables

```.env
API_KEY = abcdef
```

##### deliver variables to process.env

```js
require("dotenv").config(); // required to deliver
const { env } = require("node:process");

const API_KEY = env.API_KEY;
log(API_KEY); // abcdef
```

NOTE:

<pre>
in case of publishing to gitub,
- use ".gitignore" to igone the ".env" file
</pre>

#### EXIT and exiting codes

```js
// process.exit(code)
/*
this method is used to terminate the running
the code passed,
we can get it from listening "exit" on process as mentioned bottom
*/

process.on("exit", (code) => {
	log(code);
});
if (true) {
	log(true);
	process.exit(369); // exit with 369 code
}
```

#### Taiking inputs

##### process.stdin

```js
process.stdin.on("data", (data) => {
	console.log(`You typed ${data.toString()}`);
	process.exit();
});
```

NOTE:

<pre>
using package is more efficient. and best practice
</pre>

##### prompts package

- install

```sh
npm i -d prompts
```

- examples

```js
import prompts from "prompts";
// SINGLE PROMPT

(async () => {
	const response = await prompts({
		type: "check",
		name: "meaning",
		message: "What is the meaning of life?",
	});

	log(response.meaning);
})();

// PROMPT CHAIN

const list = [
	{
		type: "text",
		name: "userName",
		message: "What is your Name",
	},
	{
		type: "number",
		name: "age",
		message: "What is your age",
	},
];
(async () => {
	const { userName, age } = await prompts(list);
	log(userName, age);
})();

// DYNAMIC PROMPTS

const questions = [
	{
		type: "text",
		name: "dish",
		message: "Do you like pizza?",
	},
	{
		type: (prev) => (prev == "pizza" ? "text" : null),
		name: "topping",
		message: "Name a topping",
	},
];

(async () => {
	const response = await prompts(questions);
})();
```

#### Printing output

##### stdout & stderr

<pre>
same but :
stdout => console.log </br>
stderr => console.error </br>

there are more diferences in I/O;
</pre>

```js
process.stdout.write("what is your name!\n"); // used to print "what is your name"

// listening to the input field only one time
process.stdin.once("data", function (data) {
	const userName = data.toString("utf-8"); // get the user name
	process.stdout.write(`how old are you? ${userName}`); // print 'how old are you'
	process.stdin.once("data", function (data) {
		// listen to age
		const userAge = data.toString("utf-8"); // get the user age
		log(`Hello ${userName}, you are ${userAge}`); // log user informations
		process.stderr.write("football"); // as stdout diference in the I/O stream
		process.exit(0); // exit the program
	});
});
```

##### Chalk & figlet Packages

- CHALK PACKAGE

install

```sh
npm i chalk
```

Syntax:

```js
log(chalk.bold("Hello world!"));
```

API

<pre>
red, blue,...,
bgRed, bgBlue,...,
bold, dim, italic, underline,inverse. 
</pre>

- FIGLET PACKAGE

install

```sh
npm i figlet
```

Syntax:

```js
log(
	figlet.textSync(
		"Sisttara",
		{
			font: "Efti Robot",
			horizontalLayout: "fitted",
			verticalLayout: "controlled smushing",
		},
		(err, text) => {
			if (err) {
				console.log("Something went wrong...");
				console.dir(err);
				return;
			}
			console.log(chalk.red(text));
		}
	)
);
```

API

<pre>
font: "gost" | "Efti Robot" | "Fun Faces",
horizontalLayout, verticalLayout: "fitted" | "controlled smushing", 'full',..., 
width: undefined | 80 | number...,
whiteSpaceBreak: true | false ,
</pre>

EXAMPLE:

```js
import chalk from "chalk";
import figlet from "figlet";

chalk.bgRed(
	figlet.text(
		"Sisttara",
		{
			width: undefined,
			font: "Fun Faces",
			horizontalLayout: "fitted",
			verticalLayout: "controlled smushing",
		},
		(error, text) => {
			if (error) {
				log("Something went wrong...");
				dir(error);
				return;
			}
			log(chalk.red(text)); //
		}
	)
);
```
