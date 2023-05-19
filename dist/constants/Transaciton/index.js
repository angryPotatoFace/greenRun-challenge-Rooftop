"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.Categories = void 0;
exports.Categories = (_a = class {
    },
    __setFunctionName(_a, "Categories"),
    _a.DEPOSIT = "deposit",
    _a.WITHDRAW = "withdraw",
    _a.BET = "bet",
    _a.WINNING = "winning",
    _a);
exports.Result = (_b = class {
    },
    __setFunctionName(_b, "Result"),
    _b.WON = "WON",
    _b.LOST = "LOST",
    _b);
