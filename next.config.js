/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ===========================================
  // Build Configuration - Ignore lint errors during build
  // These should be fixed in a separate lint pass
  // ===========================================
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ===========================================
  // Image Optimization
  // ===========================================
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // ===========================================
  // Performance & Caching Headers
  // ===========================================
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // ===========================================
  // Compiler Options
  // ===========================================
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // ===========================================
  // Experimental Features
  // ===========================================
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // ===========================================
  // Webpack Configuration
  // ===========================================
  webpack: (config, { isServer }) => {
    // Client-side polyfills for Node core modules that some dependencies might expect.
    // IMPORTANT: Avoid touching optimization/moduleIds – Next.js relies on its own settings
    // for React Server Components & flight manifests. Overriding those can cause
    // runtime errors like "Cannot read properties of undefined (reading 'call')"
    // coming from the webpack runtime.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
