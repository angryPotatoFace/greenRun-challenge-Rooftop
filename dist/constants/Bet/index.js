"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet_Status = void 0;
exports.Bet_Status = (_a = class {
    },
    __setFunctionName(_a, "Bet_Status"),
    _a.ACTIVE = "active",
    _a.CANCELLED = "cancelled",
    _a.SETTLED = "settled",
    _a);
