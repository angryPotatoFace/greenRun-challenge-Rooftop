"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const methods_1 = __importDefault(require("./utils/methods"));
const auth_1 = require("../controllers/auth");
const authRoutes = (server) => {
    server.route({
        method: methods_1.default.POST,
        path: "/login",
        handler: auth_1.loginUser
    });
    server.route({
        method: methods_1.default.POST,
        path: "/register",
        handler: auth_1.registerUser
    });
};
exports.authRoutes = authRoutes;
