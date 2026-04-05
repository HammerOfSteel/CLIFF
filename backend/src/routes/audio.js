const express = require('express');
const router = express.Router();
const { saveAudioProgress, getAudioProgress } = require('../controllers/audio');

// Save audio playback position
router.post('/progress', saveAudioProgress);

// Get audio playback position for a story
router.get('/progress/:story_id', getAudioProgress);

module.exports = router;
