

const { Schema, model } = require('mongoose');


const profileSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: [true, "A mandatory field"],
    },
    description: {
        type: String,
    },
    mbti: {
        type: String,
    },
    enneagram: {
        type: String,
    },
    variant: {
        type: String,
    },
    tritype: {
        type: Number,
    },
    socionics: {
        type: String,
    },
    sloan: {
        type: String,
    },
    psyche: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://soulverse.boo.world/images/1.png',
    }
})
const Profile = model("Profile", profileSchema);

module.exports = Profile;