

var Comments = require("../models/comments")
var assert = require('assert');
var request = require('supertest');

const { connect, closeDatabase } = require('./db.test.setup');
const app = require('../app');

beforeAll(async () => connect());
afterAll(async () => closeDatabase());


// Test Comment Router

describe(
  'respond with json',
  () => {
    // A valid request.
    // Should return 200
    it(
      'GET /filter/filterComments/',
      async () => {
        const response = await request(app).get('/comment/filter/filterComments/')
        assert(response.statusCode == 200)
      })
  });



describe(
  'GET /getComments',
  () => {
    // Contains a path parameter.
    // Should return true.
    it(
      "invalid path",
      async () => {
        const response = await request(app).get("/comment/getComments/testentry")
        assert(response.statusCode == 400)
      }
    )
  }
)


describe(
  "create comment success",
  () => {
    // Create a comment
    // Should return 200
    comment = {
      "comment": "This is a test comment. This is not very long.",
      "commentedBy": "TestUser",
      "commentedAt": "TestUser"
    }
    it(
      "POST /comment/createComment",
      async () => {
        const response = await request(app).post("/comment/createComment/").send(comment)
        assert(response.statusCode == 400)
      }
    )
  })




