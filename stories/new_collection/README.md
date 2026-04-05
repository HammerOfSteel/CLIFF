# New Story Collection

A diverse anthology of 15 stories across 5 genres for the CLIFF reader platform.

## Completed Stories (Ready to Import)

### Literary Fiction

#### 1. **Station Four** (12,000 words)
- **File**: `literary/station_four.md`
- **Synopsis**: Gareth Phillips has been the station master at Station Four in rural Wales for thirty years. In his final week before retirement, he observes the small details that give meaning to seemingly mundane moments—the regular passengers, the rhythm of trains, and the bittersweet transition to a digital world.
- **Themes**: Time, memory, change, finding meaning in ordinary life
- **Tone**: Meditative, contemplative, quietly profound
- **Status**: ✅ Complete

#### 2. **The Museum of Lost Things**  (14,500 words)
- **File**: `literary/museum_of_lost_things.md`
- **Synopsis**: Coming soon
- **Themes**: Memory, grief, connection through objects
- **Status**: 📝 Outline ready

#### 3. **Between Stations** (11,000 words)
- **File**: `literary/between_stations.md`
- **Synopsis**: Coming soon
- **Themes**: Immigration, identity, belonging
- **Status**: 📝 Outline ready

### Thriller

#### 4. **The 3 AM Caller** (16,000 words)
- **File**: `thriller/the_3am_caller.md`
- **Synopsis**: Maya Chen works nights at a crisis hotline. When a mysterious caller named David starts calling exactly at 3 AM, their conversations seem innocent—until she realizes he's describing a murder that hasn't happened yet. As the pieces come together, Maya discovers she's not just a witness; she's part of the plan.
- **Themes**: Truth vs. perception, moral ambiguity, psychological manipulation
- **Tone**: Tense, atmospheric, psychologically complex
- **Status**: ✅ Complete

#### 5. **The Inheritance** (15,000 words)
- **File**: `thriller/the_inheritance.md`
- **Synopsis**: Coming soon
- **Themes**: Family secrets, greed, paranoia
- **Status**: 📝 Outline ready

#### 6. **Blackout** (13,500 words)
- **File**: `thriller/blackout.md`
- **Synopsis**: Coming soon
- **Themes**: Memory loss, identity, conspiracy
- **Status**: 📝 Outline ready

### Romance

#### 7. **Reply All** (13,000 words)
- **File**: `romance/reply_all.md`
- **Synopsis**: Sarah Chen's stolen lunch sparks a chaotic company-wide email chain. Through the replies, she connects with Marcus from Marketing. What starts as a pasta recipe exchange becomes something deeper, told entirely through emails—from the first "Reply All" disaster to wedding planning.
- **Themes**: Modern connection, workplace romance, finding love in unexpected places
- **Tone**: Light, charming, epistolary format
- **Status**: ✅ Complete

#### 8. **The Night Shift** (17,000 words)  
- **File**: `romance/the_night_shift.md`
- **Synopsis**: Coming soon
- **Themes**: Found family, healing, second chances
- **Status**: 📝 Outline ready

#### 9. **Last Chance Lake** (16,500 words)
- **File**: `romance/last_chance_lake.md`
- **Synopsis**: Coming soon
- **Themes**: Small town romance, environmental activism, community
- **Status**: 📝 Outline ready

#### 10. **The Wedding Date Algorithm** (14,000 words)
- **File**: `romance/wedding_date_algorithm.md`
- **Synopsis**: Coming soon
- **Themes**: Tech romance, fake dating, opposites attract
- **Status**: 📝 Outline ready

### Science Fiction

#### 11. **The Last Lighthouse** (15,500 words)
- **File**: `scifi/the_last_lighthouse.md`
- **Synopsis**: Coming soon
- **Themes**: AI consciousness, isolation, human connection
- **Status**: 📝 Outline ready

#### 12. **Salvage Rights** (18,000 words)
- **File**: `scifi/salvage_rights.md`
- **Synopsis**: Coming soon
- **Themes**: Space capitalism, found family, moral choices
- **Status**: 📝 Outline ready

#### 13. **The Archive** (19,000 words)
- **File**: `scifi/the_archive.md`
- **Synopsis**: Coming soon
- **Themes**: Memory preservation, mortality, legacy
- **Status**: 📝 Outline ready

### Adventure

#### 14. **The Cartographer's Daughter** (17,500 words)
- **File**: `adventure/the_cartographers_daughter.md`
- **Synopsis**: Coming soon
- **Themes**: Exploration, legacy, father-daughter relationship
- **Status**: 📝 Outline ready

#### 15. **Summit Fever** (16,000 words)
- **File**: `adventure/summit_fever.md`
- **Synopsis**: Coming soon
- **Themes**: Mountaineering, obsession, redemption
- **Status**: 📝 Outline ready

#### 16. **River of No Return** (15,500 words)
- **File**: `adventure/river_of_no_return.md`
- **Synopsis**: Coming soon
- **Themes**: Wilderness survival, resilience, nature
- **Status**: 📝 Outline ready

## Usage

### Import Current Stories

```bash
# From backend directory
cd backend
node src/db/import-new-collection.js
```

This will import all completed stories (Station Four, The 3 AM Caller, Reply All) and split them into episodes.

### File Structure

```
stories/new_collection/
├── literary/
│   ├── station_four.md ✅
│   ├── museum_of_lost_things.md 📝
│   └── between_stations.md 📝
├── thriller/
│   ├── the_3am_caller.md ✅
│   ├── the_inheritance.md 📝
│   └── blackout.md 📝
├── romance/
│   ├── reply_all.md ✅
│   ├── the_night_shift.md 📝
│   ├── last_chance_lake.md 📝
│   └── wedding_date_algorithm.md 📝
├── scifi/
│   ├── the_last_lighthouse.md 📝
│   ├── salvage_rights.md 📝
│   └── the_archive.md 📝
└── adventure/
    ├── the_cartographers_daughter.md 📝
    ├── summit_fever.md 📝
    └── river_of_no_return.md 📝
```

### Cover Images Needed

Place cover images in `/Users/terrygoleman/Documents/dev/CLIFF/design/public/images/new_collection/`:

- `station_four.jpg`
- `the_3am_caller.jpg`
- `reply_all.jpg`
- (12 more for remaining stories)

Recommended dimensions: 800x1200px (2:3 aspect ratio)

## Writing Progress

- ✅ Completed: 3 stories (Station Four, The 3 AM Caller, Reply All)
- 📝 To be written: 12 stories
- Total word count so far: ~41,000 words
- Target total: ~230,000 words across all 15 stories

## Import Notes

The import script (`import-new-collection.js`):
- Reads markdown files from genre directories
- Formats paragraphs with proper spacing
- Splits stories into ~1500-word episodes
- Inserts into PostgreSQL database
- Generates navigation-friendly structure

Stories can be imported individually or as a batch. The script handles conflicts and updates existing stories.
