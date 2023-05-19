require('dotenv').config();
import { Server } from "@hapi/hapi";
import { routes  } from "./routes";
import './databases'
import { ERROR_UNHANDLER } from "./constants/errors";
import * as Inert from '@hapi/inert'
const Vision = require('@hapi/vision');
import * as HapiSwagger from 'hapi-swagger';


var log4js = require("log4js");
var logger = log4js.getLogger( '[ APP ]' );
logger.level = "debug";
 
export const init = async () => {
  const server: Server = new Server({
    port: process.env.PORT,
    host: process.env.HOST
  });
  routes(server)

  const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: '3.0.0',
        },
    };

    await server.register([
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        Vision
    ]);


  await server.start();

  logger.info("Server running on %s", server.info.uri);
  // server.register(error);
};

process.on(ERROR_UNHANDLER, err => {
  logger.error(err);
  process.exit(0);
});
