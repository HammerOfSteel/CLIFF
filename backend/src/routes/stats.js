const express = require('express');
const { getUserStats } = require('../controllers/stats');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/user-stats', authMiddleware, getUserStats);

module.exports = router;
