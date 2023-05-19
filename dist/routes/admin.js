"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const bet_1 = require("../controllers/bet");
const transactions_1 = require("../controllers/transactions");
const user_1 = require("../controllers/user");
const pre_1 = require("./utils/pre");
const methods_1 = __importDefault(require("./utils/methods"));
const joi_1 = __importDefault(require("joi"));
const userSchema_1 = require("../models/schemas/userSchema");
const adminRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/admin/listBets",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.getBets,
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
                query: joi_1.default.object({
                    event_id: joi_1.default.number(),
                    sport: joi_1.default.string()
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/admin/listTransactions",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: transactions_1.getTransactions,
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
                query: joi_1.default.object({
                    user_id: joi_1.default.string(),
                    category: joi_1.default.string()
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/changeBetStatus",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.changeStatus,
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
                payload: joi_1.default.object({
                    id: joi_1.default.string().required(),
                    status: joi_1.default.string().required(),
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/blockUser",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: user_1.blockUser,
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
                payload: joi_1.default.object({
                    id: joi_1.default.string().required(),
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/resultOfBet",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.uploadResult,
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
                payload: joi_1.default.object({
                    "event_id": joi_1.default.number(),
                    "bet_option": joi_1.default.number(),
                    "result": joi_1.default.string()
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.PUT,
        path: "/admin/updateUser",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: user_1.updateUser,
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
                payload: userSchema_1.userSchemaID,
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
};
exports.adminRoutes = adminRoutes;
