# Environment Variables Setup

Copy the variables below to your `.env.local` file:

```env
# ===========================================
# Supabase (Required)
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ===========================================
# Application
# ===========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ===========================================
# Security
# ===========================================
# Generate with: openssl rand -hex 32
CSRF_SECRET=your-csrf-secret-min-32-characters

# ===========================================
# Stripe (Optional - for payment processing)
# ===========================================
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ===========================================
# Email (Optional)
# ===========================================
RESEND_API_KEY=re_...
SUPPORT_EMAIL=support@braxleynevim.com
```
