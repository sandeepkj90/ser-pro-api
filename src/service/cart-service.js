const CartDAO = require('../dao/cart-dao');
const DishDAO = require('../dao/dishes-dao');
const Constant = require('../utils/constant');
const UserDAO = require('../dao/user-dao');
const CartService = {
    create: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            
            if(!payload.items)
              return reject({status:406,message:Constant.MESSAGE.COMMON.BAD_REQUEST})
              
           let itemsDetails =  await DishDAO.getItemsDetailList(payload.items.item);
           console.log('details of itemlist ',itemsDetails);
            let cartPayload = {
                userId:payload.userId,
                items:payload.items
                //totalAmount:itemsDetails.reduce((sum,next)=>{sum += next.price; return sum;},0)
              } 
              let userDetail = await CartDAO.isUserExist(payload);
            if(userDetail){
                CartDAO.updateItems(cartPayload).then(result => {
                    resolve({ status: 201, data: result, message: Constant.MESSAGE.CART.CREATED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
            }else{
                CartDAO.create(cartPayload).then(result => {
                    resolve({ status: 201, data: result, message: Constant.MESSAGE.CART.CREATED });
                }).catch(error => {
                    reject({ status: 500, message: error });
                })
            }
            
            // }

        })

    },
    // getList: (payload) => {
    //     console.log('data inside service', payload);
    //     return new Promise(async (resolve, reject) => {
    //         // if(user.role !='ADMIN')
    //         // reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

    //         DishDAO.getList(payload).then(result => {
    //             resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });
    //         }).catch(error => {
    //             reject({ status: 500, message: error });
    //         })
    //         // }

    //     })

    // },
    getByUserId: (user) => {
        console.log('data inside service', user);
        return new Promise(async (resolve, reject) => {

            CartDAO.getByUserId(user).then(result => {
                console.log('result from database',result);
               if(result.items.length>0)
                result.totalAmount = result.items.reduce((sum,next)=>{sum +=(next.item.price* next.quantity);return sum},0);
                else
                result.totalAmount = 0;
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });

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
                resolve({ status: 200, data: result, message: Constant.MESSAGE.CART.DELETED });

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
module.exports = CartService;

