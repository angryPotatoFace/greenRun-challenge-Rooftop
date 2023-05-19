import { Server } from '@hapi/hapi'
import { changeStatus, getBets, uploadResult } from '../controllers/bet'
import { getTransactions } from '../controllers/transactions'
import { blockUser, updateUser } from '../controllers/user'
import { MiddlewaresAdministrator } from './utils/pre'
import methods from './utils/methods'
import Joi from 'joi'
import { userSchemaID } from '../models/schemas/userSchema'

export const adminRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/admin/listBets",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: getBets,
            description: 'Get Bet',
            notes: 'List all of the bets (can be filtered by specific event or sport',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'return bets',
                        } 
                    },
                }
            },
            validate: {
                query: Joi.object(
                    {
                        event_id: Joi.number(), 
                        sport: Joi.string()
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    server.route({
        method: methods.GET,
        path: "/admin/listTransactions",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: getTransactions,
            description: 'get transactions',
            notes: 'List all of the user transactions (can be also filtered by specific user and/or category)',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'return transactions',
                        } 
                    },
                }
            },
            validate: {
                query: Joi.object(
                    {
                        user_id: Joi.string(), 
                        category: Joi.string()
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/changeBetStatus",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: changeStatus,
            description: 'Change status',
            notes: 'Change a bet status (active / cancelled )',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Block a user',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        id: Joi.string().required(), 
                        status: Joi.string().required(),
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/blockUser",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: blockUser,
            description: 'Block User',
            notes: 'Blocks a specific user ( cannot block and other administrator)',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Block a user',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        id: Joi.string().required(), 
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/resultOfBet",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: uploadResult,
            description: 'Upload result of Bet',
            notes: 'Settled bets results (won / lost)',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'upload result',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        "event_id": Joi.number(), 
                        "bet_option": Joi.number(), 
                        "result": Joi.string()
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })


    server.route({
        method: methods.PUT,
        path: "/admin/updateUser",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: updateUser,
            description: 'Update user data',
            notes: 'Update user data ( cannot update data from another administrator)',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'update date',
                        } 
                    },
                }
            },
            validate: {
                payload: userSchemaID,
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

}