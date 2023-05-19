"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../controllers/user");
const methods_1 = __importDefault(require("./utils/methods"));
const pre_1 = require("./utils/pre");
const userRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/user/transactions/",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.getTransacions,
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/user/balance/{user_id}",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.getBalance,
        }
    });
    // ================================================
    server.route({
        method: methods_1.default.POST,
        path: "/user/deposit",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.depositUser,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/user/withdraw",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.withDrawUser,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/user/bet",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.betEvent,
        }
    });
    // ================================================
    server.route({
        method: methods_1.default.PUT,
        path: "/user",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.updateMe,
        }
    });
    // ================================================
    server.route({
        method: methods_1.default.DELETE,
        path: "/user/{id}",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: user_1.deleteUser,
        }
    });
};
exports.userRoutes = userRoutes;
