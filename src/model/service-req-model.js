const mongoose = require("mongoose");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const ServiceReqSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
	//quantity:[{}]
	date: {
		type: Date,
		default: Date.now(),
	},
	description: {
		type: String,
		default: "",
	},
	pics: {
		type: String,
		default: "",
	},
	assignedTo: {
		type: Schema.Types.ObjectId,
		ref: "users",
		require: true,
	},
	status: {
		type: String,
		enum: ["PENDING", "ACCEPTED", "ASSIGNED", "CLOSED"],
		default: "PENDING",
	},
});

module.exports = mongoose.model(
	Constant.COLLECTION_NAME.SERVICE_REQ,
	ServiceReqSchema,
);
