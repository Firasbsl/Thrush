/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["upload.wikimedia.org", "thrangra.sirv.com", "rb.gy", "i.ibb.co"],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
          ? 'https://thrush-backend.herokuapp.com/api/v1' // development api
          : 'https://thrush-backend.herokuapp.com/api/v1' // production api
  },
};
