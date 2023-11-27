## Introduction To Node

### what is node

- Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!
- Node.js runs the V8 JavaScript engine, Google Chrome’s core, outside the browser.
  This allows Node.js to be very performant.
- A Node.js app runs in a single process,without creating a new thread for every request.
- Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally,
  libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.
  "

### why node

- Node.js is a cross-platform runtime, perfect for a wide range of use cases.
- Its huge community makes it easy to get started. It uses the V8 engine to compile JavaScript and runs at lightning-fast speeds.
- Node.js applications are very scalable and maintainable.
- Cross-platform support allows the creation of all kinds of applications - desktop apps,
- software as a service, and even mobile applications.
  "

### History Of Node

"

- Node.js was written initially by Ryan Dahl in 2009, about thirteen years after the introduction of the first server-side JavaScript environment, Netscape’s LiveWire Pro Web.
- The initial release supported only Linux and Mac OS X. Its development and maintenance were led by Dahl and later sponsored by Joyent.
  "

### Node Vs Browser

"

- the comfort of programming everything - the frontend and the backend - in a single language. [What changes is the ecosystem.]
- In the browser, interact with the DOM, or other Web Platform APIs. Those do not exist in Node.js.
- You don't have the document, window and all the other objects that are provided by the browser.
- in Node.js you control the environment
- you know which version of Node.js you will run the application on.
- you can write all the modern ES2015+ JavaScript that your Node.js version supports
- Node.js supports both the CommonJS and ES module systems
- In practice, this means that you can use both require() and import in Node.js, while you are limited to import in the browser.
  "

### Running Node.js Code

"
The usual way to run a Node.js program is to run the globally available node command (once you install Node.js) and pass the name of the file you want to execute
"

```sh
node index.js
```

## Modules

- We split our code into different files to maintain, organize and reuse code whenever possible. A module system allows us to split and include code and import code written by other developers whenever required.
- a module is nothing but a JavaScript file.
- Node.js has many built-in modules that are part of the platform and comes with Node.js installation, for example, HTTP, fs, path, and more.

### CommonJS

#### description:

In CommonJS modules, Node.js treats each JavaScript file as a separate module.

##### Creating a Module

```js [export.js]
const SMAIL = "Smail";

function sayHello(name) {
	return ` Hello ${name}!;`;
}

// the function and the constant now are private, next we will go to export them
```

##### exporting a Module

```js [export.js]
module.exports.samil = SMAIL; // exporting our constant

module.exports.sayHello = sayHello; // exporting our function
```

##### Importing a Module

To import a Module we need to use require() function

```js
[import.js]

const export = require('./export.js')
// Behind the scenes, the require() functionreturns the exports object.
// If the require() function cannot find the file, it’ll throw an error.

console.log(export)

// OUTPUT:

{
  smail: 'Smail',
  sayHello: [Function: sayHello]
}

// You can reference them as follows:

export.sayHello(export.smail)

// OUTPUT:

"Hello Smail!"

```

To Make the code more readable you can use object destrucuring

```js
[import.js]

const { smail, sayHello } = require("./export");

// after destructurig, you can use Variables directly

sayHello(smail);
```

##### Note

```js
[import.js]

module.exports = x; // that will export it as default function

module.exports.x = x; // that will export it in an object.
```

###### Summary

- In the CommonJS modules, Node.js treats a JavaScript file as a module.
- Expose variables and functions to other module by assign them to the properties of the module.exports object.
- Node.js wraps the module code in a module wrapper function before executing it.
- All variables, constants, functions, classes, etc., declared in a module are scoped to the module, not the global scope.
- Node.js executes a module only once and place the result in the cache for the next use.

### ES Modules

<p>ES Modules is an other way we can use to import and export data between files</p>

to do this transaction you have to:

- add "type": "module" in the package.json file
- or add the .mjs extention to the files required

<h4>Exporting</h4>

there are several way to export data:

```js
[exporter.mjs]

// lets export a function that do addition of two givin numbers

// default exporting
export default (num1, num2) => {
	return num1 + num2;
};

// named export

export const add = (num1, num2) => {
	return num1 + num2;
};

// in case you have multiple functions you can export the whole that in one object

const calculations = {
  add: add,
  substructuring: ...
}
export default calculations
```

<h4>Importing</h4>

as you have several ways to export you have others to import

```js
[importer.mjs];

// default Importing
import add from "./exporter.mjs";

console.log(add(1, 2));

// named importing

import { add } from "./exporter.mjs";

// in case of multiple functions in one object

import calculations from "./exporter.mjs";
const { add } = calculations;
console.log(add(1, 2));
```

<h5>Custom Modules</h5>

<p>For Best practice create a file espicialy for Modules</p>

<h5>Global [Keyword]</h5>

<p>The Global keyword is an object that contains all the built-in methods,
when we create a module it will not set to the global
<p>

## npm

<p>DESCRIPTION:</p>
<i>
<i> npm is the standard package manager for Node.js.
It is two things: first and foremost, it is an online repository for the publishing of open-source Node.js projects;
second, it is a command-line utility for interacting with said repository</i>
</i>

<h3>npm Instalation</h3>

<i>
In npm (Node Package Manager), global and local installations refer to where packages are installed on your system.
</i>

<h4>Global Instalation</h4>

<i>
When you install a package globally, it means the package is installed system-wide and can be accessed from any directory in your command line interface. Global packages are typically used for command-line tools that you want to use across different projects.s
</i>

```sh
npm i -g [package-Name]
```

<h4>Local Instalation</h4>

<i> 
Local installation, on the other hand, installs packages in the current project directory. It is specific to the project you are working on. Local packages are usually listed as dependencies in your project's package.json file, and they are not accessible outside of the project directory. 
</i>

```sh
npm install [package-name]
```

<h3>Updating Packages</h3>

<i>t's a good practice to regularly update your project's dependencies to ensure you're using the latest bug fixes and improvements
</i>

<h4>update a specific package to the latest version</h4>

```sh

npm update [package-name]
```

<h4>To update all packages listed in package.json</h4>

```sh
npm update
```

<h4>update a specific package to a specific version</h4>

```sh
npm install [package-name]@[desired-version]
```

<h3>Use installed Packages</h3>

<h4>CommonJS modules</h4>

```js
const library = require("library");
```

<h4>ES6 Modules</h4>

```js
import library from "library";

// you can use the destructuring assignment and import only the parts of the module that you’re interested in.

import { part1, part2 } from "library";
```

<h3>Running Scripts</h3>

<i>In npm, you can define and run scripts in your package.json file.</i>

<h4>Defining Scripts `package.json`</h4>

<i>In your package.json file, you can define scripts under the "scripts"</i>

```json
{
	"name": "my-project",
	"version": "1.0.0",
	"scripts": {
		"start": "node index.js",
		"test": "mocha tests/*.js",
		"build": "webpack"
	},
	"dependencies": {
		"exiss": "^4.17.1",
		"mocha": "^8.3.2"
	},
	"devDependencies": {
		"webpack": "^5.0.0"
	}
}

// In this example, there are three scripts defined: "start", "test", and "build". Each script has a corresponding command associated with it.
```

<h4>how to run a script</h4>

<i>You can run scripts using the npm run command followed by the script name.</i>

```sh
npm run start
```

<i> This will execute the start script and run the command node index.js. </i>

```sh
npm run test
```

<i> This will execute the test script and run the command mocha tests/\*.js. </i>

```sh
npm run build
```

<i> This will execute the build script and run the command webpack. </i>

<h3>npm workspaces</h3>

<a href='https://ruanmartinelli.com/posts/npm-7-workspaces-1' >Refference.</a>

<pre>
workspace is a great concept, it is a best practice to do an operation in more packages from a main package.
</pre>

<i>
--workspace [-w] and --workspaces [-ws] , this flags can be added to many of the existing npm commands to run them in your sub-packages, instead of your root package

</i>
<i>
For example, imagine <code> package-a </code> and <code> package-b </code> 
both have a script named "test" defined in their <code> package.json </code> files:
</i>

```json

[" packages/package-a/package.json"]
{
  "name": "package-a",
  "scripts": {
    "test": "echo 'all package-a tests passed!'"
  }
 // ...
}

[" packages/package-b/package.json"]
{
  "name": "package-b",
  "scripts": {
    "test": "echo 'all package-b tests passed!'"
  }
 // ...
}

```

<i>
You can run all the “test” scripts at once by adding the <code> --workspaces
</code> (plural) to your <code>npm run</code>  command:
</i>

```sh

# Run "test" script on all packages
npm run test --workspaces

# Tip - this also works:
npm run test  -ws
```

<i> that will give us the following output:</i>

```sh
> package-a@1.0.0 test
> echo 'all package-a tests passed!'

all package-a tests passed!

> package-b@1.0.0 test
> echo 'all package-b tests passed!'

all package-b tests passed!
```

<b> To run a command for a specific package</b>

```sh
# Runs "test" only on package-a
npm run test --workspace package-a

# Tip - this also works:
npm run test -w package-a
```

<b> To install a package for all the the workspaces</b>

```sh

# Install `lodash` on `package-a`
npm install lodash --w package-a

# Install `tap` on `package-b` as a dev dependency
npm install tap --w package-b --save-dev

# Install `package-a` on `package-b`
npm install package-a --w package-b

# Install `eslint` in all packages
npm install eslint --ws

```

<h3>npx</h3>

- npx is a package runner tool that comes bundled with npm . It is used to execute packages without having to install them globally or locally.

- You can use npx to run packages from the npm registry, GitHub, or any other URL without installing them permanently.

- npx downloads the specified package, runs the command, and ensures that the correct version of the package is used, even if it's not installed .

- It is particularly useful for running one-off commands, trying out new tools, and running packages with specific versions or configurations.

<h4>Running Packages</h4>

<i>You can run a package using npx directly from the npm registry. For example, to run a package named example-package</i>

```sh
npx example-package

```

<i>npx will download and execute example-package without needing to install it globally or include it in your project's dependencies.</i>

<h4>Running Specific Versions</h4>

```sh

npx example-package@1.2.3
```

<i>This will run version 1.2.3 of example-package if it exists in the npm registry.</i>

<h4>Running Local Packages</h4>

<i>You can also run locally installed packages with npx by specifying the path to the package's binary</i>

```sh

npx ./path/to/local-package
```

<h4>Running Packages from GitHub</h4>

```sh

npx github:username/repo
```

<i>This will download and execute the specified GitHub repository as a package.</i>

<h4>Defference Between npm & npx</h4>

<i>"npm" is primarily used for managing packages and their versions, while "npx" is used for executing packages and commands without the need for permanent installation. "npx" provides a convenient way to work with packages without worrying about global installations, version conflicts, or polluting your project's dependencies.</i>

<h3> creatinhg packages</h3>

<h4>Initialize the package</h4>

```sh
# sign up to npm => login to npm

#login from cli

npm login

```

<b>Notice</b>

- it is required to set an exeptional name for the package
- it is required to define the version of the package

<h4>publish the package</h4>

```sh
# publish in public
npm publish --access=public
```

<b>You Will receive an email from npm telling you that the operation is done successfully.</b>

<h4> add readme file</h4>

<i>to make it easier for people who will use the package,
create a redme file that explaine on it how to use the package.
</i>

<h5>on github</h5>

- create a new repo => README.md.
- to be more proffesional use <a href= "https://shields.io">shields.io</a>
- create a license MIT License
  <i>in github => insight => community standarts => add License => choose a licence</i>

<h4>edit the package.json</h4>

<i>to describe to the user</i>

```json
{
	"name": "@sisttara/tinny",
	"version": "1.0.0",
	"description": "Removes all spaces from a string",
	"license": "MIT",
	"repository": "SISTTARA09/tiny",
	"main": "index.js",
	"keywords": ["tiny", "npm", "package", "sisttara"]
}
```

<b>To ignore typing them one by one use the <code> npm init</code> command. </b>

<h4>Update the version</h4>

<h5>major</h5>

```sh
npm version major
# output:  v2.0.0
```

<h5>minor</h5>

```sh
npm version minor
# output:  v2.1.0
```

<h5>patch</h5>

```sh
npm version patch
# output:  v2.1.1
```

<h5>save the changes</h5>

```sh
npm publish
```

<h4>To create a private package<h4>

- as the public but there is small changes

<h5>In package.json</h5>

```json

"private": true,
// ...
```

<h5>Publishing</h5>

```sh
npm publish --access=private
```

<b>NOTE</b>

- it is required to have a paid plan to publish in private.

<h2>Error Handling</h2>

<i>Error handling is a way to find bugs and solve them as quickly as humanly possible. The errors in Node.js can be either operation or programmer errors.</i>
