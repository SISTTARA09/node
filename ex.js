const { log } = require("console");

let fileName = "Elzero.php";

// log(fileName.substring(0, fileName.indexOf(".")));
// log(fileName.substring(fileName.indexOf(".") + 1));

// Two

// function addEl(str) {
//   const result = str ? str : str.startsWith('El') ? str : !str.startsWith('El')? "El" + str: ''
// return result
// }

// console.log(addEl("")); // ""
// console.log(addEl("Elzero")); // Elzero
// console.log(addEl("zero")); // Elzero

/////////// THREE ///////////

let myString = "Hello Elzero Web School @ We Love Programming@ @#!@#$%%^&*";

log(/[\w\s]+@[\s\w]+/gi.exec(myString));

//   (
// 	// Output Needed
// 	"Hello Elzero Web School @ We Love Programming"
// );
