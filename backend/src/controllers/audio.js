const db = require('../db');

// Save audio playback position
const saveAudioProgress = async (req, res) => {
  try {
    const { story_id, audio_position } = req.body;
    const user_id = req.user.id;

    if (!story_id || audio_position === undefined) {
      return res.status(400).json({ error: 'story_id and audio_position are required' });
    }

    // Update or insert audio progress
    // We use episode_id as null for audio-only tracking
    const result = await db.query(`
      INSERT INTO reading_progress (user_id, story_id, episode_id, audio_position, last_read_at)
      VALUES ($1, $2, NULL, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, story_id, episode_id) 
      DO UPDATE SET 
        audio_position = $3,
        last_read_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [user_id, story_id, Math.floor(audio_position)]);

    res.json({ progress: result.rows[0] });
  } catch (error) {
    console.error('Save audio progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get audio playback position
const getAudioProgress = async (req, res) => {
  try {
    const { story_id } = req.params;
    const user_id = req.user.id;

    const result = await db.query(`
      SELECT audio_position, last_read_at
      FROM reading_progress
      WHERE user_id = $1 AND story_id = $2 AND episode_id IS NULL
    `, [user_id, story_id]);

    if (result.rows.length === 0) {
      return res.json({ audio_position: 0 });
    }

    res.json({ 
      audio_position: result.rows[0].audio_position || 0,
      last_read_at: result.rows[0].last_read_at
    });
  } catch (error) {
    console.error('Get audio progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { saveAudioProgress, getAudioProgress };
