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

      const r = await fetch(`https://discordapp.com/api/oauth2/token`, {
        method: "POST",
        body: data,
      });
      
      json = await r.json();
      const userRequest = await discord_req("users/@me", json.access_token);
      const user = await userRequest.json();
      const connectionsRequest = await discord_req("users/@me/connections", json.access_token);
      const connections = await connectionsRequest.json();
      const serversRequest = await discord_req("users/@me/guilds", json.access_token);
      const servers = await serversRequest.json();
      console.log(servers);
      await User.findOneAndUpdate({ id: user.id }, {
        ...user,
        avatarUrl: `http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
        connections,
        servers: servers.map(s => ({
          ...s,
          iconUrl: `https://cdn.discordapp.com/icons/${s.id}/${s.icon}.png`
        }))
      }, { upsert: true });

      console.log(connections);  
      if(json.error) {
        throw new Error("Invalid code");
      } else {
        return jwt.sign(json, process.env.JWT_SECRET, {expiresIn: json.expires_in});
      }
    },
    currentUser: async (a, { token:passedToken }, { token }) => {
      console.log("token:", token, passedToken);
      if(token && passedToken) {
        const decoded = jwt.verify(passedToken, process.env.JWT_SECRET);
        console.log(decoded);
        const r = await discord_req("users/@me", decoded.access_token);
        const json = await r.json();

        return User.findOne({ id: json.id });
      } else {
        return null;
      }
      
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