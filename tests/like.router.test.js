


var Comments = require("../models/comments")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());




describe(
    "like a comment",
    () => {

        comment = {
            "comment": "This is a test comment. This is not very long.",
            "commentedBy": "TestUser",
            "commentedAt": "TestUser"
        }

        it(
            "PUT /comment/likeComment increment",
            async () => {
                const initialComment = await Comments.create(comment)
                const resp = await request(app).put("/comment/likeComment/" + initialComment._id).query({ value: 1 })
                assert(resp._body.likes == 1)
            }
        )

        it(
            "PUT /comment/likeComment decrement",
            async () => {
                const initialComment = await Comments.create(comment)
                const resp = await request(app).put("/comment/likeComment/" + initialComment._id).query({ value: -1 })
                assert(resp._body.likes == -1)
            }
        )

    }
)




describe(
    "dislike a comment",
    () => {
        it(
            "PUT /comment/dislikeComment",
            async () => {
                const initialComment = await Comments.create(comment)
                const resp = await request(app).put("/comment/dislikeComment/" + initialComment._id).query({ value: 1 })
                assert(resp._body.dislikes == 1)
            }
        )

        it(
            "PUT /comment/dislikeComment",
            async () => {
                const initialComment = await Comments.create(comment)
                const resp = await request(app).put("/comment/dislikeComment/" + initialComment._id).query({ value: -1 })
                assert(resp._body.dislikes == -1)
            }
        )
    }
)