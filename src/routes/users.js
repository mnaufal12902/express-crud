const express = require('express');
const Controller = require('../controller/users.js');

const router = express.Router()

router.get('/users', Controller.getAllUsers);
router.post('/users', Controller.createUsers);
router.patch('/users/:uid', Controller.updateUsers);
router.delete('/users/:uid', Controller.deleteUsers);

module.exports = router;