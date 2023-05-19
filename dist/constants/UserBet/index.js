"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetUser_State = void 0;
exports.BetUser_State = (_a = class {
    },
    __setFunctionName(_a, "BetUser_State"),
    _a.WON = "won",
    _a.LOST = "lost",
    _a.OPEN = "open",
    _a);
