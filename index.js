const { log } = require("console");

const fs = require("fs");
const path = require("node:path");

const CREATE_FILE = "create file".replace(/\s/g, "").toLowerCase();
const DELETE_FILE = "delete file".replace(/\s/g, "").toLowerCase();
const RENAME_FILE = "rename file".replace(/\s/g, "").toLowerCase();
fs.readFile("./comands.txt", "utf-8", (err, content) => {
	if (err) throw err;

	//SYNTAX:: create file: <path>
	const comands = content.replace(/\s/g, "").toLowerCase();
	const comandsArr = comands.split(",");

	const createComands = comandsArr.filter((comand) => {
		return comand.includes(CREATE_FILE);
	});

	const deleteComands = comandsArr.filter((c) => c.includes(DELETE_FILE));
	const renameComnads = comandsArr.filter((c) =>
		c.match(/renamefile\w+.\w+to\w+/)
	);
	// create file
	if (createComands.length) {
		createComands.map((file) => {
			createFile(file);
		});
	}
	// rename file
	if (renameComnads.length) {
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
	const fileName = path.parse(filePath).name;
	fs.writeFile(filePath, `this is ${fileName}`, (err, data) => {
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
	const isExist = path.isAbsolute(filePath);
	if (!isExist) {
		// check if the the file !exist
		log("there is no file: ", filePath);
		return;
	}
	fs.unlink(filePath, (err) => {
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
	fs.rename(oldPATH, newPATH, (err) => {
		if (err) {
			return log("there is no file:", err.path);
		}
		return log("file renamed successfully");
	});
}

log("directory", process.cwd()); // because of event loop this will run first
log("directory", __dirname);
