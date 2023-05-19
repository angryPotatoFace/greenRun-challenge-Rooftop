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
exports.blockUser = exports.getBalance = exports.getTransacions = exports.betEvent = exports.withDrawUser = exports.depositUser = exports.deleteUser = exports.updateMe = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const Transaciton_1 = require("../constants/Transaciton");
const userSchema_1 = require("../models/schemas/userSchema");
const user_1 = require("../api/user");
const transaction_1 = require("../models/schemas/transaction");
const transaction_2 = require("../api/transaction");
const bet_1 = require("../api/bet");
const errors_1 = require("../constants/errors");
const log4js = __importStar(require("log4js"));
const Bet_1 = require("../constants/Bet");
const handlerError_1 = require("../helpers/handlerError");
const validations_1 = require("./validations");
const logger = log4js.getLogger("[ User Controller ]");
logger.level = "debug";
const createUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.payload;
    try {
        yield userSchema_1.userSchema.validateAsync(data);
        return yield (0, user_1.insertUser)(data);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.createUser = createUser;
const getUsers = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_1.findAllUsers)();
        ;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getUsers = getUsers;
const getUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_1.findUserBy)({ id: req.params.id });
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getUser = getUser;
const updateUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.payload;
    try {
        yield userSchema_1.userSchemaID.validateAsync(user);
        const isAdmin = yield (0, user_1.isAdmintrator)(user.id);
        const me = (0, validations_1.areMe)(user.id, req.pre.auth.user.id);
        if (isAdmin && !me)
            throw errors_1.ERROR_CANNOT_USER;
        return yield (0, user_1.updateDataUser)(user);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.updateUser = updateUser;
const updateMe = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.payload;
    try {
        yield userSchema_1.userSchemaID.validateAsync(user);
        const me = (0, validations_1.areMe)(user.id, req.pre.auth.user.id);
        console.log(me);
        if (!me)
            throw errors_1.ERROR_CANNOT_USER;
        return yield (0, user_1.updateDataUser)(user);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.updateMe = updateMe;
const deleteUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_1.deleteUserByID)(req.params.id);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.deleteUser = deleteUser;
const depositUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.payload;
    data.category = Transaciton_1.Categories.DEPOSIT;
    try {
        yield transaction_1.transactionSchema.validateAsync(data);
        return (0, transaction_2.insertNewTransaction)(data);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.depositUser = depositUser;
const withDrawUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.payload;
    data.category = Transaciton_1.Categories.WITHDRAW;
    try {
        yield transaction_1.transactionSchema.validateAsync(data);
        yield (0, transaction_2.haveEnoughtMoney)(data);
        return yield (0, transaction_2.insertNewTransaction)(data);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.withDrawUser = withDrawUser;
const betEvent = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id, bet_option } = req.payload.bet;
    const data = req.payload.transaction;
    data.category = Transaciton_1.Categories.BET;
    data.status = Bet_1.Bet_Status.ACTIVE;
    try {
        yield transaction_1.betSchema.validateAsync(data);
        yield (0, transaction_2.haveEnoughtMoney)(data);
        return yield (0, bet_1.handlerUserBet)(event_id, bet_option, data);
        ;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.betEvent = betEvent;
const getTransacions = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, filters } = req.params;
    try {
        if (!id)
            throw errors_1.ERR_ID;
        let transactions = yield (0, transaction_2.getTransactionsByUserID)(id);
        if (filters) {
            transactions = transactions.filter(t => t.category === filters);
        }
        return transactions;
    }
    catch (err) {
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getTransacions = getTransacions;
const getBalance = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        const amount = yield (0, transaction_2.getAmountByTransaccions)(user_id);
        return `The balance about your account is ${amount}$ `;
    }
    catch (err) {
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getBalance = getBalance;
const blockUser = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.payload;
    try {
        return yield (0, user_1.blockAUser)(id);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.blockUser = blockUser;
