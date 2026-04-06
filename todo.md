# CLIFF – Development Progress & TODO

**Tech Stack:** Next.js 14 + Express.js + PostgreSQL  
**Target Platforms:** Web (Mobile-first, Desktop responsive)  
**Current Status:** MVP Feature Complete - Testing Phase  
**Live URL:** https://cliffreader.se

---

## ✅ COMPLETED - MVP Core Features

### Infrastructure & Setup
- ✅ Next.js 14.1.0 frontend application
- ✅ Express.js backend API server
- ✅ PostgreSQL database with Docker
- ✅ Oracle Cloud production deployment
- ✅ Domain setup (cliffreader.se)
- ✅ Nginx reverse proxy configuration
- ✅ GitHub Actions CI/CD pipeline
- ✅ Docker Compose orchestration
- ✅ Database migrations system

### Authentication & User Management
- ✅ Email/password authentication with JWT
- ✅ Secure password hashing (bcrypt)
- ✅ Login and signup pages
- ✅ User session management
- ✅ Protected routes with auth middleware
- ✅ Admin and user roles
- ✅ Profile page with user stats
- ✅ Profile editing capability
- ✅ Logout functionality

### Story Discovery & Reading
- ✅ TikTok-style vertical scroll discovery feed
- ✅ Desktop responsive centered layout (max-w-2xl)
- ✅ Full-screen story preview cards
- ✅ Cover images with gradient overlays
- ✅ Story metadata display (genre, episodes, read time)
- ✅ Smooth vertical swipe navigation
- ✅ Keyboard navigation support (arrow keys)
- ✅ Endless scroll with story looping
- ✅ Story detail pages with episode navigation
- ✅ Markdown rendering for story content
- ✅ PDF story support with viewer
- ✅ Audio story support with player
- ✅ Reading progress tracking
- ✅ Auto-save reading position
- ✅ Episode navigation (next/previous)
- ✅ Progress indicators

### Story Creation & Editing
- ✅ Story creation workflow
- ✅ Episode creation
- ✅ Markdown editor with toolbar
- ✅ Functional formatting tools:
  - ✅ Bold (**text**)
  - ✅ Italic (*text*)
  - ✅ Lists (- item)
- ✅ Story metadata (title, hook, genre)
- ✅ Word count and read time calculation
- ✅ Story update/edit functionality
- ✅ Episode editing
- ✅ Multi-episode support
- ✅ Edit access control (author only)
- ✅ My Stories page (view all user stories)
- ✅ Edit buttons in profile

### Interactions & Engagement
- ✅ Reaction system (❤️ 😱 🔥 😭 💀)
- ✅ Reaction counters
- ✅ User reaction tracking
- ✅ Bookmark/save stories
- ✅ Bookmark toggle functionality
- ✅ Share functionality
- ✅ Story statistics (reads, loves)

### Library & Collections
- ✅ Library page with 3 tabs:
  - ✅ Reading (in-progress stories with progress bars)
  - ✅ Saved (bookmarked stories)
  - ✅ Finished (completed stories)
- ✅ Reading progress percentage display
- ✅ Story grid layout with cover images
- ✅ Empty states for each tab

### Achievements & Gamification
- ✅ User statistics API
- ✅ Real-time achievement tracking
- ✅ 12 achievement types:
  - ✅ Reading achievements (first story, 10 stories)
  - ✅ Writing achievements (published, 10 stories)
  - ✅ Popularity achievements (100 reads, 1000 reads, 50 loves)
  - ✅ Engagement achievements (7-day streak, 30-day streak)
  - ✅ Collection achievements (20 bookmarks)
  - ✅ Community achievements (50 reactions)
- ✅ Achievement progress tracking
- ✅ Category filtering
- ✅ User stats dashboard
- ✅ Unlocked/locked states with progress bars

### Settings & Support
- ✅ Settings page
- ✅ Notification preferences UI
- ✅ Privacy settings UI
- ✅ Dark mode toggle UI
- ✅ Help & Support page with FAQ
- ✅ 10+ FAQ items
- ✅ Contact options (email support)
- ✅ Full documentation page (/docs)
- ✅ Comprehensive user guides
- ✅ Tips and best practices

### Audio Features
- ✅ Audio player component
- ✅ Play/pause controls
- ✅ Progress seeking
- ✅ Volume control
- ✅ Time display (current/total)
- ✅ Restart button
- ✅ Auto-resume from saved position
- ✅ Progress auto-save (every 5 seconds)
- ✅ Purple/blue gradient theme

### Admin Features
- ✅ Admin panel page
- ✅ User management (CRUD)
- ✅ Role assignment
- ✅ User list with stats
- ✅ Story import capability

### Database Schema
- ✅ users table
- ✅ stories table
- ✅ episodes table
- ✅ reactions table
- ✅ bookmarks table
- ✅ reading_progress table (with progress_percentage, scroll_position)
- ✅ Database relationships and constraints
- ✅ Indexes for performance

### Content
- ✅ 15 diverse stories imported
- ✅ Multiple genres (Romance, Thriller, Literary Fiction, Fantasy, etc.)
- ✅ Cover images for all stories
- ✅ Audio for 3 stories (Heimdal, Daffodil, True Colors)
- ✅ Multiple episodes per story

---

## 🔄 IN PROGRESS

### Testing & Refinement
- 🔄 User acceptance testing
- 🔄 Bug fixing based on production usage
- 🔄 Performance optimization
- 🔄 Mobile device testing (various screen sizes)

---

## 📋 TODO - Post-MVP Enhancements

### Authentication Enhancements (Future)
- [ ] OAuth integration (Google, Apple, GitHub)
  - Not needed for MVP - add after user testing
- [ ] Password reset flow (email-based)
- [ ] Email verification
- [ ] Two-factor authentication (optional)

### Content & Discovery
- [ ] Search functionality
  - [ ] Search by title, author, genre
  - [ ] Search results page
  - [ ] Search history
- [ ] Genre filtering in discover feed
- [ ] Personalized recommendations
  - [ ] Based on reading history
  - [ ] Genre preferences
  - [ ] User reactions
- [ ] Trending/popular stories section
- [ ] New releases section

### Social Features
- [ ] User following system
- [ ] Author notifications for new followers
- [ ] Comments on stories/episodes
- [ ] User profiles (public view)
- [ ] User activity feed

### Story Creation Enhancements
- [ ] Cover image upload
- [ ] Image insertion in stories
- [ ] Draft saving
- [ ] Story preview before publishing
- [ ] Chapter scheduling
- [ ] Co-authoring capabilities

### Notifications
- [ ] Email notifications
  - [ ] New episode alerts
  - [ ] Weekly reading summary
- [ ] In-app notifications
- [ ] Reading streak reminders

### Analytics & Insights
- [ ] Story analytics for authors
  - [ ] Read counts over time
  - [ ] Completion rates
  - [ ] Popular episodes
  - [ ] Reader demographics
- [ ] User reading insights
  - [ ] Reading time tracking
  - [ ] Favorite genres
  - [ ] Reading habits

### Performance & UX
- [ ] Image optimization (WebP, lazy loading)
- [ ] Caching strategies
- [ ] Offline reading support (PWA)
- [ ] Reading mode customization
  - [ ] Font size selector
  - [ ] Font family options
  - [ ] Line spacing
  - [ ] Text color themes
- [ ] Night mode animation
- [ ] Page transition improvements

### Monetization (Future Consideration)
- [ ] Premium subscriptions
- [ ] Tipping system for authors
- [ ] Sponsored stories
- [ ] Ad-free option

### Content Moderation
- [ ] Report story functionality
- [ ] Content flagging system
- [ ] Admin review queue
- [ ] Automated content filtering

### Mobile App (Future)
- [ ] React Native version
- [ ] iOS App Store deployment
- [ ] Android Play Store deployment
- [ ] Push notifications (native)

---

## 🐛 Known Issues & Bugs

### High Priority
- None currently

### Medium Priority
- [ ] Optimize story image loading on slow connections
- [ ] Add skeleton loading states
- [ ] Improve error messages for failed API calls

### Low Priority
- [ ] Add keyboard shortcuts guide
- [ ] Improve accessibility (ARIA labels)
- [ ] Add more transition animations

---

## 📊 Success Metrics to Track

### Engagement
- Daily active users (DAU)
- Stories read per user
- Average reading session time
- Return user rate (7-day, 30-day)

### Content
- Stories published per week
- Active authors
- Stories completed (by readers)
- Average reactions per story

### Technical
- Page load time
- API response time
- Error rate
- Uptime percentage

---

## 🎯 Next Sprint Focus

1. **User Testing** - Get 10-20 beta testers
2. **Bug Fixes** - Address any issues from testing
3. **Performance** - Optimize images and API responses
4. **Search** - Basic search functionality
5. **Password Reset** - Email-based password recovery

---

## 📝 Notes

- **Tech Decisions:**
  - Chose Next.js over Flutter for faster iteration and web-first approach
  - PostgreSQL over Firebase for data ownership and control
  - No external dependencies like Firebase to keep infrastructure simple
  - OAuth deferred to post-MVP - email auth is sufficient for testing

- **Future Considerations:**
  - OAuth can be added once we have proven product-market fit
  - Mobile apps (React Native) after web version is stable
  - Consider Vercel/Railway for easier scaling if Oracle Cloud becomes limiting
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
