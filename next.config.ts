import type { NextConfig } from "next";
import { Configuration, container } from "webpack";
import packageJson from "./package.json";
const deps = packageJson.dependencies;

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: (() => {
      const patterns: any[] = [
        {
          protocol: "https",
          hostname: "drive.usercontent.google.com",
          pathname: "**",
        },
        // Allow local Strapi in development
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337",
          pathname: "**",
        },
      ];

      if (strapiUrl) {
        try {
          const u = new URL(strapiUrl);
          patterns.push({
            protocol: u.protocol.replace(":", ""),
            hostname: u.hostname,
            port: u.port || undefined,
            pathname: "**",
          });
        } catch (e) {
          // ignore invalid URL
        }
      }

      return patterns;
    })(),
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
