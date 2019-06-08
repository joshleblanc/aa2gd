const mongoose = require('mongoose');

const Game = mongoose.Schema({
    appid: {type: Number, required: true},
    name: {type: String, required: true},
    playtime_forever: {type: Number, required: true},
    img_icon_url: {type: String, required: false},
    img_logo_url: {type: String, required: false},
    has_community_visible_stats: {type: Boolean, required: false},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]
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

Game.virtual('iconUrl').get(function () {
    return makeUrl(this.appid, this.img_icon_url);
});

Game.virtual('logoUrl').get(function () {
    return makeUrl(this.appid, this.img_logo_url);
});

module.exports = Game;