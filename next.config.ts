const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.noroff.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
