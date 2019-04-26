const User = require('./models/user');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function discord_req(path, token) {
  const api_url = "https://discordapp.com/api"
  return fetch(`${api_url}/${path}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    getDiscordToken: async (_, { code }) => {
      const data = new FormData();
      data.append('client_id', process.env.DISCORD_CLIENT_ID);
      data.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
      data.append('redirect_uri', process.env.DISCORD_REDIRECT_URL);
      data.append('grant_type', 'authorization_code');
      data.append('scope', 'email identify guilds connections');
      data.append('code', code);

      r = await fetch(`https://discordapp.com/api/oauth2/token`, {
        method: "POST",
        body: data,
      });
      
      json = await r.json();
      if(json.error) {
        throw new Error("Invalid code");
      } else {
        return jwt.sign(json, process.env.JWT_SECRET, {expiresIn: json.expires_in});
      }
    },
    currentUser: async (a, b, { token }) => {
      console.log("token:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const r = await discord_req("users/@me", decoded.access_token);
      const json = await r.json();
      return {
        ...json,
        avatar: `http://cdn.discordapp.com/${json.id}/${json.avatar}.png`
      };
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