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
exports.getTransactions = void 0;
const transaction_1 = require("../api/transaction");
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.query.user_id;
    const category = req.query.category;
    try {
        return yield (0, transaction_1.getTransactionsBy)(user_id, category);
    }
    catch (err) {
        return err;
    }
});
exports.getTransactions = getTransactions;
