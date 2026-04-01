# CLIFF – Technical Overview & Design Specification (MVP)

## 🎯 Executive Summary

CLIFF is a **mobile-first micro-storytelling platform for teenagers (13-19)** built with **Flutter**. Think TikTok meets Wattpad – vertical swipe discovery, episodic stories with cliffhangers, and user-generated content. 

**Focus:** Start lean with teens, nail the product-market fit, then expand to other demographics later.

**Why teens first?** Social media usage is exploding in this group (everyone's on TikTok), but book reading is declining. We meet them where they are with short-form, episodic content that builds reading habits naturally.

---

## 🛠️ Technology Stack (Simplified MVP)

### Frontend
- **Framework:** Flutter 3.x
  - iOS & Android from single codebase (Web as Phase 2)
  - Native performance with smooth 60fps animations
  - Perfect for vertical swipe gestures (TikTok-style)
  - Rich ecosystem for UI components

### Backend & Services
- **Backend as a Service:** Firebase
  - **Authentication:** Firebase Auth (email, Google, Apple Sign-In)
  - **Database:** Firestore (stories, users, reactions, reading progress)
  - **Storage:** Firebase Storage (cover images, story images)
  - **Analytics:** Firebase Analytics + Mixpanel (user behavior)
  - **Push Notifications:** Firebase Cloud Messaging (new episode alerts, reading reminders)
  - **Functions:** Cloud Functions (content moderation triggers, notifications)
  
- **Content Delivery:** 
  - **CDN:** Cloudflare (fast global delivery)
  - **Images:** WebP format with lazy loading
  - **Text:** Markdown-based story format with custom renderer

- **Payment Processing:**
  - **Subscriptions:** RevenueCat (manages cross-platform subscriptions)
  - **Payment Gateway:** Stripe

- **Content Moderation:**
  - **Automated:** Google Cloud Natural Language API (profanity filter, toxicity detection)
  - **Manual:** Admin dashboard for review queue

### Developer Tools
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions (automated testing & deployment)
- **Testing:** Flutter test suite + Firebase Test Lab (device testing)
- **Design:** Figma (design system and prototypes)
- **Project Management:** Linear or Notion
- **Monitoring:** Sentry (error tracking & crash reports)
- **Bug Tracking:** GitHub Issues

---

## 🎨 Design System

### Brand Identity

**Vibe:** Modern, mysterious, engaging, slightly edgy but not dark

**Inspiration:**
- TikTok (discovery UX, vertical swipe)
- Spotify (personalization, clean cards)
- Medium (reading experience, typography)
- Discord (community feel for creators)

### Color Palette

**Dark Mode (Default)** – Teens prefer dark mode
```
Background:        #0F0F1E   // Deep navy-black
Surface:           #1A1A2E   // Elevated cards
Surface Variant:   #2A2A3E   // Subtle elevation

Primary:           #8B7EFF   // Purple (brand, buttons, links)
Primary Hover:     #A094FF   // Lighter purple
Primary Dim:       #6B5CD6   // Darker purple

Secondary:         #FF6B9D   // Pink (reactions, highlights, accents)
Accent:            #4ECDC4   // Teal (success, new badges)

Text Primary:      #F8F9FA   // Almost white
Text Secondary:    #B2B9C0   // Light gray (metadata)
Text Dim:          #6B7280   // Dimmed text (timestamps, hints)

Borders:           #2A2A3E   // Subtle dividers
Borders Strong:    #3E3E56   // More visible borders

States:
  Error:           #EF4444   // Red
  Success:         #10B981   // Green
  Warning:         #F59E0B   // Orange
  Info:            #3B82F6   // Blue
```

**Light Mode (Optional for MVP)** – Can be added later
```
Background:        #FFFFFF
Surface:           #F9FAFB
Text Primary:      #111827
Text Secondary:    #6B7280
```

### Typography

**Fonts:**
```
Primary: Inter
  - Modern, clean, excellent readability
  - Used for: UI, headings, metadata

Reading: Literata or Georgia
  - Serif font for story content
  - Comfortable for long-form reading

Accent: Space Grotesk (optional)
  - For numbers, stats (e.g., "15.2K reads")
```

**Type Scale (Mobile-optimized):**
```
Display (Page Headers):  28sp / 700 weight / 1.2 line height
H1 (Section Headers):    22sp / 700 weight / 1.3 line height
H2 (Card Titles):        18sp / 600 weight / 1.3 line height
H3 (Subsections):        16sp / 600 weight / 1.4 line height

Body Large (Stories):    18sp / 400 weight / 1.7 line height
Body (UI Text):          16sp / 400 weight / 1.5 line height
Body Small:              14sp / 400 weight / 1.5 line height

Caption (Metadata):      12sp / 500 weight / 1.4 line height
Label (Buttons):         14sp / 600 weight / 1.0 line height
```

### UI Components Library

#### Buttons
```dart
Primary Button (CTA):
  - Background: Primary color (#8B7EFF)
  - Text: White, 14sp, SemiBold
  - Border radius: 12dp
  - Height: 48-52dp
  - Press effect: Scale to 0.96 + haptic feedback
  - Shadow: Soft glow on primary color

Secondary Button:
  - Outlined with Primary color
  - Text: Primary color
  - Border radius: 12dp
  - Height: 44-48dp

Text Button:
  - No background
  - Primary color text
  - Underline on hover

Icon Button:
  - 44x44dp touch target (accessibility)
  - Icon: 20-24dp
  - Subtle background on press

Floating Action Button (Create):
  - 56x56dp circle
  - Primary color background
  - White icon (pen or +)
  - Elevation 6
  - Bottom-right corner placement
```

#### Cards
```dart
Story Preview Card (Discover Feed):
  - Full-screen vertical card
  - Background: Cover image with dark gradient overlay (60% opacity)
  - Border radius: 0 (full screen) or 16dp (if not full)
  - Content: Title, author, stats, CTA
  - Press effect: Subtle scale 0.98

Story Card (Library):
  - Horizontal card (image + text)
  - Height: 120dp
  - Cover image: 80x120dp (2:3 ratio)
  - Border radius: 12dp
  - Background: Surface color (#1A1A2E)
  - Shadow: Elevation 2

Episode Card (Reader navigation):
  - Compact card showing episode info
  - Border radius: 8dp
  - Active episode: Primary color highlight
```

#### Animations
```dart
Page transitions:      300ms cubic-bezier(0.4, 0.0, 0.2, 1)
Card swipe/dismiss:    250ms spring (0.8 damping)
Button press:          120ms ease-out
Modal appear:          250ms ease-out scale + fade
Tab switch:            200ms ease-in-out

Loading states:        
  - Shimmer: 1500ms linear loop
  - Spinner: Primary color rotating

Micro-interactions:
  - Reaction tap: 400ms elastic scale (Lottie)
  - Badge unlock: 600ms confetti + scale
  - Streak fire: Continuous Lottie loop
```

---

## 🏗️ Application Architecture

### Clean Architecture Pattern

**Why Clean Architecture?**
- Separation of concerns (UI, Business Logic, Data)
- Easy to test (can mock repositories)
- Scalable (add features without breaking existing code)
- Platform-independent business logic

### Project Structure
```
lib/
├── main.dart                       # App entry point
├── app/
│   ├── app.dart                    # MaterialApp configuration
│   ├── router.dart                 # GoRouter navigation setup
│   └── theme.dart                  # App-wide theme (colors, text styles)
│
├── core/
│   ├── constants/
│   │   ├── app_colors.dart         # Color palette
│   │   ├── app_strings.dart        # Static text (for i18n later)
│   │   ├── app_assets.dart         # Asset paths
│   │   └── app_config.dart         # API keys, env configs
│   │
│   ├── theme/
│   │   ├── app_theme.dart          # ThemeData configuration
│   │   └── text_styles.dart        # TextStyle definitions
│   │
│   ├── utils/
│   │   ├── validators.dart         # Form validation (email, username, etc.)
│   │   ├── formatters.dart         # Text formatters (dates, numbers)
│   │   ├── extensions.dart         # Dart extensions (String, DateTime, etc.)
│   │   └── helpers.dart            # Utility functions
│   │
│   └── services/
│       ├── firebase_service.dart   # Firebase initialization
│       ├── auth_service.dart       # Authentication operations
│       ├── storage_service.dart    # File uploads/downloads
│       ├── analytics_service.dart  # Event tracking
│       └── notification_service.dart # Push notifications
│
├── features/
│   │
│   ├── auth/                       # Authentication feature
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   └── user_model.dart
│   │   │   └── repositories/
│   │   │       └── auth_repository_impl.dart
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── user.dart
│   │   │   ├── repositories/
│   │   │   │   └── auth_repository.dart
│   │   │   └── usecases/
│   │   │       ├── sign_in.dart
│   │   │       ├── sign_up.dart
│   │   │       └── sign_out.dart
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── auth_provider.dart
│   │       ├── screens/
│   │       │   ├── splash_screen.dart
│   │       │   ├── onboarding_screen.dart
│   │       │   ├── login_screen.dart
│   │       │   └── signup_screen.dart
│   │       └── widgets/
│   │           └── auth_button.dart
│   │
│   ├── discover/                   # Story discovery feed
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   └── story_model.dart
│   │   │   └── repositories/
│   │   │       └── story_repository_impl.dart
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── story.dart
│   │   │   ├── repositories/
│   │   │   │   └── story_repository.dart
│   │   │   └── usecases/
│   │   │       └── get_discover_feed.dart
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── discover_provider.dart
│   │       ├── screens/
│   │       │   └── discover_screen.dart
│   │       └── widgets/
│   │           └── story_preview_card.dart
│   │
│   ├── reader/                     # Story reading experience
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   ├── episode_model.dart
│   │   │   │   └── reading_progress_model.dart
│   │   │   └── repositories/
│   │   │       └── reader_repository_impl.dart
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── episode.dart
│   │   │   │   └── reading_progress.dart
│   │   │   ├── repositories/
│   │   │   │   └── reader_repository.dart
│   │   │   └── usecases/
│   │   │       ├── get_episode_content.dart
│   │   │       └── save_reading_progress.dart
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── reader_provider.dart
│   │       ├── screens/
│   │       │   └── reader_screen.dart
│   │       └── widgets/
│   │           ├── episode_navigator.dart
│   │           └── reading_settings_sheet.dart
│   │
│   ├── creator/                    # Story creation tools
│   │   ├── data/
│   │   │   └── repositories/
│   │   │       └── creator_repository_impl.dart
│   │   ├── domain/
│   │   │   ├── repositories/
│   │   │   │   └── creator_repository.dart
│   │   │   └── usecases/
│   │   │       ├── create_story.dart
│   │   │       ├── publish_episode.dart
│   │   │       └── update_story.dart
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── creator_provider.dart
│   │       ├── screens/
│   │       │   ├── create_story_screen.dart
│   │       │   ├── episode_editor_screen.dart
│   │       │   └── my_stories_screen.dart
│   │       └── widgets/
│   │           ├── markdown_toolbar.dart
│   │           └── image_uploader.dart
│   │
│   ├── library/                    # User's saved stories
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── library_provider.dart
│   │       ├── screens/
│   │       │   └── library_screen.dart
│   │       └── widgets/
│   │           └── library_story_card.dart
│   │
│   └── profile/                    # User profile & settings
│       ├── data/
│       │   └── repositories/
│       │       └── profile_repository_impl.dart
│       ├── domain/
│       │   ├── repositories/
│       │   │   └── profile_repository.dart
│       │   └── usecases/
│       │       └── update_profile.dart
│       └── presentation/
│           ├── providers/
│           │   └── profile_provider.dart
│           ├── screens/
│           │   ├── profile_screen.dart
│           │   ├── edit_profile_screen.dart
│           │   └── settings_screen.dart
│           └── widgets/
│               └── achievement_badge.dart
│
├── shared/
│   ├── widgets/                    # Reusable UI components
│   │   ├── buttons/
│   │   │   ├── primary_button.dart
│   │   │   └── icon_button_custom.dart
│   │   ├── cards/
│   │   │   └── base_card.dart
│   │   ├── loaders/
│   │   │   ├── shimmer_loader.dart
│   │   │   └── loading_spinner.dart
│   │   └── inputs/
│   │       └── custom_text_field.dart
│   │
│   └── models/                     # Shared data structures
│       └── response_model.dart
│
└── generated/                      # Auto-generated files (localization, etc.)

assets/
├── images/
│   ├── icons/                      # App icons
│   ├── placeholders/               # Placeholder images
│   └── onboarding/                 # Onboarding illustrations
│
├── animations/                     # Lottie JSON files
│   ├── reaction_heart.json
│   ├── badge_unlock.json
│   └── streak_fire.json
│
└── fonts/
    ├── Inter/
    │   ├── Inter-Regular.ttf
    │   ├── Inter-Medium.ttf
    │   ├── Inter-SemiBold.ttf
    │   └── Inter-Bold.ttf
    └── Literata/
        ├── Literata-Regular.ttf
        └── Literata-SemiBold.ttf
```

### State Management: Riverpod 2.x

**Why Riverpod?**
- ✅ Compile-time safety (no runtime errors from incorrect providers)
- ✅ No BuildContext dependency
- ✅ Easy testing (can override providers in tests)
- ✅ Great for async/stream state
- ✅ Built-in caching and auto-disposal

**Example Providers:**

```dart
// Auth provider (stream)
final currentUserProvider = StreamProvider<User?>((ref) {
  final authService = ref.watch(authServiceProvider);
  return authService.authStateChanges();
});

// Discover feed provider (future)
final discoverFeedProvider = FutureProvider.autoDispose<List<Story>>((ref) async {
  final repository = ref.watch(storyRepositoryProvider);
  return await repository.getDiscoverFeed();
});

// Reading progress provider (state + family for storyId)
final readingProgressProvider = StateNotifierProvider.family<
  ReadingProgressNotifier, ReadingProgress?, String
>((ref, storyId) {
  return ReadingProgressNotifier(storyId, ref);
});

// Creator stories provider
final myStoriesProvider = FutureProvider<List<Story>>((ref) async {
  final userId = ref.watch(currentUserProvider).value?.id;
  if (userId == null) return [];
  
  final repository = ref.watch(creatorRepositoryProvider);
  return await repository.getUserStories(userId);
});
```

### Key Flutter Packages

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.5.0
  
  # Firebase
  firebase_core: ^2.24.0
  firebase_auth: ^4.16.0
  cloud_firestore: ^4.14.0
  firebase_storage: ^11.6.0
  firebase_analytics: ^10.8.0
  cloud_functions: ^4.6.0
  firebase_messaging: ^14.7.0
  
  # UI & Animations
  lottie: ^3.0.0
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  flutter_animate: ^4.3.0
  
  # Navigation
  go_router: ^13.0.0
  
  # Markdown Rendering & Editing
  flutter_markdown: ^0.6.18
  markdown: ^7.1.1
  flutter_quill: ^9.0.0              # Rich text editor (optional)
  
  # Media
  image_picker: ^1.0.5               # Cover image upload
  image_cropper: ^5.0.1              # Crop images
  
  # Subscriptions
  purchases_flutter: ^6.0.0          # RevenueCat SDK
  
  # Utilities
  intl: ^0.19.0                      # Internationalization
  path_provider: ^2.1.0              # File paths
  shared_preferences: ^2.2.0         # Local storage
  url_launcher: ^6.2.0               # Open URLs
  timeago: ^3.6.0                    # "2 hours ago" formatting
  share_plus: ^7.2.0                 # Share stories
  
  # HTTP (if needed for custom backend later)
  dio: ^5.4.0
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  mockito: ^5.4.0                    # Mocking for tests
  build_runner: ^2.4.0
```

---

## 📱 Key Screens & User Flows (MVP)

### 1. Onboarding & Authentication

**Goal:** Get users reading in <2 minutes

**Flow:**
```
App Launch
    ↓
Splash Screen (1-2 seconds, CLIFF logo animation)
    ↓
First-time user? → Onboarding Carousel (3-4 screens)
    ↓                   |
    |          Screen 1: "Discover stories in minutes"
    |          Screen 2: "New episodes every day"
    |          Screen 3: "Write your own stories"
    |          Screen 4: CTA [Get Started]
    |                   ↓
    └──────────────────→ Sign Up/Login Screen
                            |
                            ├─ Email + Password
                            ├─ [Continue with Google]
                            ├─ [Continue with Apple]
                            └─ [Already have account? Log in]
                            ↓
                        Profile Setup
                            |
                            ├─ Username (unique, 3-20 chars)
                            ├─ Avatar (choose preset or upload)
                            ├─ Age verification (must be 13+)
                            └─ Pick 3-5 favorite genres
                            ↓
                        Welcome to CLIFF!
                            ↓
                        Discover Feed (Home)
```

**Screens:**

**Splash Screen:**
```
┌─────────────────────────────────────┐
│                                      │
│                                      │
│                                      │
│          [Animated CLIFF Logo]       │
│                                      │
│                                      │
│                                      │
└─────────────────────────────────────┘
```

**Onboarding Carousel:**
```
┌─────────────────────────────────────┐
│                                      │
│     [Illustration: Person reading]   │
│                                      │
│     Discover stories that hook you   │
│     in just 3-5 minutes              │
│                                      │
│     ● ○ ○                            │
│                                      │
│     [Skip]              [Next →]    │
└─────────────────────────────────────┘
```

**Sign Up Screen:**
```
┌─────────────────────────────────────┐
│  [← Back]                            │
│                                      │
│  Welcome to CLIFF                    │
│  Start your reading journey          │
│                                      │
│  Email                               │
│  [_________________________]         │
│                                      │
│  Password                            │
│  [_________________________]         │
│                                      │
│  [Create Account]                    │
│                                      │
│  ─────────── or ───────────          │
│                                      │
│  [🔵 Continue with Google]           │
│  [🍎 Continue with Apple]            │
│                                      │
│  Already have an account? [Log in]   │
└─────────────────────────────────────┘
```

**Profile Setup:**
```
┌─────────────────────────────────────┐
│  [Skip for now]                      │
│                                      │
│  Set up your profile                 │
│  Step 1 of 3                         │
│                                      │
│  Choose your avatar                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │ 😊 │ │ 😎 │ │ 🦄 │ │ 🚀 │       │
│  └────┘ └────┘ └────┘ └────┘       │
│  [+ Upload photo]                    │
│                                      │
│  Username                            │
│  [@____________]                     │
│  Available ✓                         │
│                                      │
│  [Continue →]                        │
└─────────────────────────────────────┘
```

### 2. Discover Feed (Main Home Screen)

**Goal:** TikTok-style vertical swipe to discover stories

**Layout:**
```
┌─────────────────────────────────────┐
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [Cover Image Background]       │ │
│  │ with dark gradient overlay     │ │
│  │                                │ │
│  │                                │ │
│  │ 👤 @mystery_writer             │ │<-- Author
│  │                                │ │
│  │ THE LAST MESSAGE               │ │<-- Title (Bold, Large)
│  │ Thriller • 4 min • 5 episodes  │ │<-- Metadata
│  │                                │ │
│  │ "It started with a message     │ │<-- Hook preview
│  │ from an unknown number..."     │ │
│  │                                │ │
│  │ 👁 15.2K reads • 🔥 2.1K       │ │<-- Stats
│  │                                │ │
│  │ ──────────────────             │ │
│  │                                │ │
│  │ [Start Reading Episode 1 →]    │ │<-- CTA
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Side Actions (right edge):          │
│  ❤️ React                           │ <-- Tap to react (emoji picker)
│  🔖 Save                             │ <-- Save to library
│  💬 Info                             │ <-- Story details
│  ~ Swipe indicator ~                 │ <-- Shows can swipe up/down
└──────────────────────────────────────┘

Bottom Nav: [🏠 Discover] [📚 Library] [✏️ Create] [👤 Profile]
```

**Interactions:**
- **Swipe up:** Next story in feed
- **Swipe down:** Previous story
- **Tap CTA or center:** Open story reader
- **Tap side icons:** Quick actions (react, save, more info)
- **Long-press card:** Bottom sheet with full story details

**Bottom Sheet (Story Info):**
```
┌─────────────────────────────────────┐
│  ──                                  │
│                                      │
│  THE LAST MESSAGE                    │
│  by @mystery_writer                  │
│                                      │
│  Thriller • 5 episodes • Completed   │
│                                      │
│  Description:                        │
│  Sarah receives a mysterious text... │
│  [Read more]                         │
│                                      │
│  Episodes:                           │
│  • Chapter 1: The Text (4 min)      │
│  • Chapter 2: The Call (5 min)      │
│  • Chapter 3: The Meeting (4 min)   │
│  ...                                 │
│                                      │
│  Reactions:                          │
│  ❤️ 1.2K  😱 892  🔥 445           │
│                                      │
│  [Start Reading →]                   │
│  [Save to Library]                   │
│  [Share]                             │
└─────────────────────────────────────┘
```

### 3. Story Reader

**Goal:** Immersive, distraction-free reading

**Layout:**
```
┌─────────────────────────────────────┐
│ [← Back]  Ch 1/5  [⋮ Menu]          │ <-- Tap to hide/show
├─────────────────────────────────────┤
│ ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░│ │ <-- Progress (30% through chapter)
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │   THE LAST MESSAGE            │ │
│  │   Chapter 1: The Text          │ │
│  │   ───────────────              │ │
│  │                                │ │
│  │   It started with a text       │ │
│  │   message from an unknown      │ │
│  │   number.                      │ │
│  │                                │ │
│  │   "I know what you did."       │ │
│  │                                │ │
│  │   Sarah stared at her phone,   │ │
│  │   heart pounding. Who was      │ │
│  │   this? What did they mean?    │ │
│  │                                │ │
│  │   [Image: Dark phone screen]   │ │
│  │                                │ │
│  │   She hadn't done anything...  │ │
│  │   had she?                     │ │
│  │                                │ │
│  │   [Story continues...]         │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Scroll to continue...               │
└─────────────────────────────────────┘

(After scrolling to end)

┌─────────────────────────────────────┐
│  ──── End of Chapter 1 ────         │
│                                      │
│  How did it make you feel?          │
│  [❤️ Love] [😱 Shocked] [😭 Sad]    │
│  [🔥 Fire] [💀 Dead] [🤯 Mindblown] │
│                                      │
│  [← Previous Chapter]                │
│  [Next: Chapter 2 →]                 │
│                                      │
│  Other readers reacted:              │
│  ❤️ 45%  😱 32%  🔥 18%  😭 5%      │
└─────────────────────────────────────┘
```

**Features:**
- **Tap top bar:** Show/hide navigation
- **Scroll:** Read through chapter
- **React at end:** Emoji reaction (anonymous)
- **Settings button:** Reading preferences bottom sheet
  - Font size (S, M, L, XL)
  - Background (Dark, Sepia, Light)
  - Auto-scroll toggle

**Reading Settings:**
```
┌─────────────────────────────────────┐
│  ──                                  │
│                                      │
│  Reading Settings                    │
│                                      │
│  Font Size                           │
│  ○ Small  ● Medium  ○ Large  ○ XL   │
│                                      │
│  Background                          │
│  ● Dark  ○ Sepia  ○ Light           │
│                                      │
│  [Preview text with current style]   │
│                                      │
│  [Save]                              │
└─────────────────────────────────────┘
```

### 4. Library (User's Collection)

**Goal:** Organize saved and reading stories

**Tabs:**
```
[Reading] [Saved] [Finished]
```

**Reading Tab:**
```
┌─────────────────────────────────────┐
│  [Tabs: Reading | Saved | Finished] │
│                                      │
│  Currently Reading (3)               │
│                                      │
│  ┌────┬────────────────────────────┐│
│  │IMG │ The Last Message           ││
│  │    │ Chapter 2/5 • 67% done     ││
│  │    │ [Continue Reading]         ││
│  └────┴────────────────────────────┘│
│                                      │
│  ┌────┬────────────────────────────┐│
│  │IMG │ Echoes in the Dark         ││
│  │    │ Chapter 1/3 • 12% done     ││
│  │    │ [Continue Reading]         ││
│  └────┴────────────────────────────┘│
│                                      │
│  [See older stories]                 │
└─────────────────────────────────────┘
```

**Saved Tab:**
```
Stories you've bookmarked (10)

Grid view (2 columns):
┌────┐ ┌────┐
│IMG │ │IMG │  <- Story covers
└────┘ └────┘
Title  Title
...
```

**Finished Tab:**
```
Completed stories (5)

List view with "Rate & Review" option
Option to find similar stories
```

### 5. Creator Studio

**My Stories Dashboard:**
```
┌─────────────────────────────────────┐
│  [← Back]  My Stories                │
│                                      │
│  [+ Create New Story]                │
│                                      │
│  Published (2)                       │
│                                      │
│  ┌────┬─────────────────────┬─────┐ │
│  │IMG │ The Last Message    │ Stats││
│  │    │ 5 episodes          │ 15.2K││
│  │    │ Completed           │ reads││
│  └────┴─────────────────────┴─────┘ │
│  [Edit] [View Stats] [Share]         │
│                                      │
│  ┌────┬─────────────────────┬─────┐ │
│  │IMG │ Midnight Caller     │ Stats││
│  │    │ 3 episodes (ongoing)│  892 ││
│  │    │ Last updated 2d ago │ reads││
│  └────┴─────────────────────┴─────┘ │
│  [Continue] [View Stats]             │
│                                      │
│  Drafts (1)                          │
│  • Untitled Romance (0 episodes)     │
│    [Continue Writing]                │
└─────────────────────────────────────┘
```

**Create New Story:**
```
┌─────────────────────────────────────┐
│  [Cancel]  New Story      [Save]    │
│                                      │
│  Cover Image                         │
│  ┌────────────────────────────────┐ │
│  │    [+ Upload Cover Image]      │ │
│  │    (Recommended: 800x1200px)   │ │
│  └────────────────────────────────┘ │
│                                      │
│  Story Title *                       │
│  [____________________________]      │
│                                      │
│  Short Hook (150 chars max)          │
│  [____________________________]      │
│  [____________________________]      │
│  42/150                              │
│                                      │
│  Genre *                             │
│  [Dropdown: Thriller ▼]              │
│  • Romance  • Thriller  • Fantasy    │
│  • Sci-Fi  • Mystery  • Drama        │
│  • Horror  • LGBTQ+  • Other         │
│                                      │
│  Content Rating *                    │
│  ○ Everyone (13+)                    │
│  ● Teen (15+)                        │
│  ○ Mature (18+)                      │
│                                      │
│  Planned Episodes                    │
│  [___] (Recommended: 3-10)           │
│                                      │
│  [Save as Draft] [Create Story →]   │
└─────────────────────────────────────┘
```

**Episode Editor:**
```
┌─────────────────────────────────────┐
│  [← Back]  Chapter 1      [Preview] │
│                                      │
│  Toolbar:                            │
│  [B][I][Link][H1][H2][H3][📷]       │
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │ # Chapter 1: The Beginning     │ │
│  │                                │ │
│  │ It all started on a Tuesday... │ │
│  │                                │ │
│  │ [Type your story here]         │ │
│  │                                │ │
│  │ _                              │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Words: 842 | Est: 4 min read       │
│                                      │
│  [Save Draft]  [Publish Episode]    │
└─────────────────────────────────────┘
```

**Markdown Support:**
- Bold: **text** or __text__
- Italic: *text* or _text_
- Headings: # H1, ## H2, ### H3
- Images: ![alt](url)
- Line breaks: Two spaces at end

**Preview Mode:**
```
Shows exactly how readers will see the episode
Can go back to edit
```

### 6. Creator Analytics (Premium Only)

**Story Performance Dashboard:**
```
┌─────────────────────────────────────┐
│  [← Back]  Analytics                 │
│                                      │
│  The Last Message                    │
│  Published: Jan 15, 2026             │
│                                      │
│  ┌────────┬──────────┬─────────────┐│
│  │ Total  │ Episodes │ Followers   ││
│  │ 15.2K  │   5/5    │    847      ││
│  └────────┴──────────┴─────────────┘│
│                                      │
│  📊 Reads Over Time (Last 30 days)   │
│  ┌────────────────────────────────┐ │
│  │     /‾‾\                        │ │
│  │    /    \    /‾\               │ │
│  │   /      \__/   \___           │ │
│  └────────────────────────────────┘ │
│  Jan 15       Jan 30      Feb 14    │
│                                      │
│  Episode Performance                 │
│  ┌────────────────────────────────┐ │
│  │ Ch 1  15.2K ████████████ 100%  │ │
│  │ Ch 2  12.9K ██████████   85%   │ │
│  │ Ch 3  10.2K ████████     67%   │ │
│  │ Ch 4   8.4K ██████       55%   │ │
│  │ Ch 5   7.1K █████        47%   │ │
│  └────────────────────────────────┘ │
│                                      │
│  🎭 Reactions                        │
│  ❤️ 2,341 (38%)  😱 1,829 (30%)    │
│  🔥 891 (14%)    😭 654 (11%)       │
│  💀 412 (7%)                         │
│                                      │
│  📍 Reader Demographics  [PREMIUM]   │
│  [Upgrade to see]                    │
└─────────────────────────────────────┘
```

### 7. Profile Screen

```
┌─────────────────────────────────────┐
│  [⚙️ Settings]           [⋮ More]   │
│                                      │
│         ┌──────────┐                 │
│         │   IMG    │                 │
│         │  Avatar  │                 │
│         └──────────┘                 │
│                                      │
│         @username                    │
│         Member since Jan 2026        │
│                                      │
│  ┌──────────────┬──────────────────┐│
│  │ 847          │ 12               ││
│  │ Followers    │ Following        ││
│  └──────────────┴──────────────────┘│
│                                      │
│  🔥 12 day streak                    │
│                                      │
│  [Edit Profile]                      │
│                                      │
│  ──────────────────────────────────  │
│                                      │
│  📚 Reading Stats                    │
│  • 15 stories read                   │
│  • 24h 12m total reading time        │
│  • Favorite genre: Thriller          │
│                                      │
│  🏆 Achievements (8/20)              │
│  [🏆 First Story]  [📚 10 Reads]    │
│  [🔥 Week Streak]  [✍️ Published]   │
│  [View All →]                        │
│                                      │
│  ──────────────────────────────────  │
│                                      │
│  💎 Subscription                     │
│  Free Plan                           │
│  3 stories remaining today           │
│  [Upgrade to CLIFF Reader →]         │
│                                      │
│  [Settings] [Help & Support] [Logout]│
└─────────────────────────────────────┘
```

**Achievements (Full Screen):**
```
┌─────────────────────────────────────┐
│  [← Back]  Achievements              │
│                                      │
│  Unlocked (8)                        │
│                                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │🏆  │ │📚  │ │🔥  │ │✍️  │       │
│  │Read│ │ 10 │ │ 7  │ │Pub │       │
│  │1st │ │Read│ │Day │ │lish│       │
│  └────┘ └────┘ └────┘ └────┘       │
│                                      │
│  Locked (12)                         │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │🔒  │ │🔒  │ │🔒  │              │
│  │100 │ │ 30 │ │1000│              │
│  │Read│ │Day │ │Read│              │
│  └────┘ └────┘ └────┘              │
│                                      │
│  Complete more to unlock!            │
└─────────────────────────────────────┘
```

---

## 🎯 Data Models (Firestore Schema)

### Users Collection (`users/`)
```json
{
  "uid": "user123",
  "username": "mystery_reader",
  "email": "user@example.com",
  "avatarUrl": "https://...",
  "createdAt": "2026-01-15T10:00:00Z",
  "bio": "I love thrillers!",
  "age": 17,
  "preferences": {
    "favoriteGenres": ["thriller", "mystery", "romance"],
    "readingMode": "dark", // or "light", "sepia"
    "fontSize": "medium"
  },
  "stats": {
    "storiesRead": 15,
    "totalReadingTime": 87120, // seconds
    "currentStreak": 12,
    "longestStreak": 24
  },
  "following": ["user456", "user789"],
  "followers": 847,
  "isPremium": false,
  "subscription": "free" // or "reader", "creator", "pro"
}
```

### Stories Collection (`stories/`)
```json
{
  "storyId": "story123",
  "authorId": "user456",
  "authorUsername": "mystery_writer",
  "title": "The Last Message",
  "hook": "It started with a message from an unknown number...",
  "coverImageUrl": "https://...",
  "genre": "thriller",
  "contentRating": "teen", // "everyone", "teen", "mature"
  "status": "completed", // "draft", "ongoing", "completed"
  "plannedEpisodes": 5,
  "publishedEpisodes": 5,
  "createdAt": "2026-01-01T10:00:00Z",
  "updatedAt": "2026-01-15T10:00:00Z",
  "stats": {
    "totalReads": 15234,
    "saves": 3421,
    "reactions": {
      "love": 2341,
      "shocked": 1829,
      "fire": 891,
      "sad": 654,
      "dead": 412
    }
  },
  "tags": ["mystery", "suspense", "psychological"],
  "isFeatured": true,
  "isTrending": true
}
```

### Episodes Subcollection (`stories/{storyId}/episodes/`)
```json
{
  "episodeId": "ep1",
  "episodeNumber": 1,
  "title": "Chapter 1: The Text",
  "content": "# Chapter 1\n\nIt started with a text...", // Markdown
  "estimatedReadTime": 240, // seconds (4 min)
  "wordCount": 842,
  "publishedAt": "2026-01-01T12:00:00Z",
  "stats": {
    "reads": 15234,
    "completionRate": 0.82, // 82% finished episode
    "reactions": {
      "love": 450,
      "shocked": 320,
      "fire": 180
    }
  }
}
```

### Reading Progress (`users/{userId}/reading_progress/`)
```json
{
  "storyId": "story123",
  "currentEpisode": 2,
  "episodeProgress": 0.67, // 67% through episode 2
  "lastReadAt": "2026-02-14T15:30:00Z",
  "startedAt": "2026-02-10T10:00:00Z"
}
```

### Saved Stories (`users/{userId}/saved_stories/`)
```json
{
  "storyId": "story123",
  "savedAt": "2026-02-12T10:00:00Z"
}
```

### Achievements (`users/{userId}/achievements/`)
```json
{
  "achievementId": "first_story",
  "unlockedAt": "2026-01-16T12:00:00Z",
  "name": "First Story Read",
  "description": "Complete your first story",
  "icon": "🏆"
}
```

---

## 📊 Recommendation Algorithm (Story Trails)

### Version 1 (MVP) - Simple Content-Based Filtering

**Factors:**
1. **Genre similarity** (60% weight)
   - If user reads thriller → show more thrillers
   
2. **Reading history** (20% weight)
   - What user finished vs abandoned
   - Completion rate per genre
   
3. **Trending boost** (10% weight)
   - Stories with high reads in last 7 days
   
4. **Diversity injection** (10% weight)
   - Occasionally show different genre to prevent filter bubble

**Implementation:**
```dart
Future<List<Story>> getDiscoverFeed(User user) async {
  final userGenres = user.preferences.favoriteGenres;
  final readingHistory = await getReadingHistory(user.uid);
  
  // Get stories from favorite genres (60%)
  final genreBasedStories = await getStoriesByGenres(userGenres, limit: 12);
  
  // Get trending stories (10%)
  final trendingStories = await getTrendingStories(limit: 2);
  
  // Get diverse stories (10%)
  final diverseStories = await getRandomStories(limit: 2);
  
  // Get collaborative filtering (20%)
  final similarUserStories = await getSimilarUserRecommendations(user.uid, limit: 4);
  
  // Shuffle and combine
  final allStories = [
    ...genreBasedStories,
    ...trendingStories,
    ...diverseStories,
    ...similarUserStories,
  ]..shuffle();
  
  // Remove already read stories
  return allStories.where((s) => !isAlreadyRead(s, readingHistory)).toList();
}
```

### Version 2 (Future) - ML-Based Recommendations

Use Firebase ML or custom API with:
- Collaborative filtering (users who liked X also liked Y)
- Content embeddings (story similarity based on themes)
- Sequential patterns (what users read next after finishing a story)
- Time-based patterns (what time of day, day of week user reads certain genres)

---

## 💰 Monetization: Subscription Tiers

### Free Tier

**What's included:**
- ✅ Read 20% of story library (curated selection)
- ✅ Daily read limit: 3 episodes
- ✅ React to stories
- ✅ Basic profile & achievements
- ✅ Create & publish 1 story (max 3 episodes)
- ⚠️ Ads between episodes (subtle, native-style)
- ⚠️ 24h wait for some popular story updates

**Goal:** Get users hooked, convert to paid

### CLIFF Reader – 69 kr/månad (~€6)

**Everything in Free +**
- ✅ Unlimited reading (entire library)
- ✅ No ads
- ✅ No episode caps or wait times
- ✅ Offline downloads (save stories for offline)
- ✅ Early access to featured stories
- ✅ Custom reading themes (dark, sepia, light, custom colors)
- ✅ Priority customer support

**Target:** Avid readers (13-18 year olds who read daily)

### CLIFF Creator – 129 kr/månad (~€11)

**Everything in Reader +**
- ✅ Publish unlimited stories
- ✅ Advanced analytics dashboard
  - Demographics (age, location)
  - Retention graphs per episode
  - Hour-by-hour reads
- ✅ Featured consideration (algorithm boost)
- ✅ Creator badge on profile
- ✅ Export analytics (CSV download)
- ✅ Beta access to new creator features

**Target:** Teen writers who are serious about building an audience

### CLIFF Pro – 249 kr/månad (~€22)

**Everything in Creator +**
- ✅ Publishing partnership (we help market your story)
- ✅ Professional editing tools
- ✅ Revenue share program*
  - Earn from your popular stories
  - 70% creator / 30% platform split
  - Min. 10K unique readers/month to activate
- ✅ Direct reader communication (newsletter to followers)
- ✅ Exclusive creator community & mentorship
- ✅ Publishing pathway (connections to Swedish publishers)
- ✅ Verified badge

*Activates at 10K+ monthly readers

**Target:** Top 1% of creators aiming for professional writing

---

## 🚀 MVP Development Roadmap

### Total Timeline: 6 months from start to beta launch

### Pre-Development (Week 1-2)
- [ ] Finalize design system in Figma
- [ ] Create high-fidelity mockups (10-12 key screens)
- [ ] Set up Firebase project (Auth, Firestore, Storage, Analytics)
- [ ] Initialize Flutter project with clean architecture
- [ ] Source 30-50 seed stories (write in-house or source from contests)

### Phase 1: Core Foundation (Month 1-2)
**Goal:** Users can sign up, discover, and read stories

**Week 1-2: Authentication**
- [ ] Splash screen
- [ ] Onboarding carousel
- [ ] Sign up/Login (email, Google, Apple)
- [ ] Profile setup flow
- [ ] Auth state management (Riverpod)

**Week 3-4: Discovery Feed**
- [ ] Vertical swipe PageView
- [ ] Story preview cards
- [ ] Basic recommendation algorithm (genre-based)
- [ ] Story details bottom sheet
- [ ] Reaction system (emoji picker)

**Week 5-6: Story Reader**
- [ ] Episode reader view
- [ ] Episode navigation (prev/next)
- [ ] Progress tracking
- [ ] Reading settings (font, theme)
- [ ] Mark as complete, save to library

**Week 7-8: Content Management**
- [ ] Import 30 seed stories to Firestore
- [ ] Image optimization and CDN setup
- [ ] Basic content moderation (profanity filter)

**Checkpoint:** Users can browse and read stories

### Phase 2: Engagement & Library (Month 3-4)
**Goal:** Users return daily, build reading habits

**Week 9-10: Library & Bookmarks**
- [ ] Library screen (Reading, Saved, Finished tabs)
- [ ] Continue reading shelf
- [ ] Bookmark stories
- [ ] Offline downloads (Phase 2 feature, can skip for MVP)

**Week 11-12: Gamification**
- [ ] Reading streaks (daily tracking)
- [ ] Achievement badges (Firestore + local logic)
- [ ] Profile stats (stories read, time, streaks)
- [ ] Badge animations (Lottie)

**Week 13-14: Notifications & Engagement**
- [ ] Push notifications setup
- [ ] New episode alerts
- [ ] Streak reminder (if about to break)
- [ ] Trending stories section

**Checkpoint:** Users have reasons to come back daily

### Phase 3: Creator Tools (Month 5)
**Goal:** Users can create and publish stories

**Week 15-16: Creator Studio**
- [ ] Create story flow (title, cover, genre, etc.)
- [ ] My stories dashboard
- [ ] Story status (draft, ongoing, completed)

**Week 17-18: Episode Editor**
- [ ] Markdown editor with toolbar
- [ ] Live preview mode
- [ ] Image upload for episodes
- [ ] Save draft vs publish
- [ ] Episode word count & read time estimator

**Week 19-20: Publishing & Moderation**
- [ ] Publish story workflow
- [ ] Admin dashboard for content moderation
- [ ] User-generated content review queue
- [ ] Report story functionality
- [ ] Basic creator analytics (reads, reactions)

**Checkpoint:** Users can write and publish stories

### Phase 4: Monetization & Polish (Month 6)
**Goal:** App store ready, subscriptions active

**Week 21-22: Subscriptions**
- [ ] RevenueCat integration
- [ ] Subscription paywall UI
- [ ] Free tier limits (3 episodes/day)
- [ ] Upgrade prompts and CTAs
- [ ] Purchase flow testing

**Week 23: Advanced Analytics (Premium)**
- [ ] Creator analytics dashboard
- [ ] Demographics data
- [ ] Retention graphs
- [ ] Export CSV

**Week 24: Polish & Testing**
- [ ] Bug fixes from testing
- [ ] Performance optimization
- [ ] App store assets (screenshots, descriptions)
- [ ] Privacy policy & terms of service
- [ ] Beta testing with 50-100 users
- [ ] Feedback collection and iteration

**Checkpoint:** Ready for beta launch!

---

## 🎯 Success Metrics

### Technical KPIs
- [ ] App load time < 2 seconds
- [ ] Smooth 60fps animations (no jank)
- [ ] Crash-free rate > 99%
- [ ] Works reliably on iOS 14+ and Android 10+
- [ ] Bundle size < 50MB

### User Experience KPIs
- [ ] Time to first story < 60 seconds from sign-up
- [ ] Reading session length > 10 minutes average
- [ ] Kids can navigate independently (usability testing)
- [ ] 4.5+ star rating in app stores

### Business KPIs (Post-Launch)
- [ ] 1,000 users in first month
- [ ] 5,000 users in first 3 months
- [ ] 40% Day-7 retention
- [ ] 25% Day-30 retention
- [ ] 5-10% free-to-paid conversion
- [ ] 10% of users create at least 1 story
- [ ] 100+ published user-generated stories in first 3 months

---

##  💵 Estimated Development Cost

### Team (6-month MVP)
- **1 × Senior Flutter Developer:** 80-120k SEK (full-time)
- **1 × Backend/Firebase Developer (part-time):** 40-60k SEK
- **1 × UI/UX Designer (part-time):** 40-60k SEK
- **1 × Content Manager (part-time):** 30-50k SEK
- **1 × QA/Tester (part-time, last 2 months):** 15-25k SEK

**Total Team: 205-315k SEK for 6 months**

### Services & Infrastructure (Annual)
- Firebase (Blaze Plan): 3,000-10,000 SEK/year (starts low, scales)
- RevenueCat: Free tier initially (2.5% of revenue later)
- Cloudflare CDN: 500-1,500 SEK/year
- Sentry (error tracking): 1,200 SEK/year
- Domains & SSL: 500 SEK/year
- Figma, tools: 1,500 SEK/year

**Total Services: ~6,700-13,700 SEK/year**

### Third-Party & Legal
- Content licensing (initial stories): 10,000-30,000 SEK
- Legal (privacy policy, ToS, GDPR consultation): 5,000-10,000 SEK
- App Store/Play Store fees: 2,000 SEK
- Marketing assets (logo, brand): 5,000-15,000 SEK

**Total Third-Party: 22,000-57,000 SEK**

### **Grand Total MVP (6 months):**
**227,000-371,000 SEK (~€20-33k)**

---

## 🌍 Future Expansion (Post-MVP)

### Phase 2: Grow Teen Platform (Month 9-12)
- Collaborative stories (co-writing)
- Comments system (heavily moderated)
- Reading clubs/circles
- Contests with prizes
- International expansion (English version)

### Phase 3: Younger Audience (Year 2)
- **CLIFF Kids (8-12 years)**
  - Simplified story format
  - Parent controls
  - Curated-only content (no UGC for young kids)
  - Visual novel style with choices

### Phase 4: Older Audience & Media (Year 2-3)
- **CLIFF Classic (22+)**
  - Longer format stories (10-15 min)
  - More mature content options
- **Audio stories** (podcast-style readings)
- **Print partnerships** (top stories → physical books)
- **Original commissioned content** from established authors

---

## 🎉 Summary

**CLIFF MVP** is a lean, teen-focused micro-storytelling platform built with:

📱 **Flutter** (iOS + Android from one codebase)  
🔥 **Firebase** (backend-as-a-service for speed)  
🎨 **TikTok-inspired UX** (vertical swipe discovery)  
✍️ **Creator economy** (user-generated episodic stories)  
💰 **Subscription model** (3 tiers based on features, not ads)  

**We start focused (teens 13-19), nail the experience, then expand to other age groups.**

---

**Let's build the TikTok of reading! 🚀**
