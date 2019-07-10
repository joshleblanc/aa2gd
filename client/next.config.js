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
        DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL,
        FONTAWESOME_TOKEN: process.env.FONTAWESOME_TOKEN,
        MONGO_URL: process.env.MONGO_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        ENGINE_API_KEY: process.env.ENGINE_API_KEY,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    }
};
