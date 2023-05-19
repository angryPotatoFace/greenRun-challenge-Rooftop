import { Request, ResponseToolkit} from '@hapi/hapi'
import { IRequestUser, IRequestTransactions, ITransaction, IRequestBet} from '../constants/interfaces'
import { Categories } from '../constants/Transaciton'
import { userSchema, userSchemaID } from '../models/schemas/userSchema';
import { insertUser, findAllUsers, findUserBy, updateDataUser, deleteUserByID, blockAUser, isAdmintrator } from '../api/user';
import { betSchema, transactionSchema } from '../models/schemas/transaction';
import { getAmountByTransaccions, getTransactionsByUserID, haveEnoughtMoney, insertNewTransaction } from '../api/transaction';
import { handlerUserBet } from '../api/bet';
import { ERROR_CANNOT_USER, ERR_ID } from '../constants/errors';
import * as log4js from "log4js";
import { Bet_Status } from '../constants/Bet';
import { handlerError } from '../helpers/handlerError';
import { Roles } from '../constants/User';
import { areMe } from './validations';
const logger = log4js.getLogger("[ User Controller ]");
logger.level = "debug"


export const createUser = async (req: IRequestUser, h: ResponseToolkit) => {
    const data = req.payload;
    try{
        await userSchema.validateAsync(data);
        return await insertUser(data);
    }
    catch(err){ 
        logger.error(err);
        return handlerError(err, h);
    }
}

export const getUsers = async (req: Request, h: ResponseToolkit) => {
    try{
        return  await findAllUsers();;
    }
    catch(err ){ 
        logger.error(err);
        return handlerError(err, h);
    }
}

export const getUser = async (req: IRequestUser, h: ResponseToolkit) => {
    try{
        return await findUserBy({ id: req.params.id })
    }  catch(err){ 
        logger.error(err);
        return handlerError(err, h);
    }
}

export const updateUser = async (req: IRequestUser, h: ResponseToolkit) => {

    const user = req.payload;
    try{
        await userSchemaID.validateAsync(user);
        const isAdmin = await isAdmintrator(user!.id!);
        const me = areMe(user!.id!, req.pre.auth.user.id);

        if( isAdmin && !me ) throw ERROR_CANNOT_USER;

        return await updateDataUser(user)
    } catch(err){ 
        logger.error(err);
        return handlerError(err, h);
    }
}


export const updateMe = async (req: IRequestUser, h: ResponseToolkit) => {

    const user = req.payload;
    
    
    try{
        await userSchemaID.validateAsync(user);
        const me = areMe(user!.id!, req.pre.auth.user.id);
        console.log( me);
        if ( ! me  ) throw ERROR_CANNOT_USER

        return await updateDataUser(user)
    } catch(err){ 
        logger.error(err);
        return handlerError(err, h);
    }
}

export const deleteUser = async (req: Request, h: ResponseToolkit) => {
    try{
        return await deleteUserByID(req.params.id)
    }catch(err){ 
        logger.error(err);
        return handlerError(err, h);
     }
}

export const depositUser = async (req: IRequestTransactions, h: ResponseToolkit) => {

    const data: ITransaction = req.payload;
    data.category = Categories.DEPOSIT;
    
    try{
        await transactionSchema.validateAsync(data);
        return insertNewTransaction(data);
    }catch(err){ 
        logger.error(err);
        return handlerError(err, h);
     }
}

export const withDrawUser = async (req: IRequestTransactions, h: ResponseToolkit) => {
    const data: ITransaction = req.payload;
    data.category = Categories.WITHDRAW

    try{
        await transactionSchema.validateAsync(data);
        await haveEnoughtMoney(data);
        return await insertNewTransaction(data);
    }catch(err){ 
        logger.error(err);
        return handlerError(err, h);
    }
}

export const betEvent = async (req: IRequestBet, h: ResponseToolkit) => {

    const { event_id, bet_option } = req.payload.bet;
    const data: ITransaction = req.payload.transaction;
    
    data.category = Categories.BET;
    data.status = Bet_Status.ACTIVE;

    try {
        await betSchema.validateAsync(data);
        await haveEnoughtMoney(data);

        return  await handlerUserBet( event_id, bet_option, data);;

    }catch(err){ 
        logger.error(err);
        return handlerError(err, h);
     }
}


export const getTransacions = async (req: IRequestUser, h: ResponseToolkit) => {
    const {id, filters} = req.params;

    try{
        if(!id) throw ERR_ID;

        let transactions = await getTransactionsByUserID(id);
        if( filters){
            transactions = transactions.filter( t => t.category === filters );
        }   

        return transactions;
    }catch(err){ 
        return handlerError(err, h);
     }

}


export const getBalance = async (req: Request, h: ResponseToolkit) => {
    const { user_id } = req.params;
    try{
        const amount = await getAmountByTransaccions(user_id)
        return `The balance about your account is ${amount}$ `
    }catch(err){ 
        return handlerError(err, h);
     }
}

export const blockUser = async (req: IRequestUser, h: ResponseToolkit) => {
    const { id } = req.payload;
    try{    
        return await blockAUser(id!);
    }catch(err){ 
        logger.error(err);
        return handlerError(err, h);
     }
}