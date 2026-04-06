const db = require('../db');

const getUserStats = async (req, res) => {
  try {
    const user_id = req.user.id;

    // Get all user statistics in parallel
    const [
      storiesResult,
      readingResult,
      reactionsResult,
      bookmarksResult,
      streakResult
    ] = await Promise.all([
      // User's published stories
      db.query('SELECT COUNT(*) as story_count FROM stories WHERE author_id = $1', [user_id]),
      
      // Stories user has read
      db.query('SELECT COUNT(DISTINCT story_id) as read_count FROM reading_progress WHERE user_id = $1', [user_id]),
      
      // Reactions given by user
      db.query('SELECT COUNT(*) as reaction_count FROM reactions WHERE user_id = $1', [user_id]),
      
      // Bookmarks
      db.query('SELECT COUNT(*) as bookmark_count FROM bookmarks WHERE user_id = $1', [user_id]),
      
      // Streak calculation (consecutive days with reading activity)
      db.query(`
        SELECT COUNT(DISTINCT DATE(last_read_at)) as days_read
        FROM reading_progress
        WHERE user_id = $1
          AND last_read_at >= NOW() - INTERVAL '30 days'
      `, [user_id])
    ]);

    // Get total reads on user's stories
    const totalReadsResult = await db.query(`
      SELECT COALESCE(SUM(s.reads), 0) as total_reads
      FROM stories s
      WHERE s.author_id = $1
    `, [user_id]);

    // Get total loves on user's stories
    const totalLovesResult = await db.query(`
      SELECT COUNT(*) as total_loves
      FROM reactions r
      JOIN stories s ON r.story_id = s.id
      WHERE s.author_id = $1 AND r.reaction_type = 'love'
    `, [user_id]);

    const stats = {
      stories_published: parseInt(storiesResult.rows[0].story_count),
      stories_read: parseInt(readingResult.rows[0].read_count),
      reactions_given: parseInt(reactionsResult.rows[0].reaction_count),
      bookmarks: parseInt(bookmarksResult.rows[0].bookmark_count),
      total_reads: parseInt(totalReadsResult.rows[0].total_reads),
      total_loves: parseInt(totalLovesResult.rows[0].total_loves),
      reading_streak: parseInt(streakResult.rows[0].days_read),
      member_since: req.user.created_at
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUserStats };
