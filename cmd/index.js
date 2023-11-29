import { log } from "node:console";

// Example One
// process.stdin.on('data', (msg) => { // this will prompt to the user to write something
//   log("you entered:",msg.toString("utf-8"))
//   process.exit(2)
// })


// Example Two
 
// Node.js program to demonstrate the 
// process.stdin Property 

process.stdin.on('readable', () => { 
let chunk; 
// Use a loop to make sure we read all available data. 
while ((chunk = process.stdin.read()) !== null) { 
process.stdout.write(`data: ${chunk}`); 
} 
});
