import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Three 4 MB photos expand to about 16 MB when encoded as data URLs.
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
  // Pin the workspace root explicitly — otherwise Turbopack's root
  // inference can pick up an unrelated lockfile elsewhere on disk.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: 'camera=(), microphone=(), geolocation=(self), payment=(self "https://js.stripe.com")' },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
      // Cache-Control: no-store for the signed-in account routes is set in
      // src/lib/supabase/proxy.ts (middleware) instead of here — Next's own
      // default for dynamically-rendered pages overwrites a static rule
      // placed in this config, so it has to be applied at request time.
    ];
  },
};

export default nextConfig;
