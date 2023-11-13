const Constant = {
  DATABASE_NAME: 'flow-proximity-db',
  COLLECTION_NAME: {
    USER: 'users',
    DISH: 'dishes',
    SERVICE_REQ: 'service-req',
    ORDER: 'orders',
  },
  PORT: 4000,
  SECRET_KEY: 'serpro@123',
  MESSAGE: {
    USER: {
      REGISTERED: 'User Registered Successfully',
      LOGIN: 'User LoggedIn Successfully',
      ISEXIST: 'User already registered with the email',
      NOT_EXIST: 'User not registered with email',
      INVALID_OTP: 'Invalid OTP',
      INVALID_CREDENTIALS: 'Password is wrong.',
      UNAUTHORIZED: 'You are not authorized to use this service.',
      APPROVAL: 'You profile is under process. Please contact Admin..',
    },
    COMMON: {
      FAILED: 'Query Failed',
      BAD_REQUEST: 'Invalid Payload',
      UPDATED: 'Updated Successfull',
      SUCCESS: 'Data Found',
    },
    DISH: {
      CREATED: 'Dish has created sccessfully',
      DELETED: 'Dish deleted successfully',
      UPDATED: 'Dish updated Successfully',
    },
    CART: {
      CREATED: 'Item added in cart sccessfully',
      DELETED: 'Item removed from cart successfully',
      UPDATED: 'Item updated Successfully',
    },
    ORDER: {
      PLACED: 'Order placed successfully',
      BILL: 'Bill is getting ready..',
    },
  },
};
module.exports = Constant;
