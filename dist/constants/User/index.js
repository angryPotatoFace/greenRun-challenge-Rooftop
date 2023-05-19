"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_STATUS = exports.State = exports.Roles = void 0;
exports.Roles = (_a = class {
    },
    __setFunctionName(_a, "Roles"),
    _a.USER = "user",
    _a.ADMIN = "admin",
    _a);
exports.State = (_b = class {
    },
    __setFunctionName(_b, "State"),
    _b.ALLOW = "allow",
    _b.BLOCK = "block",
    _b);
exports.USER_STATUS = (_c = class {
    },
    __setFunctionName(_c, "USER_STATUS"),
    _c.OK = "OK",
    _c.BLOCK = "BLOCK",
    _c);
