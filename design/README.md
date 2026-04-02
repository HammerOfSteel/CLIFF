# CLIFF Design Prototype

Interactive design prototype built with Next.js, TypeScript, and TailwindCSS.

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# From the design folder
docker compose up
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Screens Included

### ✅ Implemented
- **Discover Feed** (`/`) - Vertical swipe TikTok-style story discovery
- **Story Reader** (`/story/[id]`) - Immersive reading experience with Markdown support
- **Library** (`/library`) - Reading, Saved, and Finished tabs
- **Create** (`/create`) - Story creation with Markdown editor
- **Profile** (`/profile`) - User profile with stats and achievements

### Navigation
Use the bottom navigation bar to switch between screens, or:
- **Arrow keys** (↑↓) to swipe through stories on Discover page
- **Touch/swipe** gestures on mobile devices

## 🎨 Design System

### Colors
- **Primary:** `#8B7EFF` (Purple)
- **Secondary:** `#FF6B9D` (Pink)
- **Accent:** `#4ECDC4` (Teal)
- **Background:** `#0F0F1E` (Dark)
- **Surface:** `#1A1A2E` (Cards)

### Typography
- **UI:** Inter (sans-serif)
- **Reading:** Georgia (serif for story content)

### Components
- Primary buttons, secondary buttons with hover states
- Cards with border and elevation
- Smooth animations (300ms transitions)

## 📊 Mock Data

Mock stories are located in `src/data/mockStories.ts`. Currently includes:
- 4 sample stories (Thriller, Horror, Romance, Action)
- Multiple episodes per story
- Reaction stats
- Author info

You can add more stories by editing this file.

## 🏗️ Project Structure

```
design/
├── src/
│   ├── app/              # Next.js 14 app router pages
│   │   ├── page.tsx      # Discover feed (home)
│   │   ├── library/      # Library page
│   │   ├── create/       # Creator page
│   │   ├── profile/      # Profile page
│   │   └── story/[id]/   # Story reader (dynamic)
│   ├── components/       # Reusable UI components
│   │   ├── StoryCard.tsx
│   │   └── BottomNav.tsx
│   ├── data/             # Mock data
│   ├── lib/              # Utilities
│   └── styles/           # Global CSS
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tailwind.config.ts
```

## 🔧 Tech Stack

- **Next.js 14** - React framework with app router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Markdown** - Story content rendering
- **Lucide React** - Icon library

## 📝 Next Steps

1. **Iterate on Design** - Adjust colors, typography, spacing based on feedback
2. **Add More Interactions** - Swipe gestures, pull-to-refresh, etc.
3. **Test on Mobile** - View on actual devices
4. **Get Feedback** - Share with schools/libraries for input
5. **Migrate to Flutter** - Once design is validated

## 💡 Usage Tips

- **Keyboard navigation:** Use arrow keys on Discover page
- **Mobile view:** Resize browser or use device emulator
- **Edit mock data:** Modify `src/data/mockStories.ts` to test different content
- **Customize theme:** Edit `tailwind.config.ts` for color changes

## 🐛 Development

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Docker Commands

```bash
# Build and start
docker compose up --build

# Stop containers
docker compose down

# View logs
docker compose logs -f

# Rebuild after changes
docker compose up --build
```

---

**Built for CLIFF - Läsglädje genom Storytelling** 🚀
