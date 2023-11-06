const express = require('express');
const OrderService = require('../service/order-service');
const route = express.Router();
const CustomResponse = require('../utils/custom-response');
const MiddlewareService = require('../utils/middleware');

route.post('/create',MiddlewareService.authenticate, (req, res) => {
    let payloadData = req.body;
    //let userData = req.user;
    console.log('user Data',req.user);
    payloadData['userId'] = req.user._id;
    console.log('data inside controller', payloadData);
    OrderService.create(payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.get('/getList',MiddlewareService.authenticate, (req, res) => {
    // let payloadData = req.query;
    let userData = req.user;
    console.log('data inside controller', userData);
    OrderService.getList(userData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


route.get('/getByUserId',MiddlewareService.authenticate, (req, res) => {
    // let payloadData = req.params;
     let userData = req.user;
    console.log('data inside controller', userData);
    OrderService.getByUserId(userData).then(result => {
        console.log('getting response from service ',result);
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


route.delete('/deleteById/:id',MiddlewareService.authenticate, (req, res) => {
    let payloadData = req.params;
    let userData = req.user;
    console.log('data inside controller', payloadData);
    CartService.deleteById(userData,payloadData).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


route.put('/orderConfirmedByAdmin/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.orderConfirmedByAdmin(userData,condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})


route.put('/orderConfirmedByChef/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.orderConfirmedByChef(userData,condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.put('/orderReadyToServe/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.orderReadyToServe(userData,condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.put('/getBill/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.getBill(userData,condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.put('/closeOrder/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.closeOrder(userData,condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})

route.get('/getByOrderId/:id',MiddlewareService.authenticate, (req, res) => {
    let condition = req.params;
    // let userData = req.user;
    // let updatePayload = req.body;
    console.log('data inside controller', condition);
    OrderService.getByOrderId(condition).then(result => {
        res.status(result.status).send(CustomResponse.sendResponse(result.status,result.data, result.message));
    }).catch(error => {
        res.status(error.status).send(CustomResponse.sendResponse(error.status,error.data, error.message));
    })
})



module.exports = route;