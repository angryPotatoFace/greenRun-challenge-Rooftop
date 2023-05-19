import { Request, ResponseToolkit} from '@hapi/hapi'
import { IRequestUser, IRequestTransactions, ITransaction, IRequestBet} from '../constants/interfaces'
import { Categories } from '../constants/Transaciton'
import { userSchema, userSchemaID } from '../models/schemas/userSchema';
import { insertUser, findAllUsers, findUserBy, updateDataUser, deleteUserByID, blockAUser, isAdmintrator } from '../api/user';
import { userBetSchema, transactionSchema } from '../models/schemas/transaction';
import { getAmountByTransaccions, getTransactionsByUserID, haveEnoughtMoney, insertNewTransaction } from '../api/transaction';
import { handlerUserBet } from '../api/bet';
import { ERROR_CANNOT_USER, ERROR_NO_MONEY, ERR_ID } from '../constants/errors';
import * as log4js from "log4js";
import { Bet_Status } from '../constants/Bet';
import { handlerError } from '../helpers/handlerError';
import { Roles } from '../constants/User';
import { areMe } from './validations';
import { doAbetSchema } from '../models/schemas/bet';
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
    data.status = "open"
    data.user_id = req.pre.auth.user.id;
    
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
    data.status = "open"
    data.user_id = req.pre.auth.user.id;


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

    const bets = req.payload.bets;


    const result = bets.map( async( bet ) => {

        const { event_id, bet_option } = bet;
        const data: ITransaction = bet;
        data.user_id = req.pre.auth.user.id;
        data.category = Categories.BET;    
        try{
            await doAbetSchema.validateAsync(data);
            const amount = await haveEnoughtMoney(data);

            if( amount - bet.amount >= 0 ) {
                return await handlerUserBet( event_id, bet_option, data);
            }else {
                return ERROR_NO_MONEY
            }
        }catch(err){ 
            logger.error(err);
            return err;
        }
    })

    return result;
   


  
}


export const getTransacions = async (req: IRequestUser, h: ResponseToolkit) => {
    const { filters } = req.query;
    const id = req.query.user_id;

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
    const user_id  = req.pre.auth.user.id;

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