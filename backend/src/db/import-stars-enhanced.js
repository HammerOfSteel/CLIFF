const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const BOOKS_PATH = process.env.BOOKS_PATH || '/tmp/stars and seas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://cliff_user:cliff_password@localhost:5432/cliff_db',
});

const STORIES_TO_IMPORT = [
  {
    folder: 'heimdal',
    fileName: 'main_v2.md',
    title: 'Heimdal',
    description: 'A father and his three-year-old daughter travel through Wales, England, and Sweden—a journey made more precious by what comes after. Capturing how a child sees the world, how love manifests in small moments, and what it means to claim a place in the world before everything changes.',
    genre: 'Literary Fiction',
    coverImage: '/images/stars_and_seas/heimdal.png',
    wordsPerEpisode: 2500,
  },
  {
    folder: 'daffodil',
    fileName: 'main.md',
    title: 'Daffodil',
    description: 'Two seventeen-year-olds escape London to the Welsh Valleys, where they discover belonging, found family, and the resilience required to birth new life and new beginnings. A story about what it means to be "whole" when the world insists you\'re broken, and what family looks like when you build it yourself.',
    genre: 'Contemporary Fiction',
    coverImage: '/images/stars_and_seas/daffodil.png',
    wordsPerEpisode: 3000,
  },
  {
    folder: 'true_colors',
    fileName: 'main.md',
    title: 'True Colors',
    description: 'A young single father navigates early grief with his two-month-old daughter, Tima. Set in the Welsh valleys, the story follows Papa as he finds solace in found family and discovers that healing doesn\'t mean forgetting, but learning to carry absence as presence.',
    genre: 'Contemporary Fiction',
    coverImage: '/images/stars_and_seas/true_colors.png',
    wordsPerEpisode: 2500,
  },
];

// Enhanced text formatting for better readability
function formatTextEnhanced(text) {
  // Split into paragraphs
  let paragraphs = text.split(/\n\n+/);
  
  const formatted = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    let para = paragraphs[i].trim();
    
    if (!para) continue;
    
    // Preserve section breaks and decorative elements
    if (para.match(/^[\-\—\*]{3,}$/) || para.match(/^[#\*]{1,3}\s/)) {
      formatted.push('\n' + para + '\n');
      continue;
    }
    
    // Break up very long paragraphs (>600 chars) at sentence boundaries
    if (para.length > 600 && !para.startsWith('"')) {
      const sentences = para.match(/[^.!?]+[.!?]+/g) || [para];
      let chunk = '';
      
      for (const sentence of sentences) {
        if (chunk.length + sentence.length > 400) {
          formatted.push(chunk.trim());
          chunk = sentence;
        } else {
          chunk += sentence;
        }
      }
      if (chunk.trim()) {
        formatted.push(chunk.trim());
      }
      continue;
    }
    
    // Check if this is dialogue
    const isDialogue = para.startsWith('"') || para.match(/^["']/) || para.includes('" ') || para.includes(', "');
    const nextPara = paragraphs[i + 1] ? paragraphs[i + 1].trim() : '';
    const prevPara = i > 0 ? paragraphs[i - 1].trim() : '';
    
    // Add dialogue spacing
    if (isDialogue) {
      // If previous wasn't dialogue and this is, add extra space before
      const prevWasDialogue = prevPara && (prevPara.startsWith('"') || prevPara.includes('" '));
      if (!prevWasDialogue && formatted.length > 0) {
        formatted.push(''); // Add blank line before dialogue starts
      }
      formatted.push(para);
      
      // If next isn't dialogue but this is, add extra space after
      const nextIsDialogue = nextPara && (nextPara.startsWith('"') || nextPara.includes('" '));
      if (!nextIsDialogue && nextPara) {
        formatted.push(''); // Add blank line after dialogue ends
      }
    } else {
      formatted.push(para);
    }
  }
  
  // Join with double line breaks, but preserve intentional triple+ breaks
  return formatted.join('\n\n').replace(/\n{4,}/g, '\n\n\n'); // Max 3 line breaks
}

// Split content into episodes with enhanced formatting
function splitByWordCount(content, wordsPerEpisode) {
  // Apply enhanced formatting first
  const formattedContent = formatTextEnhanced(content);
  
  // Split into paragraphs
  const paragraphs = formattedContent.split(/\n\n+/);
  
  const episodes = [];
  let currentEpisode = [];
  let currentWordCount = 0;
  
  for (const paragraph of paragraphs) {
    const paragraphWords = paragraph.trim().split(/\s+/).length;
    
    // If adding this paragraph would exceed target, start new episode
    if (currentWordCount > 0 && currentWordCount + paragraphWords > wordsPerEpisode) {
      const episodeContent = currentEpisode.join('\n\n');
      episodes.push(episodeContent);
      currentEpisode = [paragraph];
      currentWordCount = paragraphWords;
    } else {
      currentEpisode.push(paragraph);
      currentWordCount += paragraphWords;
    }
  }
  
  // Add final episode
  if (currentEpisode.length > 0) {
    const episodeContent = currentEpisode.join('\n\n');
    episodes.push(episodeContent);
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
    
    const mainFilePath = path.join(BOOKS_PATH, storyConfig.folder, storyConfig.fileName);
    
    if (!fs.existsSync(mainFilePath)) {
      console.log(`⚠️  Skipping ${storyConfig.title} - ${storyConfig.fileName} not found`);
      return;
    }
    
    const content = fs.readFileSync(mainFilePath, 'utf-8');
    const wordCount = content.split(/\s+/).length;
    
    console.log(`   File: ${storyConfig.fileName}`);
    console.log(`   Total words: ${wordCount.toLocaleString()}`);
    console.log(`   Cover: ${storyConfig.coverImage}`);
    
    const episodes = splitByWordCount(content, storyConfig.wordsPerEpisode);
    
    console.log(`   Creating ${episodes.length} episodes (~${storyConfig.wordsPerEpisode} words each)`);
    
    // Get Eric as author
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
    
    // Delete existing story
    const deleteResult = await client.query(
      `DELETE FROM stories WHERE title = $1 RETURNING id`,
      [storyConfig.title]
    );
    
    if (deleteResult.rows.length > 0) {
      console.log(`   🗑️  Deleted old version`);
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
      const paragraphCount = episode.content.split(/\n\n+/).length;
      
      await client.query(
        `INSERT INTO episodes (
          story_id, episode_number, title, content
        ) 
        VALUES ($1, $2, $3, $4)`,
        [storyId, episode.episodeNumber, episode.title, episode.content]
      );
      console.log(`   📝 Episode ${episode.episodeNumber}: ${episodeWordCount.toLocaleString()} words, ${paragraphCount} paragraphs`);
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
    console.log('🌊 Stars and Seas - ENHANCED FORMATTING');
    console.log('📝 Better spacing, dialogue breaks, readable paragraphs\n');
    console.log(`📁 Reading from: ${BOOKS_PATH}\n`);
    
    if (!fs.existsSync(BOOKS_PATH)) {
      console.error(`❌ Books path not found: ${BOOKS_PATH}`);
      process.exit(1);
    }
    
    for (const storyConfig of STORIES_TO_IMPORT) {
      await importStory(storyConfig);
    }
    
    console.log('✅ All stories imported with enhanced formatting!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

main();
