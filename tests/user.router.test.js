
var User = require("../models/user")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());

describe(
    "create a new user",
    () => {
        const user = {
            "name": "A Martinez"
        }
        it(
            "POST /user/createUser",
            async () => {
                const resp = await request(app).post("/user/createUser/").send(user)
                assert('name' in resp._body)
            }
        )
    }
)



describe(
    "retrieve a user",
    () => {
        const user = {
            "name": "A Martinez",
        }
        it(
            "POST /user/getUser/{userId}",
            async () => {
                // This is rendered page.
                // Checking for content type
                const newUser = await User.create(user)
                const resp = await request(app).get("/user/getUser/" + newUser._id)
                assert(resp._body.name == user.name)
            }
        )
    }
)