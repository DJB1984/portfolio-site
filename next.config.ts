import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the editable-content manifest is available to server traces in
  // production (static pages read it at build time; this covers dynamic ones).
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default nextConfig;
