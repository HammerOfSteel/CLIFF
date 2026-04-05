const express = require('express');
const { getAllStories, getStoryById, createStory, createEpisode, getUserStories, updateStory, updateEpisode } = require('../controllers/stories');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllStories);
router.get('/my-stories', authMiddleware, getUserStories);
router.get('/:id', authMiddleware, getStoryById);
router.post('/', authMiddleware, createStory);
router.put('/:id', authMiddleware, updateStory);
router.post('/:story_id/episodes', authMiddleware, createEpisode);
router.put('/:story_id/episodes/:episode_id', authMiddleware, updateEpisode);

module.exports = router;
