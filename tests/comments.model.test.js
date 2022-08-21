

var Comments = require("../models/comments")
var assert = require('assert');

const { connect, closeDatabase } = require('./db.test.setup');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


// Testing Model Comments

describe(
    "test comments model for expected behaviour",
    () => {
        comment = {
            "comment": "testing comments is added or not",
            "commentedOn": "test commenter"
        }

        it(
            "create on model `Comments`",
            async () => {
                const commentObject = await Comments.create(comment)
                assert(commentObject.comment == comment.comment)
            }
        )

        it(
            "find all on model `Comments`",
            async () => {
                const allComments = await Comments.find().all()
                assert(Array.isArray(allComments))
            }
        )

    }
)