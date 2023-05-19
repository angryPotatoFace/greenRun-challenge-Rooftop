"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerDebug = exports.LoggerError = exports.LoggerWarm = exports.LoggerInfo = void 0;
var log4js = require("log4js");
const LoggerInfo = (name) => {
    var logger = log4js.getLogger(name);
    logger.level = "info";
    return logger;
};
exports.LoggerInfo = LoggerInfo;
const LoggerWarm = (name) => {
    var logger = log4js.getLogger(name);
    logger.level = "warm";
    return logger;
};
exports.LoggerWarm = LoggerWarm;
const LoggerError = (name) => {
    var logger = log4js.getLogger(name);
    logger.level = "error";
    return logger;
};
exports.LoggerError = LoggerError;
const LoggerDebug = (name) => {
    var logger = log4js.getLogger(name);
    logger.level = "debug";
    return logger;
};
exports.LoggerDebug = LoggerDebug;
