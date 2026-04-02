const db = require('./index');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        avatar_url TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Stories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        hook TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        genre VARCHAR(50) NOT NULL,
        cover_image TEXT,
        status VARCHAR(20) DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed')),
        type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'pdf')),
        pdf_path TEXT,
        reads INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Episodes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS episodes (
        id SERIAL PRIMARY KEY,
        story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
        episode_number INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        read_time INTEGER DEFAULT 5,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(story_id, episode_number)
      );
    `);

    // Reactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reactions (
        id SERIAL PRIMARY KEY,
        story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        reaction_type VARCHAR(20) CHECK (reaction_type IN ('love', 'shocked', 'fire', 'sad', 'dead')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(story_id, user_id, reaction_type)
      );
    `);

    // Reading progress table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reading_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
        episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT FALSE,
        last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, story_id, episode_id)
      );
    `);

    // Bookmarks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, story_id)
      );
    `);

    // Seed admin and user
    const adminPassword = await bcrypt.hash('admin123!', 10);
    const userPassword = await bcrypt.hash('user123!', 10);

    await client.query(`
      INSERT INTO users (username, email, password_hash, role, avatar_url, bio)
      VALUES 
        ('admin', 'admin@cliff.se', $1, 'admin', 'https://picsum.photos/seed/admin/100/100', 'Platform administrator'),
        ('user', 'user@cliff.se', $2, 'user', 'https://picsum.photos/seed/user/100/100', 'Läsare och upptäckare')
      ON CONFLICT (username) DO NOTHING;
    `, [adminPassword, userPassword]);

    // Seed some stories
    const userResult = await client.query(`SELECT id FROM users WHERE username = 'user'`);
    const userId = userResult.rows[0]?.id;

    if (userId) {
      // Check if stories already exist before inserting
      const existingStories = await client.query(`SELECT COUNT(*) FROM stories`);
      if (parseInt(existingStories.rows[0].count) === 0) {
        await client.query(`
          INSERT INTO stories (title, hook, author_id, genre, cover_image, status, type, pdf_path)
          VALUES 
            ('Det Sista Meddelandet', 'Det började med ett meddelande från ett okänt nummer...', $1, 'Thriller', 'https://picsum.photos/seed/story1/400/600', 'ongoing', 'text', NULL),
            ('Stjärnornas Barn', 'I en framtid där jorden är obeboelig...', $1, 'Sci-Fi', 'https://picsum.photos/seed/story2/400/600', 'ongoing', 'text', NULL),
            ('Sommarregnet', 'Den sommaren när allt förändrades...', $1, 'Romance', 'https://picsum.photos/seed/story3/400/600', 'completed', 'text', NULL),
            ('Bloom on the Moon', 'En magisk berättelse för barn om en blomma som växer på månen...', $1, 'Barnbok', 'https://picsum.photos/seed/moon/400/600', 'completed', 'pdf', '/pdf/Bloom_on_the_moon.pdf');
        `, [userId]);
      }
    }

    await client.query('COMMIT');
    console.log('✅ Database tables created and seeded successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

const runMigration = async () => {
  try {
    await createTables();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  runMigration();
}

module.exports = { createTables };
