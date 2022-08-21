'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user')
const validId = require("../utils/validator")
const errorHandler = require("../errors/handler")

module.exports = function () {

    router.post(
        "/user/createUser/",
        async (request, response, next) => {

            // Create a new user, contains minimal info

            /*
                #swagger.tags = ['User']
                #swagger.description = 'Endpoint to create one user.' 
            */

            /*	
                #swagger.parameters['user'] = {
                in: 'body',
                description: 'User data.',
                required: true,
                schema: { $ref: "#/definitions/User" }} 
            */

            try {
                const user = new User(request.body);
                await user.save();
                response.status(201).json(user)
            } catch (error) {
                errorHandler(error, response)
            }

        })


    router.get(
        "/user/getUser/:userId",
        async (request, response, next) => {

            // Get a user based on user identifier

            /*
                #swagger.tags = ['User']
                #swagger.description = 'Endpoint to retrieve one user.' 
            */
           
            try {
                validId(request.params.userId, "userId")
                const user = await User.findById(request.params.userId)
                response.status(200).json(user)
            }
            catch (error) {
                errorHandler(error, response)

            }
        })

    return router;
}

