const express = require('express');
const { getAllStories, getStoryById, createStory, createEpisode, getUserStories } = require('../controllers/stories');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllStories);
router.get('/my-stories', authMiddleware, getUserStories);
router.get('/:id', authMiddleware, getStoryById);
router.post('/', authMiddleware, createStory);
router.post('/:story_id/episodes', authMiddleware, createEpisode);

module.exports = router;
