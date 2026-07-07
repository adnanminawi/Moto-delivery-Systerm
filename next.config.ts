import type { NextConfig } from "next";

const nextConfig = {
  allowedDevOrigins: [
    "192.168.11.231",
    "192.168.0.101",
    "localhost",
  ],
};

module.exports = nextConfig;


export default nextConfig;
