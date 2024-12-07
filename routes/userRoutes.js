const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/', userController.registerUser);


router.get('/', userController.searchUsers);


router.get('/:userId', userController.getUserById);


router.put('/:id', userController.updateUser);


router.delete('/:id', userController.deleteUser);


module.exports = router;