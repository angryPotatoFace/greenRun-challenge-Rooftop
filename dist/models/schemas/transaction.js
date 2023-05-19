"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betSchema = exports.transactionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.transactionSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    amount: joi_1.default.number().required().min(0).max(10000),
    category: joi_1.default.string().required().valid('deposit', 'withdraw', 'bet', 'winning'),
    status: joi_1.default.string().required()
});
exports.betSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    amount: joi_1.default.number().required().min(0).max(10000),
    category: joi_1.default.string().required().valid('deposit', 'withdraw', 'bet', 'winning'),
    status: joi_1.default.string().required()
});
