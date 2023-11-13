const express = require('express');
const app = express();

const Constant = require('./src/utils/constant');
const bodyParser = require('body-parser');
const UserDAO = require('./src/dao/user-dao');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

require('./database');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });
// const upload = multer({ dest: '/' });
app.post('/upload', uploadStorage.single('file'), (req, res) => {
  res.send({ data: req.file });
});

app.use('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});
app.use('/customerHome', (req, res) => {
  res.sendFile(__dirname + '/public/customerHome.html');
});
app.use('/home', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});
app.use('/technicianHome', (req, res) => {
  res.sendFile(__dirname + '/public/techHome.html');
});
app.use('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});
app.use('/adminOrderDetail', (req, res) => {
  res.sendFile(__dirname + '/public/orderDetailAdmin.html');
});
app.use('/customerDishDetail', (req, res) => {
  res.sendFile(__dirname + '/public/customerDishDetail.html');
});
app.use('/dishDetail', (req, res) => {
  res.sendFile(__dirname + '/public/dishDetail.html');
});
app.use('/cartDetail', (req, res) => {
  res.sendFile(__dirname + '/public/cart.html');
});
app.use('/srPics/:name', (req, res) => {
  let fileName = req.params.name;
  res.sendFile(__dirname + `/public/uploads/${fileName}`);
});
app.use('/users', require('./src/controller/user-controller'));
app.use('/serviceRequests', require('./src/controller/service-req-controller'));

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

UserDAO.isUserExist({ email: 'admin@gmail.com', password: 'admin@123' }).then(
  (result) => {
    if (result) console.log('Admin already registered');
    else {
      UserDAO.register({
        firstName: 'Admin',
        lastName: 'Gentle',
        email: 'admin@gmail.com',
        password: 'admin@123',
        role: 'ADMIN',
        address: 'INDIA',
        phone: 7878767678,
        status: 'APPROVED',
        pincode: '560035',
        profilePic: 'profile_icon.jpeg',
      }).then((response) => {
        console.log('Admin Registered successfully');
      });
    }
  }
);

app.listen(Constant.PORT, () => {
  console.log(`Listening to port ${Constant.PORT}`);
});
