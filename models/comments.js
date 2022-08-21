const { Schema, model } = require('mongoose');

const commentsSchema = new Schema(
    {
        comment: {
            type: String,
        },
        commentedBy: {
            type: String
        },
        commentedAt: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        mbti: {
            type: String,
            enum: [
                "INFP",
                "INFJ",
                "ENFP",
                "ENFJ",
                "INTJ",
                "INTP",
                "ENTP",
                "ENTJ",
                "ISFP",
                "ISFJ",
                "ESFP",
                "ESFJ",
                "ISTP",
                "ISTJ",
                "ESTP",
                "ESTJ",
                null
            ],
            default: null,
            required: false
        },
        enneagram: {
            type: String,
            enum: [
                "1w2",
                "2w3",
                "3w2",
                "3w4",
                "4w3",
                "4w5",
                "5w4",
                "5w6",
                "6w5",
                "6w7",
                "7w6",
                "7w8",
                "8w7",
                "8w9",
                "9w8",
                "9w1",
                null
            ],
            default: null,
            required: false
        },
        zodiac: {
            type: String,
            enum: [
                "Aries",
                "Taurus",
                "Gemini",
                "Cancer",
                "Leo",
                "Virgo",
                "Libra",
                "Scorpio",
                "Sagittarius",
                "Capricorn",
                "Aquarius",
                "Pisces",
                null
            ],
            default: null,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model('Comments', commentsSchema);