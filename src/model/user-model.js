const mongoose = require("mongoose");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	phone: {
		type: Number,
		default: 0,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: "",
	},
	role: {
		type: String,
		enum: ["ADMIN", "CUSTOMER", "TECHNICIAN"],
		default: "CUSTOMER",
	},
	pincode: {
		type: String,
		required: true,
	},
	otp: {
		type: Number,
		default: 1234,
	},
	skills: [
		{
			type: String,
			default: "",
		},
	],
	rating: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			type: String,
			default: "",
		},
	],
	legalDocs: {
		type: String,
		default: "",
	},
	profilePic: {
		type: String,
		default: "",
	},
	status: {
		type: String,
		enum: ["APPROVED", "INPROGRESS", "BLOCKED"],
		default: "INPROGRESS",
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model(Constant.COLLECTION_NAME.USER, UserSchema);
