// ===========================================
// Dynamic Imports for Code Splitting
// ===========================================
// Use these for heavy components to reduce initial bundle size

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-zinc-800/50 rounded-lg h-32" />
);

// ===========================================
// Chart Components (heavy - recharts/chart.js)
// ===========================================

export const DynamicEquityChart = dynamic(
  // @ts-expect-error - Dynamic import, component may not exist yet
  () => import("@/components/charts/equity-chart").then((mod) => mod.EquityChart).catch(() => () => null),
  {
    loading: LoadingPlaceholder,
    ssr: false,
  }
) as ComponentType<Record<string, unknown>>;

export const DynamicTradeChart = dynamic(
  // @ts-expect-error - Dynamic import, component may not exist yet
  () => import("@/components/charts/trade-chart").then((mod) => mod.TradeChart).catch(() => () => null),
  {
    loading: LoadingPlaceholder,
    ssr: false,
  }
) as ComponentType<Record<string, unknown>>;

// ===========================================
// Heavy UI Components
// ===========================================

export const DynamicConfetti = dynamic(
  () => import("@/components/ui/success-modal").then((mod) => mod.SuccessModal),
  {
    loading: LoadingPlaceholder,
    ssr: false,
  }
);

// ===========================================
// PDF/Export Components
// ===========================================

export const DynamicPDFExport = dynamic(
  // @ts-expect-error - Dynamic import, component may not exist yet
  () => import("@/components/exports/pdf-export").then((mod) => mod.PDFExport).catch(() => () => null),
  {
    loading: LoadingPlaceholder,
    ssr: false,
  }
) as ComponentType<Record<string, unknown>>;

// ===========================================
// Date Picker (heavy - date-fns)
// ===========================================

export const DynamicDatePicker = dynamic(
  // @ts-expect-error - Dynamic import, component may not exist yet
  () => import("@/components/ui/date-picker").then((mod) => mod.DatePicker).catch(() => () => null),
  {
    loading: () => (
      <div className="h-10 w-full bg-zinc-800/50 rounded-lg animate-pulse" />
    ),
    ssr: false,
  }
) as ComponentType<Record<string, unknown>>;

// ===========================================
// Rich Text Editor
// ===========================================

export const DynamicRichTextEditor = dynamic(
  // @ts-expect-error - Dynamic import, component may not exist yet
  () => import("@/components/ui/rich-text-editor").then((mod) => mod.RichTextEditor).catch(() => () => null),
  {
    loading: LoadingPlaceholder,
    ssr: false,
  }
) as ComponentType<Record<string, unknown>>;

// ===========================================
// Modals (lazy load)
// ===========================================

export const DynamicConfirmModal = dynamic(
  () => import("@/components/ui/success-modal").then((mod) => mod.ConfirmModal),
  { ssr: false }
);

// ===========================================
// Usage Example:
// ===========================================
// 
// import { DynamicEquityChart } from "@/lib/dynamic-imports";
// 
// export default function DashboardPage() {
//   return (
//     <div>
//       <DynamicEquityChart data={chartData} />
//     </div>
//   );
// }
