const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getUsers);
router.get('/:ssn', UserController.getUser);
router.post('/', UserController.postUser);
router.delete('', UserController.deleteUsers);
router.delete('/:ssn', UserController.deleteUser);
router.put('/:ssn', UserController.putUser);
router.patch('/:ssn', UserController.patchUser);

module.exports = router;
