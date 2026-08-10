import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // A stray package-lock.json sits in the home directory above this repo,
    // so Turbopack's automatic root detection walks up and picks that one.
    // Pin the root here so module resolution and file watching stay inside
    // the project.
    root: import.meta.dirname,
  },
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
