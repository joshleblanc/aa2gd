require('dotenv').config();
const withCSS = require('@zeit/next-css');
module.exports = {
    ...withCSS({
        webpack: (config, { dev }) => {
            config.module.rules.push({
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "file-loader",
                options: {
                    name: "public/media/[name].[ext]",
                    publicPath: url => url.replace(/public/, "")
                }
            });
            return config;
        }
    }),
    target: 'serverless',
    env: {
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL
    }
};