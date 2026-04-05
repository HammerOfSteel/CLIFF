const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

// Use DATABASE_URL if available, otherwise build from individual env vars
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      user: process.env.DB_USER || 'cliff',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'cliff',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
    });

// Genre mapping
const genreMap = {
  'literary': 'Literary Fiction',
  'thriller': 'Thriller',
  'romance': 'Romance',
  'scifi': 'Science Fiction',
  'adventure': 'Adventure'
};

// Image filename mapping (for cases where image names differ from story filenames)
const imageNameMap = {
  'the_3am_caller': 'the_3_am_caller',
  'museum_of_lost_things': 'the_museum_of_lost_memories'
};

// Format text with better paragraph breaks
function formatTextForReading(text) {
  let lines = text.split('\n');
  let formatted = [];
  
  for (let line of lines) {
    line = line.trim();
    
    if (line === '' || line === '---') {
      formatted.push(line);
      continue;
    }
    
    if (line.startsWith('#')) {
      formatted.push(line);
      continue;
    }
    
    if (line.length > 350) {
      let sentences = line.match(/[^.!?]+[.!?]+/g) || [line];
      let chunk = '';
      
      for (let sentence of sentences) {
        if ((chunk + sentence).length > 350) {
          if (chunk) formatted.push(chunk.trim());
          chunk = sentence;
        } else {
          chunk += sentence;
        }
      }
      
      if (chunk) formatted.push(chunk.trim());
    } else {
      formatted.push(line);
    }
  }
  
  return formatted.join('\n\n');
}

// Split story into episodes by word count
function splitIntoEpisodes(content, targetWords = 1500) {
  const lines = content.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed !== '' && !trimmed.startsWith('#');
  });
  
  const episodes = [];
  let currentEpisode = [];
  let wordCount = 0;
  
  for (const line of lines) {
    const lineWords = line.trim().split(/\s+/).length;
    
    if (line.trim() === '---') {
      if (currentEpisode.length > 0) {
        episodes.push(currentEpisode.join('\n\n'));
        currentEpisode = [];
        wordCount = 0;
      }
      continue;
    }
    
    if (wordCount + lineWords > targetWords && currentEpisode.length > 0) {
      episodes.push(currentEpisode.join('\n\n'));
      currentEpisode = [line];
      wordCount = lineWords;
    } else {
      currentEpisode.push(line);
      wordCount += lineWords;
    }
  }
  
  if (currentEpisode.length > 0) {
    episodes.push(currentEpisode.join('\n\n'));
  }
  
  return episodes;
}

// Import a single story
async function importStory(filePath, genre) {
  try {
    console.log(`\nImporting ${filePath}...`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    
    // Extract title from first line
    const lines = content.split('\n');
    const titleLine = lines.find(line => line.startsWith('#'));
    const title = titleLine ? titleLine.replace(/^#+\s*/, '').trim() : fileName;
    
    // Get content after title
    const contentStart = lines.indexOf(titleLine) + 1;
    const storyContent = lines.slice(contentStart).join('\n');
    
    // Format the content
    const formatted = formatTextForReading(storyContent);
    
    // Split into episodes
    const episodes = splitIntoEpisodes(formatted);
    console.log(`  Split into ${episodes.length} episodes`);
    
    // Get image filename (use mapping if exists, otherwise use story filename)
    const imageFileName = imageNameMap[fileName] || fileName;
    
    // Create a hook from first paragraph
    const firstParagraph = formatted.split('\n\n').find(p => p && !p.startsWith('#') && p.length > 10);
    const hook = firstParagraph ? firstParagraph.substring(0, 200) + '...' : `A ${genreMap[genre]} story`;
    
    // Check if story already exists
    const existing = await pool.query('SELECT id FROM stories WHERE title = $1', [title]);
    
    let storyId;
    if (existing.rows.length > 0) {
      // Update existing story
      console.log(`  Story already exists, updating...`);
      const updateResult = await pool.query(
        `UPDATE stories 
         SET hook = $1, genre = $2, cover_image = $3, status = 'completed', updated_at = CURRENT_TIMESTAMP
         WHERE title = $4
         RETURNING id`,
        [hook, genreMap[genre], `/images/new_collection/${imageFileName}.jpg`, title]
      );
      storyId = updateResult.rows[0].id;
    } else {
      // Insert new story
      const insertResult = await pool.query(
        `INSERT INTO stories (title, hook, genre, cover_image, status)
         VALUES ($1, $2, $3, $4, 'completed')
         RETURNING id`,
        [title, hook, genreMap[genre], `/images/new_collection/${imageFileName}.jpg`]
      );
      storyId = insertResult.rows[0].id;
    }
    
    console.log(`  Story ID: ${storyId}`);
    
    // Delete existing episodes
    await pool.query('DELETE FROM episodes WHERE story_id = $1', [storyId]);
    
    // Insert new episodes
    for (let i = 0; i < episodes.length; i++) {
      const episodeTitle = `Episode ${i + 1}`;
      const readTime = Math.ceil(episodes[i].split(/\s+/).length / 200); // ~200 words per minute
      
      await pool.query(
        `INSERT INTO episodes (story_id, episode_number, title, content, read_time)
         VALUES ($1, $2, $3, $4, $5)`,
        [storyId, i + 1, episodeTitle, episodes[i], readTime]
      );
    }
    
    console.log(`  ✓ Imported ${episodes.length} episodes`);
    return { title, episodes: episodes.length };
    
  } catch (error) {
    console.error(`Error importing ${filePath}:`, error);
    throw error;
  }
}

// Main import function
async function importAllStories() {
  const baseDir = path.join(__dirname, '../../stories');
  const imported = [];
  
  try {
    console.log('Starting import of new story collection...\n');
    
    // Import by genre
    for (const [genreKey, genreName] of Object.entries(genreMap)) {
      const genreDir = path.join(baseDir, genreKey);
      
      try {
        const files = await fs.readdir(genreDir);
        const mdFiles = files.filter(f => f.endsWith('.md'));
        
        console.log(`\n=== ${genreName} ===`);
        
        for (const file of mdFiles) {
          const filePath = path.join(genreDir, file);
          const result = await importStory(filePath, genreKey);
          imported.push({ genre: genreName, ...result });
        }
        
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`  No stories found in ${genreKey}/`);
        } else {
          throw error;
        }
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('IMPORT SUMMARY');
    console.log('='.repeat(50));
    
    const byGenre = {};
    for (const story of imported) {
      if (!byGenre[story.genre]) byGenre[story.genre] = [];
      byGenre[story.genre].push(story);
    }
    
    for (const [genre, stories] of Object.entries(byGenre)) {
      console.log(`\n${genre}:`);
      for (const story of stories) {
        console.log(`  • ${story.title} (${story.episodes} episodes)`);
      }
    }
    
    const totalEpisodes = imported.reduce((sum, s) => sum + s.episodes, 0);
    console.log(`\nTotal: ${imported.length} stories, ${totalEpisodes} episodes`);
    
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  importAllStories();
}

module.exports = { importStory, importAllStories };
