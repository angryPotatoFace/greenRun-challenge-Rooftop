"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areMe = exports.isValidStatus = void 0;
const errors_1 = require("../constants/errors");
const Bet_1 = require("../constants/Bet");
const isValidStatus = (status) => {
    if (!(status === Bet_1.Bet_Status.ACTIVE || status === Bet_1.Bet_Status.CANCELLED)) {
        throw errors_1.ERROR_CATEGORY;
    }
};
exports.isValidStatus = isValidStatus;
const areMe = (id, id_second) => {
    return id === id_second;
};
exports.areMe = areMe;
