"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Bet_1 = require("./models/entity/Bet");
const Transaction_1 = require("./models/entity/Transaction");
const User_1 = require("./models/entity/User");
const UserBets_1 = require("./models/entity/UserBets");
var log4js = require("log4js");
var logger = log4js.getLogger('[ DataBase Connection ]');
logger.level = "debug";
const db_config = JSON.parse(process.env.DB_CONFIGURATION);
db_config.entities = [Bet_1.Bet, Transaction_1.Transaction, User_1.User, UserBets_1.UserBets];
exports.AppDataSource = new typeorm_1.DataSource(db_config);
// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
exports.AppDataSource.initialize()
    .then(() => {
    logger.info("The database was connected correctly");
    // here you can start to work with your database
})
    .catch((error) => logger.error(error));
