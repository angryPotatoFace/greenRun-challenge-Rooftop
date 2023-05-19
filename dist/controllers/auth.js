"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.registerUser = exports.loginUser = void 0;
const user_1 = require("../api/user");
const handlerError_1 = require("../helpers/handlerError");
const errors_1 = require("../constants/errors");
const fireAuth_1 = require("../fireAuth");
const auth_1 = require("firebase/auth");
const userSchema_1 = require("../models/schemas/userSchema");
const fireAuth_2 = require("../fireAuth");
const log4js = __importStar(require("log4js"));
const logger = log4js.getLogger("[ Authentication Controller ]");
logger.level = "debug";
const loginUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.payload;
    try {
        const UserCrenditals = yield (0, auth_1.signInWithEmailAndPassword)(fireAuth_1.auth, email, password);
        const { token } = yield UserCrenditals.user.getIdTokenResult();
        const a = yield fireAuth_2.administrator.auth().verifyIdToken(token);
        a.uid;
        logger.info(`User: ${email} ID: ${a.uid} generate a token`);
        return { token };
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(errors_1.ERR_LOGIN, h);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.payload;
    try {
        const { email, password } = data;
        yield userSchema_1.userSchema.validateAsync(data);
        const resp = yield (0, auth_1.createUserWithEmailAndPassword)(fireAuth_1.auth, email, password);
        data.id = resp.user.uid;
        delete data.password;
        const registerUser = yield (0, user_1.insertUser)(data);
        logger.info(`New user registred -> email: ${resp.user.email} id: ${resp.user.uid} `);
        return ({ data: registerUser });
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(errors_1.ERR_REGISTER, h);
    }
});
exports.registerUser = registerUser;
