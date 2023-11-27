class DatabaseService {
	save(email, price, timestamp) {
		console.log(
			`Running qurety: INSERT INTO orders VALUES (email, price, created) VALUES (${email}, ${price}, ${timestamp}) `
		);
	}
}

module.exports = DatabaseService;
