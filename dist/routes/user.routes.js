"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const methods_1 = __importDefault(require("./methods"));
const routes = (server) => {
    server.route({
        method: methods_1.default.GET,
        path: "/users",
        handler: () => { }
    });
    server.route({
        method: methods_1.default.POST,
        path: "/users",
        handler: user_controller_1.createUser
    });
    server.route({
        method: methods_1.default.PUT,
        path: "/users/:id",
        handler: () => { }
    });
    server.route({
        method: methods_1.default.DELETE,
        path: "/",
        handler: () => { }
    });
};
exports.routes = routes;
