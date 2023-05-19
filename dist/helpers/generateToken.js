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
exports.decodeSign = exports.verifyToken = exports.tokenSign = void 0;
const jwt = require('jsonwebtoken'); //TODO : 😎
const tokenSign = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    console.log("token session");
    return jwt.sign({
        id,
        role
    }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
});
exports.tokenSign = tokenSign;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        return null;
    }
});
exports.verifyToken = verifyToken;
const decodeSign = (token) => {
    return jwt.decode(token, null);
};
exports.decodeSign = decodeSign;
