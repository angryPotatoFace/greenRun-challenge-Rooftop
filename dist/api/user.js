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
exports.isAdmintrator = exports.blockAUser = exports.deleteUserByID = exports.updateDataUser = exports.findUserBy = exports.findAllUsers = exports.insertUser = void 0;
const User_1 = require("../models/entity/User");
const errors_1 = require("../constants/errors");
const User_2 = require("../constants/User");
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.User.insert(user);
    }
    catch (error) {
        throw error;
    }
});
exports.insertUser = insertUser;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.User.find();
    }
    catch (error) {
        throw error;
    }
});
exports.findAllUsers = findAllUsers;
const findUserBy = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy(condition);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.findUserBy = findUserBy;
const updateDataUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user.id)
            return errors_1.ERR_ID;
        return yield User_1.User.update(user.id, user);
    }
    catch (error) {
        throw error;
    }
});
exports.updateDataUser = updateDataUser;
const deleteUserByID = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user.id)
            return errors_1.ERR_ID;
        return yield User_1.User.update(user.id, user);
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserByID = deleteUserByID;
const blockAUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = yield (0, exports.isAdmintrator)(id);
        if (isAdmin)
            throw Error(errors_1.ERROR_BLOCKING);
        const data = yield User_1.User.update(id, {
            user_state: User_2.State.BLOCK
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.blockAUser = blockAUser;
const isAdmintrator = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield User_1.User.findOneBy({ id });
        return ((data === null || data === void 0 ? void 0 : data.role) === User_2.Roles.ADMIN);
    }
    catch (error) {
        throw error;
    }
});
exports.isAdmintrator = isAdmintrator;
