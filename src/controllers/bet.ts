import { Request, ResponseToolkit} from '@hapi/hapi'
import { Bet } from '../models/entity/Bet';
import { getBetWhere, updateStatus, updateResultOfBet } from '../api/bet';
import * as log4js from "log4js";
import { IChangeBetStatus, ICreateBet } from '../constants/interfaces';
import { isValidStatus } from './validations';
import { handlerError } from '../helpers/handlerError';

const logger = log4js.getLogger("[ Bet Controller ]");
logger.level = "debug"

export const getBets = async (req: Request, h: ResponseToolkit) => {

    const event_id = req.query.event_id
    const sport = req.query.sport

    try{
        return await getBetWhere(event_id, sport)
    }catch( err) {
        logger.error(err);
        return handlerError(err, h);
    }

}

export const getBet = async (req: Request, h: ResponseToolkit) => {

    try {
        const data = await Bet.findOneBy({
            id: req.params.id,
        })
        return data;
    }catch( err ){
        logger.error(err);
        return handlerError(err, h);
    }
   
}

export const createBet = async (req: ICreateBet, h: ResponseToolkit) => {
    const data = req.payload;
    data.result = "open";

    try{
        const newBet = await Bet.insert(data);
        return newBet;
    }catch( err ){
        logger.error(err);
        return handlerError(err, h);
    }

}


export const changeStatus = async ( req: IChangeBetStatus, h: ResponseToolkit) => {
    const { id, status } = req.payload;

    try {
        isValidStatus( status);
        const data = await updateStatus(id, status);
        return data;  
    }catch( err){
        logger.error(err);
        return handlerError(err, h);
    }
}

export const uploadResult = async (req: Request, h: ResponseToolkit) => {

    const { event_id, bet_option, result }:any = req.payload;

    try{
        const data = await updateResultOfBet(event_id, bet_option, result);
        return data;
    }catch( err ) {
        logger.error(err);
        return handlerError(err, h);
    }

}

