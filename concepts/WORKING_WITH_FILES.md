<h2>Working With Files</h2>

<i>You can programmatically manipulate files in Node.js with the built-in fs module. The name is short for “file system,” and the module contains all the functions you need to read, write, and delete files on the local machine.</i>

<h3>path module</h3>

```js
const { log } = require("node:console");
const path = require("node:path");

// log(__filename) // identify the current file path

// log(__dirname) // identify the current directory path

// log(path.basename(__dirname)) // indicates the current file/dir name

// log(path.dirname(__filename)); // returns the parent folder of the passed path

// log(path.parse(__dirname)) // returns obj of path details

// log(path.format(obj)); // the opposite of path.parse("path")

// log(path.extname(__filename)); // retruns the extention of the path

// log(path.isAbsolute("C:\Users\dell\learning\nodejs")); // returns true <=> the path from begenning

// log(path.join("/dirOne", "dirTwo", "file.js")); // returns ...path combined

// log(path.normalize(__filename)); // removes the additional slashes or points from the path

// log(path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb")); // Returns: '../../impl/bbb'

// as join but if

/*
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
*/
// log(path.resolve("dOne", "dTwo", "f.js")); // C:\Users\dell\learning\nodejs\dOne\dTwo\f.js
// log(path.resolve("/dirOne", "dirTwo", "file.js")); // C:\dirOne\dirTwo\file.js
// log(path.resolve("/dirOne", "//dirTwo", "file.js")); // C:\dirTwo\file.js
// log(path.resolve("/dirOne", "dirTwo", "../file.js")); // C:\dirOne\file.js
///

// log(path.toNamespacedPath(__filename)); // On Windows systems only, returns an equivalent namespace-prefixed path for the given path.
```

### fs Module

```js
const fileContent = fs.readFileSync("./fs/file.txt", "utf-8");

readFileSync("./fs/file.txt", "utf-8");
```
