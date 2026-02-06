"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Search,
  Wallet,
  TrendingUp,
  Package,
  Bell,
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 p-4 rounded-full bg-zinc-800/50 text-zinc-500">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 max-w-sm mb-6">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}

// ===========================================
// Pre-built Empty States
// ===========================================

export function NoChallenges() {
  return (
    <EmptyState
      icon={<TrendingUp className="h-8 w-8" />}
      title="No challenges yet"
      description="Start your trading journey by purchasing a challenge. Get funded and trade with our capital."
      action={{
        label: "Browse Challenges",
        href: "/pricing",
      }}
    />
  );
}

export function NoTrades() {
  return (
    <EmptyState
      icon={<BarChart3 className="h-8 w-8" />}
      title="No trades recorded"
      description="Your trade history will appear here once you start trading on an active challenge."
    />
  );
}

export function NoPayouts() {
  return (
    <EmptyState
      icon={<Wallet className="h-8 w-8" />}
      title="No payouts yet"
      description="Complete a funded challenge and request your first payout. We process payouts within 24-48 hours."
    />
  );
}

export function SearchNoResults({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8" />}
      title="No results found"
      description={
        query
          ? `We couldn't find anything matching "${query}". Try different keywords.`
          : "Try adjusting your search or filter criteria."
      }
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-8 w-8" />}
      title="All caught up!"
      description="You don't have any notifications right now. We'll let you know when something happens."
    />
  );
}

export function NoOrders() {
  return (
    <EmptyState
      icon={<Package className="h-8 w-8" />}
      title="No orders yet"
      description="You haven't made any purchases yet. Start your trading journey today!"
      action={{
        label: "View Plans",
        href: "/pricing",
      }}
    />
  );
}

export function NoData() {
  return (
    <EmptyState
      icon={<FileText className="h-8 w-8" />}
      title="No data available"
      description="There's nothing to display here yet. Check back later."
    />
  );
}

// ===========================================
// Filtered Empty State
// ===========================================

interface FilteredEmptyProps {
  onClearFilters?: () => void;
}

export function FilteredEmpty({ onClearFilters }: FilteredEmptyProps) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8" />}
      title="No matches found"
      description="No items match your current filters. Try adjusting or clearing your filters."
      action={
        onClearFilters
          ? {
              label: "Clear Filters",
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  );
}
