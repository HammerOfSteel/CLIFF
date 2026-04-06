const db = require('../db');

// Add or toggle reaction
const addReaction = async (req, res) => {
  try {
    const { story_id, reaction_type } = req.body;
    const user_id = req.user.id;

    if (!story_id || !reaction_type) {
      return res.status(400).json({ error: 'Story ID and reaction type are required' });
    }

    if (!['love', 'shocked', 'fire', 'sad', 'dead'].includes(reaction_type)) {
      return res.status(400).json({ error: 'Invalid reaction type' });
    }

    // Check if reaction already exists
    const existing = await db.query(
      'SELECT * FROM reactions WHERE story_id = $1 AND user_id = $2 AND reaction_type = $3',
      [story_id, user_id, reaction_type]
    );

    if (existing.rows.length > 0) {
      // Remove reaction if it already exists (toggle off)
      await db.query(
        'DELETE FROM reactions WHERE story_id = $1 AND user_id = $2 AND reaction_type = $3',
        [story_id, user_id, reaction_type]
      );
      return res.json({ message: 'Reaction removed', removed: true });
    } else {
      // Add new reaction
      await db.query(
        'INSERT INTO reactions (story_id, user_id, reaction_type) VALUES ($1, $2, $3)',
        [story_id, user_id, reaction_type]
      );
      return res.json({ message: 'Reaction added', removed: false });
    }
  } catch (error) {
    console.error('Add reaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's reactions for a story
const getUserReaction = async (req, res) => {
  try {
    const { story_id } = req.params;
    const user_id = req.user.id;

    const result = await db.query(
      'SELECT reaction_type FROM reactions WHERE story_id = $1 AND user_id = $2',
      [story_id, user_id]
    );

    res.json({ reactions: result.rows.map(r => r.reaction_type) });
  } catch (error) {
    console.error('Get user reaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add bookmark
const addBookmark = async (req, res) => {
  try {
    const { story_id } = req.body;
    const user_id = req.user.id;

    if (!story_id) {
      return res.status(400).json({ error: 'Story ID is required' });
    }

    // Check if bookmark already exists
    const existing = await db.query(
      'SELECT * FROM bookmarks WHERE story_id = $1 AND user_id = $2',
      [story_id, user_id]
    );

    if (existing.rows.length > 0) {
      // Remove bookmark if it already exists (toggle off)
      await db.query(
        'DELETE FROM bookmarks WHERE story_id = $1 AND user_id = $2',
        [story_id, user_id]
      );
      return res.json({ message: 'Bookmark removed', bookmarked: false });
    } else {
      // Add new bookmark
      await db.query(
        'INSERT INTO bookmarks (story_id, user_id) VALUES ($1, $2)',
        [story_id, user_id]
      );
      return res.json({ message: 'Bookmark added', bookmarked: true });
    }
  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's bookmarks
const getBookmarks = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(`
      SELECT 
        s.*,
        u.username as author,
        u.avatar_url as author_avatar,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'love') as love_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'shocked') as shocked_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'fire') as fire_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'sad') as sad_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'dead') as dead_count,
        (SELECT COUNT(*) FROM episodes WHERE story_id = s.id) as episode_count,
        (SELECT COALESCE(AVG(read_time), 5) FROM episodes WHERE story_id = s.id) as avg_read_time,
        b.created_at as bookmarked_at
      FROM bookmarks b
      JOIN stories s ON b.story_id = s.id
      JOIN users u ON s.author_id = u.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
    `, [user_id]);

    res.json({ stories: result.rows });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Check if story is bookmarked
const isBookmarked = async (req, res) => {
  try {
    const { story_id } = req.params;
    const user_id = req.user.id;

    const result = await db.query(
      'SELECT * FROM bookmarks WHERE story_id = $1 AND user_id = $2',
      [story_id, user_id]
    );

    res.json({ bookmarked: result.rows.length > 0 });
  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Save reading progress
const saveReadingProgress = async (req, res) => {
  try {
    const { story_id, episode_id, progress_percentage, scroll_position } = req.body;
    const user_id = req.user.id;

    if (!story_id || !episode_id) {
      return res.status(400).json({ error: 'Story ID and episode ID are required' });
    }

    await db.query(`
      INSERT INTO reading_progress (user_id, story_id, episode_id, progress_percentage, scroll_position, last_read_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (user_id, story_id, episode_id)
      DO UPDATE SET 
        progress_percentage = $4,
        scroll_position = $5,
        last_read_at = NOW()
    `, [user_id, story_id, episode_id, progress_percentage || 0, scroll_position || 0]);

    res.json({ message: 'Progress saved' });
  } catch (error) {
    console.error('Save reading progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's currently reading stories
const getReadingProgress = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(`
      SELECT DISTINCT ON (rp.story_id)
        s.*,
        u.username as author,
        u.avatar_url as author_avatar,
        rp.episode_id,
        rp.progress_percentage,
        rp.last_read_at,
        (SELECT COUNT(*) FROM episodes WHERE story_id = s.id) as episode_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'love') as love_count
      FROM reading_progress rp
      JOIN stories s ON rp.story_id = s.id
      JOIN users u ON s.author_id = u.id
      WHERE rp.user_id = $1 AND rp.progress_percentage < 100
      ORDER BY rp.story_id, rp.last_read_at DESC
    `, [user_id]);

    res.json({ stories: result.rows });
  } catch (error) {
    console.error('Get reading progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get finished stories
const getFinishedStories = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(`
      SELECT DISTINCT
        s.*,
        u.username as author,
        u.avatar_url as author_avatar,
        MAX(rp.last_read_at) as finished_at,
        (SELECT COUNT(*) FROM episodes WHERE story_id = s.id) as episode_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'love') as love_count
      FROM reading_progress rp
      JOIN stories s ON rp.story_id = s.id
      JOIN users u ON s.author_id = u.id
      WHERE rp.user_id = $1 AND rp.progress_percentage = 100
      GROUP BY s.id, u.username, u.avatar_url
      ORDER BY finished_at DESC
    `, [user_id]);

    res.json({ stories: result.rows });
  } catch (error) {
    console.error('Get finished stories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { 
  addReaction, 
  getUserReaction, 
  addBookmark, 
  getBookmarks,
  isBookmarked,
  saveReadingProgress,
  getReadingProgress,
  getFinishedStories
};
