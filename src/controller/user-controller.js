const express = require("express");
const UserService = require("../service/user-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
const UserValidator = require("../validator/user-validator");
// const Joi = require('joi');
route.post("/register", (req, res) => {
  let payloadData = req.body;
  console.log("payload--inside register data", JSON.stringify(payloadData));
  let { error, value } = UserValidator.validate(payloadData);
  if (error)
    return res.send(
      CustomResponse.errorResponse(406, error, "Invalid Payload")
    );

  payloadData["status"] =
    payloadData.role == "CUSTOMER" || payloadData.role == "ADMIN"
      ? "APPROVED"
      : "INPROGRESS";
  console.log("data inside controller", payloadData);
  UserService.register(payloadData)
    .then((result) => {
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.post("/login", (req, res) => {
  let payloadData = req.body;
  console.log("data inside controller", payloadData);
  UserService.login(payloadData)
    .then((result) => {
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.get("/getUserList", (req, res) => {
  let payloadData = req.query;
  console.log("data inside controller", payloadData);
  UserService.getUserList(payloadData)
    .then((result) => {
      res
        .status(200)
        .send(CustomResponse.sendResponse(200, result.data, result.message));
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.post("/forgotPassword", (req, res) => {
  let payloadData = req.body;
  console.log("data inside controller", payloadData);
  UserService.forgotPassword(payloadData)
    .then((result) => {
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.post("/resetPassword", (req, res) => {
  let payloadData = req.body;
  console.log("data inside controller", payloadData);
  UserService.resetPassword(payloadData)
    .then((result) => {
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.patch("/approve/:id", (req, res) => {
  let payloadData = req.params;
  console.log("data inside controller", payloadData);
  UserService.approve(payloadData)
    .then((result) => {
      console.log("result=============", result);
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.get("/getTechnician", (req, res) => {
  UserService.getTechnician()
    .then((result) => {
      res
        .status(200)
        .send(
          CustomResponse.sendResponse(
            200,
            result.data,
            "Successfully fetched Technician"
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

module.exports = route;
