<h3> Error Handling</h3>

<h4>Describing</h4>

<i>Error handling is a way to find bugs and solve them as quickly as humanly possible. The errors in Node.js can be either operation or programmer errors.</i>

<h5>Programmer Error</h5>

<i>these are the errors caused by the programmer’s mistakes while writing a program. </i>

<pre>
- Array index out of bounds 
- Syntax errors
- Reference errors
- Deprecation errors and warnings
- Type error
</pre>

<h5>Operational Errors</h5>

<i>These are issues during runtime due to external factors that can interrupt the program’s normal flow.</i>

<pre>
- Unable to connect server/database
- Request timeout
- Invalid input from the user
- Socket hang-up
- 500 response from a server
- File not found
</pre>

<i>
you might have to act based on the type of error. For example, restarting the app.
</i>

<h4>Handling Techniques</h4>

<i>
To handle the errors effectively, we need to understand the error delivery techniques.
</i>

There are four fundamental strategies to report errors in Node.js:

- try…catch blocks
- Callbacks
- Promises
- Event emitters

<h5>try…catch blocks</h5>

```js
var fs = require("fs");

try {
	const data = fs.readFileSync("/Users/Kedar/node.txt");
} catch (err) {
	console.log(err);
}

console.log("somthig at the last!");
```

output:

```sh

$node main.js
{ Error: ENOENT: no such file or directory, open '/Users/Kedar/node.txt'
    at Error (native)
    at Object.fs.openSync (fs.js:641:18)
    at Object.fs.readFileSync (fs.js:509:33)
    at Object.<anonymous> (/home/cg/root/7717036/main.js:4:17)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/Kedar/node.txt'
  }
somthig at the last!

```

The error is processed and displayed. In the end, the rest of the code executes as planned.

<h5>Callbacks</h5>

<i>
The purpose of a callback function is to check the errors before the result of the primary function is used. The callback is usually the final argument to the primary function, and it executes when an error or outcome of the operation emerges.
</i>

syntax:

```js
function (err, result) {}
// if there is an error result will be undifined, vice versa
```

Example:

```js
const fs = require("fs");

fs.readFile("/home/Kedar/node.txt", (err, result) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(result);
});
```

output:

```js
{ Error: ENOENT: no such file or directory, open '/home/Kedar/node.txt'
    at Error (native)
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/Kedar/node.txt' }

```

<i>
We can also implement the callbacks with the user-defined functions. </i>

```js
const udf_double = (num, callback) => {
	if (typeof callback !== "function") {
		throw new TypeError(`Expected the function. Got: ${typeof callback}`);
	}

	// simulate the async operation
	setTimeout(() => {
		if (typeof num !== "number") {
			callback(new TypeError(`Expected number, got: ${typeof num}`));
			return;
		}

		const result = num * 2;
		// callback invoked after the operation completes.
		callback(null, result);
	}, 100);
};

// function call
udf_double("2", (err, result) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(result);
});
```

output:

```sh
# we got an error because the parameter entered is a string '2'
TypeError: Expected number, got: string
    at Timeout.setTimeout (/home/cg/root/7717036/main.js:9:16)
    at ontimeout (timers.js:386:14)
    at tryOnTimeout (timers.js:250:5)
    at Timer.listOnTimeout (timers.js:214:5)
```

<h5>Promises</h5>

[To Be Contined...]

<i> let’s convert the example discussed above (udf_double) to utilize promises:</i>

```js
const udf_double = (num) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof num !== "number") {
				// if there's an error throw it
				reject(new TypeError(`Expected number, got: ${typeof num}`));
			}

			const result = num * 2;
			resolve(result); // if there's no error resolve it
		}, 100);
	});
};
```

In the function, we will return a promise, which is a wrapper to our primary logic. We pass two arguments while defining the Promise object:

- resolve — used to resolve promises and provide results
- reject — used to report/throw errors

```js
udf_double("8")
	.then((result) => console.log(result))
	.catch((err) => console.error(err));
```

output:

```sh
TypeError: Expected number, got: string
    at Timeout.setTimeout (/home/cg/root/7717036/main.js:5:16)
    at ontimeout (timers.js:386:14)
    at tryOnTimeout (timers.js:250:5)
    at Timer.listOnTimeout (timers.js:214:5)

```

<h5>Async/await</h5>

<i>
Note that the return value of an async function is a Promise. The await waits for the promise to be resolved or rejected. Let’s implement the readFile example using async/await:
</i>

```js
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const read = async () => {
	try {
		const result = await readFile("/home/Kedar/node.txt");
		console.log(result);
	} catch (err) {
		console.error(err);
	}
};

read();
```

We are creating the async read function in which we are reading the file using await. The output is as below.

```sh

[Error: ENOENT: no such file or directory, open '/home/Kedar/node.txt'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/Kedar/node.txt'
}

```

////////

<h4>Uncaught Exceptions</h4>

<p>
 If you are running Node.js in production you need to at least have an opinion about what to do with uncaught exceptions. For now I suspect most people are restarting their application (maybe gracefully) when an exception is thrown. Domains offer the ability for an application to be more intelligent about what to do when an error is thrown. Exception handlers might choose to clean up after an error is thrown, close some connections or if worst comes to the worst exit the process. The point is you can choose.
</p>

<h4>Stack Trace</h4>

<i>The stack trace is used to trace the active stack frames at a particular instance during the execution of a program. The stack trace is useful while debugging code as it shows the exact point that has caused an error.</i>

<h4>Using dbugger</h4>

<i>
Node.js includes a command-line debugging utility. The Node.js debugger client is not a full-featured debugger, but simple stepping and inspection are possible. To use it, start Node.js with the inspect argument followed by the path to the script to debug.

</i>

EXAMPLE:

```sh
node inspect myscript.js

```

<h4>Types Of Errors</h4>

<h5>Javascript Errors</h5>

<i>JavaScript Errors are used by JavaScript to inform developers about various issue in the script being executed.</i>

<h6>EvalError</h6>

<i>This is thrown when a number is outside an allowable range of values.</i>

EXAMPLE:

```js
const l = console.log;
const arr = [90, 88];
arr.length = 90 ** 99;
```

This number is way past the size arrays can be grown to. Running it will throw a RangeError:

```sh
$ node errors
errors.js:4
arr.length=90**99
 ^
RangeError: Invalid array length
```

because the number we want to increase the arr array to is out of the range specified by JS.

<h6>ReferenceError</h6>

<i>
This error is thrown when a reference made to a variable/item is broken. That is the variable/item doesn’t exist.
</i>

EXAMPLE:

```js
const l = console.log;
const cat = "cat";
cat;
dog;
```

cat will return “cat”, while dog will throw a reference error because the name dog can’t be found on the environment record.

```sh
$ node errors
errors.js:3
dog
^
ReferenceError: dog is not defined
```

NOTE:
an undefined variable won’t throw ReferenceError because it exists in the env record just that its value hasn’t been set.

<h6>SyntaxError</h6>

<i>This error occurs when we type code that the JS engine can understand.

if the syntax/source of our codes doesn’t conform to the syntax rules of JS makes the stages fail and throw SyntaxError. For example,
</i>

EXAMPLE:

```js
const l = console.log
let cat h = "cat"
```

Output:

```sh
$ node errors
errors.js:3
let cat h = "cat"
 ^
SyntaxError: Unexpected identifier
```

<h6>TypeError</h6>

<i>TypeError occurs when an operation is performed on a wrong data type. Maybe a boolean is expected but a sting is found.</i>

```js
const num = 123;
num.toUpperCase();
```

Output:

```sh
$ node errors
errors.js:4
num.toUpperCase()
 ^
TypeError: num.toUpperCase is not a function
```

because the toUpperCase function expects a string data type.

<h6>URIError</h6>

<i>
This indicates that one of the global URI handling functions was used in a way that is incompatible with its definition.</i>

URI (Uniform Resource Indicator) in JS has the functions: decodeURI, decodeURIComponent, etc.

If we call any of them with the wrong parameter we will get a URIError

EXAMPLE:

```sh
decodeURI("%")
^
URIError: URI malformed
```

decodeURI, gets the unencoded version of a URI. “%” is not the right URI, so a URIError was thrown.

<h6>EvalError</h6>
<i>
This is used to identify errors when using the global eval() function.
</i>
[...]

<h6>InternalError</h6>

<i>
This error occurs internally in the JS engine, especially when it has too much data to handle and the stack grows way over its critical limit.
</i>

EXAMPLE:

```js
switch(num) {
 case 1:
 ...
 break
 case 2:
 ...
 break
 case 3:
 ...
 break
 case 4:
 ...
 break
 case 5:
 ...
 break
 case 6:
 ...
 break
 case 7:
 ...
 break
 ... up to 1000 cases
 }
```

Too much recursion, a simple example is this:

```js
function foo() {
	foo();
}
foo();
```

<h5>System Errors</h5>

<i>Node.js generates system errors when exceptions occur within its runtime environment. These usually occur when an application violates an operating system constraint. For example, a system error will occur if an application attempts to read a file that does not exist.</i>

commonly system errors

- EACCES - Permission denied
- EADDRINUSE - Address already in use
- ECONNRESET - Connection reset by peer
- EEXIST - File exists
- EISDIR - Is a directory
- EMFILE - Too many open files in system
- ENOENT - No such file or directory
- ENOTDIR - Not a directory
- ENOTEMPTY - Directory not empty
- ENOTFOUND - DNS lookup failed
- EPERM - Operation not permitted
- EPIPE - Broken Pipe
- ETIMEDOUT - Operation timed out

<h5>User Specified Errors</h5>

<i>
User specified errors can be created by extending the base Error object, a built-in error class. When creating errors in this manner, you should pass a message string that describes the error. This message can be accessed through the message property on the object. The Error object also contains a name and a stack property that indicate the name of the error and the point in the code at which it is created.</i>

EXAMPLE:

```js
class MyError extends Error {
	constructor(name, status, message) {
		super(message);
		this.name = name;
		this.status = status;
	}
}

const firstError = new MyError("MyError", 201, "Check Your Connection");
cl(firstError);
```

<h5>Assertion Errors</h5>

<i>An AssertionError in Node.js is an error that is thrown when the assert module determines that a given expression is not truthy. The assert module is a built-in Node.js module that provides a simple set of assertion tests that can be used to test the behavior of your code.</i>

```js
const assert = require("assert");
const { log } = require("console");

// ----------------------- //

assert.strictEqual("Hello", "hello", "Not The Same STRICT"); // is used for numbers and strings

// ----------------------- //

assert.deepStrictEqual(
	[1, [2, { a: 3 }]],
	[1, [2, { a: "3" }]],
	"Not The Same DEEP"
); // used for complex data types as arrays and obj [nested] also

// ----------------------- //

assert.ok(false, "Not Ok"); // If value is not truthy, log a message

// ----------------------- //

const x = 1;
if (x !== 1) {
	assert.fail("are not equal"); // log an error message
} else {
	log("true");
}

// ----------------------- //

assert.equal("a", "a", "message"); // compare  with '==' operator

// ----------------------- //

// if equals throw an Error Message used for complex data types
assert.notDeepStrictEqual([1, "2"], [1, "2"], "are equals");
///

// ----------------------- //

assert.notStrictEqual("1", "1"); // if equals throw error used for primitive data types

// ----------------------- //

assert.throws(); // [...]

// ----------------------- //

assert.doesNotThrow(); // [...]

// ----------------------- //

assert.ifError(1); // Throws value if value is not undefined or null

// ----------------------- //

assert.match("12 k", /\d\sk/i); // Expects the string input to match the regular expression.

// ----------------------- //

assert.doesNotMatch("1", /\d/); // if the str is not match the regExp

// ----------------------- //
assert.strict(0, "hello"); //  if the value is false then return an error
// ----------------------- //
```

<h4>Async Errors</h4>

<i>Errors must always be handled. If you are using synchronous programming you could use a try catch. But this does not work if you work asynchronous! Async errors will only be handled inside the callback function!</i>

EXAMPLE:

```js
// devide by two function
async function divideByTwo(amount) {
	if (typeof amount !== "number")
		throw new TypeError("amount must be a number");
	if (amount <= 0) throw new RangeError("amount must be greater than zero");
	if (amount % 2) throw new OddError("amount");
	return amount / 2;
}
///

async function run() {
	try {
		const result = await divideByTwo(1);
		console.log("result", result);
	} catch (err) {
		if (err.code === "ERR_AMOUNT_MUST_BE_NUMBER") {
			console.error("wrong type");
		} else if (err.code === "ERR_AMOUNT_MUST_EXCEED_ZERO") {
			console.error("out of range");
		} else if (err.code === "ERR_MUST_BE_EVEN") {
			console.error("cannot be odd");
		} else {
			console.error("Unknown error", err);
		}
	}
}

run();
```
