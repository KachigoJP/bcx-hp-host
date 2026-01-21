import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import { container } from "webpack";
import packageJson from "./package.json";
const deps = packageJson.dependencies;

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          // ignore invalid URL
        }
      }

      return patterns;
    })(),
  },
  webpack: (config: Configuration) => {
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

    // Configure sass-loader to silence @import deprecation warnings
    const rules = config.module?.rules;
    if (rules) {
      rules.forEach((rule: any) => {
        if (rule.oneOf && Array.isArray(rule.oneOf)) {
          rule.oneOf.forEach((oneOfRule: any) => {
            if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
              oneOfRule.use.forEach((useEntry: any) => {
                if (
                  typeof useEntry === "object" &&
                  useEntry.loader &&
                  typeof useEntry.loader === "string" &&
                  useEntry.loader.includes("sass-loader")
                ) {
                  useEntry.options = {
                    ...useEntry.options,
                    api: "modern-compiler", // Use modern Sass API instead of legacy
                    sassOptions: {
                      ...useEntry.options?.sassOptions,
                      quietDeps: true, // Silence @import deprecation warnings
                      silenceDeprecations: ["import"], // Specifically silence @import warnings
                    },
                  };
                }
              });
            }
          });
        }
      });
    }

    return config;
  },
};

module.exports = nextConfig;
