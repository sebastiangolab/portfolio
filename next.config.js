module.exports = {
   distDir: 'dist',
   productionBrowserSourceMaps: false,
   compress: true,

   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'www.datocms-assets.com',
         },
      ],
      deviceSizes: [550, 768, 992, 1200, 1470, 1920, 3048],
      formats: ['image/avif', 'image/webp'],
   },

   experimental: {
      optimizeCss: true,
   },

   async headers() {
      return [
         {
            source: '/:path*',
            headers: [
               {
                  key: 'X-Frame-Options',
                  value: 'DENY',
               },
               {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff',
               },
               {
                  key: 'X-XSS-Protection',
                  value: '1; mode=block',
               },
               {
                  key: 'Referrer-Policy',
                  value: 'strict-origin-when-cross-origin',
               },
               {
                  key: 'Permissions-Policy',
                  value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
               },
               {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=31536000; includeSubDomains',
               },
               {
                  key: 'Content-Security-Policy',
                  value: [
                     "default-src 'self'",
                     "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                     "style-src 'self' 'unsafe-inline'",
                     "img-src 'self' data: https://www.datocms-assets.com",
                     "font-src 'self' data:",
                     "connect-src 'self'",
                     "frame-ancestors 'none'",
                     "base-uri 'self'",
                     "form-action 'self'",
                  ].join('; '),
               },
            ],
         },
         {
            source: '/assets/:path*',
            headers: [
               {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
               },
            ],
         },
      ];
   },
};
