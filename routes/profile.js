const express = require('express');
const router = express.Router();
const Profile = require('../models/profile')
const mongoose = require("mongoose");
const errorHandler = require("../errors/handler")

module.exports = function () {

  router.get('/profile/:profileId', async (request, response, next) => {

    /* 	
      #swagger.tags = ['Profile']
      #swagger.description = 'Endpoint to sign in a specific user' 
    */
   
    const profile = await Profile.findById(request.params.profileId)
    if (!profile) {
      response.status(404).json({ "status": "No such user found!" })
    }
    response.render('profile_template', {
      profile: profile
    });
  });

  router.post("/profile/createProfile/", async (request, response, next) => {

    /* 	
      #swagger.tags = ['Profile']
      #swagger.description = 'Endpoint to sign in a specific user' 
    */

    /*	
      #swagger.parameters['obj'] = {
              in: 'body',
              description: 'User information.',
              required: true,
              schema: { $ref: "#/definitions/Profile" }
      } 
    */

    try {
      const newUser = await Profile.create(request.body)
      response.json(newUser);
    }
    catch (error) {
      errorHandler(error, response)
    }
  })

  return router;
}

