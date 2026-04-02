# CLIFF – Technical Implementation TODO

**Tech Stack:** Flutter 3.x + Firebase  
**Target Platforms:** iOS & Android (Web as Phase 2)  
**Timeline:** 6 months to Beta Launch  

---

## 📋 Pre-Development Setup (Week 1-2)

### Design & Planning
- [ ] Finalize design system in Figma (colors, typography, components)
- [ ] Create high-fidelity mockups for 10-12 key screens
  - [ ] Splash screen
  - [ ] Onboarding (3-4 slides)
  - [ ] Login/Signup
  - [ ] Discover feed (vertical swipe)
  - [ ] Story reader
  - [ ] Creator editor
  - [ ] Library
  - [ ] Profile
  - [ ] Settings
- [ ] Design flow diagrams (user journeys)
- [ ] Export assets (icons, illustrations, placeholders)

### Development Environment
- [ ] Set up Flutter 3.x development environment
- [ ] Configure VS Code / Android Studio
- [ ] Install Flutter SDK and verify
- [ ] Set up iOS simulator and Android emulator
- [ ] Configure Git + GitHub repository
- [ ] Set up project structure (clean architecture)

### Firebase Setup
- [ ] Create Firebase project
- [ ] Enable Firebase Authentication
  - [ ] Email/Password
  - [ ] Google Sign-In
  - [ ] Apple Sign-In (iOS)
- [ ] Set up Cloud Firestore database
  - [ ] Design database schema (users, stories, episodes, etc.)
  - [ ] Set up security rules
- [ ] Configure Firebase Storage (for images)
- [ ] Enable Firebase Analytics
- [ ] Enable Firebase Cloud Messaging (push notifications)
- [ ] Set up Firebase Cloud Functions (for later moderation)

### Content Preparation
- [ ] Source or write 30-50 seed stories
  - [ ] 5 stories per genre: Romance, Thriller, Sci-Fi, Fantasy, Drama, LGBTQ+
  - [ ] Each 3-5 episodes
  - [ ] Format in Markdown
- [ ] Create placeholder cover images
- [ ] Prepare sample user profiles for testing

---

## 🏗️ Phase 1: Core Foundation (Month 1-2)

### Week 1-2: Authentication & User Management

**User Authentication**
- [ ] Implement Firebase Auth integration
- [ ] Build splash screen with CLIFF logo animation
- [ ] Create onboarding carousel (3-4 screens)
  - [ ] Screen 1: "Discover stories in minutes"
  - [ ] Screen 2: "New episodes every day"
  - [ ] Screen 3: "Write your own stories"
  - [ ] Skip/Next buttons
- [ ] Build login screen
  - [ ] Email/password fields with validation
  - [ ] "Login" button
  - [ ] "Forgot password?" link
- [ ] Build signup screen
  - [ ] Email, password, confirm password
  - [ ] Terms & privacy checkbox
  - [ ] "Create Account" button
- [ ] Implement Google Sign-In
- [ ] Implement Apple Sign-In (iOS only)
- [ ] Build profile setup flow
  - [ ] Choose avatar (preset options + upload)
  - [ ] Enter username (unique check)
  - [ ] Select favorite genres (3-5)
  - [ ] Age verification (13+)

**User Profile Model**
- [ ] Create User data model (Firestore)
- [ ] Implement user creation on signup
- [ ] Save user preferences (genres, reading mode, font size)
- [ ] Implement auth state management (Riverpod)

**Navigation**
- [ ] Set up GoRouter for navigation
- [ ] Implement bottom navigation bar (Discover, Library, Create, Profile)
- [ ] Add navigation guards (auth required routes)

### Week 3-4: Discovery Feed

**Vertical Swipe UI**
- [ ] Build vertical PageView controller
- [ ] Create StoryPreviewCard widget
  - [ ] Cover image with gradient overlay
  - [ ] Title, author, metadata
  - [ ] Stats (reads, reactions)
  - [ ] CTA button "Start Reading"
- [ ] Implement swipe gestures (up/down)
- [ ] Add haptic feedback on swipe
- [ ] Preload next/previous cards for smooth scrolling

**Story Data & Feed**
- [ ] Create Story data model (Firestore)
- [ ] Create Episode data model (Firestore subcollection)
- [ ] Implement story repository
- [ ] Build basic recommendation algorithm
  - [ ] Genre-based filtering
  - [ ] Random shuffle for diversity
- [ ] Create Riverpod provider for discover feed
- [ ] Implement story details bottom sheet
  - [ ] Full description
  - [ ] Episode list
  - [ ] Reactions preview
  - [ ] Share button

**Reactions System**
- [ ] Create reaction picker (emoji sheet)
- [ ] Implement reaction tap animation (Lottie)
- [ ] Save reactions to Firestore
- [ ] Update reaction counts in real-time

### Week 5-6: Story Reader

**Reader UI**
- [ ] Build immersive reader screen (fullscreen)
- [ ] Implement Markdown rendering (flutter_markdown)
- [ ] Add custom text styles (serif font for stories)
- [ ] Create episode navigation header
  - [ ] Back button
  - [ ] Episode dropdown (1/5, 2/5, etc.)
  - [ ] More options menu
- [ ] Build episode navigator footer
  - [ ] Previous episode button
  - [ ] Next episode button
- [ ] Add progress indicator (thin bar at top)

**Reading Features**
- [ ] Implement scroll position tracking
- [ ] Auto-save reading progress to Firestore
- [ ] Create ReadingProgress model
- [ ] Implement "Continue Reading" functionality
- [ ] Build reading settings bottom sheet
  - [ ] Font size (S, M, L, XL)
  - [ ] Background theme (Dark, Sepia, Light)
  - [ ] Apply settings globally

**End-of-Episode Experience**
- [ ] Create end-of-episode screen
- [ ] Add reaction prompt with emojis
- [ ] Show reaction statistics from other readers
- [ ] "Next Episode" CTA button
- [ ] Mark episode as complete

### Week 7-8: Content Management & Testing

**Content Import**
- [ ] Create admin tool for importing stories
- [ ] Import 30 seed stories to Firestore
- [ ] Upload cover images to Firebase Storage
- [ ] Verify all episodes display correctly

**Testing & Bug Fixes**
- [ ] Test authentication flows
- [ ] Test discovery feed scrolling
- [ ] Test story reader on multiple devices
- [ ] Fix UI bugs and performance issues
- [ ] Optimize image loading (caching)
- [ ] Implement shimmer loading states

**Checkpoint:** ✅ Users can browse and read stories

---

## 📚 Phase 2: Engagement & Library (Month 3-4)

### Week 9-10: Library & Bookmarks

**Library Screen**
- [ ] Build library screen with tabs
  - [ ] "Reading" tab (in-progress stories)
  - [ ] "Saved" tab (bookmarked stories)
  - [ ] "Finished" tab (completed stories)
- [ ] Create library story card widget (horizontal layout)
  - [ ] Cover thumbnail
  - [ ] Title, progress, CTA
- [ ] Implement bookmark/save functionality
- [ ] Create saved stories collection in Firestore
- [ ] Build "Continue Reading" shelf
- [ ] Show reading progress per story

**Search & Browse**
- [ ] Build search screen
- [ ] Implement text search (story title, author)
- [ ] Add genre filter chips
- [ ] Create search results list
- [ ] Add trending section
- [ ] Add featured/curated section

### Week 11-12: Gamification

**Reading Streaks**
- [ ] Create streak tracking logic
- [ ] Store last read date in user profile
- [ ] Calculate current streak on app open
- [ ] Display streak count on profile
- [ ] Create streak reminder notification

**Achievements System**
- [ ] Create Achievement data model
- [ ] Define achievement types:
  - [ ] First story read
  - [ ] 5, 10, 25 stories read
  - [ ] 3, 7, 14, 30 day streaks
  - [ ] First story published
  - [ ] 100, 500, 1000 reads on your story
- [ ] Implement achievement unlock logic
- [ ] Create achievement badge UI
- [ ] Build achievement collection screen
- [ ] Add unlock animations (Lottie)

**Profile Stats**
- [ ] Track total stories read
- [ ] Track total reading time
- [ ] Calculate favorite genre (most read)
- [ ] Display stats on profile screen
- [ ] Create visual progress indicators

### Week 13-14: Notifications & Social Features

**Push Notifications**
- [ ] Configure Firebase Cloud Messaging
- [ ] Request notification permission on iOS
- [ ] Implement notification handlers
- [ ] Create notification types:
  - [ ] New episode from followed author
  - [ ] Streak reminder (if about to break)
  - [ ] Weekly reading summary
- [ ] Test notifications on both platforms

**Following System**
- [ ] Implement follow/unfollow functionality
- [ ] Create followers/following collections
- [ ] Build following feed (stories from followed authors)
- [ ] Add follow button to author profiles
- [ ] Show follower count on profiles

**Personalized Feed**
- [ ] Improve recommendation algorithm
  - [ ] Collaborative filtering (users with similar taste)
  - [ ] Reading history analysis
  - [ ] Completion rate per genre
- [ ] Cache recommendations for performance
- [ ] Add "Because you read X" sections

**Checkpoint:** ✅ Users return daily, engagement features working

---

## ✍️ Phase 3: Creator Tools (Month 5)

### Week 15-16: Creator Studio

**My Stories Dashboard**
- [ ] Build "My Stories" screen
- [ ] Show published stories with stats
  - [ ] Episode count
  - [ ] Total reads
  - [ ] Last updated
- [ ] Show draft stories
- [ ] Add "Create New Story" button
- [ ] Implement edit/delete story actions

**Create Story Flow**
- [ ] Build story creation form
  - [ ] Cover image upload (with cropping)
  - [ ] Title (required)
  - [ ] Short hook/description (150 chars)
  - [ ] Genre dropdown
  - [ ] Content rating (Everyone, Teen, Mature)
  - [ ] Planned episodes count
- [ ] Implement image upload to Firebase Storage
- [ ] Validate form inputs
- [ ] Save story as draft or publish

### Week 17-18: Episode Editor

**Editor UI**
- [ ] Build episode editor screen
- [ ] Create Markdown toolbar
  - [ ] Bold, Italic buttons
  - [ ] Heading buttons (H1, H2, H3)
  - [ ] Link button
  - [ ] Image upload button
- [ ] Implement text editor with Markdown support
- [ ] Add live preview mode
- [ ] Show word count and estimated read time
- [ ] Auto-save drafts periodically

**Episode Management**
- [ ] Build episode list for a story
- [ ] Implement publish episode action
- [ ] Schedule episode release (optional)
- [ ] Reorder episodes (drag & drop)
- [ ] Delete episode (with confirmation)

**Image Handling**
- [ ] Implement inline image upload
- [ ] Resize and optimize images
- [ ] Store in Firebase Storage
- [ ] Insert image URL into Markdown

### Week 19-20: Publishing & Creator Analytics

**Publishing System**
- [ ] Implement publish/unpublish story
- [ ] Send notifications to followers on new episode
- [ ] Update story status (draft, ongoing, completed)
- [ ] Mark story as featured (admin only)

**Basic Creator Analytics**
- [ ] Build analytics screen for creators
- [ ] Show per-episode stats:
  - [ ] Read count
  - [ ] Completion rate
  - [ ] Reactions breakdown
- [ ] Show total story stats:
  - [ ] Total reads
  - [ ] Follower count
  - [ ] Average completion rate
- [ ] Create simple graphs (line chart for reads over time)

**Content Moderation**
- [ ] Implement profanity filter (Cloud Function)
- [ ] Flag stories for review
- [ ] Build admin moderation queue (basic)
- [ ] User report functionality
- [ ] Implement 3-strike policy for creators

**Checkpoint:** ✅ Users can write and publish stories

---

## 🎓 Phase 4: School Partnerships & Launch (Month 6)

### Week 21: School/Library Features

**Institution Accounts**
- [ ] Create school/library account type
- [ ] Build admin dashboard for institutions
  - [ ] See aggregated reading stats (class/library-wide)
  - [ ] Manage student/patron access
- [ ] Implement unique institution codes
- [ ] Allow students to join via institution code
- [ ] Respect student privacy (no individual tracking visible to admin)

**Teacher Tools**
- [ ] Build classroom challenges feature
  - [ ] Create reading challenge
  - [ ] Set goal (e.g., "Read 5 stories this month")
  - [ ] Track progress
- [ ] Create collaborative writing projects
  - [ ] Assign prompts
  - [ ] Students submit stories
  - [ ] Class can read and react

### Week 22: Writing Contest Infrastructure

**Contest System**
- [ ] Create Contest data model
- [ ] Build contest submission flow
- [ ] Implement genre categories
- [ ] Add contest deadline logic
- [ ] Create voting/judging interface (internal use)
- [ ] Build winners showcase screen

**Contest Features**
- [ ] Submit story to contest
- [ ] Show active contests
- [ ] Display past winners
- [ ] Convert winning stories to featured episodes

### Week 23: Polish & Optimization

**Performance**
- [ ] Optimize app startup time
- [ ] Implement lazy loading for feeds
- [ ] Cache frequently accessed data
- [ ] Optimize image loading (WebP, compression)
- [ ] Reduce bundle size
- [ ] Test on low-end devices

**UI/UX Polish**
- [ ] Add micro-animations (smooth transitions)
- [ ] Improve loading states (shimmer everywhere)
- [ ] Add empty states for all screens
- [ ] Polish onboarding experience
- [ ] Add tooltips for first-time users
- [ ] Improve error messages

**Bug Fixes**
- [ ] Fix crashes reported in testing
- [ ] Fix UI layout issues on different screen sizes
- [ ] Test on iOS 14+ and Android 10+
- [ ] Fix dark mode inconsistencies
- [ ] Accessibility improvements (screen reader support)

### Week 24: Launch Preparation

**App Store Preparation**
- [ ] Create App Store listing
  - [ ] App name, subtitle, description
  - [ ] Keywords for SEO
  - [ ] Screenshots (5-8 per platform)
  - [ ] App icon (iOS and Android sizes)
- [ ] Record demo video (optional)
- [ ] Write privacy policy
- [ ] Write terms of service
- [ ] Submit for App Store review (iOS)
- [ ] Publish to Google Play (Android)

**Beta Testing**
- [ ] Create TestFlight build (iOS)
- [ ] Create Google Play internal testing track
- [ ] Recruit 50-100 beta testers
  - [ ] 3-5 pilot schools
  - [ ] 1-2 libraries
  - [ ] Individual users
- [ ] Set up feedback channels (form, email)
- [ ] Collect and analyze feedback
- [ ] Iterate based on feedback

**Analytics & Monitoring**
- [ ] Set up Sentry for error tracking
- [ ] Configure Firebase Analytics events
  - [ ] Story read
  - [ ] Episode completed
  - [ ] Story created
  - [ ] User signed up
- [ ] Create analytics dashboard
- [ ] Set up alerts for crashes/errors

**Partnership Outreach**
- [ ] Contact 10-15 schools about pilot program
- [ ] Contact 5-10 libraries
- [ ] Prepare partnership presentation
- [ ] Create teacher/librarian onboarding guide
- [ ] Schedule intro workshops

**Final Checks**
- [ ] Security audit (Firebase rules, API keys)
- [ ] GDPR compliance check
- [ ] COPPA compliance (age verification)
- [ ] Load testing (simulate many users)
- [ ] Final QA on all features

**🚀 Beta Launch:** End of Month 6
- [ ] Launch with pilot schools and libraries
- [ ] Monitor crash-free rate (target: >99%)
- [ ] Track user engagement metrics
- [ ] Collect feedback from partners
- [ ] Plan for next iteration

---

## 📊 Success Metrics to Track

**Technical**
- [ ] App loads in <2 seconds
- [ ] Smooth 60fps animations
- [ ] Crash-free rate >99%
- [ ] API response time <500ms

**Engagement**
- [ ] Daily Active Users (DAU)
- [ ] Average session duration >10 minutes
- [ ] Day-7 retention >40%
- [ ] Day-30 retention >25%

**Content**
- [ ] Stories read per user/week
- [ ] Completion rate per episode
- [ ] User-generated stories created
- [ ] Reactions/engagement per story

**Partnerships**
- [ ] Number of pilot schools/libraries
- [ ] Students using the app
- [ ] Teacher/librarian feedback score

---

## 🔧 Tech Stack Summary

**Frontend:**
- Flutter 3.x (Dart)
- Riverpod (state management)
- GoRouter (navigation)
- flutter_markdown (story rendering)
- cached_network_image (image optimization)
- lottie (animations)

**Backend:**
- Firebase Authentication
- Cloud Firestore (database)
- Firebase Storage (images)
- Firebase Cloud Functions (moderation, notifications)
- Firebase Analytics
- Firebase Cloud Messaging

**Tools:**
- Git + GitHub (version control)
- GitHub Actions (CI/CD)
- Figma (design)
- Sentry (error tracking)
- VS Code / Android Studio

---

## 📝 Notes

- Focus on MVP features first, avoid scope creep
- Test frequently on real devices
- Get feedback early and often
- Prioritize performance and user experience
- Keep partnership communication open
- Document as you build

**Remember:** This is about läsglädje and skaparglädje – not monetization! 🎯
