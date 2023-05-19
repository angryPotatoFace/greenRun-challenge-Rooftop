"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaID = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    role: joi_1.default.string().required().valid('user', 'admin'),
    firstName: joi_1.default.string().required().regex(RegExp("^[a-zA-Z]+$")),
    lastName: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: joi_1.default.string(),
    username: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    birth_date: joi_1.default.string().required(),
    country_id: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    document_id: joi_1.default.string().required(),
    user_state: joi_1.default.string().required().valid('allow', 'block'),
});
exports.userSchemaID = joi_1.default.object({
    id: joi_1.default.string().required(),
    firstName: joi_1.default.string().required().regex(RegExp("^[a-zA-Z]+$")),
    lastName: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    birth_date: joi_1.default.string().required(),
    country_id: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    document_id: joi_1.default.string().required(),
});
