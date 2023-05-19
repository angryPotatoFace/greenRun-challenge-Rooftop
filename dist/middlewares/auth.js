"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserBlocked = exports.checkRoleAuth = exports.checkAuth = void 0;
const fireAuth_1 = require("../fireAuth");
const user_1 = require("../api/user");
const User_1 = require("../constants/User");
const errors_1 = require("../constants/errors");
var log4js = require("log4js");
var logger = log4js.getLogger('[ Middleware - Auth ]');
logger.level = "debug";
const checkAuth = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(' ').pop();
        if (!token)
            return Error();
        try {
            const verify = yield fireAuth_1.administrator.auth().verifyIdToken(token);
            const id = verify.uid;
            const user = yield (0, user_1.findUserBy)({ id });
            return {
                verify,
                user
            };
        }
        catch (err) {
            logger.error(err);
            return Error();
        }
    }
    catch (err) {
        logger.error(err);
        throw Error();
    }
});
exports.checkAuth = checkAuth;
const checkRoleAuth = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.pre.auth.user;
        if (user.role !== User_1.Roles.ADMIN) {
            logger.error(errors_1.ERR_USER_ROLE);
            return Error();
        }
        return user;
    }
    catch (err) {
        logger.error(err);
        throw Error();
    }
});
exports.checkRoleAuth = checkRoleAuth;
const isUserBlocked = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.pre.auth.user;
        if (user.user_state === User_1.State.BLOCK) {
            logger.error(errors_1.ERROR_USER_BLOCK);
            return Error();
        }
        return user;
    }
    catch (err) {
        logger.error(err);
        throw Error();
    }
});
exports.isUserBlocked = isUserBlocked;
