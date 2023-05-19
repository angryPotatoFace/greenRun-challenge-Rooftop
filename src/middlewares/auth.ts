import { Request, ResponseToolkit } from "@hapi/hapi"
import { administrator } from "../fireAuth"
import { findUserBy } from "../api/user"
import { IUser } from "../constants/interfaces"
import { Roles, State }  from '../constants/User';
import { ERROR_USER_BLOCK, ERR_USER_ROLE } from "../constants/errors";

var log4js = require("log4js");
var logger = log4js.getLogger( '[ Middleware - Auth ]' );
logger.level = "debug";

export const checkAuth = async (req: Request, h: any) => {
    try {
        const token = req.headers.authorization.split(' ').pop() 
 
        if( !token ) return Error();
        try{
            const verify = await administrator.auth().verifyIdToken(token);
            const id = verify.uid;
            const user = await findUserBy({ id });  

            return { 
                verify,
                user
            }
         } catch( err ){
            logger.error(err);
            return Error();
         }
    } catch (err) {
        logger.error(err);
        throw Error();
    }
}

export const checkRoleAuth = async (req: Request, h: ResponseToolkit) => {
    try {
        const user = req.pre.auth.user;

        if( user.role !== Roles.ADMIN ) {
            logger.error(ERR_USER_ROLE);
            return Error() ;
        }
        
        return user;
        
    } catch (err) {
        logger.error(err);
        throw Error();
    }

}

export const isUserBlocked = async (req: Request, h: ResponseToolkit) => {
    try {
        const user: IUser = req.pre.auth.user;
        
        if( user.user_state === State.BLOCK ) {
            logger.error(ERROR_USER_BLOCK);
            return Error();
        } 
        
        return user;

    } catch (err) {
        logger.error(err);
        throw Error();
    }

}

