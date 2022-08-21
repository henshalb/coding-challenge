
var Profile = require("../models/profile")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());

describe(
    "create a new profile",
    () => {
        const profile = {
            "id": 1,
            "name": "A Martinez",
            "description": "Adolph Larrue Martinez III.",
            "mbti": "ISFJ",
            "enneagram": "9w3",
            "variant": "sp/so",
            "tritype": 725,
            "socionics": "SEE",
            "sloan": "RCOEN",
            "psyche": "FEVL"
        }
        it(
            "POST /profile/createProfile",
            async () => {
                const resp = await request(app).post("/profile/createProfile").send(profile)
                assert('name' in resp._body)
                assert('variant' in resp._body)
                assert('tritype' in resp._body)
                assert('socionics' in resp._body)
            }
        )
    }
)



describe(
    "retrieve a profile",
    () => {
        const profile = {
            "id": 1,
            "name": "A Martinez",
            "description": "Adolph Larrue Martinez III.",
            "mbti": "ISFJ",
            "enneagram": "9w3",
            "variant": "sp/so",
            "tritype": 725,
            "socionics": "SEE",
            "sloan": "RCOEN",
            "psyche": "FEVL"
        }
        it(
            "POST /profile/",
            async () => {
                // This is rendered page.
                // Checking for content type
                const newProfile = await Profile.create(profile)
                const resp = await request(app).get("/profile/" + newProfile._id)
                assert(resp.text.search("A Martinez") > 0)
            }
        )
    }
)