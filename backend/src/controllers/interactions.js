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

module.exports = { 
  addReaction, 
  getUserReaction, 
  addBookmark, 
  getBookmarks,
  isBookmarked 
};
