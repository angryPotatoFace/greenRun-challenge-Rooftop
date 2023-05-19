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
exports.init = void 0;
require('dotenv').config();
const hapi_1 = require("@hapi/hapi");
const routes_1 = require("./routes");
require("./databases");
const errors_1 = require("./constants/errors");
const Inert = __importStar(require("@hapi/inert"));
const Vision = require('@hapi/vision');
const HapiSwagger = __importStar(require("hapi-swagger"));
var log4js = require("log4js");
var logger = log4js.getLogger('[ APP ]');
logger.level = "debug";
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: process.env.PORT,
        host: process.env.HOST
    });
    (0, routes_1.routes)(server);
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '3.0.0',
        },
    };
    yield server.register([
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        Vision
    ]);
    yield server.start();
    logger.info("Server running on %s", server.info.uri);
    // server.register(error);
});
exports.init = init;
process.on(errors_1.ERROR_UNHANDLER, err => {
    logger.error(err);
    process.exit(0);
});
