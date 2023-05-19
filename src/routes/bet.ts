import { Server } from '@hapi/hapi'
import { getBet, getBets, createBet } from '../controllers/bet'
import methods from './utils/methods'
import { MiddlewaresAdministrator, MiddlewaresUser } from './utils/pre'
import { betSchema } from '../models/schemas/bet'
import Joi from 'joi'

export const betRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/bet/{id}",
        options: {
            pre: MiddlewaresUser,  
            handler: getBet,
            description: 'Get Bet',
            notes: 'Returns a specify Bet',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'return a bet ',
                        } 
                    },
                }
            },
            validate: {
                params: Joi.object({
                    'id': Joi.number()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    server.route({
        method: methods.GET,
        path: "/bets",
        options: {
            pre: MiddlewaresUser, 
            handler: getBets,
            description: 'Get Bet',
            notes: 'Returns all Bets',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'return Bets ',
                        } 
                    },
                }
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })
 
    server.route({
        method: methods.POST,
        path: "/bet",
        options: {
            pre: MiddlewaresAdministrator, 
            handler: createBet,
            description: 'Create Pet',
            notes: 'Create a post a New Bet - ( Require a admin user)',
            tags: ['api'], 
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Post a bet',
                        } 
                    },
                }
            },
            validate: {
                payload: betSchema,
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })
}