const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/admin');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
