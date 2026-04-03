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


Authentication Security Hardening Plan
This plan aims to resolve the critical vulnerabilities in the current authentication mechanism. The current mechanism uses a simple value ("authenticated") in the admin_session cookie and leaves API routes unprotected.

Proposed Changes
We will use JSON Web Tokens (JWT) to securely sign the authentication state. We will use the jose library because it is compatible with Next.js Edge Runtime (required by middleware.ts).

1. New Dependency
Install jose package (npm install jose).
Require a new environment variable JWT_SECRET in .env.local to sign the tokens.
2. Utilities
[NEW] lib/auth.ts
Create a helper function to verify the JWT. This will be shared between the API routes and the middleware.

3. API Routes Protection
[MODIFY] app/api/auth/route.ts
When the admin inputs the correct password, we will sign a JWT with the JWT_SECRET and a 24h expiration, and store that inside the admin_session cookie.

[MODIFY] middleware.ts
Instead of just checking if the admin_session cookie exists, we will decode and verify its cryptographic signature using jose. If the signature is invalid or expired, the user is redirected to the login page.

[MODIFY] app/api/content/route.ts
Add a check at the beginning of the POST method to read the admin_session cookie and verify the JWT. If the verification fails, respond with a 401 Unauthorized.

[MODIFY] app/api/upload/route.ts
Add the same JWT verification check to the POST and DELETE methods, securing the GitHub and Vercel Blob integrations.

User Review Required
WARNING

This change will require you to add a new environment variable JWT_SECRET to your Vercel project and your .env.local file. It must be a long, random alphanumeric string (e.g., generated via openssl rand -base64 32).

Since API routes and middleware rely on this, anyone currently "logged in" will be logged out once this is deployed.

Verification Plan
Automated/Manual Testing
Attempt to bypass /admin/dashboard by manually creating a fake admin_session cookie. Expected: Redirect to /admin.
Attempt to make a POST request to /api/content without the cookie or with a fake cookie. Expected: 401 Unauthorized.
Log in normally through the UI and verify that the dashboard loads correctly.
Update the content from the dashboard and verify it saves successfully.