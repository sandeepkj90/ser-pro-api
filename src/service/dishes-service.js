const CartDAO = require('../dao/cart-dao');
const DishDAO = require('../dao/dishes-dao');
const Constant = require('../utils/constant');
const DishService = {
    create: (user, payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'ADMIN')
                reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

            DishDAO.create(payload).then(result => {
                resolve({ status: 201, data: result, message: Constant.MESSAGE.DISH.CREATED });
            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    getList: (user,payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            // if(user.role !='ADMIN')
            // reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });
            let cartList =await CartDAO.getByUserId(user);
            DishDAO.getList(payload).then(response => {
                let result = {cartList,response};
                resolve({ status: 200, data: result, message: Constant.MESSAGE.COMMON.SUCCESS });
            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    getById: (payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {

            DishDAO.getById(payload).then(result => {
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
            if (user.role != 'ADMIN')
                reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

            DishDAO.deleteById(payload).then(result => {
                resolve({ status: 200, data: result, message: Constant.MESSAGE.DISH.DELETED });

            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    },
    updateById: (user, condition, payload) => {
        console.log('data inside service', payload);
        return new Promise(async (resolve, reject) => {
            if (user.role != 'ADMIN')
                reject({ status: 403, message: Constant.MESSAGE.USER.UNAUTHORIZED });

            DishDAO.updateById(condition, payload).then(result => {
                resolve({ status: 200, data: result, message: Constant.MESSAGE.DISH.UPDATED });
            }).catch(error => {
                reject({ status: 500, message: error });
            })
            // }

        })

    }

}
module.exports = DishService;

