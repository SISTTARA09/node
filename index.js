import { log } from "console";

import { readFile, writeFile, unlink, rename } from "fs";
import { parse, isAbsolute } from "node:path";

const CREATE_FILE = "create file".replace(/\s/g, "").toLowerCase();
const DELETE_FILE = "delete file".replace(/\s/g, "").toLowerCase();
const RENAME_FILE = "rename file".replace(/\s/g, "").toLowerCase();
readFile("./comands.txt", "utf-8", (err, content) => {
	if (err) throw err;

	//SYNTAX:: create file: <path>
	const comands = content.replace(/\s/g, "").toLowerCase();
	const comandsArr = comands.split(",");

	const createComands = comandsArr.filter((comand) => {
		return comand.includes(CREATE_FILE);
	});

	const deleteComands = comandsArr.filter((c) => c.includes(DELETE_FILE));
	log(comandsArr);
	const renameComnads = comandsArr.filter((c) =>
		c.match(/renamefile\w+.\w+to\w+/)
	);
	//create file
	if (createComands.length) {
		log("f");
		createComands.map((file) => {
			createFile(file);
		});
	}
	log(renameComnads);
	// rename file
	if (renameComnads.length) {
		log("he");
		renameComnads.map((c) => {
			renameFile(c);
		});
	}
	// delete file
	if (deleteComands.length) {
		deleteComands.map((file) => {
			deleteFile(file);
		});
	}
	return;
});

// SYNTAX: create file <PATH/>
function createFile(comand) {
	const filePath = comand.substring(CREATE_FILE.length); // get the file path
	const fileName = parse(filePath).name;
	log(fileName)
	writeFile(filePath, `this is ${fileName}`, (err, data) => {
		if (err) {
			throw err;
		}
		return data;
	});
	return;
}

// SYNTAX: delete file <PATH/>

function deleteFile(comand) {
	const filePath = comand.substring(DELETE_FILE.length); // get the file path
	const isExist = isAbsolute(filePath);
	if (!isExist) {
		// check if the the file !exist
		log("there is no file: ", filePath);
		return;
	}
	unlink(filePath, (err) => {
		if (err) {
			throw err;
		}
		log(filePath, "deleted");
	});
}
// SYNTAX: rename file <oldPATH/> to <newPATH/>

function renameFile(comand) {
	const oldPATH = comand.substring(RENAME_FILE.length, comand.indexOf("to"));
	const newPATHArr = comand.split("to");
	const newPATH = newPATHArr[1];
	rename(oldPATH, newPATH, (err) => {
		if (err) {
			return log("there is no file:", err.path);
		}
		return log("file renamed successfully");
	});
}

// log("directory", process.cwd()); // because of event Loop this will run first
// log("directory", __dirname);
