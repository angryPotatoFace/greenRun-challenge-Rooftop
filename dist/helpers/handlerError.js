"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const errors_1 = require("../constants/errors");
const handlerError = (err, h) => {
    return h.response({
        statusCode: 404,
        error: err,
        message: errors_1.ERR_HANDLER
    });
};
exports.handlerError = handlerError;
