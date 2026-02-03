# TODO: Static to Next.js Migration

## 1. Setup & Initialization
- [/] Initialize Next.js project (TypeScript, App Router).
    - [x] Create `package.json`.
    - [x] Create `tsconfig.json`.
    - [x] Create `next.config.js`.
    - [ ] Install dependencies.
- [ ] Configure `next.config.js` for Static Export (Hybrid/Standard).
- [ ] Move `legacy_src` assets to `public/`.

## 2. Content Modeling
- [ ] Analyze `index.html` textual content (Part 2).
- [ ] Create `content/site.json` schema.
- [ ] Extract all Italian content into `site.json`.
- [ ] Create/Generated English placeholder content in `site.json`.
- [ ] Create `lib/content.ts` utility to read/write this file.

## 3. Frontend Implementation (Public Site)
- [ ] Port `legacy_src/css/style.css` to `app/globals.css`.
- [ ] Create `components/Header.tsx`, `components/Footer.tsx`.
- [ ] Create `components/Hero.tsx`, `components/Section.tsx`.
- [ ] Create `components/TrailList.tsx`.
- [ ] Implement `app/page.tsx` (Italian Root).
- [ ] Implement `app/en/page.tsx` (English Root).
- [ ] Add `LanguageSwitcher`.
- [ ] Convert `script.js` logic to React hooks.

## 4. Admin Panel Implementation
- [ ] Create `app/admin/page.tsx` (Login).
- [ ] Create `app/admin/dashboard/page.tsx` (Editor).
- [ ] Implement API Routes (`auth`, `content`, `upload`).

## 5. Security & Deployment
- [ ] Verify `ADMIN_PASSWORD` protection.
- [ ] Verify `GITHUB_TOKEN` usage.
- [ ] Test Vercel Build.

## 6. Final Polish
- [ ] Hreflang and Canonical tags.
- [ ] Verify zero visual regression.
