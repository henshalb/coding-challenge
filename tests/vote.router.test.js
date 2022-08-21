

var Comments = require("../models/comments")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


describe(
    "vote for a comment",
    () => {
        // NB: Entries may not reflect instantly
        // Hence performing a database check
        comment = {
            "comment": "This is a test comment.",
            "commentedOn": "TestUser"
        }
        it(
            "PUT /comment/voteComment",
            async () => {
                const initialComment = await Comments.create(comment)
                const resp = await request(app).put("/comment/voteComment/" + initialComment._id).query({ enneagram: "3w2" })
                assert(resp.statusCode == 200)
                const entries = await Comments.find({ enneagram: '3w2' })
                assert(entries[0].enneagram == "3w2")
                check = await Comments.findById(initialComment._id)
                assert(check.enneagram == "3w2")

            })
    })
