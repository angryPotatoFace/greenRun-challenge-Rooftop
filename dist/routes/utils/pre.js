"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewaresUser = exports.MiddlewaresAdministrator = void 0;
const auth_1 = require("../../middlewares/auth");
exports.MiddlewaresAdministrator = [
    { method: auth_1.checkAuth, assign: 'auth' },
    { method: auth_1.checkRoleAuth, assign: 'role' }
];
exports.MiddlewaresUser = [
    { method: auth_1.checkAuth, assign: 'auth' },
];
