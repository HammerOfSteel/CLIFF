const db = require('../db');

const getAllStories = async (req, res) => {
  try {
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
        (SELECT COALESCE(AVG(read_time), 5) FROM episodes WHERE story_id = s.id) as avg_read_time
      FROM stories s
      JOIN users u ON s.author_id = u.id
      ORDER BY s.created_at DESC
    `);

    res.json({ stories: result.rows });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const storyResult = await db.query(`
      SELECT 
        s.*,
        u.username as author,
        u.avatar_url as author_avatar,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'love') as love_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'shocked') as shocked_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'fire') as fire_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'sad') as sad_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'dead') as dead_count
      FROM stories s
      JOIN users u ON s.author_id = u.id
      WHERE s.id = $1
    `, [id]);

    if (storyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const episodesResult = await db.query(`
      SELECT * FROM episodes WHERE story_id = $1 ORDER BY episode_number ASC
    `, [id]);

    const story = {
      ...storyResult.rows[0],
      episodes: episodesResult.rows,
    };

    res.json({ story });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createStory = async (req, res) => {
  try {
    const { title, hook, genre, cover_image, status, type, pdf_path } = req.body;
    const author_id = req.user.id;

    if (!title || !hook || !genre) {
      return res.status(400).json({ error: 'Title, hook, and genre are required' });
    }

    const result = await db.query(`
      INSERT INTO stories (title, hook, author_id, genre, cover_image, status, type, pdf_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [title, hook, author_id, genre, cover_image || 'https://picsum.photos/seed/' + title + '/400/600', status || 'ongoing', type || 'text', pdf_path || null]);

    res.status(201).json({ story: result.rows[0] });
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createEpisode = async (req, res) => {
  try {
    const { story_id } = req.params;
    const { title, content, read_time } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Verify story exists and belongs to user
    const storyCheck = await db.query(
      'SELECT * FROM stories WHERE id = $1 AND author_id = $2',
      [story_id, req.user.id]
    );

    if (storyCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found or unauthorized' });
    }

    // Get next episode number
    const episodeCount = await db.query(
      'SELECT COUNT(*) FROM episodes WHERE story_id = $1',
      [story_id]
    );
    const episode_number = parseInt(episodeCount.rows[0].count) + 1;

    const result = await db.query(`
      INSERT INTO episodes (story_id, episode_number, title, content, read_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [story_id, episode_number, title, content, read_time || 5]);

    res.status(201).json({ episode: result.rows[0] });
  } catch (error) {
    console.error('Create episode error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserStories = async (req, res) => {
  try {
    const author_id = req.user.id;

    const result = await db.query(`
      SELECT 
        s.*,
        (SELECT COUNT(*) FROM episodes WHERE story_id = s.id) as episode_count,
        (SELECT COUNT(*) FROM reactions WHERE story_id = s.id AND reaction_type = 'love') as love_count
      FROM stories s
      WHERE s.author_id = $1
      ORDER BY s.created_at DESC
    `, [author_id]);

    res.json({ stories: result.rows });
  } catch (error) {
    console.error('Get user stories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllStories, getStoryById, createStory, createEpisode, getUserStories };
