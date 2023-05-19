import { Server } from '@hapi/hapi'

import { 
    updateUser, 
    deleteUser,
    depositUser,
    betEvent,
    withDrawUser,
    getTransacions,
    getBalance,
    updateMe
} from '../controllers/user'
import methods from './utils/methods'
import { MiddlewaresUser } from './utils/pre'
import Joi from 'joi'
import { userSchemaID } from '../models/schemas/userSchema'

export const userRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/user/transactions",
        options: {
            pre: MiddlewaresUser,  
            handler: getTransacions,
            description: 'Get transactions',
            notes: 'Returns all the transactions from the user',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Return transactions',
                        } 
                    },
                }
            },
            validate: {
                query: Joi.object(
                    {
                        user_id: Joi.string().required(),
                        filters: Joi.string(),
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
        path: "/user/balance",
        options: {
            pre: MiddlewaresUser,  
            handler: getBalance,
            description: 'get Balance',
            notes: 'Check and sum all transaction and return the remaining amount',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Return amount',
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

    // ================================================

    server.route({
        method: methods.POST,
        path: "/user/deposit",
        options: {
            pre: MiddlewaresUser,  
            handler: depositUser,
            description: 'Deposit money',
            notes: 'Create a transaction a deposit money on the user account',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Return if you can deposit',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        amount: Joi.number().required(), 
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
        path: "/user/withdraw",
        options: {
            pre: MiddlewaresUser,  
            handler: withDrawUser,
            description: 'Withdraw money',
            notes: 'Withdraw money of account and check If have enough money',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Return if you can do withdraw',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        amount: Joi.number().required(), 
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
        path: "/user/bet",
        options: {
            pre: MiddlewaresUser,  
            handler: betEvent,
            description: 'Bet event',
            notes: 'Place a bet on a specific event',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Return if you can bet on the event',
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object(
                    {
                        bets: Joi.array().items( Joi.object({
                                event_id: Joi.number().required(),
                                bet_option: Joi.number().required(),
                                amount: Joi.number().required(),
                            })
                        )
                    }
                ),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
        }
    })

    // ================================================
    server.route({
        method: methods.PUT,
        path: "/user",
        options: {
            pre: MiddlewaresUser,  
            handler: updateMe,
            description: 'Modify user data',
            notes: 'Modify the user self data',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'return if cant do the modification',
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

    // ================================================
   /* server.route({
        method: methods.DELETE,
        path: "/user/{id}",
        options: {
            pre: MiddlewaresUser,  
            handler: deleteUser,
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG
        }
    }) */
}