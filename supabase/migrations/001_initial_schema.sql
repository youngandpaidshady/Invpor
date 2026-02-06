-- ===========================================
-- AlphaTrader Database Schema
-- ===========================================
-- Run this in Supabase SQL Editor to set up all tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- PROFILES TABLE
-- ===========================================
-- Extended user profile data (auth.users handles core auth)

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    country TEXT,
    timezone TEXT DEFAULT 'UTC',
    notification_email BOOLEAN DEFAULT true,
    notification_push BOOLEAN DEFAULT true,
    two_factor_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===========================================
-- PROMO CODES TABLE
-- ===========================================

CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert some default promo codes
INSERT INTO public.promo_codes (code, discount_percent, valid_until) VALUES
    ('WELCOME10', 10, NOW() + INTERVAL '1 year'),
    ('TRADER20', 20, NOW() + INTERVAL '6 months'),
    ('VIP25', 25, NOW() + INTERVAL '3 months')
ON CONFLICT (code) DO NOTHING;

-- ===========================================
-- ORDERS TABLE
-- ===========================================

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    account_size INTEGER NOT NULL,
    challenge_type TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    promo_code TEXT,
    payment_method TEXT NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    stripe_session_id TEXT,
    stripe_payment_intent TEXT,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ===========================================
-- CHALLENGES TABLE
-- ===========================================

CREATE TYPE challenge_type AS ENUM ('2-step', '1-step', 'instant');
CREATE TYPE challenge_status AS ENUM ('pending', 'active', 'passed', 'failed', 'funded');

CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    type challenge_type NOT NULL,
    account_size INTEGER NOT NULL,
    status challenge_status DEFAULT 'pending',
    phase INTEGER DEFAULT 1 CHECK (phase IN (1, 2)),
    start_balance DECIMAL(12,2) NOT NULL,
    current_balance DECIMAL(12,2) NOT NULL,
    highest_balance DECIMAL(12,2),
    profit_target DECIMAL(5,2) NOT NULL,
    max_drawdown DECIMAL(5,2) NOT NULL,
    daily_drawdown DECIMAL(5,2) NOT NULL,
    current_drawdown DECIMAL(5,2) DEFAULT 0,
    current_daily_drawdown DECIMAL(5,2) DEFAULT 0,
    trading_days INTEGER DEFAULT 0,
    min_trading_days INTEGER DEFAULT 5,
    profit_split INTEGER DEFAULT 80,
    platform_login TEXT,
    platform_password TEXT,
    platform_server TEXT DEFAULT 'AlphaTrader-Live',
    started_at TIMESTAMPTZ,
    passed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    funded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON public.challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON public.challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_created_at ON public.challenges(created_at DESC);

-- ===========================================
-- TRADES TABLE
-- ===========================================

CREATE TYPE trade_type AS ENUM ('buy', 'sell');
CREATE TYPE trade_status AS ENUM ('open', 'closed');

CREATE TABLE IF NOT EXISTS public.trades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    ticket_number TEXT,
    symbol TEXT NOT NULL,
    type trade_type NOT NULL,
    lot_size DECIMAL(10,4) NOT NULL,
    entry_price DECIMAL(20,8) NOT NULL,
    exit_price DECIMAL(20,8),
    stop_loss DECIMAL(20,8),
    take_profit DECIMAL(20,8),
    profit_loss DECIMAL(12,2),
    commission DECIMAL(10,2) DEFAULT 0,
    swap DECIMAL(10,2) DEFAULT 0,
    status trade_status DEFAULT 'open',
    opened_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_trades_challenge_id ON public.trades(challenge_id);
CREATE INDEX IF NOT EXISTS idx_trades_symbol ON public.trades(symbol);
CREATE INDEX IF NOT EXISTS idx_trades_status ON public.trades(status);
CREATE INDEX IF NOT EXISTS idx_trades_opened_at ON public.trades(opened_at DESC);

-- ===========================================
-- PAYOUTS TABLE
-- ===========================================

CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'rejected');
CREATE TYPE payout_method AS ENUM ('bank', 'crypto');

CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    method payout_method NOT NULL,
    wallet_address TEXT,
    bank_details JSONB,
    status payout_status DEFAULT 'pending',
    admin_notes TEXT,
    transaction_id TEXT,
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payouts_user_id ON public.payouts(user_id);
CREATE INDEX IF NOT EXISTS idx_payouts_challenge_id ON public.payouts(challenge_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON public.payouts(status);
CREATE INDEX IF NOT EXISTS idx_payouts_requested_at ON public.payouts(requested_at DESC);

-- ===========================================
-- KYC SUBMISSIONS TABLE
-- ===========================================

CREATE TYPE kyc_status AS ENUM ('pending', 'under_review', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS public.kyc_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status kyc_status DEFAULT 'pending',
    id_front_url TEXT,
    id_back_url TEXT,
    selfie_url TEXT,
    address_proof_url TEXT,
    id_type TEXT,
    id_number TEXT,
    full_name TEXT,
    date_of_birth DATE,
    address TEXT,
    city TEXT,
    country TEXT,
    postal_code TEXT,
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kyc_user_id ON public.kyc_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON public.kyc_submissions(status);

-- ===========================================
-- CONTACT MESSAGES TABLE
-- ===========================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    is_read BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_is_read ON public.contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_messages(created_at DESC);

-- ===========================================
-- ROW LEVEL SECURITY POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read and update their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ORDERS: Users can read their own orders
CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- CHALLENGES: Users can read their own challenges
CREATE POLICY "Users can view own challenges"
    ON public.challenges FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create challenges"
    ON public.challenges FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- TRADES: Users can read trades from their challenges
CREATE POLICY "Users can view own trades"
    ON public.trades FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.challenges
            WHERE challenges.id = trades.challenge_id
            AND challenges.user_id = auth.uid()
        )
    );

-- PAYOUTS: Users can read and create their own payouts
CREATE POLICY "Users can view own payouts"
    ON public.payouts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create payouts"
    ON public.payouts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- KYC: Users can read and create their own submissions
CREATE POLICY "Users can view own kyc"
    ON public.kyc_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create kyc"
    ON public.kyc_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own kyc"
    ON public.kyc_submissions FOR UPDATE
    USING (auth.uid() = user_id AND status IN ('pending', 'rejected'));

-- PROMO CODES: Everyone can read active promo codes
CREATE POLICY "Anyone can view active promo codes"
    ON public.promo_codes FOR SELECT
    USING (is_active = true AND (valid_until IS NULL OR valid_until > NOW()));

-- CONTACT: Users can create messages
CREATE POLICY "Anyone can create contact messages"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_challenges_updated_at
    BEFORE UPDATE ON public.challenges
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_kyc_updated_at
    BEFORE UPDATE ON public.kyc_submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to verify promo code
CREATE OR REPLACE FUNCTION public.verify_promo_code(code_input TEXT)
RETURNS TABLE (
    is_valid BOOLEAN,
    discount_percent INTEGER,
    error_message TEXT
) AS $$
DECLARE
    promo RECORD;
BEGIN
    SELECT * INTO promo
    FROM public.promo_codes
    WHERE code = UPPER(code_input)
    AND is_active = true;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 0, 'Invalid promo code'::TEXT;
        RETURN;
    END IF;
    
    IF promo.valid_until IS NOT NULL AND promo.valid_until < NOW() THEN
        RETURN QUERY SELECT false, 0, 'Promo code has expired'::TEXT;
        RETURN;
    END IF;
    
    IF promo.max_uses IS NOT NULL AND promo.current_uses >= promo.max_uses THEN
        RETURN QUERY SELECT false, 0, 'Promo code usage limit reached'::TEXT;
        RETURN;
    END IF;
    
    RETURN QUERY SELECT true, promo.discount_percent, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment promo code usage
CREATE OR REPLACE FUNCTION public.use_promo_code(code_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.promo_codes
    SET current_uses = current_uses + 1
    WHERE code = UPPER(code_input)
    AND is_active = true
    AND (valid_until IS NULL OR valid_until > NOW())
    AND (max_uses IS NULL OR current_uses < max_uses);
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================
-- STORAGE BUCKETS
-- ===========================================
-- Run these in Supabase Dashboard > Storage

-- Note: Create a bucket called 'documents' for KYC uploads
-- Settings:
--   - Public: false (or true if you want public URLs)
--   - File size limit: 5MB
--   - Allowed MIME types: image/jpeg, image/png, image/webp, application/pdf

-- ===========================================
-- SAMPLE DATA (for testing)
-- ===========================================

-- Uncomment below to insert sample data for testing
/*
-- Sample challenge for testing
INSERT INTO public.challenges (
    user_id, type, account_size, status, phase,
    start_balance, current_balance, highest_balance,
    profit_target, max_drawdown, daily_drawdown,
    trading_days, profit_split, platform_login, platform_password
) VALUES (
    auth.uid(), '2-step', 50000, 'active', 1,
    50000, 51250, 51500,
    8, 10, 5,
    3, 85, 'DEMO12345', 'password123'
);
*/
