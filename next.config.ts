import type { NextConfig } from "next";
const config: NextConfig = {
  // Keep browser-test development artifacts separate from production builds.
  distDir: process.env.AMPARO_E2E === "1" ? ".next-e2e" : ".next",
};
export default config;
