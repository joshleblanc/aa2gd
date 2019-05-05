const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    appid: { type: Number, required: true },
    name: { type: String, required: true },
    playtime_forever: { type: Number, required: true },
    img_icon_url: { type: String, required: true },
    img_logo_url: { type: String, required: true },
    has_community_visible_stats: { type: Boolean, required: true }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

function makeUrl(id, hash) {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${hash}.jpg`;
}

GameSchema.virtual('iconUrl').get(function() {
    return makeUrl(this.appid, this.img_icon_url);
});

GameSchema.virtual('logoUrl').get(function() {
    return makeUrl(this.appid, this.img_logo_url);
});

const Game = mongoose.model("Game", GameSchema);

module.exports = {
    GameSchema,
    Game
};