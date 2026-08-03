import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Each route also gets a same-named directory (RSC payload data). Without
  // this, "/about" and "/about/" collide with that directory on Apache,
  // which 301s to the directory and finds no index file there.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
