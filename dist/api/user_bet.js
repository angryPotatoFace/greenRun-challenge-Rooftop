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
exports.updateState = exports.getUsersByBetId = exports.insertUserBet = void 0;
const UserBets_1 = require("../models/entity/UserBets");
const insertUserBet = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield UserBets_1.UserBets.insert(user);
    }
    catch (error) {
        throw error;
    }
});
exports.insertUserBet = insertUserBet;
const getUsersByBetId = (bet_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield UserBets_1.UserBets.findBy({ bet_id });
    }
    catch (error) {
        throw error;
    }
});
exports.getUsersByBetId = getUsersByBetId;
const updateState = (bet_id, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield UserBets_1.UserBets.update({ bet_id: bet_id }, {
            state: state
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.updateState = updateState;
