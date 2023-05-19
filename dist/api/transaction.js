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
exports.getAmountByTransaccions = exports.haveEnoughtMoney = exports.getTransactionsBy = exports.getTransactionsByType = exports.getTransactionsByUserID = exports.insertNewTransaction = void 0;
const Transaciton_1 = require("../constants/Transaciton");
const errors_1 = require("../constants/errors");
const Transaction_1 = require("../models/entity/Transaction");
const insertNewTransaction = (trans) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Transaction_1.Transaction.insert(trans);
    }
    catch (error) {
        throw error;
    }
});
exports.insertNewTransaction = insertNewTransaction;
const getTransactionsByUserID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Transaction_1.Transaction.find({
            where: { user_id: id }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionsByUserID = getTransactionsByUserID;
const getTransactionsByType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Transaction_1.Transaction.find({
            where: { user_id: id }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionsByType = getTransactionsByType;
const getTransactionsBy = (user_id, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        if (!user_id && !category)
            data = yield Transaction_1.Transaction.find();
        if (user_id)
            data = yield Transaction_1.Transaction.findBy({ user_id });
        if (category)
            data = yield Transaction_1.Transaction.findBy({ category });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionsBy = getTransactionsBy;
const haveEnoughtMoney = (trans) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let total = yield (0, exports.getAmountByTransaccions)(trans.user_id);
        total = total - trans.amount;
        if (total < 0)
            throw Error(errors_1.ERROR_NO_MONEY);
        return total;
    }
    catch (e) {
        throw errors_1.ERROR_NO_MONEY;
    }
});
exports.haveEnoughtMoney = haveEnoughtMoney;
const getAmountByTransaccions = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, exports.getTransactionsByUserID)(user_id);
        let total = 0;
        transactions.forEach((v) => {
            total += (v.category === Transaciton_1.Categories.WITHDRAW || v.category === Transaciton_1.Categories.BET) ? -v.amount : v.amount;
        });
        return total;
    }
    catch (e) {
        throw errors_1.ERROR_TRANSACTION;
    }
});
exports.getAmountByTransaccions = getAmountByTransaccions;
