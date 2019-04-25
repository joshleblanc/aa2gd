require('dotenv').config()
module.exports = {
  target: 'serverless',
  env: {
    DISCORD_OAUTH_URL: process.env.DISCORD_OAUTH_URL
  }
}