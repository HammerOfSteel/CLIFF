const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// For production, we'll read from a mounted volume or remote source
const BOOKS_PATH = process.env.BOOKS_PATH || '/tmp/stars and seas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://cliff_user:cliff_password@localhost:5432/cliff_db',
});

// Stories configuration with CORRECT file names
const STORIES_TO_IMPORT = [
  {
    folder: 'heimdal',
    fileName: 'main_v2.md', // User specified this file
    title: 'Heimdal',
    description: 'A father and his three-year-old daughter travel through Wales, England, and Sweden—a journey made more precious by what comes after. Capturing how a child sees the world, how love manifests in small moments, and what it means to claim a place in the world before everything changes.',
    genre: 'Literary Fiction',
    coverImage: '/covers/heimdal.jpg',
    wordsPerEpisode: 4000,
  },
  {
    folder: 'daffodil',
    fileName: 'main.md',
    title: 'Daffodil',
    description: 'Two seventeen-year-olds escape London to the Welsh Valleys, where they discover belonging, found family, and the resilience required to birth new life and new beginnings. A story about what it means to be "whole" when the world insists you\'re broken, and what family looks like when you build it yourself.',
    genre: 'Contemporary Fiction',
    coverImage: '/covers/daffodil.jpg',
    wordsPerEpisode: 5000,
  },
  {
    folder: 'true_colors',
    fileName: 'main.md',
    title: 'True Colors',
    description: 'A young single father navigates early grief with his two-month-old daughter, Tima. Set in the Welsh valleys, the story follows Papa as he finds solace in found family and discovers that healing doesn\'t mean forgetting, but learning to carry absence as presence.',
    genre: 'Contemporary Fiction',
    coverImage: '/covers/true_colors.jpg',
    wordsPerEpisode: 4000,
  },
];

// Split content into episodes by word count, breaking at paragraph boundaries
function splitByWordCount(content, wordsPerEpisode) {
  // Split into paragraphs (double newline separated)
  const paragraphs = content.split(/\n\n+/);
  
  const episodes = [];
  let currentEpisode = [];
  let currentWordCount = 0;
  
  for (const paragraph of paragraphs) {
    const paragraphWords = paragraph.trim().split(/\s+/).length;
    
    // If adding this paragraph would exceed target, start new episode
    if (currentWordCount > 0 && currentWordCount + paragraphWords > wordsPerEpisode) {
      episodes.push(currentEpisode.join('\n\n'));
      currentEpisode = [paragraph];
      currentWordCount = paragraphWords;
    } else {
      currentEpisode.push(paragraph);
      currentWordCount += paragraphWords;
    }
  }
  
  // Add final episode
  if (currentEpisode.length > 0) {
    episodes.push(currentEpisode.join('\n\n'));
  }
  
  return episodes.map((content, index) => ({
    episodeNumber: index + 1,
    title: `Episode ${index + 1}`,
    content: content.trim(),
  }));
}

async function importStory(storyConfig) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log(`\n📖 Importing: ${storyConfig.title}`);
    
    // Read the CORRECT main.md file
    const mainFilePath = path.join(BOOKS_PATH, storyConfig.folder, storyConfig.fileName);
    
    if (!fs.existsSync(mainFilePath)) {
      console.log(`⚠️  Skipping ${storyConfig.title} - ${storyConfig.fileName} not found at ${mainFilePath}`);
      return;
    }
    
    const content = fs.readFileSync(mainFilePath, 'utf-8');
    const wordCount = content.split(/\s+/).length;
    
    console.log(`   File: ${storyConfig.fileName}`);
    console.log(`   Total words: ${wordCount.toLocaleString()}`);
    
    // Split into episodes by word count
    const episodes = splitByWordCount(content, storyConfig.wordsPerEpisode);
    
    console.log(`   Creating ${episodes.length} episodes (~${storyConfig.wordsPerEpisode} words each)`);
    
    // Get or create Eric as author
    const authorResult = await client.query(
      `SELECT id FROM users WHERE username = 'eric' LIMIT 1`
    );
    
    let authorId;
    if (authorResult.rows.length === 0) {
      const newAuthor = await client.query(
        `INSERT INTO users (username, email, password_hash) 
         VALUES ('eric', 'eric@cliff.com', '$2b$10$dummy.hash.for.eric.author') 
         RETURNING id`
      );
      authorId = newAuthor.rows[0].id;
      console.log(`   ✅ Created author Eric with ID: ${authorId}`);
    } else {
      authorId = authorResult.rows[0].id;
    }
    
    // Delete existing story if it exists (to replace with correct version)
    const deleteResult = await client.query(
      `DELETE FROM stories WHERE title = $1 RETURNING id`,
      [storyConfig.title]
    );
    
    if (deleteResult.rows.length > 0) {
      console.log(`   🗑️  Deleted old version of "${storyConfig.title}"`);
    }
    
    // Insert story
    const storyResult = await client.query(
      `INSERT INTO stories (
        title, hook, author_id, genre, type, cover_image
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id`,
      [
        storyConfig.title,
        storyConfig.description,
        authorId,
        storyConfig.genre,
        'text',
        storyConfig.coverImage,
      ]
    );
    
    const storyId = storyResult.rows[0].id;
    console.log(`   ✅ Story created with ID: ${storyId}`);
    
    // Insert episodes
    for (const episode of episodes) {
      const episodeWordCount = episode.content.split(/\s+/).length;
      await client.query(
        `INSERT INTO episodes (
          story_id, episode_number, title, content
        ) 
        VALUES ($1, $2, $3, $4)`,
        [storyId, episode.episodeNumber, episode.title, episode.content]
      );
      console.log(`   📝 Episode ${episode.episodeNumber}: ${episodeWordCount.toLocaleString()} words`);
    }
    
    await client.query('COMMIT');
    console.log(`   ✅ ${storyConfig.title} imported successfully!\n`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Error importing ${storyConfig.title}:`, error.message);
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    console.log('🌊 Starting Stars and Seas import (CORRECTED VERSION)...');
    console.log(`📁 Reading from: ${BOOKS_PATH}\n`);
    
    if (!fs.existsSync(BOOKS_PATH)) {
      console.error(`❌ Books path not found: ${BOOKS_PATH}`);
      console.error('Please ensure the books are uploaded to the server');
      process.exit(1);
    }
    
    for (const storyConfig of STORIES_TO_IMPORT) {
      await importStory(storyConfig);
    }
    
    console.log('✅ All stories imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

main();
