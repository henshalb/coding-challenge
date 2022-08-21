const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()


const doc = {
    info: {
        version: process.env.APP_VERSION || "1.0.0",
        title: "Boo Coding Challenge",
        description: (
            "REST API's for comments, votes and likes on a comment." +
            "Ideal flow for the implementation is \n" +
            "<ls>" +
            "<li>Create two users</li>" +
            "<li>Create one comment targeting one user on behalf of another user.</li>" +
            "<li>Vote the comment using commentId.</li>" +
            "<li>Like or dislike the comment using separate APIs.</li>" +
            "<li>Like and dislike maintains no record about the source. </li>" +
            "<li>Increment and decrement action is included in the same API, for increment use value as 1, to decrement use value as -1.</li>" +
            "</ls>"
        )
    },
    host: "localhost:" + process.env.PORT,
    basePath: "/",
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Profile: {
            id: 1,
            name: "A Martinez",
            description: "Adolph Larrue Martinez III.",
            mbti: "ISFJ",
            enneagram: "9w3",
            variant: "sp/so",
            tritype: 725,
            socionics: "SEE",
            sloan: "RCOEN",
            psyche: "FEVL",
        },
        User: {
            name: "Jhon Doe",
        },
        Comment: {
            comment: "A long comment",
            commentedBy: "6300cbd5ffa8d8a33d2ea8c3",
            commentedAt: "6300cbd5ffa8d8a33d2ea8c3"
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = [
    './routes/profile.js',
    './routes/user.js',
    './routes/comments.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server')           // Your project's root file
})