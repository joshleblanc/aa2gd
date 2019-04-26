require('dotenv').config()
module.exports = {
  target: 'serverless',
  env: {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL
  }
}