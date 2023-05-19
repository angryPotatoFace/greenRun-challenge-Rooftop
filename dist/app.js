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
exports.init = void 0;
require('dotenv').config();
const hapi_1 = require("@hapi/hapi");
const routes_1 = require("./routes");
require("./databases");
const errors_1 = require("./constants/errors");
var log4js = require("log4js");
var logger = log4js.getLogger('[ APP ]');
logger.level = "debug";
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: process.env.PORT,
        host: process.env.HOST
    });
    (0, routes_1.routes)(server);
    yield server.start();
    logger.info("Server running on %s", server.info.uri);
    // server.register(error);
});
exports.init = init;
process.on(errors_1.ERROR_UNHANDLER, err => {
    logger.error(err);
    process.exit(0);
});
