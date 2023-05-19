"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const methods_1 = __importDefault(require("./utils/methods"));
const auth_1 = require("../controllers/auth");
const joi_1 = __importDefault(require("joi"));
const userSchema_1 = require("../models/schemas/userSchema");
const authRoutes = (server) => {
    server.route({
        method: methods_1.default.POST,
        path: "/login",
        options: {
            handler: auth_1.loginUser,
            description: 'Login User',
            notes: 'Check If have a registered user and return a beared token',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returns the Bearer Token'
                        }
                    },
                }
            },
            validate: {
                payload: joi_1.default.object({
                    'email': joi_1.default.string(),
                    'password': joi_1.default.string(),
                }),
            },
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/register",
        options: {
            handler: auth_1.registerUser,
            description: 'Register User',
            notes: 'Register a user save it in the datebase',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returns the userid',
                        }
                    },
                }
            },
            validate: {
                payload: userSchema_1.userSchema
            },
        }
    });
};
exports.authRoutes = authRoutes;
