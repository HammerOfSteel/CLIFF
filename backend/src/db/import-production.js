const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// For production, we'll read from a mounted volume or remote source
const BOOKS_PATH = process.env.BOOKS_PATH || '/home/ubuntu/books/stars and seas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Stories configuration
const STORIES_TO_IMPORT = [
  {
    folder: 'heimdal',
    title: 'Heimdal',
    description: 'A father and his three-year-old daughter travel through Wales, England, and Sweden—a journey made more precious by what comes after. Capturing how a child sees the world, how love manifests in small moments, and what it means to claim a place in the world before everything changes.',
    genre: 'Literary Fiction',
    coverImage: '/covers/heimdal.jpg',
    chaptersPerEpisode: 3, // 18 chapters = 6 episodes
  },
  {
    folder: 'daffodil',
    title: 'Daffodil',
    description: 'Two seventeen-year-olds escape London to the Welsh Valleys, where they discover belonging, found family, and the resilience required to birth new life and new beginnings. A story about what it means to be "whole" when the world insists you\'re broken, and what family looks like when you build it yourself.',
    genre: 'Contemporary Fiction',
    coverImage: '/covers/daffodil.jpg',
    chaptersPerEpisode: 3, // 13 chapters = 4-5 episodes
  },
  {
    folder: 'true_colors',
    title: 'True Colors',
    description: 'A young single father navigates early grief with his two-month-old daughter, Tima. Set in the Welsh valleys, the story follows Papa as he finds solace in found family and discovers that healing doesn\'t mean forgetting, but learning to carry absence as presence.',
    genre: 'Contemporary Fiction',
    coverImage: '/covers/true_colors.jpg',
    useParts: true,
    partsPerEpisode: 1,
  },
];

// Parse chapter content from markdown
function splitIntoChapters(content) {
  const chapters = [];
  const chapterRegex = /^## CHAPTER (\d+):(.*?)(?=^## CHAPTER \d+:|$)/gms;
  let match;
  
  while ((match = chapterRegex.exec(content)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const chapterContent = match[0];
    
    chapters.push({
      number: chapterNum,
      title: chapterTitle,
      content: chapterContent.trim(),
    });
  }
  
  return chapters;
}

// Parse parts content from markdown (for True Colors style)
function splitIntoParts(content) {
  const parts = [];
  const partRegex = /^## PART (ONE|TWO|THREE|FOUR|EPILOGUE):(.*?)(?=^## PART |^## EPILOGUE:|$)/gms;
  let match;
  let partNum = 1;
  
  while ((match = partRegex.exec(content)) !== null) {
    const partName = match[1];
    const partTitle = match[2].trim();
    const partContent = match[0];
    
    parts.push({
      number: partNum++,
      title: `${partName}: ${partTitle}`,
      content: partContent.trim(),
    });
  }
  
  return parts;
}

// Group chapters into episodes
function groupIntoEpisodes(chapters, chaptersPerEpisode) {
  const episodes = [];
  for (let i = 0; i < chapters.length; i += chaptersPerEpisode) {
    const episodeChapters = chapters.slice(i, i + chaptersPerEpisode);
    const firstChapter = episodeChapters[0].number;
    const lastChapter = episodeChapters[episodeChapters.length - 1].number;
    
    const title = episodeChapters.length === 1 
      ? `Chapter ${firstChapter}: ${episodeChapters[0].title}`
      : `Chapters ${firstChapter}-${lastChapter}`;
    
    const content = episodeChapters.map(ch => ch.content).join('\n\n---\n\n');
    
    episodes.push({
      title,
      content,
      episodeNumber: episodes.length + 1,
    });
  }
  
  return episodes;
}

async function importStory(storyConfig) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log(`\n📖 Importing: ${storyConfig.title}`);
    
    // Read the chapters file
    const chaptersFilePath = path.join(BOOKS_PATH, storyConfig.folder, 'main_chapters.md');
    
    if (!fs.existsSync(chaptersFilePath)) {
      console.log(`⚠️  Skipping ${storyConfig.title} - main_chapters.md not found at ${chaptersFilePath}`);
      return;
    }
    
    const chaptersContent = fs.readFileSync(chaptersFilePath, 'utf-8');
    
    // Parse chapters or parts
    const items = storyConfig.useParts 
      ? splitIntoParts(chaptersContent)
      : splitIntoChapters(chaptersContent);
    
    console.log(`   Found ${items.length} ${storyConfig.useParts ? 'parts' : 'chapters'}`);
    
    if (items.length === 0) {
      console.log(`⚠️  No content found in ${storyConfig.title}`);
      return;
    }
    
    // Group into episodes
    const itemsPerEpisode = storyConfig.useParts 
      ? storyConfig.partsPerEpisode 
      : storyConfig.chaptersPerEpisode;
    const episodes = groupIntoEpisodes(items, itemsPerEpisode);
    
    console.log(`   Creating ${episodes.length} episodes`);
    
    // Get or create Eric as author
    const authorResult = await client.query(
      `SELECT id FROM users WHERE username = 'eric' LIMIT 1`
    );
    
    let authorId;
    if (authorResult.rows.length === 0) {
      // Create Eric user if doesn't exist
      const newAuthor = await client.query(
        `INSERT INTO users (username, email, password_hash) 
         VALUES ('eric', 'eric@cliff.com', '$2b$10$dummy.hash.for.eric.author') 
         RETURNING id`
      );
      authorId = newAuthor.rows[0].id;
      console.log(`   ✅ Created author Eric with ID: ${authorId}`);
    } else {
      authorId = authorResult.rows[0].id;
      console.log(`   ℹ️  Using existing author Eric (ID: ${authorId})`);
    }
    
    // Check if story already exists
    const existingStory = await client.query(
      `SELECT id FROM stories WHERE title = $1 LIMIT 1`,
      [storyConfig.title]
    );
    
    if (existingStory.rows.length > 0) {
      console.log(`   ⚠️  Story "${storyConfig.title}" already exists, skipping`);
      await client.query('ROLLBACK');
      return;
    }
    
    // Insert story (using hook instead of description, and author_id)
    const storyResult = await client.query(
      `INSERT INTO stories (
        title, hook, author_id, genre, type, cover_image
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id`,
      [
        storyConfig.title,
        storyConfig.description, // Using description as hook
        authorId,
        storyConfig.genre || 'Literary Fiction',
        'text',
        storyConfig.coverImage,
      ]
    );
    
    const storyId = storyResult.rows[0].id;
    console.log(`   ✅ Story created with ID: ${storyId}`);
    
    // Insert episodes
    for (const episode of episodes) {
      await client.query(
        `INSERT INTO episodes (
          story_id, episode_number, title, content
        ) 
        VALUES ($1, $2, $3, $4)`,
        [storyId, episode.episodeNumber, episode.title, episode.content]
      );
      console.log(`   📝 Episode ${episode.episodeNumber}: ${episode.title.substring(0, 60)}...`);
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
    console.log('🌊 Starting Stars and Seas import...');
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
