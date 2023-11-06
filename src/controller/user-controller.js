const express = require('express');
const router = express.Router();
const UserService = require('../service/user-service');

router.post('/register', (req, res) => {
  let payload = req.body;
  UserService.register(payload)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});
module.exports = router;
