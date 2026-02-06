// ===========================================
// Database Types & Interfaces
// ===========================================

export type ChallengeType = "2-step" | "1-step" | "instant";
export type ChallengeStatus = "pending" | "active" | "passed" | "failed" | "funded";
export type PayoutStatus = "pending" | "processing" | "completed" | "rejected";

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  user_id: string;
  type: ChallengeType;
  account_size: number;
  status: ChallengeStatus;
  phase: 1 | 2;
  start_balance: number;
  current_balance: number;
  profit_target: number;
  max_drawdown: number;
  daily_drawdown: number;
  trading_days: number;
  min_trading_days: number;
  created_at: string;
  updated_at: string;
  funded_at?: string;
}

export interface Trade {
  id: string;
  challenge_id: string;
  symbol: string;
  type: "buy" | "sell";
  lot_size: number;
  entry_price: number;
  exit_price?: number;
  profit_loss?: number;
  status: "open" | "closed";
  opened_at: string;
  closed_at?: string;
}

export interface Payout {
  id: string;
  user_id: string;
  challenge_id: string;
  amount: number;
  method: "bank" | "crypto";
  status: PayoutStatus;
  requested_at: string;
  processed_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  type: ChallengeType;
  account_size: number;
  price: number;
  original_price?: number;
  profit_target: number;
  max_drawdown: number;
  daily_drawdown: number;
  profit_split: number;
  features: string[];
  is_popular?: boolean;
}

// ===========================================
// API Response Types
// ===========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// ===========================================
// Form Types
// ===========================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  full_name: string;
  agree_terms: boolean;
}

export interface PurchaseFormData {
  plan_id: string;
  payment_method: "card" | "crypto";
  email: string;
  promo_code?: string;
}
