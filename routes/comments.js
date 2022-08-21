'use strict';

const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');
const User = require('../models/user');
const mongoose = require("mongoose");
const BadRequest = require("../errors/bad.request")
const validId = require("../utils/validator")
const errorHandler = require("../errors/handler")

module.exports = function () {

    const findUser = (id) => {
        return User.findById(id)
    }

    const findComment = (id) => {
        return Comments.findById(id)
    }

    router.post(
        "/comment/createComment/",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Comment']
            #swagger.description = 'Endpoint to create a new comment' */

            /*	
            
            #swagger.parameters['comment'] = {
                    in: 'body',
                    description: 'Comment data.',
                    required: true,
                    schema: { $ref: "#/definitions/Comment" }
            } */



            try {

                validId(request.body.commentedAt, "commentedAt")
                validId(request.body.commentedBy, "commentedBy")

                if (request.body.commentedAt) {
                    if (! await findUser(request.body.commentedAt)) {
                        throw new BadRequest("Invalid user for `commentedAt`")
                    }
                }
                if (request.body.commentedBy) {
                    if (! await findUser(request.body.commentedBy)) {
                        throw new BadRequest("Invalid user for `commentedBy`")
                    }
                }

                const comment = new Comments(request.body);
                await comment.save();
                response.json(comment)
            }
            catch (error) {
                errorHandler(error, response)
            }
        })

    router.put(
        "/comment/voteComment/:commentId",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Vote']
            #swagger.description = 'Endpoint to make a vote.' 
            
            */

            /*
            
            #swagger.parameters['mbti'] = {
                    in: 'query',
                    description: 'MBTI',
                    required: false,
                    type: 'enum',
                    enum: [
                        "INFP",
                        "INFJ",
                        "ENFP",
                        "ENFJ",
                        "INTJ",
                        "INTP",
                        "ENTP",
                        "ENTJ",
                        "ISFP",
                        "ISFJ",
                        "ESFP",
                        "ESFJ",
                        "ISTP",
                        "ISTJ",
                        "ESTP",
                        "ESTJ",
                    ]
            } 

            #swagger.parameters['enneagram'] = {
                    in: 'query',
                    description: 'Enneagram',
                    required: false,
                    type: 'enum',
                    enum: [
                        "1w2",
                        "2w3",
                        "3w2",
                        "3w4",
                        "4w3",
                        "4w5",
                        "5w4",
                        "5w6",
                        "6w5",
                        "6w7",
                        "7w6",
                        "7w8",
                        "8w7",
                        "8w9",
                        "9w8",
                        "9w1",
                    ]
            } 

            #swagger.parameters['zodiac'] = {
                    in: 'query',
                    description: 'Zodiac',
                    required: false,
                    type: 'enum',
                    enum: [
                        "Aries",
                        "Taurus",
                        "Gemini",
                        "Cancer",
                        "Leo",
                        "Virgo",
                        "Libra",
                        "Scorpio",
                        "Sagittarius",
                        "Capricorn",
                        "Aquarius",
                        "Pisces",
                    ],
            } 

            */


            try {

                validId(request.params.commentId, "commentId")


                if (request.params.commentId) {
                    if (! await findComment(request.params.commentId)) {
                        throw new BadRequest("Invalid comment identifier.")
                    }
                }
                const comment = await Comments.updateOne(
                    ({ _id: request.params.commentId }, { $set: request.query })
                );
                response.json(await Comments.findOne({ _id: request.params.commentId }))
            } catch (error) {
                errorHandler(error, response)

            }
        })

    router.get(
        "/comment/recentComment",
        async (request, response, next) => {


            /* 	
            
            #swagger.tags = ['Comment']
            #swagger.description = 'Endpoint to retrieve recent comments.' 
            
            */

            /*	
            
            #swagger.parameters['commentedBy'] = {
                    in: 'query',
                    description: 'Comment made by',
                    required: false,
                    type: 'string'
            } 
            #swagger.parameters['commentedAt'] = {
                    in: 'query',
                    description: 'Commented at',
                    required: false,
                    type: 'string'
            } 
            #swagger.parameters['likes'] = {
                    in: 'query',
                    description: 'Number of likes',
                    required: false,
                    type: 'integer'
            } 
            
            
            #swagger.parameters['dislikes'] = {
                    in: 'query',
                    description: 'Number of dislikes',
                    required: false,
                    type: 'integer'
            } 
     
            #swagger.parameters['mbti'] = {
                    in: 'query',
                    description: 'MBTI',
                    required: false,
                    type: 'enum',
                    enum: [
                        "INFP",
                        "INFJ",
                        "ENFP",
                        "ENFJ",
                        "INTJ",
                        "INTP",
                        "ENTP",
                        "ENTJ",
                        "ISFP",
                        "ISFJ",
                        "ESFP",
                        "ESFJ",
                        "ISTP",
                        "ISTJ",
                        "ESTP",
                        "ESTJ",
                    ]
            } 
     
            #swagger.parameters['enneagram'] = {
                    in: 'query',
                    description: 'Enneagram',
                    required: false,
                    type: 'enum',
                    enum: [
                        "1w2",
                        "2w3",
                        "3w2",
                        "3w4",
                        "4w3",
                        "4w5",
                        "5w4",
                        "5w6",
                        "6w5",
                        "6w7",
                        "7w6",
                        "7w8",
                        "8w7",
                        "8w9",
                        "9w8",
                        "9w1",
                    ]
            } 
     
            #swagger.parameters['zodiac'] = {
                    in: 'query',
                    description: 'Zodiac',
                    required: false,
                    type: 'enum',
                    enum: [
                        "Aries",
                        "Taurus",
                        "Gemini",
                        "Cancer",
                        "Leo",
                        "Virgo",
                        "Libra",
                        "Scorpio",
                        "Sagittarius",
                        "Capricorn",
                        "Aquarius",
                        "Pisces",
                    ],
            } 
     
            */

            try {
                const comment = await Comments.find(
                    request.query
                ).sort({ 'updatedAt': -1 }).all()
                response.status(200).json(comment)

            }
            catch (error) {
                errorHandler(error, response)
            }
        }
    )



    router.put(
        "/comment/likeComment/:commentId",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Like/Dislike']
            #swagger.description = 'Endpoint to update an existing comment' */


            try {
                validId(request.params.commentId, "commentId")


                if (request.params.commentId) {
                    if (! await findComment(request.params.commentId)) {
                        throw new BadRequest("Invalid comment identifier.")
                    }
                }

                const comment = await Comments.findOne({ _id: request.params.commentId });
                if (request.query.value == 1 | request.query.value == -1) {
                    comment.likes = comment.likes + parseInt(request.query.value)
                }
                else {
                    throw new Error("Invalid entry for value, either 1, or -1")
                }
                await comment.save();
                response.json(comment)
            } catch (error) {
                errorHandler(error, response)

            }
        })


    router.put(
        "/comment/dislikeComment/:commentId",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Like/Dislike']
            #swagger.description = 'Endpoint to update an existing comment' 
            
            */

            /*	
            
            #swagger.parameters['value'] = {
                    in: 'query',
                    description: 'Comment data.',
                    required: true
            } */

            try {
                validId(request.params.commentId, "commentId")


                if (request.params.commentId) {
                    if (! await findComment(request.params.commentId)) {
                        throw new BadRequest("Invalid comment identifier.")
                    }
                }

                const comment = await Comments.findOne(
                    { _id: request.params.commentId });
                if (request.query.value == 1 | request.query.value == -1) {
                    comment.dislikes = comment.dislikes + parseInt(request.query.value)
                }
                else {
                    throw new BadRequest("Invalid entry for `value`")
                }
                await comment.save();
                response.json(comment)
            } catch (error) {
                errorHandler(error, response)

            }
        })

    router.get(
        "/comment/filter/filterComments/",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Comment']
            #swagger.description = 'Endpoint to filter and retrieve all comments' 
            
            */

            /*	
            
            #swagger.parameters['commentedBy'] = {
                    in: 'query',
                    description: 'Comment made by',
                    required: false,
                    type: 'string'
            } 
            #swagger.parameters['commentedAt'] = {
                    in: 'query',
                    description: 'Commented at',
                    required: false,
                    type: 'string'
            } 
            #swagger.parameters['likes'] = {
                    in: 'query',
                    description: 'Number of likes',
                    required: false,
                    type: 'integer'
            } 
            
            
            #swagger.parameters['dislikes'] = {
                    in: 'query',
                    description: 'Number of dislikes',
                    required: false,
                    type: 'integer'
            } 
     
            #swagger.parameters['mbti'] = {
                    in: 'query',
                    description: 'MBTI',
                    required: false,
                    type: 'enum',
                    enum: [
                        "INFP",
                        "INFJ",
                        "ENFP",
                        "ENFJ",
                        "INTJ",
                        "INTP",
                        "ENTP",
                        "ENTJ",
                        "ISFP",
                        "ISFJ",
                        "ESFP",
                        "ESFJ",
                        "ISTP",
                        "ISTJ",
                        "ESTP",
                        "ESTJ",
                    ]
            } 
     
            #swagger.parameters['enneagram'] = {
                    in: 'query',
                    description: 'Enneagram',
                    required: false,
                    type: 'enum',
                    enum: [
                        "1w2",
                        "2w3",
                        "3w2",
                        "3w4",
                        "4w3",
                        "4w5",
                        "5w4",
                        "5w6",
                        "6w5",
                        "6w7",
                        "7w6",
                        "7w8",
                        "8w7",
                        "8w9",
                        "9w8",
                        "9w1",
                    ]
            } 
     
            #swagger.parameters['zodiac'] = {
                    in: 'query',
                    description: 'Zodiac',
                    required: false,
                    type: 'enum',
                    enum: [
                        "Aries",
                        "Taurus",
                        "Gemini",
                        "Cancer",
                        "Leo",
                        "Virgo",
                        "Libra",
                        "Scorpio",
                        "Sagittarius",
                        "Capricorn",
                        "Aquarius",
                        "Pisces",
                    ],
            } 
     
            */
            try {
                const comments = await Comments.find(
                    request.query
                ).all()
                response.status(200).json(comments)
            } catch (error) {
                response.status(404).json({ "status": error.message })
            }
        }
    )



    router.get(
        "/comment/topComment",
        async (request, response, next) => {

            /* 	
            
            #swagger.tags = ['Comment']
            #swagger.description = 'Endpoint to get top comment.' 
            
            */

            /*	
            
            #swagger.parameters['commentedBy'] = {
                    in: 'query',
                    description: 'Comment made by',
                    required: false,
                    type: 'string'
            } 
            #swagger.parameters['commentedAt'] = {
                    in: 'query',
                    description: 'Commented at',
                    required: false,
                    type: 'string'
            } 
     
            */
            try {
                const comment = await Comments.find(
                    request.query
                ).all().sort({ 'likes': -1 }).findOne()
                response.status(200).json(comment)
            } catch (error) {
                response.status(404).json({ "status": error.message })
            }
        }
    )


    router.get(
        "/comment/getComments/:commentedAt",
        async (request, response, next) => {

            /* 	
           
           #swagger.tags = ['Comment']
           #swagger.description = 'Endpoint to retrieve all comments!' 
           
           */

            /*	
             
             #swagger.parameters['commentedAt'] = {
                     in: 'path',
                     description: 'Comment at which user.',
                     required: false,
                     type: 'string'
             } 
     
             */

            try {

                validId(request.params.commentedAt, "commentedAt")


                if (request.body.commentedAt) {
                    if (! await findUser(request.body.commentedAt)) {
                        throw new BadRequest("Invalid user for `commentedAt`")
                    }
                }

                const user = request.params.commentedAt
                const comments = await Comments.find({ commentedAt: user }).all()
                response.status(200).json(comments)
            }
            catch (error) {
                errorHandler(error, response)

            }
        })
    return router;
}
