require('dotenv').config();
const withCSS = require('@zeit/next-css');
module.exports = {
    ...withCSS(),
    target: 'serverless',
    env: {
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL
    }
};