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
exports.uploadResult = exports.changeStatus = exports.createBet = exports.getBet = exports.getBets = void 0;
const Bet_1 = require("../models/entity/Bet");
const bet_1 = require("../api/bet");
const log4js = __importStar(require("log4js"));
const validations_1 = require("./validations");
const handlerError_1 = require("../helpers/handlerError");
const logger = log4js.getLogger("[ Bet Controller ]");
logger.level = "debug";
const getBets = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const event_id = req.query.event_id;
    const sport = req.query.sport;
    try {
        return yield (0, bet_1.getBetWhere)(event_id, sport);
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getBets = getBets;
const getBet = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Bet_1.Bet.findOneBy({
            id: req.params.id,
        });
        return data;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.getBet = getBet;
const createBet = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.payload;
    data.result = "open";
    try {
        const newBet = yield Bet_1.Bet.insert(data);
        return newBet;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.createBet = createBet;
const changeStatus = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.payload;
    try {
        (0, validations_1.isValidStatus)(status);
        const data = yield (0, bet_1.updateStatus)(id, status);
        return data;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.changeStatus = changeStatus;
const uploadResult = (req, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id, bet_option, result } = req.payload;
    try {
        const data = yield (0, bet_1.updateResultOfBet)(event_id, bet_option, result);
        return data;
    }
    catch (err) {
        logger.error(err);
        return (0, handlerError_1.handlerError)(err, h);
    }
});
exports.uploadResult = uploadResult;
