import type { NextConfig } from "next";
import { Configuration, container } from 'webpack';
const deps = require('./package.json').dependencies;

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config: Configuration, { isServer }) => {
        config.experiments = {
            topLevelAwait: true,
        };
        if (!config.plugins) {
            config.plugins = []; // Ensure plugins array exists
        }

        config.plugins.push(
            new container.ModuleFederationPlugin({
                name: 'host',
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
                        requiredVersion: deps.react
                    },
                    'react-dom': { 
                        singleton: true, 
                        strictVersion: true,
                        eager: true,
                        requiredVersion: deps['react-dom']
                    },
                },

            })
        );

        return config;
    },
};

module.exports = nextConfig;
