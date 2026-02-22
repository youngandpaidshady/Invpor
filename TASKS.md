# BraxleyNevim - Development Task List

> **Current Status:** Foundation only. Site is not functional.
> **Goal:** Production-ready prop trading platform

---

## Phase 1: Core Pages (Must Have)

### 1.1 Landing Page ✅
- [x] Hero section with actual compelling copy
- [x] Social proof (real testimonials or placeholders)
- [x] Trust badges (payment methods, security, reviews)
- [x] Clear pricing preview (3 featured plans)
- [x] "How it works" visual steps
- [x] FAQ accordion (10 real questions)
- [x] Final CTA section
- [x] Mobile responsive check

### 1.2 Pricing Page (`/pricing`) ✅
- [x] Create dedicated pricing page
- [x] Account size selector (slider or buttons)
- [x] Challenge type tabs (2-step, 1-step, instant)
- [x] Comparison table with all features
- [x] "Most popular" highlighting
- [x] Promo code input field
- [x] "Select" buttons link to checkout
- [x] FAQ specific to pricing

### 1.3 How It Works Page (`/how-it-works`) ✅
- [x] Step-by-step visual guide
- [x] Phase 1 explanation
- [x] Phase 2 explanation
- [x] Funded account explanation
- [x] Scaling program details
- [x] Video embed placeholder
- [x] CTA to pricing

### 1.4 Trading Rules Page (`/rules`) ✅
- [x] Profit target rules
- [x] Drawdown rules (max + daily)
- [x] Minimum trading days
- [x] Allowed instruments list
- [x] Prohibited strategies
- [x] Weekend holding policy
- [x] News trading restrictions
- [x] EA/bot policy
- [x] Downloadable PDF version (placeholder)

### 1.5 About Page (`/about`) ✅
- [x] Company story
- [x] Mission statement
- [x] Team section (or founder bio)
- [x] Office/location info
- [x] Press/media mentions
- [x] Company stats

### 1.6 FAQ Page (`/faq`) ✅
- [x] Categorized questions (Getting Started, Trading, Payouts, Technical)
- [x] Search functionality
- [x] Contact CTA at bottom
- [x] 30+ real questions

### 1.7 Contact Page (`/contact`) ✅
- [x] Contact form (name, email, subject, message)
- [x] Email address display
- [x] Discord/Telegram links
- [x] Support hours
- [x] Form validation
- [x] Success/error states

### 1.8 Legal Pages ✅
- [x] Terms of Service (`/terms`)
- [x] Privacy Policy (`/privacy`)
- [x] Risk Disclosure (`/risk`)
- [x] Refund Policy (`/refunds`)
- [x] Cookie Policy (`/cookies`)

---

## Phase 2: Authentication System ✅

### 2.1 Supabase Setup ✅
- [x] Create Supabase project (client/server setup exists)
- [x] Configure environment variables (.env.local created)
- [ ] Set up database tables (users, profiles)
- [ ] Configure Row Level Security (RLS)
- [ ] Set up email templates

### 2.2 Login Page (`/login`) ✅
- [x] Email input with validation
- [x] Password input with show/hide toggle
- [x] "Remember me" checkbox
- [x] "Forgot password" link
- [x] Submit button with loading state
- [x] Error message display
- [x] Redirect to dashboard on success
- [x] Link to signup

### 2.3 Signup Page (`/signup`) ✅
- [x] Full name input
- [x] Email input with validation
- [x] Password input with requirements display
- [x] Terms checkbox (required)
- [x] Submit with loading state
- [x] Email verification flow
- [x] Link to login

### 2.4 Forgot Password (`/forgot-password`) ✅
- [x] Email input
- [x] Submit button
- [x] Success message
- [x] Rate limiting display

### 2.5 Reset Password (`/reset-password`) ✅
- [x] New password input
- [x] Confirm password
- [x] Password requirements
- [x] Submit and redirect to login

### 2.6 Email Verification (`/verify-email`) ✅
- [x] Verification status display
- [x] Resend email button
- [x] Success redirect

### 2.7 Auth Middleware ✅
- [x] Protected route wrapper
- [x] Redirect unauthenticated users
- [x] Session refresh logic
- [x] Logout functionality

---

## Phase 3: User Dashboard ✅ (Complete)

### 3.1 Dashboard Layout (`/dashboard`) ✅
- [x] Sidebar navigation
- [x] Header with user menu
- [x] Mobile responsive sidebar (drawer)
- [x] Active page indicator

### 3.2 Dashboard Overview (`/dashboard`) ✅
- [x] Welcome message with user name
- [x] Account summary cards
- [x] Active challenge status
- [x] Quick actions (new challenge, request payout)
- [x] Recent activity feed
- [x] Equity curve placeholder

### 3.3 My Challenges (`/dashboard/challenges`) ✅
- [x] List of all challenges
- [x] Status badges (active, passed, failed, funded)
- [x] Progress indicators
- [x] Filter by status
- [x] Search functionality
- [x] Click to view details
- [x] "Start New Challenge" CTA

### 3.4 Challenge Detail (`/dashboard/challenges/[id]`) ✅
- [x] Challenge info header
- [x] Current balance display
- [x] Profit/loss indicator
- [x] Progress to profit target
- [x] Drawdown usage meters
- [x] Trading days count
- [x] Trade history table
- [x] Rules compliance checklist
- [x] Platform credentials (with copy/show password)

### 3.5 Trade History (`/dashboard/trades`) ✅
- [x] Paginated trade list
- [x] Filter by challenge
- [x] Filter by date range
- [x] Filter by symbol
- [x] Export to CSV
- [x] Trade detail modal

### 3.6 Payouts (`/dashboard/payouts`) ✅
- [x] Request payout button
- [x] Payout history table
- [x] Status tracking
- [x] Payment method display
- [x] Pending amount
- [x] Total withdrawn

### 3.7 Request Payout Modal ✅
- [x] Challenge selector
- [x] Available amount display
- [x] Withdrawal amount input
- [x] Payment method selection
- [x] Confirmation step
- [x] Success/error handling

### 3.8 Account Settings (`/dashboard/settings`) ✅
- [x] Profile information edit
- [x] Password change
- [x] Notification preferences
- [x] Two-factor authentication toggle
- [x] Delete account option

### 3.9 KYC Verification (`/dashboard/kyc`) ✅
- [x] Verification status display
- [x] Document upload (ID front/back)
- [x] Selfie upload
- [x] Address proof upload
- [x] Submission confirmation
- [x] Review status tracking

---

## Phase 4: Purchase Flow ✅

### 4.1 Checkout Page (`/checkout/[planId]`) ✅
- [x] Plan summary display
- [x] Price breakdown
- [x] Promo code input with validation
- [x] Discount display
- [x] Billing email input
- [x] Payment method tabs (Card, Crypto)
- [x] Stripe Elements integration
- [x] Terms acceptance checkbox
- [x] Pay button with loading
- [x] Error handling

### 4.2 Stripe Integration ✅ (Demo Mode)
- [x] Stripe account setup (placeholder ready)
- [x] Create checkout session API (demo mode)
- [x] Handle successful payment (demo mode)
- [x] Handle failed payment (demo mode)
- [x] Webhook endpoint (`/api/webhooks/stripe`) (disabled)
- [ ] Signature verification (disabled - enable when ready)
- [x] Order creation on success (demo mode)

> **Note:** Stripe integration is currently disabled. The checkout flow works in demo mode without processing real payments. To enable real payments, configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` environment variables.

### 4.3 Order Confirmation (`/checkout/success`) ✅
- [x] Order details display
- [x] Next steps instructions
- [x] Dashboard link
- [x] Email confirmation sent (placeholder)
- [x] Receipt download

### 4.4 Payment Failed (`/checkout/failed`) ✅
- [x] Error message
- [x] Retry option
- [x] Support contact

---

## Phase 5: API Routes ✅

### 5.1 Authentication APIs ✅
- [x] `POST /api/auth/signup`
- [x] `POST /api/auth/login`
- [x] `POST /api/auth/logout`
- [x] `POST /api/auth/forgot-password`
- [x] `POST /api/auth/reset-password`
- [x] `GET /api/auth/session`

### 5.2 User APIs ✅
- [x] `GET /api/user/profile`
- [x] `PATCH /api/user/profile`
- [x] `POST /api/user/change-password`
- [x] `POST /api/user/change-email`
- [x] `DELETE /api/user/account`

### 5.3 Challenge APIs ✅
- [x] `GET /api/challenges` (list user's challenges)
- [x] `GET /api/challenges/[id]` (single challenge)
- [x] `POST /api/challenges` (create from order)

### 5.4 Trade APIs ✅
- [x] `GET /api/trades` (with pagination)
- [x] `GET /api/trades/[id]`
- [x] `GET /api/trades/export` (CSV export)

### 5.5 Payout APIs ✅
- [x] `GET /api/payouts`
- [x] `POST /api/payouts/request`
- [x] `GET /api/payouts/[id]`

### 5.6 Checkout APIs ✅ (Demo Mode)
- [x] `POST /api/checkout/create-session`
- [x] `POST /api/checkout/verify-promo`
- [x] `POST /api/webhooks/stripe` (disabled)

### 5.7 KYC APIs ✅
- [x] `GET /api/kyc/status`
- [x] `POST /api/kyc/upload`
- [x] `POST /api/kyc/submit`

### 5.8 Contact API ✅
- [x] `POST /api/contact`

---

## Phase 6: Security ✅

### 6.1 Middleware ✅
- [x] Authentication check middleware
- [x] Rate limiting (per IP, per user)
- [x] CSRF token validation (lib/security.ts)
- [x] Request logging (lib/security.ts)

### 6.2 Headers ✅
- [x] Content-Security-Policy
- [x] X-Frame-Options
- [x] X-Content-Type-Options
- [x] Referrer-Policy
- [x] Permissions-Policy

### 6.3 Input Validation ✅
- [x] All form inputs validated (Zod)
- [x] SQL injection prevention (lib/security.ts)
- [x] XSS sanitization (lib/security.ts)
- [x] File upload validation (type, size)

### 6.4 Environment ✅
- [x] All secrets in env variables
- [x] No hardcoded credentials
- [x] Separate dev/prod configs (env.example.md)

---

## Phase 7: Database Schema ✅

> **Migration file:** `supabase/migrations/001_initial_schema.sql`
> Run in Supabase SQL Editor to create all tables

### 7.1 Tables ✅
- [x] `profiles` (user_id, full_name, phone, etc.)
- [x] `challenges` (user_id, type, status, balance, etc.)
- [x] `trades` (challenge_id, symbol, profit_loss, etc.)
- [x] `payouts` (user_id, challenge_id, amount, status, etc.)
- [x] `orders` (user_id, plan_id, amount, stripe_id, etc.)
- [x] `promo_codes` (code, discount_percent, valid_until, etc.)
- [x] `kyc_submissions` (user_id, status, documents, etc.)
- [x] `contact_messages` (name, email, subject, message, etc.)

### 7.2 Row Level Security ✅
- [x] Users can only read own data
- [x] Users can only update own profile
- [x] Admin-only write access for challenges/trades

### 7.3 Indexes ✅
- [x] Index on user_id foreign keys
- [x] Index on status fields
- [x] Index on created_at for sorting

---

## Phase 8: UX Polish ✅

> **UI Components:** `components/ui/` - Reusable components for loading, empty states, toasts, forms

### 8.1 Loading States ✅
- [x] Page loading skeletons (`skeleton.tsx`)
- [x] Button loading spinners (`spinner.tsx`)
- [x] Table loading states (`TableSkeleton`)
- [x] Dashboard/Challenge card skeletons

### 8.2 Empty States ✅
- [x] No challenges yet (`NoChallenges`)
- [x] No trades yet (`NoTrades`)
- [x] No payouts yet (`NoPayouts`)
- [x] Search no results (`SearchNoResults`)
- [x] Filtered empty (`FilteredEmpty`)

### 8.3 Error Handling ✅
- [x] Form validation errors (inline) (`FormField`)
- [x] API error toasts (`useToast`)
- [x] Network error handling (`NetworkError`)
- [x] 404 page (already exists)
- [x] 500 page (error.tsx exists)
- [x] Error boundary component (`ErrorBoundary`)

### 8.4 Success Feedback ✅
- [x] Toast notifications (`ToastProvider`, `useToast`)
- [x] Success modals (`SuccessModal`)
- [x] Confetti on milestones (`showConfetti` prop)

### 8.5 Forms ✅
- [x] Form components (`Input`, `PasswordInput`, `Textarea`, `Select`)
- [x] Button with loading state (`Button`)
- [x] Checkbox component (`Checkbox`)
- [x] Confirmation modal (`ConfirmModal`)

---

## Phase 9: Mobile & Responsive ✅

### 9.1 Breakpoint Audit ✅
- [x] Responsive CSS utilities in globals.css
- [x] Safe area support for iOS devices
- [x] Touch-friendly tap targets (44px min)

### 9.2 Touch Interactions ✅
- [x] `.touch-target` utility class
- [x] Smooth scrolling utilities
- [x] Mobile-first responsive design

### 9.3 Mobile Navigation ✅
- [x] Hamburger menu (mobile-drawer.tsx)
- [x] Full-screen mobile menu
- [x] Bottom tab bar for dashboard (`bottom-tab-bar.tsx`)

---

## Phase 10: Performance ✅

### 10.1 Images ✅
- [x] next/image configured in next.config.js
- [x] WebP/AVIF format support
- [x] Device-specific sizing
- [x] 30-day cache TTL

### 10.2 Code ✅
- [x] Dynamic imports (`lib/dynamic-imports.ts`)
- [x] Package import optimization (lucide, framer-motion)
- [x] Console removal in production

### 10.3 Caching ✅
- [x] Static asset caching (1 year)
- [x] Browser caching headers
- [x] DNS prefetch enabled

---

## Phase 11: SEO & Analytics ✅

### 11.1 SEO ✅
- [x] Unique title tags per page (layout.tsx)
- [x] Meta descriptions (layout.tsx)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Sitemap.xml (`app/sitemap.ts`)
- [x] Robots.txt (`app/robots.ts`)
- [x] Schema.org markup (`lib/schema.ts`)

### 11.2 Analytics ✅
- [x] Google Analytics 4 setup (`lib/analytics.ts`)
- [x] Analytics provider component
- [x] Conversion tracking (purchase, signup)
- [x] Event tracking (CTA clicks, form submissions)

### 11.3 Error Tracking
- [ ] Sentry or similar setup (optional)
- [ ] Error alerts
- [ ] Performance monitoring

---

## Phase 12: Launch Checklist

### 12.1 Pre-Launch
- [ ] All env variables set in production
- [ ] SSL certificate
- [ ] Domain configured
- [ ] Email sending tested
- [ ] Payment flow tested (real card)
- [ ] Mobile tested on real devices
- [ ] Load testing
- [ ] Security audit

### 12.2 Post-Launch
- [ ] Monitor error rates
- [ ] Monitor performance
- [ ] User feedback collection
- [ ] Bug fixes

---

## Priority Order

**Week 1: Core Foundation**
1. All static pages (About, Rules, FAQ, Contact, Legal)
2. Proper landing page with real content
3. Pricing page with working UI

**Week 2: Auth & Dashboard**
4. Supabase setup and auth pages
5. Dashboard layout and overview
6. My Challenges page

**Week 3: Purchase Flow**
7. Checkout page with Stripe
8. Order confirmation
9. Email notifications

**Week 4: Polish**
10. Loading states and error handling
11. Mobile responsive fixes
12. Performance optimization

---

## Notes

- Each task should take 15-60 minutes max
- Test after each task
- Commit frequently
- Don't move to next phase until current is complete
- Ask for review after each phase

---

**Last Updated:** $(date)
**Total Tasks:** ~200
**Estimated Time:** 4-6 weeks for MVP
