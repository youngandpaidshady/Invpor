# AlphaTrader - Premier Prop Trading Platform

A modern, award-winning prop trading platform built with Next.js 15, TypeScript, and Tailwind CSS. Inspired by high-end fintech platforms with a "Modern Noir" aesthetic.

## Features

- 🎨 **Modern Noir Theme** - Deep blacks (#020202), slate grays, and high-energy accent colors
- 🚀 **Challenge Engine** - Tiered investment packages with automated rule tracking
- 📊 **Dynamic Dashboard** - Real-time equity curves, trading history, and status indicators
- 💳 **Payment Integration** - Stripe (Fiat) and Coinbase Commerce (Crypto) ready
- 🔒 **Hardened Security** - OWASP Top 10 protection, rate limiting, CSRF protection
- 📱 **Mobile-First** - Fully responsive with glassmorphism components
- ⚡ **Performance** - Server-Side Rendering, optimized Core Web Vitals (LCP < 1.2s)
- 🎯 **SEO Optimized** - Dynamic meta tags, OpenGraph, Twitter Cards

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **UI Components**: Radix UI, Lucide Icons
- **Backend**: Next.js API Routes (Supabase ready)
- **Payments**: Stripe & Coinbase Commerce integration points

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alphatrader.git
cd alphatrader
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
COINBASE_COMMERCE_API_KEY=your_coinbase_api_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
alphatrader/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── navbar.tsx         # Glassmorphism navbar
│   ├── footer.tsx         # Footer component
│   ├── hero.tsx           # Hero section with mesh gradient
│   ├── challenge-card.tsx # Challenge selection cards
│   ├── purchase-form.tsx  # Purchase form with validation
│   └── ...
├── middleware.ts          # Security middleware
└── ...
```

## Color Palette

- **Background**: #020202 (Deep black)
- **Surface**: #0A0A0A (Slightly lighter)
- **Accent**: #A8FF00 (Neon Lime)
- **Profit**: Emerald Green
- **Brand**: Electric Violet

## Security Features

- ✅ CSRF Protection
- ✅ Rate Limiting (Upstash ready)
- ✅ SQL Injection Prevention (via Supabase RLS)
- ✅ XSS Sanitization
- ✅ Security Headers (CSP, X-Frame-Options, etc.)
- ✅ Server-side price verification

## SEO Features

- ✅ Server-Side Rendering (SSR)
- ✅ Dynamic Meta Tags
- ✅ OpenGraph Tags
- ✅ Twitter Card Tags
- ✅ Optimized Core Web Vitals

## Building for Production

```bash
npm run build
npm start
```

## License

This project is private and proprietary.

## Contributing

This is a private project. Contact the maintainers for contribution guidelines.
