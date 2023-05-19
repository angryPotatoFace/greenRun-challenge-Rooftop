import { ERROR_CANNOT_USER, ERROR_CATEGORY } from "../constants/errors";
import { Bet_Status } from "../constants/Bet";


export const isValidStatus = ( status: string ) => {
    if( !( status === Bet_Status.ACTIVE || status === Bet_Status.CANCELLED ) ) { 
        throw Error(ERROR_CATEGORY);
    }
}   

export const areMe = ( id: string, id_second: string ) => {
    return id === id_second;
}   