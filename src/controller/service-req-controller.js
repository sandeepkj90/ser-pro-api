const express = require("express");
const ServiceReqService = require("../service/service-req-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
const MiddlewareService = require("../utils/middleware");

route.post("/create", MiddlewareService.authenticate, (req, res) => {
  let payloadData = req.body;
  //let userData = req.user;
  console.log("user Data", req.user);
  payloadData["userId"] = req.user._id;
  console.log("data inside controller", payloadData);
  ServiceReqService.create(payloadData)
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

// route.get('/getList',MiddlewareService.authenticate, (req, res) => {
//     let payloadData = req.query;
//     // let userData = req.user;
//     console.log('data inside controller', payloadData);
//     DishService.getList(payloadData).then(result => {
//         res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
//     }).catch(error => {
//         res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
//     })
// })

route.get("/getListByUserId", MiddlewareService.authenticate, (req, res) => {
  // let payloadData = req.params;
  let userData = req.user;
  console.log("data inside controller", userData);
  ServiceReqService.getListByUserId(userData)
    .then((result) => {
      console.log("getting response from service ", result);
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

route.delete("/deleteById/:id", MiddlewareService.authenticate, (req, res) => {
  let payloadData = req.params;
  let userData = req.user;
  console.log("data inside controller", payloadData);
  ServiceReqService.deleteById(userData, payloadData)
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

// route.put('/updateById/:id',MiddlewareService.authenticate, (req, res) => {
//     let condition = req.params;
//     let userData = req.user;
//     let updatePayload = req.body;
//     console.log('data inside controller', updatePayload);
//     DishService.updateById(userData,condition,updatePayload).then(result => {
//         res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
//     }).catch(error => {
//         res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
//     })
// })
route.patch("/changeReqStatus/:id", (req, res) => {
  let payloadData = { ...req.params, ...req.body };
  console.log("payloadData", payloadData);
  ServiceReqService.changeReqStatus(payloadData)
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
route.put("/update/:id", (req, res) => {
  let payloadData = { ...req.params, ...req.body };
  console.log("payloadData", payloadData);
  ServiceReqService.update(payloadData)
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
route.get("/getTechnician/:id", (req, res) => {
  let payloadData = req.params;
  console.log("data inside controller", payloadData);
  ServiceReqService.getTechnician(payloadData)
    .then((result) => {
      console.log("getting response from service ", result);
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

module.exports = route;
