/**
 * Next.js configuration (JavaScript version)
 * This file mirrors the settings from `next.config.ts` and adds
 * `images.unoptimized: true` to prevent Next.js image optimization
 * which was causing hydration mismatches.
 */
module.exports = {
  // Hide the Next.js 'N' development indicator icon
  devIndicators: {
    appIsrStatus: false,
  },

  // Performance Optimizations for 1000+ Concurrent Users
  compress: true,

  // Image Optimization – disable the built‑in optimizer so that
  // server‑rendered HTML and client HTML match exactly.
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vsuraj.ac.in',
        pathname: '/**',
      },
    ],
  },

  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Cache HTML pages with revalidation
      {
        source: '/:path*.html',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: false,
  },
};
