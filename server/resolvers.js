const User = require('./models/user');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    getDiscordToken: async (_, { code }) => {
      const data = new URLSearchParams();
      data.append('client_id', process.env.DISCORD_CLIENT_ID);
      data.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
      data.append('redirect_uri', process.env.DISCORD_REDIRECT_URL);
      data.append('code', code);
      data.append('grant_type', 'authorization_code');
      data.append('scope', 'email identify guilds connections');
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const tmp = "client_id=570931295253823488&client_secret=C6RXU2uDnb1Um1yxRxlnTXBdYsAiTCE8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticate&code=o83il4kSOLNFuBcNlZTGNf3aPvdZEj&grant_type=authorization_code&scope=email identify+guilds+connections"
      console.log(data.toString());
      r = await fetch(`https://discordapp.com/api/oauth2/token`, {
        method: "POST",
        body: tmp,
        headers
      });
      json = await r.json();
      console.log(json);
      return json;
    }
  },
  Mutation: {
    login: async (_, {email, password}) => {
      const user = await User.findOne({email: email});
      if (!user) {
        throw "User not found";
      }
      const match = await user.comparePassword(password);
      if (match) {
        return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
      } else {
        throw "Incorrect password"
      }
    },
    register: async (_, {email, password, confirmPassword}) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const user = new User({
        email: email,
        password: password,
      });

      await user.save();
      return true;
    }
  }
};

module.exports = resolvers;