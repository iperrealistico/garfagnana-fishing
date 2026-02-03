# TODO: Static to Next.js Migration

## Phase 1: Setup & Configuration
- [ ] Initialize Next.js project in current directory (clean up existing files properly) <!-- id: 1 -->
- [ ] Install dependencies (`next`, `react`, `react-dom`, `framer-motion` if needed for animations, etc.) <!-- id: 2 -->
- [ ] Configure `next.config.js` <!-- id: 3 -->
- [ ] Setup `jsconfig.json` or `tsconfig.json` <!-- id: 4 -->

## Phase 2: Assets & Styles
- [ ] Move images from `images/` to `public/images/` <!-- id: 5 -->
- [ ] Migrate `css/style.css` to `styles/globals.css` <!-- id: 6 -->
- [ ] Ensure fonts (Inter) are loaded via `next/font` or preserved in `<Head>` <!-- id: 7 -->

## Phase 3: Content Architecture
- [ ] Analysis of `index.html` to define JSON schema <!-- id: 8 -->
- [ ] Create `content/site.json` with full Italian and English content <!-- id: 9 -->
- [ ] Setup utility to read JSON content in `getStaticProps` <!-- id: 10 -->

## Phase 4: Component Migration (Pixel-Perfect)
- [ ] Create `Layout`, `Header` (with Nav), `Footer` <!-- id: 11 -->
- [ ] Create `Hero` component <!-- id: 12 -->
- [ ] Create `BookingSection` (#prenota) <!-- id: 13 -->
- [ ] Create `LocationsSection` (#dove-pescare) with ZRS Cards & Panels <!-- id: 14 -->
- [ ] Create `AboutSection` (#chi-siamo) <!-- id: 15 -->
- [ ] Create `VideoSection` (#video) with Lightbox logic <!-- id: 16 -->
- [ ] Create `ServicesSection` (#servizi) with Tabs <!-- id: 17 -->
- [ ] Implement `LanguageSwitcher` logic <!-- id: 18 -->

## Phase 5: Page Construction
- [ ] Implement `pages/index.js` (Italian root) <!-- id: 19 -->
- [ ] Implement `pages/en/index.js` (English root) <!-- id: 20 -->
- [ ] Ensure `_document.js` contains all SEO meta tags and Schema.org JSON-LD <!-- id: 21 -->

## Phase 6: Admin Panel & API
- [ ] Create secure login page `pages/admin/login.js` <!-- id: 22 -->
- [ ] Create Main Admin Dashboard `pages/admin/index.js` <!-- id: 23 -->
- [ ] Implement `pages/api/auth` (Simple session/cookie) <!-- id: 24 -->
- [ ] Implement `pages/api/content` (Read/Write JSON to GitHub) <!-- id: 25 -->
- [ ] Implement `pages/api/upload` (Handle image uploads to GitHub/Blob) <!-- id: 26 -->
- [ ] Add "Publish" button logic (Trigger commit) <!-- id: 27 -->

## Phase 7: Verification & Launch
- [ ] Test build locally (`npm run build && npm start`) <!-- id: 28 -->
- [ ] Verify separate `/en` route <!-- id: 29 -->
- [ ] Verify Admin functionality (Edit text -> Save -> Check GitHub) <!-- id: 30 -->
- [ ] Document final Vercel Env Vars needed <!-- id: 31 -->
