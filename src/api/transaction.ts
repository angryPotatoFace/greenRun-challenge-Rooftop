import { Categories } from '../constants/Transaciton'
import { ERROR_NO_MONEY, ERROR_TRANSACTION } from '../constants/errors';
import { ITransaction } from "../constants/interfaces";
import { Transaction } from "../models/entity/Transaction";



export const insertNewTransaction = async ( trans: ITransaction ) => {
    try {
        return await Transaction.insert( trans );
    } catch (error) {
        throw error  
    }   
}

export const getTransactionsByUserID = async ( id: string ) => {
    try {
        return await Transaction.find({
            where: { user_id: id }
        })
    } catch (error) {
        throw error  
    }
}

export const getTransactionsByType = async ( id: string ) => {
    try {
        return await Transaction.find({
            where: { user_id: id }
        })
    } catch (error) {
        throw error  
    }
}


export const getTransactionsBy = async ( user_id?: string , category?: string) => {
    try {
        let data ;

        if( category && user_id ){
            data = await Transaction.findBy({ user_id})
            data = data.filter( t => t.category === category ); 
        }else if( user_id ) {
            data = await Transaction.findBy({ user_id})
        }else if ( category ) {
            await Transaction.findBy({ category})
        }else {
            data = await Transaction.find()
        }

        return data;
    } catch (error) {
        throw error  
    }
}

export const haveEnoughtMoney = async( trans: ITransaction ) => {
    try{
        let total = await getAmountByTransaccions(trans.user_id);
        total = total - trans.amount;

        if ( total < 0 ) throw Error(ERROR_NO_MONEY)

        return total
    }catch(e){
        throw ERROR_NO_MONEY
    }
}


export const getAmountByTransaccions = async ( user_id: string  ) => {

    try{
        const transactions = await getTransactionsByUserID( user_id ) as Transaction[];
        let total = 0
        transactions.forEach( (v: Transaction) => {
            total += (v.category === Categories.WITHDRAW || v.category === Categories.BET  )? -v.amount! : v.amount!; 
        })

        return total
    }catch(e){
        throw ERROR_TRANSACTION
    }
}
