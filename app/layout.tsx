import type { Metadata } from "next";
import { Inter, GeistSans, GeistMono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlphaTrader - Premier Prop Trading Platform",
  description: "Trade demo or live accounts, complete challenges, and receive profit splits. Join the elite trading community.",
  keywords: ["prop trading", "forex", "trading challenges", "funded accounts"],
  authors: [{ name: "AlphaTrader" }],
  openGraph: {
    title: "AlphaTrader - Premier Prop Trading Platform",
    description: "Trade demo or live accounts, complete challenges, and receive profit splits.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaTrader - Premier Prop Trading Platform",
    description: "Trade demo or live accounts, complete challenges, and receive profit splits.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-body bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
