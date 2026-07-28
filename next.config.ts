import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the editable-content manifest is available to server traces in
  // production (static pages read it at build time; this covers dynamic ones).
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
