const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./database');

app.use('/users', require('./src/controller/user-controller'));

app.listen(3000, () => {
  console.log('listening to port 3000');
});
