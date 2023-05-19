"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../controllers/user");
const methods_1 = __importDefault(require("./utils/methods"));
const pre_1 = require("./utils/pre");
const joi_1 = __importDefault(require("joi"));
const userSchema_1 = require("../models/schemas/userSchema");
const userRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/user/transactions",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.getTransacions,
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
                query: joi_1.default.object({
                    user_id: joi_1.default.string().required(),
                    filters: joi_1.default.string(),
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/user/balance",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.getBalance,
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
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    // ================================================
    server.route({
        method: methods_1.default.POST,
        path: "/user/deposit",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.depositUser,
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
                payload: joi_1.default.object({
                    amount: joi_1.default.number().required(),
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/user/withdraw",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.withDrawUser,
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
                payload: joi_1.default.object({
                    amount: joi_1.default.number().required(),
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/user/bet",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.betEvent,
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
                payload: joi_1.default.object({
                    bets: joi_1.default.array().items(joi_1.default.object({
                        event_id: joi_1.default.number().required(),
                        bet_option: joi_1.default.number().required(),
                        amount: joi_1.default.number().required(),
                    }))
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    // ================================================
    server.route({
        method: methods_1.default.PUT,
        path: "/user",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.updateMe,
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
                payload: userSchema_1.userSchemaID,
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
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
};
exports.userRoutes = userRoutes;
