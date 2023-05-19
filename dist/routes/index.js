"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_1 = require("./user");
const bet_1 = require("./bet");
const auth_1 = require("./auth");
const admin_1 = require("./admin");
const routes = (server) => {
    (0, user_1.userRoutes)(server);
    (0, bet_1.betRoutes)(server);
    (0, auth_1.authRoutes)(server);
    (0, admin_1.adminRoutes)(server);
};
exports.routes = routes;
