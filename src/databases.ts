import "reflect-metadata"
import { DataSource } from "typeorm"
import { Bet} from "./models/entity/Bet"
import { Transaction  } from "./models/entity/Transaction"
import { User  } from "./models/entity/User"
import { UserBets } from "./models/entity/UserBets"


var log4js = require("log4js");
var logger = log4js.getLogger( '[ DataBase Connection ]' );
logger.level = "debug";

const db_config = JSON.parse( process.env.DB_CONFIGURATION! );

db_config.entities = [Bet, Transaction, User, UserBets];

export const AppDataSource = new DataSource(db_config);

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        logger.info("The database was connected correctly");
        // here you can start to work with your database
    })
    .catch((error) => logger.error(error))