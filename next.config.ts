import type { NextConfig } from "next";
import { Configuration, container } from "webpack";
const deps = require("./package.json").dependencies;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config: Configuration, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      layers: true,
      topLevelAwait: true,
    };
    if (!config.plugins) {
      config.plugins = []; // Ensure plugins array exists
    }

    config.plugins.push(
      new container.ModuleFederationPlugin({
        name: "host",
        remotes: {},
        // shared: {
        //     react: { singleton: true },
        //     'react-dom': { singleton: true },
        // },
        shared: {
          react: {
            singleton: true,
            strictVersion: true,
            eager: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            strictVersion: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
