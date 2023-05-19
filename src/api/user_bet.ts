import { IUserBet } from "../constants/interfaces"
import { UserBets } from "../models/entity/UserBets"


export const insertUserBet = async  ( user: IUserBet ) => {
    try {
        return await UserBets.insert(user)
    } catch (error) {
        throw error  
    }
}

export const getUsersByBetId = async  ( bet_id: number ) => {
    try {
        return await UserBets.findBy({ bet_id });
    } catch (error) {
        throw error  
    }
}

export const updateState = async(bet_id: number, state: string ) => {
    try {

        const data = await UserBets.update({ bet_id: bet_id }, {
            state: state
        }) 
        return data;
    } catch (error) {
        throw error  
    }
}