const Express = require('express');

const BodyParser = require('body-parser');
const UserController = require('../controllers/user.controller');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/users', UserController.getUsers);
router.get('/users/:ssn', UserController.getUser);
router.post('/users', UserController.postUser);
router.delete('/users', UserController.deleteUsers);
router.delete('/users/:ssn', UserController.deleteUser);
router.put('/users/:ssn', UserController.putUser);
router.patch('/users/:ssn', UserController.patchUser);

module.exports = router;
