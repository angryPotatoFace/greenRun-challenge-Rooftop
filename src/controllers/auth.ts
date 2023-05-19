import { ResponseToolkit } from "@hapi/hapi"
import { IAuthLogin, IRequestUser } from "../constants/interfaces"
import { insertUser } from "../api/user"
import { handlerError } from "../helpers/handlerError"
import { ERR_LOGIN, ERR_NOT_USER, ERR_PASSWORD, ERR_REGISTER } from "../constants/errors"
import { auth } from "../fireAuth"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { userSchema } from "../models/schemas/userSchema"
import { administrator } from "../fireAuth"
import * as log4js from "log4js";

const logger = log4js.getLogger("[ Authentication Controller ]");
logger.level = "debug"

export const loginUser = async (req: IAuthLogin, h: ResponseToolkit) => {
    const { email, password} = req.payload;
    try{
        const UserCrenditals = await signInWithEmailAndPassword(auth, email, password);
        const { token } =  await UserCrenditals.user.getIdTokenResult()

        const a = await administrator.auth().verifyIdToken(token);
        a.uid

        logger.info(`User: ${ email } ID: ${ a.uid} generate a token`);
        return { token };
    } catch (err) {
        logger.error(err);
        return handlerError(ERR_LOGIN, h);
    }
}

export const registerUser = async (req: IRequestUser, h: ResponseToolkit) => {
        const data = req.payload;    

    try {
        const { email, password } = data;
        await userSchema.validateAsync(data);
        const resp = await createUserWithEmailAndPassword(auth,email,password!)
        data.id = resp.user.uid;
        delete data.password;

        const registerUser = await insertUser(data);
        logger.info(`New user registred -> email: ${ resp.user.email } id: ${ resp.user.uid} `);
        
        return( { data: registerUser })
    } catch (err) {
        logger.error(err);
        return handlerError(ERR_REGISTER, h)
    }
}