

var Comments = require("../models/comments")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


// Test Comment Router's Filters

describe(
  "find the recent comment from all comments",
  () => {

    comment = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }


    recentComment = {
      "comment": "Most recent comment.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }

    it(
      "GET /comment/recentComment",
      async () => {
        const initialComment = await Comments.create(comment)
        setTimeout(() => { }, 1000)
        const nextComment = await Comments.create(recentComment)
        const resp = await request(app).get("/comment/recentComment").query({ commentedBy: "TestUser" })
        assert(resp._body[0].comment == nextComment.comment)
      }
    )
  }
)




describe(
  "find the top comment from all comments for a user",
  () => {

    comment = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }

    dummyTopComment = {
      "comment": "Most recent comment.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser",
      "likes": 5
    }

    it(
      "GET /comment/recentComment",
      async () => {
        const initialComment = await Comments.create(comment)
        setTimeout(() => { }, 1000)
        const nextComment = await Comments.create(dummyTopComment)
        const resp = await request(app).get("/comment/topComment").query({ commentedBy: "TestUser" })
        assert(resp._body.likes == nextComment.likes)
      }
    )
  }
)


describe(
  "filter comments based on personality votes",
  () => {

    comment1 = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }
    comment2 = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser",
      "mbti": "INFP"
    }

    comment3 = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }

    it(
      "GET /comment/filter/filterComments",
      async () => {
        await Comments.create(comment1)
        await Comments.create(comment2)
        await Comments.create(comment3)
        const resp = await request(app).get("/comment/filter/filterComments").query({ mbti: "INFP" })
        assert(resp._body[0].mbti == "INFP")
      }
    )
  }
)

