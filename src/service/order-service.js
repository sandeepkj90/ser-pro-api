const OrderDAO = require('../dao/order-dao');
const DishDAO = require('../dao/dishes-dao');
const Constant = require('../utils/constant');
const UserDAO = require('../dao/user-dao');
const Utility = require('../utils/utility');
const CartDAO = require('../dao/cart-dao');
const OrderService = {
    create: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {  
            if(!payload.items && payload.items.length==0)
              return reject({status:406,message:Constant.MESSAGE.COMMON.BAD_REQUEST})
            let orderPayload = {
                userId:payload.userId,
                items:payload.items,
                orderId:Utility.generateOTP()
            }
               OrderDAO.create(orderPayload).then(async(result) => {
                    await CartDAO.deleteCartByUserId(payload);
                    resolve({ status: 201, data: result, message: Constant.MESSAGE.ORDER.PLACED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
        })

    },
    getList: (user) => {
        // console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            let payload = {};
            if(user.role =='CHEF'){
                payload = {status:['CONFIRMED', 'GETTING_READY', 'READY_TO_SERVE']}
            }
            // if(user.role !='ADMIN')
            // reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

            OrderDAO.getList(payload).then(result => {
                for(let resp of result){
                    if(resp.items.length>0)
                    resp.totalAmount = resp.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
                    else
                    resp.totalAmount = 0;
                }
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });
            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },

    getByUserId: (user) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {

            OrderDAO.getByUserId(user).then(result => {
                console.log('result from database',result);
                for(let resp of result){
                    if(resp.items.length>0)
                    resp.totalAmount = resp.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
                    else
                    resp.totalAmount = 0;
                }
               
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },

    getByOrderId: (condition) => {
        console.log('data inside service', condition);
        return new Promise(async (resolve, reject) => {

            OrderDAO.getByOrderId(condition).then(result => {
                console.log('result from database',result);
                // for(let resp of result){
                    if(result.items.length>0)
                    result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
                    else
                    result.totalAmount = 0;
                // }
               
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    orderConfirmedByAdmin: (user, payload) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'ADMIN')
               return reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            OrderDAO.orderConfirmedByAdmin(payload).then(result => {
                console.log('result from database',result);
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            //    if(result.items.length>0)
            //     result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
            //     else
            //     result.totalAmount = 0;
            //     resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    orderConfirmedByChef: (user, payload) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'CHEF')
               return reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            OrderDAO.orderConfirmedByChef(payload).then(result => {
                console.log('result from database',result);
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            //    if(result.items.length>0)
            //     result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
            //     else
            //     result.totalAmount = 0;
            //     resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    getBill:(user,payload)=>{
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'CUSTOMER')
               return reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            OrderDAO.getBill(payload).then(result => {
                console.log('result from database',result);
                resolve({ status: 200, data: result, message: Constant.MESSAGE.ORDER.BILL });

            //    if(result.items.length>0)
            //     result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
            //     else
            //     result.totalAmount = 0;
            //     resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })
    },
    orderReadyToServe: (user, payload) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'CHEF')
               return reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            OrderDAO.orderReadyToServe(payload).then(result => {
                console.log('result from database',result);
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            //    if(result.items.length>0)
            //     result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
            //     else
            //     result.totalAmount = 0;
            //     resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    closeOrder: (user, payload) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'ADMIN')
               return reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            OrderDAO.closeOrder(payload).then(result => {
                console.log('result from database',result);
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            //    if(result.items.length>0)
            //     result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
            //     else
            //     result.totalAmount = 0;
            //     resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    deleteById: (user, payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            // if (user.role != 'ADMIN')
            //     reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

            CartDAO.deleteById(user,payload).then(result => {
                resolve({ status: 200, data: result, message: Constant.MESSAGE.DISH.DELETED });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    // updateById: (user, condition, payload) => {
    //     console.log('data inside service', payload);
    //     return new Promise(async (resolve, reject) => {
    //         if (user.role != 'ADMIN')
    //             reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

    //         DishDAO.updateById(condition, payload).then(result => {
    //             resolve({ status: 200, data: result, message: Constant.MESSAGE.DISH.UPDATED });
    //         }).catch(error => {
    //             reject({ status: 500, message: error });
    //         })
    //         // }

    //     })

    // }

}
module.exports = OrderService;

