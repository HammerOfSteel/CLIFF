# CLIFF – Technical Overview & Design Specification

## 🎯 Executive Summary

CLIFF is a **mobile-first micro-storytelling platform for teenagers (13-19)** built with **Flutter**. Think TikTok meets Wattpad – vertical swipe discovery, episodic stories, and user-generated content. We're starting lean with a focused MVP targeting the teen demographic, then expanding to other age groups after product-market fit.

**Why teens first?** Social media usage is exploding in this group, but book reading is declining. We meet them where they are with short-form, episodic content that builds reading habits.

---

## 🛠️ Technology Stack (Simplified MVP)

### Frontend
- **Framework:** Flutter 3.x
  - Single codebase for iOS & Android (Web as Phase 2)
  - Native performance with smooth animations
  - Perfect for vertical swipe gestures
  - Rich widget ecosystem

### Backend & Services
- **Backend as a Service:** Firebase
  - **Authentication:** Firebase Auth (email, Google, Apple Sign-In)
  - **Database:** Firestore (stories, users, reactions, reading progress)
  - **Storage:** Firebase Storage (cover images, story assets)
  - **Analytics:** Firebase Analytics + Mixpanel
  - **Push Notifications:** Firebase Cloud Messaging (new episode alerts)
  - **Functions:** Cloud Functions (content moderation, notifications)
  
- **Content Delivery:** 
  - **CDN:** Firebase Hosting + Cloudflare
  - **Images:** WebP format with caching
  - **Text:** Markdown-based with custom rendering

- **Payment Processing:**
  - **Subscriptions:** Stripe (in-app purchases for mobile)
  - **RevenueCat:** For managing cross-platform subscriptions

- **Content Moderation:**
  - **Automated:** Google Cloud Natural Language API (profanity, inappropriate content)
  - **Manual:** Admin dashboard for review queue

### Developer Tools
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions or Codemagic
- **Testing:** Flutter test suite + Firebase Test Lab
- **Design:** Figma (prototypes and design system)
- **Project Management:** Linear or Notion
- **Monitoring:** Sentry (error tracking)

---

## 🎨 Design System

### Color Palette

**Primary Theme (Teen-Focused)**
```
Background Light:  #FFFFFF   // Clean white (light mode)
Background Dark:   #0F0F1E   // Deep dark (default mode)

Primary:           #8B7EFF   // Purple (brand, CTAs, links)
Secondary:         #FF6B9D   // Pink accent (reactions, highlights)
Accent:            #4ECDC4   // Teal (success, new content)

Text Primary:      #F8F9FA   // White (dark mode)
Text Secondary:    #B2B9C0   // Light gray (dark mode)
Text Dim:          #6B7280   // Dimmed text

Card Background:   #1A1A2E   // Elevated surfaces
Card Border:       #2A2A3E   // Subtle borders

Error:             #EF4444   // Errors, warnings
Success:           #10B981   // Achievements, completed
Warning:           #F59E0B   // Caution states
```

**Light Mode Alternative (Optional for MVP)**
```
Background:        #F9FAFB   // Light gray
Card Background:   #FFFFFF   // White cards
Text Primary:      #111827   // Almost black
Text Secondary:    #6B7280   // Gray
```

### Typography

```
Primary Font: Inter (modern, clean, web-safe)
  - Headings: 700 (Bold)
  - Subheadings: 600 (SemiBold)
  - Body: 400 (Regular)
  - UI Elements: 500 (Medium)

Reading Font: Literata or Georgia (serif for story content)
  - Story title: 700 (Bold)
  - Story body: 400 (Regular)
  - Emphasis: 600 (SemiBold) or italic

Accent Font: Space Grotesk (modern, for stats/numbers)
  - Used for: reader counts, chapter numbers, dates

Font Sizes (scaled for mobile):
  H1 (Page Headers):    28sp / 1.75rem
  H2 (Section):         22sp / 1.375rem
  H3 (Card titles):     18sp / 1.125rem
  Body (Stories):       16sp / 1rem
  Body Small:           14sp / 0.875rem
  Caption:              12sp / 0.75rem
  
Line Heights:
  Headings: 1.2
  Body text: 1.6 (comfortable reading)
  UI elements: 1.4
```

### UI Components

#### Navigation Pattern: TikTok-Style Vertical Swipe

**Main Discovery Feed:**
- Full-screen story preview cards
- Vertical PageView (swipe up/down)
- Side action buttons (reaction, bookmark, share)
- Bottom sheet for story details
- Haptic feedback on swipe

**Navigation Structure:**
```
Bottom Navigation (4-5 tabs):
[Home/Discover] [Library] [Create] [Profile]

Optional 5th: [Trending] or [Following]
```

#### Core UI Components

**Story Preview Card (Full Screen)**
```dart
- Cover image background (dimmed overlay)
- Gradient overlay for text readability
- Title: prominent, Bold, 24-28sp
- Metadata: Genre • Reading time • Episodes
- Stats: 👁 Reads, 🔥 Reactions
- CTA Button: "Start Reading" or "Continue Ch. 3"
- Author badge: Small circular avatar + name
- Swipe indicator (subtle)
```

**Story Reader View**
```dart
- Full immersion (hide UI initially)
- Tap to show/hide navigation
- Header: Back button, Chapter dropdown
- Footer: Previous/Next episode buttons
- Progress indicator: thin bar at top (% of chapter)
- Formatting: Respect author's text styling
- Background: customizable (dark/sepia/light)
```

**Creator Editor**
```dart
- Markdown-style toolbar
- Live preview mode
- Image upload dropzone
- Episode manager sidebar
- Publish/Save draft buttons
- Character count
```

**Buttons & Interactions**
```dart
Primary Button:
  - Filled background
  - Border radius: 12dp
  - Height: 48-52dp
  - Tap effect: scale 0.96 + haptic

Secondary Button:
  - Outlined
  - Border radius: 12dp
  - Height: 44-48dp

Icon Buttons:
  - 44x44dp touch target
  - Subtle hover/press state

Floating Action Button (Creator):
  - 56x56dp
  - Elevation 6
  - Icon: Pen/Plus
```

**Animations**
```dart
Page transitions:      300ms cubic-bezier
Card swipe:            200ms spring physics
Button press:          150ms ease-out
Loading shimmer:       1500ms linear loop
Reaction pop:          400ms elastic (Lottie)
Achievement badge:     600ms scale + fade
```

---

## 🏗️ Application Architecture

### Folder Structure (Clean Architecture)
```
lib/
├── main.dart
├── app/
│   ├── app.dart                    # MaterialApp config
│   ├── router.dart                 # GoRouter navigation
│   └── theme.dart                  # Theme data
├── core/
│   ├── constants/
│   │   ├── colors.dart
│   │   ├── strings.dart
│   │   └── assets.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   └── text_styles.dart
│   ├── utils/
│   │   ├── validators.dart
│   │   ├── formatters.dart
│   │   └── extensions.dart
│   └── services/
│       ├── firebase_service.dart
│       ├── auth_service.dart
│       ├── storage_service.dart
│       └── analytics_service.dart
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── domain/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── screens/
│   │       ├── widgets/
│   │       └── providers/
│   ├── discover/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   ├── reader/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   ├── creator/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   ├── profile/
│   │   └── ...
│   └── library/
│       └── ...
├── shared/
│   ├── widgets/                    # Reusable components
│   │   ├── buttons/
│   │   ├── cards/
│   │   └── loaders/
│   └── models/                     # Shared data models
└── generated/                      # Auto-generated files

assets/
├── images/
│   ├── icons/
│   ├── placeholders/
│   └── onboarding/
├── animations/                     # Lottie files
└── fonts/
    ├── Inter/
    ├── Literata/
    └── SpaceGrotesk/
```

### State Management: Riverpod 2.x

**Why Riverpod?**
- Compile-time safety
- No context needed
- Easy testing
- Great for async state
- Provider caching

**Example Providers:**
```dart
// Story feed provider
final discoverFeedProvider = FutureProvider.autoDispose<List<Story>>((ref) async {
  final repo = ref.watch(storyRepositoryProvider);
  return repo.getDiscoverFeed();
});

// Current user provider
final currentUserProvider = StreamProvider<User?>((ref) {
  final authService = ref.watch(authServiceProvider);
  return authService.userStream;
});

// Reading progress provider
final readingProgressProvider = StateNotifierProvider.family<
  ReadingProgressNotifier, ReadingProgress?, String
>((ref, storyId) {
  return ReadingProgressNotifier(storyId);
});
```

### Key Packages
```yaml
dependencies:
  flutter: sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.5.0
  
  # Firebase
  firebase_core: ^2.24.0
  firebase_auth: ^4.16.0
  cloud_firestore: ^4.14.0
  firebase_storage: ^11.6.0
  firebase_analytics: ^10.8.0
  cloud_functions: ^4.6.0
  
  # UI & Animations
  lottie: ^3.0.0
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  flutter_animate: ^4.3.0
  
  # Navigation
  go_router: ^13.0.0
  
  # Markdown & Text
  flutter_markdown: ^0.6.18
  markdown: ^7.1.1
  
  # Media
  image_picker: ^1.0.5             # For cover upload
  
  # Subscriptions
  purchases_flutter: ^6.0.0         # RevenueCat
  
  # Utilities
  intl: ^0.19.0                     
  path_provider: ^2.1.0
  shared_preferences: ^2.2.0
  url_launcher: ^6.2.0
  timeago: ^3.6.0                   # "2 hours ago"
  
dev_dependencies:
  flutter_test: sdk: flutter
  flutter_lints: ^3.0.0
  mockito: ^5.4.0
  build_runner: ^2.4.0
```

---

## 📱 Key Screens & Features

### 1. Onboarding & Authentication

**Family Setup Flow:**
```
1. Welcome Screen
   - Brand introduction with animation
   - "Start Reading" CTA
   
2. Account Type Selection
   - "I'm a Parent" (creates family account)
   - "I'm a Teen/Adult" (solo account)
   
3. Parent Account Creation
   - Email/password or Google Sign-In
   - Family name
   
4. Child Profile Creation
   - Name, avatar selection
   - Age/birthdate (determines content tier)
   - Reading interests (3-5 tags)
   - Repeat for multiple children
   
5. Personalization
   - Choose themes per profile
   - Set reading goals (optional)
   - Enable notifications
```

### 2. CLIFF Kids Home Screen

**Layout (Netflix Kids Style):**
```
┌─────────────────────────────────────┐
│  [Avatar] CLIFF          [Settings] │
│                                      │
│  ┌────────────────────────────────┐ │
│  │   Featured Book (Full width)   │ │
│  │   Animated Preview             │ │
│  └────────────────────────────────┘ │
│                                      │
│  Continue Reading     [See All →]   │
│  ┌────┐ ┌────┐ ┌────┐             │
│  │ 📖 │ │ 📖 │ │ 📖 │             │
│  └────┘ └────┘ └────┘             │
│                                      │
│  Today's Adventures   [See All →]   │
│  ┌────┐ ┌────┐ ┌────┐             │
│  │ 🌟 │ │ 🌟 │ │ 🌟 │             │
│  └────┘ └────┘ └────┘             │
│                                      │
│  Animal Stories       [See All →]   │
│  [Horizontal scroll carousel]       │
│                                      │
└─────────────────────────────────────┘
Bottom Nav: [Home] [Explore] [Bookshelf] [Profile]
```

### 3. Book Reader (Kids)

**Features:**
- Full-screen immersive reading
- Tap/swipe to turn pages
- Animated page transitions
- Auto-read mode (text-to-speech)
- Background music (optional)
- Exit button with progress save
- Progress indicator (e.g., "Page 5 of 24")

**Gestures:**
- Swipe right: Next page
- Swipe left: Previous page
- Tap center: Play/pause animation
- Tap top: Exit with save
- Pinch: Zoom illustrations (accessibility)

### 4. CLIFF Teens Discover (TikTok Style)

**Layout:**
```
┌─────────────────────────────────────┐
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │   Story Preview Card         │  │
│  │   (Full screen vertical)     │  │
│  │                              │  │<-- Swipe up/down
│  │   "The Last Message"         │  │
│  │   Genre: Thriller • 3 min    │  │
│  │   👁 2.4K reads              │  │
│  │   ────────────────           │  │
│  │   [Read Now]                 │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                      │
│  Side UI:                            │
│  - 💬 Reactions                     │
│  - 🔖 Save                          │
│  - ⋮ More                           │
└─────────────────────────────────────┘
Bottom: [Discover] [Library] [Create] [Profile]
```

### 5. Parent Dashboard

**Insights Panel:**
```
┌─────────────────────────────────────┐
│  My Family Reading                   │
│                                      │
│  Select Child: [Emma ▼]             │
│                                      │
│  This Week                           │
│  ┌────────────────────────────────┐ │
│  │  📚 12 books read              │ │
│  │  ⏱ 3h 24min reading time       │ │
│  │  🔥 7-day streak!               │ │
│  │  🏆 4 new badges                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Reading Activity Chart              │
│  [Bar chart showing daily reading]   │
│                                      │
│  Favorite Genres                     │
│  🐉 Fantasy (45%)                    │
│  🔬 Science (30%)                    │
│  🐾 Animals (25%)                    │
│                                      │
│  Recent Books                        │
│  [List of last 5 books with covers] │
│                                      │
│  Milestones                          │
│  ✓ Read 10 books this month         │
│  • Almost to 50 total books! (47)   │
└─────────────────────────────────────┘
```

### 6. Achievements & Gamification

**Badge System:**
```
Categories:
- Consistency: Streaks (3, 7, 14, 30, 90 days)
- Volume: Books read (5, 10, 25, 50, 100)
- Exploration: Genres tried (3, 5, 10)
- Speed: Fast reader milestones
- Special: Seasonal events, challenges
```

**Visual Design:**
- Animated badge reveal (Lottie)
- Collection display (locked/unlocked states)
- Share milestone option (with parent approval)

### 7. Story Trails (Discovery Algorithm)

**Backend Logic:**
```javascript
// Recommendation factors:
1. Content similarity (genre, theme, age-appropriate)
2. Reading history (what user finished vs abandoned)
3. Similar users' preferences (collaborative filtering)
4. Reading level progression (gradual difficulty increase)
5. Diversity injection (prevent filter bubbles)

// Trail generation:
Book A → [Related Books B, C, D]
- 60% similar content
- 20% stretch (slightly harder/different)
- 20% surprise (broaden horizons)
```

---

## 🎯 MVP Feature Prioritization

### Phase 1: Foundation (Months 1-3)
**CLIFF Kids Only - Core Reading Experience**

✅ **Essential:**
- [ ] Authentication (family accounts, child profiles)
- [ ] Home screen with content carousels
- [ ] Digital book reader with page turn animations
- [ ] 50 curated children's books (licensed or public domain)
- [ ] Basic reading streak tracking
- [ ] Profile management (avatar, name, age)

**Data models:**
- User, Family, ChildProfile
- Book, Page, BookProgress
- ReadingStreak, Achievement

### Phase 2: Engagement (Months 4-5)
**Gamification & Discovery**

✅ **Add:**
- [ ] Achievement badge system
- [ ] Story trails (basic recommendation)
- [ ] Continue reading shelf
- [ ] Search and browse by category
- [ ] Parent dashboard (basic insights)
- [ ] Reading reminders (push notifications)

### Phase 3: Teens Platform (Months 6-8)
**CLIFF Teens - Micro-stories**

✅ **Add:**
- [ ] Vertical swipe discovery UI
- [ ] Episodic story reader
- [ ] 100+ micro-stories (curated)
- [ ] Anonymous reactions (emojis)
- [ ] Basic creator tools (text editor)
- [ ] User-generated content moderation

### Phase 4: Polish & Scale (Months 9-12)
**AR, Advanced Features, Growth**

✅ **Add:**
- [ ] AR book scanning (pilot with 5-10 books)
- [ ] Advanced recommendation ML
- [ ] Social features (reading circles for older users)
- [ ] Premium subscription model
- [ ] Analytics dashboard improvements
- [ ] Internationalization (Swedish + English)

---

## 🎨 Animation & Interaction Details

### Page Turn Animation (Kids Books)
```dart
// Using Flutter's PageView with curve animations
PageView.builder(
  controller: _pageController,
  physics: CustomPageViewScrollPhysics(), // Smooth gesture
  itemBuilder: (context, index) {
    return AnimatedBuilder(
      animation: _pageController,
      builder: (context, child) {
        // 3D page curl effect
        // Or simple fade + slide for performance
      },
    );
  },
)

// Lottie animation on page load
Lottie.asset('assets/animations/page_sparkle.json')
```

### Vertical Swipe Discovery (Teens)
```dart
// TikTok-style vertical PageView
PageView.builder(
  scrollDirection: Axis.vertical,
  controller: _verticalController,
  onPageChanged: (index) {
    // Preload next 2 stories
    // Track engagement
  },
  itemBuilder: (context, index) {
    return StoryPreviewCard(
      story: stories[index],
      onRead: () => navigateToReader(),
    );
  },
)
```

### Loading States
```dart
// Shimmer for content loading
Shimmer.fromColors(
  baseColor: Colors.grey[300],
  highlightColor: Colors.grey[100],
  child: BookCardSkeleton(),
)

// Skeleton screens while fetching
```

### Micro-interactions
- Button press: Scale 0.95 + haptic
- Card favorited: Heart animation (Lottie)
- Achievement unlocked: Confetti + sound
- Streak maintained: Fire animation
- Book completed: Checkmark + celebration

---

## 🔒 Safety & Compliance

### Child Safety (COPPA, GDPR-K Compliance)
- [ ] Age-gated content (strict filtering)
- [ ] No public profiles for under-13
- [ ] Parental consent for data collection
- [ ] No third-party ads for kids
- [ ] Moderation for user-generated content
- [ ] Report/block functionality
- [ ] Privacy-focused analytics

### Content Moderation
```
User-Generated Stories:
1. Automated filtering (profanity, inappropriate content)
2. ML classification (age-appropriateness)
3. Human review queue for published stories
4. Community reporting system
5. Three-strike policy for creators
```

---

## 📊 Analytics & Metrics

### Key Metrics to Track

**Engagement:**
- Daily Active Users (DAU) / Monthly (MAU)
- Average session duration
- Books started vs completed
- Reading streak retention (Day 1, 7, 30)

**Content Performance:**
- Most read books by age group
- Completion rates by book
- Story trail effectiveness (click-through)
- Genre preferences

**Monetization:**
- Free-to-paid conversion rate
- Subscription retention
- Average revenue per family (ARPF)

**Parent Engagement:**
- Dashboard visit frequency
- Insight feature usage
- Settings configuration rate

---

## 🚀 Development Roadmap

### Pre-Development (2 weeks)
- [ ] Finalize design system in Figma
- [ ] Create high-fidelity mockups (10 key screens)
- [ ] Set up Firebase project
- [ ] Initialize Flutter project with architecture
- [ ] Source/license initial book content

### Sprint 1-2: Foundation (4 weeks)
- [ ] Authentication flow
- [ ] Family/profile management
- [ ] Basic UI shell (navigation, theme)
- [ ] Book data models and Firestore schema

### Sprint 3-4: Kids Reader (4 weeks)
- [ ] Book reader UI
- [ ] Page turn animations
- [ ] Text-to-speech integration
- [ ] Progress tracking
- [ ] Import 20 test books

### Sprint 5-6: Discovery (4 weeks)
- [ ] Home screen carousels
- [ ] Category browsing
- [ ] Search functionality
- [ ] Continue reading shelf
- [ ] Basic recommendations

### Sprint 7-8: Gamification (4 weeks)
- [ ] Achievement system
- [ ] Streak tracking
- [ ] Badge UI
- [ ] Parent dashboard v1

### Sprint 9-10: Teens Platform (4 weeks)
- [ ] Vertical discovery UI
- [ ] Story reader
- [ ] Micro-story content import
- [ ] Reaction system

### Sprint 11-12: Creator Tools (4 weeks)
- [ ] Story editor (teens/community)
- [ ] Publishing workflow
- [ ] Moderation queue
- [ ] User profiles

### Sprint 13-14: AR Pilot (4 weeks)
- [ ] AR Foundation setup
- [ ] Image recognition
- [ ] 3D animation integration
- [ ] 5 AR-enabled books

### Sprint 15-16: Polish & Launch Prep (4 weeks)
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] App store assets
- [ ] Beta testing
- [ ] Analytics verification
- [ ] Privacy policy & terms

**Total MVP Timeline: ~8 months**

---

## 💰 Estimated Development Costs

### Team (6-month MVP)
- 1 × Lead Flutter Developer: $80-120k
- 1 × Backend Developer (Firebase): $70-100k
- 1 × UI/UX Designer: $60-90k
- 1 × Content Manager (books, moderation): $50-70k
- 1 × QA Engineer: $50-70k

**Total Team Cost: $310-450k for 6 months**

### Services (Annual)
- Firebase (Blaze Plan): $500-2,000/month → $6-24k
- Cloud Storage/CDN: $200-500/month → $2.4-6k
- ML/TTS APIs: $300-800/month → $3.6-9.6k
- Monitoring (Sentry, Analytics): $100/month → $1.2k
- Design Tools (Figma, Adobe): $100/month → $1.2k

**Total Services: $14.4-42k annually**

### Third-Party Costs
- Content licensing (books): $10-50k initial
- AR platform (Vuforia): $500/month → $6k
- Legal (privacy, ToS): $5-10k
- App Store accounts: $200/year

**Total Third-Party: $21.7-66k**

---

## 🎯 Success Criteria

### Technical
- [ ] App loads in <2 seconds
- [ ] Smooth 60fps animations
- [ ] <5% crash rate
- [ ] Works offline (downloaded books)
- [ ] Supports iOS 14+, Android 10+

### User Experience
- [ ] Kids can navigate independently (age 6+)
- [ ] <3 taps to start reading any book
- [ ] Intuitive for non-tech-savvy parents
- [ ] Accessible (screen reader support, high contrast)

### Business
- [ ] 10,000 families in first 3 months post-launch
- [ ] 40% Day-7 retention
- [ ] 25% Day-30 retention
- [ ] 5% free-to-paid conversion
- [ ] 4.5+ star rating in app stores

---

## 📚 Next Steps

1. **Design Phase (Now)**
   - Create Figma design system
   - Design 15 key screens
   - User flow diagrams
   - Clickable prototype

2. **Content Acquisition**
   - Identify 100 public domain children's books
   - Contact publishers for licensing
   - Source illustrations and animations

3. **Technical Setup**
   - Initialize Flutter project
   - Configure Firebase
   - Set up CI/CD pipeline
   - Create development roadmap in Linear

4. **Team Building**
   - Hire lead Flutter developer
   - Contract UI/UX designer
   - Onboard content manager

5. **MVP Build**
   - Follow sprint plan
   - Weekly demos
   - Bi-weekly parent/kid user testing

---

**Built with ❤️ for the next generation of readers**
