require('dotenv').config();

import { Server } from "@hapi/hapi";
import { routes  } from "./routes";
import './databases'
import * as error from 'hapi-error'
import { ERROR_UNHANDLER } from "./constants/errors";

var log4js = require("log4js");
var logger = log4js.getLogger( '[ APP ]' );
logger.level = "debug";
 
export const init = async () => {
  const server: Server = new Server({
    port: process.env.PORT,
    host: process.env.HOST
  });
  routes(server)

  await server.start();

  logger.info("Server running on %s", server.info.uri);

  // server.register(error);
};

process.on(ERROR_UNHANDLER, err => {
  logger.error(err);
  process.exit(0);
});
