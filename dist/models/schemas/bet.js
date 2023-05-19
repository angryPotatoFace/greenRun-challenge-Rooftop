"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doAbetSchema = exports.betSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.betSchema = joi_1.default.object({
    "bet_option": joi_1.default.number(),
    "sport": joi_1.default.string(),
    "name": joi_1.default.string(),
    "event_id": joi_1.default.number(),
    "odd": joi_1.default.number(),
});
exports.doAbetSchema = joi_1.default.object({
    "event_id": joi_1.default.number(),
    "bet_option": joi_1.default.number(),
    "amount": joi_1.default.number(),
    "user_id": joi_1.default.string(),
    "category": joi_1.default.string(),
    "status": joi_1.default.string(),
});
