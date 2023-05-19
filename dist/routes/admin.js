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
const adminRoutes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/admin/listBets",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.getBets,
        }
    });
    server.route({
        method: methods_1.default.GET,
        path: "/admin/listTransactions",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: transactions_1.getTransactions,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/changeBetStatus",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.changeStatus,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/blockUser",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: user_1.blockUser,
        }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/admin/resultOfBet",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: bet_1.uploadResult,
        }
    });
    server.route({
        method: methods_1.default.PUT,
        path: "/admin/updateUser",
        options: {
            pre: pre_1.MiddlewaresAdministrator,
            handler: user_1.updateUser,
        }
    });
    // TODO: ACTUALIZAR INFORMACION.
};
exports.adminRoutes = adminRoutes;
