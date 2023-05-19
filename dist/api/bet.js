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
exports.handlerUserBet = exports.updateResultOfBet = exports.updateStatus = exports.getBetWhere = exports.getOneBetWhere = void 0;
const Bet_1 = require("../constants/Bet");
const UserBet_1 = require("../constants/UserBet");
const errors_1 = require("../constants/errors");
const Bet_2 = require("../models/entity/Bet");
const transaction_1 = require("./transaction");
const user_bet_1 = require("./user_bet");
const getOneBetWhere = (event_id, bet_option) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Bet_2.Bet.findOne({
            where: { event_id, bet_option }
        });
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getOneBetWhere = getOneBetWhere;
const getBetWhere = (event_id, sport) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        if (event_id) {
            data = yield Bet_2.Bet.findBy({ event_id });
        }
        if (sport) {
            data = yield Bet_2.Bet.findBy({ sport });
        }
        if (!event_id && !sport) {
            data = yield yield Bet_2.Bet.find();
        }
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getBetWhere = getBetWhere;
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const old = yield Bet_2.Bet.findOneBy({ id });
        if (status === 'cancelled' && old.status === 'settled') {
            throw Error("You cannot cancelled a settled Bet");
        }
        data = yield Bet_2.Bet.update(id, { status });
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.updateStatus = updateStatus;
const updateResultOfBet = (event_id, bet_option, result) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const betData = yield Bet_2.Bet.findOneBy({ event_id, bet_option });
        const data = yield Bet_2.Bet.update(betData.id, {
            result
        });
        yield (0, user_bet_1.updateState)(betData.id, result);
        const odd = betData === null || betData === void 0 ? void 0 : betData.odd;
        if (result === "won") {
            const users_Bets = yield (0, user_bet_1.getUsersByBetId)(betData.id);
            users_Bets.map(bet => {
                const transaction = {
                    user_id: bet.user_id,
                    amount: bet.amount * odd,
                    category: 'winning',
                    status: result,
                    user_bet_id: bet.id
                };
                (0, transaction_1.insertNewTransaction)(transaction);
            });
        }
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.updateResultOfBet = updateResultOfBet;
const handlerUserBet = (event_id, bet_option, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bet = yield (0, exports.getOneBetWhere)(event_id, bet_option);
        if (!bet || bet.status !== Bet_1.Bet_Status.ACTIVE)
            throw errors_1.ERR_BET_UNAVAIBLE;
        const { user_id, amount } = data;
        const { id, odd } = bet;
        const userBet = yield (0, user_bet_1.insertUserBet)({
            user_id,
            bet_id: id,
            odd: odd,
            amount,
            state: UserBet_1.BetUser_State.OPEN,
        });
        data.user_bet_id = userBet.identifiers[0].id;
        return yield (0, transaction_1.insertNewTransaction)(data);
    }
    catch (err) {
        throw err;
    }
});
exports.handlerUserBet = handlerUserBet;
