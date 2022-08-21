

var User = require("../models/user")
var assert = require('assert');

const { connect, closeDatabase } = require('./db.test.setup');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


// Testing Model User

describe(
    "test user model for expected behaviour",
    () => {
        user = {
            "name": "a valid user name",
        }

        it(
            "create on model `User`",
            async () => {
                const userObject = await User.create(user)
                assert(userObject.name == user.name)
            }
        )

        it(
            "find all on model `User`",
            async () => {
                const allUsers = await User.find().all()
                assert(Array.isArray(allUsers))
            }
        )

    }
)