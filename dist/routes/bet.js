"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betRoutes = void 0;
const bet_1 = require("../controllers/bet");
const methods_1 = __importDefault(require("./utils/methods"));
const pre_1 = require("./utils/pre");
const bet_2 = require("../models/schemas/bet");
const joi_1 = __importDefault(require("joi"));
const betRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/bet/{id}",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: bet_1.getBet,
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
                params: joi_1.default.object({
                    'id': joi_1.default.number()
                }),
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/bets",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: bet_1.getBets,
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
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/bet",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.createBet,
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
                payload: bet_2.betSchema,
                headers: joi_1.default.object({
                    'authorization': joi_1.default.string().required()
                }).unknown()
            },
        }
    });
};
exports.betRoutes = betRoutes;
