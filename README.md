# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Requirement for Registration
* fields:- 
-  name - String - required
-  phone - Number - required
-  password - String - required
-  email - String - required
-  role - ENUM - ['ADMIN', 'CUSTOMER', 'CHEF'], default = 'ADMIN'
-  address -  String - default:''

If email exist then return saying Email already registered . please login 


### Requirement for Login
* fields:- 
-  password - String - required
-  email - String - required

If email doesnot exist then return saying Email not registered. please register
check for both email and password 
afetr that we will create token using jsonwebtoken npm 
Attach teh data with token as response 


 ### Create a dish 
 * fields:- 
 -  name - String - required
 -  price - Number - required
 -  type:-  ENUM - required - [VEG, NON_VEG]
 -  image - String- required

 pass teh token as header data 
 get the user from that 
 check if role is ADMIN  
 then allow them to create the dish 

 ### Getting  the list of dish 
 * fields:- 
 -  name - String - required
 -  price - Number - required
 -  type:-  ENUM - required - [VEG, NON_VEG]
 -  image - String- required

 response :- 

 {
    status:200,
    data:[{},{}]
 }
 Expectation :- In service page 
 {
    status:200,
    data:{
        VEG:[{},{}],
        NON_VEG:[{},{}]
    } 
 }

### Get teh code from develop 
*  git pull origin develop


### Forgot Password 
* Phone/email number on windows - 
Input payload - Email,phone
URL:- users/forgotPassword
METHOD:- POST

If user exist with email  if false 
reject user is not registerd with email / phone 
if USer exist is true 
 Create unique code that 4 digit 
 update the code as otp in user table and send back response either in form of message or in form email- sandeep  

 URL - /reset password - 
 Method :PUT
 INput:- email,otp, newpasword

 enter New password - 

 new password 
  update send - data new password update to database 


### CREATE DISH
1. Created by ADMIN- ristrict user like CHEF and customer - middleware and ristrict them to redirect to dao page 
2. Payload:
- name- string 
- dishType:- Enum-['VEG','NON-VEG']
- price:Number
-Image:- file upload - String- 'http://localhost:300/img.jpg' 0 multer npm 
METHOD:-POST
url- /dishes/create

### Update Dish 

-_id name, price
URL- '/dishes/update'
Method:PUT

### Get the list of Dishes
Url- '/dishes/getList'
payload:- No payload 
Method:- GET

### Delete the dish by ID _id
URL- '/dishes/delete'
paylaod:- _id
Mthod:Delete

### Get Dishes by Id 
URL - '/dishes/getById',
paylaod- _id
Mthod:GET


### Adding dish to cart by Customer - Tricky
* No ristriction for authenticate role
* Create Cart Collection 
{
   userId:'_id of user who is adding item to cart',
   items:[list of dishes _id], - 4 dish
   totalAmount:Number,
   totalQuantity:Number
}

### Update item from cart
   {
   userId:'',
   items:[]- 2 dish
   
   }
DONE
### get the cart by UserId 
payload:_id of user
DONE

### Place Order 
* delete Cart after order has got placed 
* collection for orders 
* same scema as cart with staus : 'PENDING'

### getting order list 
get API to get the order  - status - !=closed 

### changing teh status of order from pending to confirmed
Admin - confirms the order 

### Getting teh lsit of order which status is confirmed 
by chef - 

### update teh status by chef 
status - GETTING_READY

### update teh status by chef 
status - 'READY_TO_SERVE'


### get teh order list by customer 
get  teh orderlist by userId 

### get the order by OrderId - _id of order table  - by customer 
get the order detail with status as well 

### get the bill triggered by customer to update status as closed 
status - Closed




//
ADMIN 
"email" : "sandeepkj90@gmail.com",
    "phone" : 8796786789.0,
    "password" : "qwerty1234",

   // CHEF

    "email" : "sree@gmail.com",
    "phone" : 8796768687.0,
    "password" : "asdf1234",



//CUSTOMER

"email" : "hima@gmail.com",
    "phone" : 5679086689.0,
    "password" : "qwerty1234",




    Cart 

Hima - _id , 
    {
    "status": 200,
    "data": {
        "_id": "637cb7fb4dbc0f9d5f1cc0ad",
        "name": "Veg Fried Rice",
        "dishType": "VEG",
        "price": 200,
        "image": "http://localhost:4000/img/data.jpg",
        "__v": 0
    },
    "message": "Data Found"
}

cart:{
   userId:_id of hima,
   items:["637cb7fb4dbc0f9d5f1cc0ad","637cb80c4dbc0f9d5f1cc0af"],
   date:'2022-11-22'
}

### Adding item to cart 
* adding 1 item at a time 
* UserId 
* already cart is there based on user Id 





### Updating item from cart 




ADMIN:- Detail
email:'sandy@gmail.com'

CHEF - DETAIL

email:- sree@gmail.com

Create Customer 

email:- hima@gmail.com