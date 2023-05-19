import { Categories } from "../constants/Transaciton";
import { Bet_Status } from "../constants/Bet";
import { BetUser_State } from "../constants/UserBet";
import { ERR_BET_UNAVAIBLE } from "../constants/errors";
import { ITransaction } from "../constants/interfaces";
import { Bet } from "../models/entity/Bet"
import { insertNewTransaction } from "./transaction";
import { getUsersByBetId, insertUserBet, updateState } from "./user_bet";


export const getOneBetWhere = async ( event_id: number, bet_option: number ) => {
    try {
        const data = await Bet.findOne({ 
            where: { event_id, bet_option } 
        })
        return data
    } catch (error) {
        throw error  
    }
}


export const getBetWhere = async ( event_id?: number, sport?: string ) =>  {
    try{

        let data; 

        if ( event_id ) {
             data = await Bet.findBy({ event_id } )
        }
        if( sport ){
            data = await Bet.findBy({ sport } )
        }

        if( !event_id && !sport ){
            data = await await Bet.find();
        }

        return data;
    } catch (error) {
        throw error  
    }
}

export const updateStatus = async(id: number, status: string ) => {
    try{
        let data
        const old = await Bet.findOneBy({ id });

        if( status === 'cancelled' && old!.status === 'settled' ) {
            throw "You cannot cancelled a settled Bet";
        }

        data = await Bet.update(id, { status });

        return data; 
    }catch( err ){
        throw err
    }
}

export const updateResultOfBet = async(event_id: number, bet_option: number, result: string ) => {
    try{
        
        const betData = await Bet.findOneBy({ event_id, bet_option });
        const data = await Bet.update( betData!.id! ,{
            result
        })

    

        await updateState(betData!.id!, result);

        const odd = betData?.odd;

        if( result === "won" ) {
            const users_Bets = await getUsersByBetId(betData!.id! );
            users_Bets.map( bet => {

                const transaction = {
                    user_id: bet.user_id, 
                    amount: bet.amount * odd!, 
                    category: 'winning', 
                    status: result, 
                    user_bet_id: bet.id
                }

                insertNewTransaction(transaction);
            })
        }
    
        return data; 
    }catch( err ){
        throw err
    }
}



export const handlerUserBet = async(event_id: number, bet_option:number, data:ITransaction) => {

    try{
        
        const bet = await getOneBetWhere(event_id, bet_option);
        
        if( !bet || bet.status !== Bet_Status.ACTIVE ) throw ERR_BET_UNAVAIBLE

        const { user_id, amount, category, status} = data
        const { id, odd } = bet;

        const userBet = await insertUserBet({
            user_id,
            bet_id: id!,
            odd: odd!,
            amount,
            state: BetUser_State.OPEN ,
        })    

        const user_bet_id = userBet.identifiers[0].id;

        const transaction ={
            user_id,
            amount,
            category,
            status: BetUser_State.OPEN,
            user_bet_id,
        }
        
        return await insertNewTransaction(transaction);
    }catch( err ){
        throw err
    }
}
