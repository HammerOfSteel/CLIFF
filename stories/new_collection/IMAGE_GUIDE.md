# Cover Images Guide

## Completed Stories - Image Requirements

### 1. Station Four (Literary Fiction)
**File needed:** `design/public/images/new_collection/station_four.jpg`

**Image concept:**
- Small Welsh railway station at dawn or dusk
- Weathered but dignified aesthetic
- Atmospheric, quiet, contemplative mood
- Possible elements: empty platform, vintage station sign, misty morning light
- Color palette: Muted greens, grays, soft golden light

**Stock photo search terms:**
- "small railway station dawn"
- "Welsh rural train platform"  
- "vintage railway station atmospheric"
- "empty train platform morning mist"

**AI generation prompt:**
> "Atmospheric photo of a quiet rural Welsh railway station at dawn, empty platform with vintage details, soft golden light breaking through mist, sense of nostalgia and quiet dignity, cinematic photography style, muted color palette"

---

### 2. The 3 AM Caller (Thriller)
**File needed:** `design/public/images/new_collection/the_3am_caller.jpg`

**Image concept:**
- Dark, moody, psychological thriller aesthetic
- Phone or headset as focal point
- Low-key lighting (3 AM feeling)
- Sense of isolation and tension
- Color palette: Deep blues, blacks, single light source

**Stock photo search terms:**
- "dark phone call night"
- "headset dramatic lighting"
- "3am lonely atmosphere"
- "crisis hotline dark aesthetic"

**AI generation prompt:**
> "Dark cinematic photo of a telephone headset in low light, 3 AM atmosphere, deep blue and black tones, dramatic side lighting, sense of mystery and psychological tension, noir thriller aesthetic, shallow depth of field"

---

### 3. Reply All (Romance)
**File needed:** `design/public/images/new_collection/reply_all.jpg`

**Image concept:**
- Light, modern, office romance vibe
- Email interface or laptop as key element
- Warm, inviting, slightly humorous tone
- Modern workspace aesthetic
- Color palette: Warm neutrals, soft whites, pops of color

**Stock photo search terms:**
- "laptop office email romantic"
- "modern workspace coffee"
- "email communication warm light"
- "office desk modern aesthetic"

**AI generation prompt:**
> "Warm, inviting photo of an open laptop on a modern desk with coffee cup, email interface visible on screen, soft natural window light, contemporary office aesthetic, romantic and cozy feeling, shallow depth of field, Instagram-worthy composition"

---

## Quick Image Sourcing Options

### Free Stock Photos
1. **Unsplash** (unsplash.com)
   - High quality, free to use
   - Search with terms above
   - Download at 800x1200px or crop to 2:3 ratio

2. **Pexels** (pexels.com)
   - Free stock photos and videos
   - Good selection of atmospheric shots
   - Commercial use allowed

3. **Pixabay** (pixabay.com)
   - Large library
   - All images free for commercial use

### AI Generation
1. **Midjourney** (midjourney.com)
   - Highest quality
   - $10/month subscription
   - Use prompts above in Discord

2. **DALL-E 3** (via ChatGPT Plus)
   - Good for specific concepts
   - $20/month ChatGPT Plus
   - Can iterate on designs

3. **Leonardo.ai** (leonardo.ai)
   - Free tier available
   - Good for cinematic shots
   - Multiple styles

### Image Specs
- **Dimensions:** 800x1200px (2:3 aspect ratio)
- **Format:** JPG (optimized for web)
- **File size:** Under 500KB recommended
- **Quality:** 80-85% compression

---

## Quick Setup Instructions

### After sourcing images:

1. Download/generate each image
2. Resize to 800x1200px if needed
3. Save as JPG in `design/public/images/new_collection/`
4. Naming convention:
   - `station_four.jpg`
   - `the_3am_caller.jpg`
   - `reply_all.jpg`

### Batch resize command (if needed):
```bash
cd design/public/images/new_collection/
sips -z 1200 800 *.jpg
```

---

## Current Status

- [x] Directory created: `design/public/images/new_collection/`
- [ ] station_four.jpg
- [ ] the_3am_caller.jpg  
- [ ] reply_all.jpg

Once images are in place, update the import script or database to reference:
`/images/new_collection/{story_name}.jpg`
