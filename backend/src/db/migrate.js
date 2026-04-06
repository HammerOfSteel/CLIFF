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
        progress_percentage INTEGER DEFAULT 0,
        scroll_position INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        audio_position REAL DEFAULT 0,
        UNIQUE(user_id, story_id, episode_id)
      );
    `);

    // Add missing columns to existing reading_progress table
    await client.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='reading_progress' AND column_name='progress_percentage') THEN
          ALTER TABLE reading_progress ADD COLUMN progress_percentage INTEGER DEFAULT 0;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='reading_progress' AND column_name='scroll_position') THEN
          ALTER TABLE reading_progress ADD COLUMN scroll_position INTEGER DEFAULT 0;
        END IF;
      END $$;
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

        // Seed episodes for text-based stories
        await client.query(`
          INSERT INTO episodes (story_id, episode_number, title, content, read_time)
          VALUES 
            -- Det Sista Meddelandet
            (1, 1, 'Meddelandet', 'Det var en helt vanlig tisdagskväll när mobilen surrade till. Ett okänt nummer. Jag tvekade ett ögonblick innan jag öppnade meddelandet.\n\n"De vet att du vet. Du har 24 timmar."\n\nMitt hjärta började slå snabbare. Vem var "de"? Och vad var det jag visste?\n\nJag hade arbetat som journalist i tio år, men aldrig stött på något som verkade så... hotfullt. Mina händer darrade när jag läste meddelandet igen.\n\nSedan kom ett till meddelande. Den här gången en bild. En bild av mitt hus. Tagen för bara några minuter sedan.', 8),
            (1, 2, 'Jakten Börjar', 'Jag kunde inte stanna hemma. Jag packade snabbt en väska och lämnade lägenheten. Gatan var tom, gatlyktorna kastade långa skuggor över trottoaren.\n\nMin bil stod parkerad några kvarter bort. När jag närmade mig den såg jag något som fick mig att frysa till. En lapp under vindrutetorkaren.\n\n"Vi vet var du är. Spring inte. Det gör det bara värre."\n\nPaniken slog in med full kraft. Jag behövde hjälp. Men vem kunde jag lita på? Min redaktör? Polisen? Eller var de också en del av "de"?\n\nJag bestämde mig för att ringa den enda person jag visste skulle hjälpa mig – min gamla kompis från universitetet, Marcus. Han arbetade inom cybersäkerhet och visste hur man håller sig dold.', 10),
            
            -- Stjärnornas Barn
            (2, 1, 'Vakna på Exodus', 'Jag vaknade av alarmet. Röd. Varningssignalen genljöd genom hela skeppet.\n\n"Alla evakuera till säker zon Alpha. Detta är inte en övning."\n\nExodus hade varit mitt hem i femton år. Vi var den sista generationen människor som lämnade jorden när den blev obeboelig. Tusen själar på väg mot Proxima Centauri b, en planet vi hoppades kunde bli vårt nya hem.\n\nMen något hade gått fel. Fruktansvärt fel.\n\nJag rusade genom korridorerna. Andra besättningsmedlemmar sprang åt olika håll. Panik. Förvirring. Rädsla.\n\nI kontrollrummet samlades kaptenen och de högst rankade officerarna runt skärmarna.\n\n"Vad är det som händer?" frågade jag.\n\nKaptenen vände sig mot mig med en blick jag aldrig sett förut. Ren fasa.', 7),
            (2, 2, 'Kontakten', '"Det finns något där ute," sa kaptenen med skälvande röst. "Något som kom från planeten."\n\nPå skärmen kunde jag se det. Ett objekt som närmade sig skeppet med en hastighet som inte borde vara möjlig. Det var inte slumpmässigt. Inte naturligt. Det var... intelligent.\n\n"Försök kommunicera med det," sa jag.\n\n"Vi har försökt. Det svarar inte."\n\n"Kanske inte på vårt sätt. Försök med matematik. Primtal. Ljussekvenser."\n\nTekniken började sända ut olika mönster. Sekunder blev till minuter. Spänningen i rummet var nästan kvävande.\n\nPlötsligt – ett svar. Skärmen översköljdes av data. Symboler. Mönster. Ett språk vi aldrig sett förut.\n\nMen mitt i all förvirring, en sak var tydlig: det var en inbjudan.', 9),
            
            -- Sommarregnet  
            (3, 1, 'Första Dagen', 'Regnet trummade mot fönstret när jag kom fram till sommarhuset. Det var tio år sedan sist. Tio år sedan den sommaren.\n\nJag hade svurit att aldrig komma tillbaka. Men när mormor lämnade huset till mig i sitt testamente kunde jag inte säga nej. Det var som om hon visste att jag behövde komma tillbaka.\n\nNycke ln satt löst i låset, som om någon nyligen olj at det. Dörren gled upp med ett gnisslande ljud.\n\nInne luktade det instängt och damm. Men under allt det kunde jag känna lukten av sommar. Av minnen. Av honom.\n\nJag gick genom huset och allt kom tillbaka. Våra skratt. Våra hemliga möten. Det löfte vi gav varandra den sista natten.\n\nEtt löfte jag aldrig höll.', 6),
            (3, 2, 'Återföreningen', 'Det tog tre dagar innan jag vågade gå till stranden. Den lilla viken där vi brukade träffas.\n\nOch där var han. Som om tio år inte passerat. Han stod vid vattenbrynet och tittade ut mot horisonten, precis som han alltid gjorde.\n\nMitt hjärta stannade. Jag kunde vända om. Låtsas att jag inte sett honom. Men mina fötter rörde sig framåt av sig själva.\n\n"Erik?" Min röst var knappt en viskning.\n\nHan vände sig om. Hans ögon vidgades. En sekund av chock, sedan något mjukare. Något som såg ut som... hopp?\n\n"Sara. Du kom tillbaka."\n\n"Jag... mormor lämnade mig huset."\n\nEn lång tystnad. Vågor som slog mot stranden. Måsars skrik i fjärran.\n\n"Jag väntade på dig," sa han till slut. "Varje sommar. Jag väntade."', 8);
        `);
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
