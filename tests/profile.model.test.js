

var Profile = require("../models/profile")
var assert = require('assert');

const { connect, closeDatabase } = require('./db.test.setup');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


// Testing Model Profile

describe(
    "test profile model for expected behaviour",
    () => {
        profile = {
            "name": "a test name",
            "description": "test description"
        }

        it(
            "create on model `Profile`",
            async () => {
                const profileObject = await Profile.create(profile)
                assert(profileObject.name == profile.name)
                assert(profileObject.description == profile.description)
            }
        )

        it(
            "find all on model `Profile`",
            async () => {
                const allProfiles = await Profile.find().all()
                assert(Array.isArray(allProfiles))
            }
        )

    }
)