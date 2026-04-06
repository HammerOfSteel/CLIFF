const express = require('express');
const { 
  addReaction, 
  getUserReaction, 
  addBookmark, 
  getBookmarks,
  isBookmarked,
  saveReadingProgress,
  getReadingProgress,
  getFinishedStories
} = require('../controllers/interactions');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Reactions
router.post('/reactions', authMiddleware, addReaction);
router.get('/reactions/:story_id', authMiddleware, getUserReaction);

// Bookmarks
router.post('/bookmarks', authMiddleware, addBookmark);
router.get('/bookmarks', authMiddleware, getBookmarks);
router.get('/bookmarks/:story_id', authMiddleware, isBookmarked);

// Reading Progress
router.post('/reading-progress', authMiddleware, saveReadingProgress);
router.get('/reading-progress', authMiddleware, getReadingProgress);
router.get('/finished-stories', authMiddleware, getFinishedStories);

module.exports = router;
