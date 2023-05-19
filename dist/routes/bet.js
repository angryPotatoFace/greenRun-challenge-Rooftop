"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betRoutes = void 0;
const bet_1 = require("../controllers/bet");
const methods_1 = __importDefault(require("./utils/methods"));
const pre_1 = require("./utils/pre");
const betRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/bet/{id}",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: bet_1.getBet,
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/bets",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: bet_1.getBets,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/bet",
        options: {
            pre: pre_1.MiddlewaresUser,
            handler: bet_1.createBet,
        }
    });
};
exports.betRoutes = betRoutes;
