const mongoose = require("mongoose");

let connectDB = async () => {
	await mongoose.connect(
		`mongodb+srv://sandeepkj90:avtsl%40sandy@cluster0.0votf7u.mongodb.net/flow-proximity-db?retryWrites=true&w=majority&appName=Cluster0`,
	);
};

module.exports = connectDB;
