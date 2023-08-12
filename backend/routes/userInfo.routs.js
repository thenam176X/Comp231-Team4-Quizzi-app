
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userInfo');
const authMiddleware = require('../middleware/authJwt');

router.get('/', usersController.getUsers);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), usersController.createUser);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), usersController.updateUser);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), usersController.deleteUser);
router.save('/:id/profile', authMiddleware.authenticate, usersController.saveProfile);
module.exports = router;
